"""
==========================================================================
  АРМ «Оценщик» — Десктопное приложение (Portable .exe)
==========================================================================
"""
import os
import sys
import time
import socket
import threading
import logging
import webbrowser   # ← добавлено

# ── Версия приложения ─────────────────────────────────────────────────────
APP_NAME = "АРМ «Оценщик»"
APP_VERSION = "1.0.0"
APP_TITLE = f"{APP_NAME} v{APP_VERSION} — Автоматизированное рабочее место оценщика ОКН"
HOST = "127.0.0.1"
PORT = 8917

# ── Определение базовой директории ───────────────────────────────────────
def get_base_dir() -> str:
    if getattr(sys, "frozen", False):
        return sys._MEIPASS
    return os.path.dirname(os.path.abspath(__file__))

BASE_DIR = get_base_dir()
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend", "dist")
LOG_FILE = os.path.join(BASE_DIR, "arm_ocenschik.log")

# ── Настройка логирования ─────────────────────────────────────────────────
def setup_logging() -> None:
    fmt = logging.Formatter("[%(asctime)s] %(levelname)s — %(message)s", datefmt="%H:%M:%S")
    root = logging.getLogger()
    root.setLevel(logging.INFO)
    ch = logging.StreamHandler(sys.stdout)
    ch.setFormatter(fmt)
    root.addHandler(ch)
    try:
        fh = logging.FileHandler(LOG_FILE, encoding="utf-8", mode="w")
        fh.setFormatter(fmt)
        root.addHandler(fh)
    except OSError:
        pass

setup_logging()
log = logging.getLogger("desktop_app")

# ── Автоматическое открытие браузера (добавлено) ─────────────────────────
def open_browser(port: int):
    """Открывает браузер после того, как сервер точно запустился"""
    time.sleep(1.5)                    # небольшая страховка
    url = f"http://{HOST}:{port}"
    log.info(f"🌐 Автоматически открываю браузер: {url}")
    try:
        webbrowser.open(url)
    except Exception as e:
        log.warning(f"Не удалось открыть браузер: {e}")

# ── Поиск свободного порта ────────────────────────────────────────────────
def find_free_port(start: int = PORT) -> int:
    for port in range(start, start + 100):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            try:
                s.bind((HOST, port))
                return port
            except OSError:
                continue
    return start

# ── Ожидание готовности сервера ───────────────────────────────────────────
def wait_for_server(host: str, port: int, timeout: float = 20.0) -> bool:
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            with socket.create_connection((host, port), timeout=0.5):
                return True
        except (ConnectionRefusedError, OSError):
            time.sleep(0.25)
    return False

# ── Патч FastAPI-приложения: монтировать статику ──────────────────────────
def patch_app_with_static(app, frontend_dir: str) -> None:
    from fastapi.staticfiles import StaticFiles
    from fastapi.responses import FileResponse
    from fastapi import Request

    assets_dir = os.path.join(frontend_dir, "assets")
    index_html = os.path.join(frontend_dir, "index.html")

    if not os.path.isfile(index_html):
        log.error("❌ index.html не найден в %s", frontend_dir)
        return

    if os.path.isdir(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="vite-assets")
        log.info("📦 Статика /assets/ → %s", assets_dir)

    @app.get("/")
    async def serve_root():
        return FileResponse(index_html, media_type="text/html")

    @app.get("/{full_path:path}")
    async def serve_spa(request: Request, full_path: str):
        candidate = os.path.join(frontend_dir, full_path)
        if os.path.isfile(candidate):
            return FileResponse(candidate)
        return FileResponse(index_html, media_type="text/html")

    log.info("🌐 SPA fallback → %s", index_html)

# ── Запуск FastAPI + uvicorn ─────────────────────────────────────────────
def start_server(host: str, port: int) -> None:
    try:
        backend_dir = os.path.join(BASE_DIR, "backend")
        if backend_dir not in sys.path:
            sys.path.insert(0, backend_dir)
            log.info("🗂️ backend/ добавлен в sys.path: %s", backend_dir)

        log.info("📥 Импорт FastAPI-приложения из backend/main.py...")
        from main import app

        if os.path.isdir(FRONTEND_DIR):
            patch_app_with_static(app, FRONTEND_DIR)

        import uvicorn
        log.info("🚀 Uvicorn слушает http://%s:%d", host, port)
        uvicorn.run(app, host=host, port=port, log_level="warning", access_log=False)
    except Exception as e:
        log.exception("❌ Критическая ошибка сервера: %s", e)

# ── Главная функция ───────────────────────────────────────────────────────
def main() -> None:
    print("=== ЗАПУСК EXE ===")
    print("Текущая директория:", os.getcwd())
    print("BASE_DIR:", BASE_DIR)
    
    log.info("=" * 60)
    log.info(" %s v%s", APP_NAME, APP_VERSION)
    log.info(" Лог: %s", LOG_FILE)
    log.info("=" * 60)

    port = find_free_port(PORT)
    log.info("🔌 Порт сервера: %d", port)

    server_thread = threading.Thread(
        target=start_server, args=(HOST, port), name="uvicorn-thread", daemon=True
    )
    server_thread.start()

    log.info("⏳ Ожидание запуска сервера (до 20 сек)...")
    ready = wait_for_server(HOST, port, timeout=20.0)

    if not ready:
        log.error("❌ Сервер не запустился!")
        sys.exit(1)

    # ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
    # Автоматическое открытие браузера (добавлено)
    threading.Thread(target=open_browser, args=(port,), daemon=True).start()
    # ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←

    log.info("✅ Сервер готов! Открываю окно...")

    try:
        import webview
        window = webview.create_window(
            title=APP_TITLE,
            url=f"http://{HOST}:{port}",
            width=1440,
            height=900,
            min_size=(1024, 700),
            resizable=True,
            text_select=True,
            background_color="#0b1220",
        )
        webview.start(debug=False)
    except ImportError:
        log.warning("⚠️ pywebview не найден. Работает только через браузер.")
        _wait_forever(server_thread)
    except Exception as e:
        log.exception("❌ Ошибка pywebview: %s", e)
        _wait_forever(server_thread)

def _wait_forever(server_thread: threading.Thread) -> None:
    try:
        log.info(" Нажмите Ctrl+C для завершения.")
        server_thread.join()
    except KeyboardInterrupt:
        log.info("👋 Завершение по Ctrl+C")

if __name__ == "__main__":
    main()