import React from 'react';

const MethodologyPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-2 px-2 sm:px-4 space-y-8">
      {/* Заголовок страницы */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
          Методология оценки и математические модели
        </h1>
        <p className="text-lg text-slate-400 max-w-3xl">
          Полный справочник формул, коэффициентов и логики расчетов, используемых в АРМ «Оценщик» 
          для определения рыночной стоимости объектов культурного наследия (ОКН).
        </p>
        <div className="mt-4 text-xs uppercase tracking-widest text-slate-500 font-mono">
          Версия моделей • 2026 • Реализованы в utils/calc.ts и компонентах оценки
        </div>
      </div>

      {/* Блок 1: Сравнительный подход */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-2xl bg-sky-500/10 flex items-center justify-center">
            <span className="text-sky-400 text-xl font-black">1</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Метод корректировок (Сравнительный подход)</h2>
        </div>

        <div className="font-mono text-emerald-400 bg-slate-900 p-4 rounded-xl my-4 text-lg border border-slate-700">
          V = S × P<sub>sqm</sub> × (1 + K<sub>adj</sub>)
        </div>

        <p className="text-slate-300 leading-relaxed text-[15px]">
          Основан на анализе реальных рыночных сделок. Мы берем базовую стоимость квадратного метра аналога (P<sub>sqm</sub>), 
          умножаем на площадь нашего ОКН (S) и применяем поправочные коэффициенты (K<sub>adj</sub>) на износ, локацию 
          и статус.
        </p>

        <div className="mt-5 p-5 bg-slate-900/40 rounded-xl border border-slate-800/50">
          <ul className="space-y-3 text-sm text-slate-300 leading-relaxed">
            <li><span className="text-sky-400 font-mono font-bold mr-2">V</span> Итоговая рыночная стоимость.</li>
            <li><span className="text-sky-400 font-mono font-bold mr-2">S</span> Общая площадь нашего здания (в квадратных метрах).</li>
            <li><span className="text-sky-400 font-mono font-bold mr-2">P<sub>sqm</sub></span> Средняя цена за один "квадрат" у похожих зданий на рынке.</li>
            <li><span className="text-sky-400 font-mono font-bold mr-2">K<sub>adj</sub></span> Сумма поправок (на ремонт, удаленность от метро и охранный статус).</li>
          </ul>
        </div>

        <div className="mt-4 text-xs text-slate-500">
          Коэффициенты K<sub>adj</sub> рассчитываются автоматически на основе схожести аналогов (k-NN) и ручных корректировок пользователя.
        </div>
      </div>

      {/* Блок 2: Доходный подход */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
            <span className="text-emerald-400 text-xl font-black">2</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Метод прямой капитализации (Доходный подход)</h2>
        </div>

        <div className="font-mono text-emerald-400 bg-slate-900 p-4 rounded-xl my-4 text-lg border border-slate-700">
          V = NOI / R<sub>cap</sub>
        </div>

        <p className="text-slate-300 leading-relaxed text-[15px]">
          Считает стоимость как бизнес-актив. Чистый операционный доход (NOI) делится на ставку капитализации (R<sub>cap</sub>). 
          NOI рассчитывается как потенциальная аренда минус уровень вакантности и операционные расходы.
        </p>

        <div className="mt-5 p-5 bg-slate-900/40 rounded-xl border border-slate-800/50">
          <ul className="space-y-3 text-sm text-slate-300 leading-relaxed">
            <li><span className="text-emerald-400 font-mono font-bold mr-2">V</span> Итоговая стоимость актива.</li>
            <li><span className="text-emerald-400 font-mono font-bold mr-2">NOI</span> Чистый доход от аренды (за год), уже за вычетом коммуналки, налогов и пустующих помещений.</li>
            <li><span className="text-emerald-400 font-mono font-bold mr-2">R<sub>cap</sub></span> Ставка капитализации (какой процент прибыли в год хотят получать инвесторы с учетом рисков).</li>
          </ul>
        </div>

        <div className="mt-4 text-xs text-slate-500">
          R<sub>cap</sub> = 0.09 + (wear<sub>pct</sub> × 0.0006). Для ОКН с высоким износом ставка растёт, снижая капитализированную стоимость.
        </div>
      </div>

      {/* Блок 3: Затратный подход */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-2xl bg-amber-500/10 flex items-center justify-center">
            <span className="text-amber-400 text-xl font-black">3</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Метод восстановительной стоимости</h2>
        </div>

        <div className="font-mono text-emerald-400 bg-slate-900 p-4 rounded-xl my-4 text-lg border border-slate-700">
          V = V<sub>land</sub> + C<sub>rep</sub> × (1 - D<sub>total</sub>)
        </div>

        <p className="text-slate-300 leading-relaxed text-[15px]">
          Оценивает затраты на воссоздание точной копии объекта. Учитывает стоимость земли (V<sub>land</sub>) и затраты на строительство (C<sub>rep</sub>) 
          за вычетом совокупного физического и морального износа (D<sub>total</sub>). Для ОКН применяются повышающие мультипликаторы реставрации.
        </p>

        <div className="mt-5 p-5 bg-slate-900/40 rounded-xl border border-slate-800/50">
          <ul className="space-y-3 text-sm text-slate-300 leading-relaxed">
            <li><span className="text-amber-400 font-mono font-bold mr-2">V</span> Итоговая восстановительная стоимость.</li>
            <li><span className="text-amber-400 font-mono font-bold mr-2">V<sub>land</sub></span> Стоимость самой земли под зданием.</li>
            <li><span className="text-amber-400 font-mono font-bold mr-2">C<sub>rep</sub></span> Смета: сколько будет стоить построить такую же коробку здания с нуля по сегодняшним ценам на стройматериалы.</li>
            <li><span className="text-amber-400 font-mono font-bold mr-2">D<sub>total</sub></span> Износ (скидка на то, насколько здание постарело и обветшало).</li>
          </ul>
        </div>

        <div className="mt-4 text-xs text-slate-500">
          Износ (wear<sub>pct</sub>) напрямую уменьшает восстановительную стоимость здания. Земля оценивается отдельно по 60% от нормативной цены.
        </div>
      </div>

      {/* Блок 4: Итоговое согласование и Сценарное моделирование */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-2xl bg-violet-500/10 flex items-center justify-center">
            <span className="text-violet-400 text-xl font-black">4</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Метод средневзвешенной стоимости</h2>
        </div>

        <div className="font-mono text-emerald-400 bg-slate-900 p-4 rounded-xl my-4 text-lg border border-slate-700">
          V<sub>final</sub> = Σ (V<sub>i</sub> × W<sub>i</sub>)
        </div>

        <p className="text-slate-300 leading-relaxed text-[15px]">
          Итоговая стоимость — это баланс трех подходов, умноженных на их весовые коэффициенты (W<sub>i</sub>). 
          В сценарном анализе эти веса фиксируются, а базовые переменные (аренда, сметы) подвергаются шоковому воздействию, генерируя дельту рисков.
        </p>

        <div className="mt-5 p-5 bg-slate-900/40 rounded-xl border border-slate-800/50">
          <ul className="space-y-3 text-sm text-slate-300 leading-relaxed">
            <li><span className="text-violet-400 font-mono font-bold mr-2">V<sub>final</sub></span> Финальная, самая точная оценка стоимости здания.</li>
            <li><span className="text-violet-400 font-mono font-bold mr-2">V<sub>i</sub></span> Стоимость, которую мы получили в каждом из трех подходов (Сравнительном, Доходном, Затратном).</li>
            <li><span className="text-violet-400 font-mono font-bold mr-2">W<sub>i</sub></span> Вес (доля доверия) к каждому подходу в процентах. В сумме они всегда дают 100%.</li>
          </ul>
        </div>

        <div className="mt-6 p-4 bg-slate-950/60 border border-slate-700 rounded-2xl text-sm">
          <div className="font-semibold text-white mb-2">Сценарный анализ (стресс-тестирование)</div>
          <p className="text-slate-400">
            В сценарном анализе веса (W<sub>i</sub>) фиксируются, а базовые переменные (аренда, вакантность, сметы, сроки, cap rate) 
            подвергаются шоковому воздействию. Результат — дельта рисков (VaR) и новая сценарная стоимость.
            Это позволяет моделировать кризисы, пандемии, джентрификацию и санкционные шоки в реальном времени.
          </p>
        </div>
      </div>

      {/* Дополнительный блок с примечаниями */}
      <div className="text-center text-xs text-slate-500 pt-4 border-t border-slate-800">
        Все формулы реализованы точно в соответствии с действующими методиками Минэкономразвития РФ и ФСО для оценки ОКН. 
        Коэффициент культурного наследия (ККН) применяется как повышающий мультипликатор к итоговой согласованной стоимости.
      </div>

      {/* Шаг 1: Большой разделитель и новый раздел глоссария */}
      <hr className="my-12 border-slate-800/40" />

      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white mb-6">
          Глоссарий терминов: Архитектура и Градостроительство
        </h2>
        <p className="text-slate-400 text-sm mb-8 max-w-3xl">
          Справочник ключевых аббревиатур и понятий для членов комиссии. Термины разделены на градостроительные (влияют на стоимость и ограничения ОКН) и ИТ/математические (используемые в программной реализации оценки).
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Секция Градостроительство */}
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-amber-400 mb-4 tracking-wide">Градостроительство</h3>
            <div className="space-y-5">
              <div className="border-l-2 border-amber-500/40 pl-3">
                <div className="font-mono font-bold text-amber-400 tracking-wider">ИСОГД</div>
                <div className="text-sm text-slate-300 mt-1">Информационная система обеспечения градостроительной деятельности. Государственная цифровая база данных, в которой хранится вся информация о застройке, правилах и ограничениях территорий города.</div>
              </div>
              <div className="border-l-2 border-amber-500/40 pl-3">
                <div className="font-mono font-bold text-amber-400 tracking-wider">ГИС ОГД Москвы</div>
                <div className="text-sm text-slate-300 mt-1">Геоинформационная система. Московская версия ИСОГД, представляющая собой интерактивную карту со слоями, где видно, что можно и нельзя строить на конкретном участке.</div>
              </div>
              <div className="border-l-2 border-amber-500/40 pl-3">
                <div className="font-mono font-bold text-amber-400 tracking-wider">ЗОУИТ</div>
                <div className="text-sm text-slate-300 mt-1">Зоны с особыми условиями использования территорий. Охранные зоны (например, вокруг памятников или ЛЭП), где закон жестко ограничивает строительство и ремонт, что напрямую снижает стоимость земли.</div>
              </div>
              <div className="border-l-2 border-amber-500/40 pl-3">
                <div className="font-mono font-bold text-amber-400 tracking-wider">ГПЗУ</div>
                <div className="text-sm text-slate-300 mt-1">Градостроительный план земельного участка. Документ-паспорт на землю, где написано, какой высоты здание тут можно построить и какой процент участка можно заасфальтировать.</div>
              </div>
              <div className="border-l-2 border-amber-500/40 pl-3">
                <div className="font-mono font-bold text-amber-400 tracking-wider">ПЗЗ</div>
                <div className="text-sm text-slate-300 mt-1">Правила землепользования и застройки. Городской закон, который делит город на зоны (жилая, коммерческая, промышленная) и диктует, что именно разрешено делать в каждой зоне.</div>
              </div>
              <div className="border-l-2 border-amber-500/40 pl-3">
                <div className="font-mono font-bold text-amber-400 tracking-wider">ОКН</div>
                <div className="text-sm text-slate-300 mt-1">Объект культурного наследия. Памятник истории или архитектуры. Реставрация таких объектов стоит в разы дороже обычного ремонта из-за строгих требований закона.</div>
              </div>
            </div>
          </div>

          {/* Секция ИТ-Архитектура */}
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-4 tracking-wide">ИТ-Архитектура</h3>
            <div className="space-y-5">
              <div className="border-l-2 border-cyan-500/40 pl-3">
                <div className="font-mono font-bold text-cyan-400 tracking-wider">Proof of Concept (PoC)</div>
                <div className="text-sm text-slate-300 mt-1">Прототип, "доказательство концепции". Базовая рабочая версия программы, созданная для проверки того, что идея работает на практике (чем и является данный дипломный проект).</div>
              </div>
              <div className="border-l-2 border-cyan-500/40 pl-3">
                <div className="font-mono font-bold text-cyan-400 tracking-wider">API (Application Programming Interface)</div>
                <div className="text-sm text-slate-300 mt-1">Программный мост, по которому разные программы общаются друг с другом. Например, через API наше приложение в будущем сможет автоматически забирать данные прямо из баз Росреестра.</div>
              </div>
              <div className="border-l-2 border-cyan-500/40 pl-3">
                <div className="font-mono font-bold text-cyan-400 tracking-wider">Frontend (Фронтенд)</div>
                <div className="text-sm text-slate-300 mt-1">Видимая пользователю часть программы (интерфейс, кнопки, графики). В нашем проекте написан на современных технологиях React и Tailwind CSS.</div>
              </div>
              <div className="border-l-2 border-cyan-500/40 pl-3">
                <div className="font-mono font-bold text-cyan-400 tracking-wider">Backend (Бэкенд)</div>
                <div className="text-sm text-slate-300 mt-1">Невидимая, серверная часть программы, которая хранит базы данных и проводит сложные математические вычисления. Написан на языке Python.</div>
              </div>
              <div className="border-l-2 border-cyan-500/40 pl-3">
                <div className="font-mono font-bold text-cyan-400 tracking-wider">Мок-данные (Mock data)</div>
                <div className="text-sm text-slate-300 mt-1">Искусственные, тестовые данные, которые встроены в программу для демонстрации ее работы, пока нет физического подключения к закрытым государственным серверам.</div>
              </div>
              <div className="border-l-2 border-cyan-500/40 pl-3">
                <div className="font-mono font-bold text-cyan-400 tracking-wider">Алгоритм k-NN (k-ближайших соседей)</div>
                <div className="text-sm text-slate-300 mt-1">Математическая модель машинного обучения. В программе используется для автоматического поиска самых похожих зданий-аналогов на основе их характеристик (площадь, удаленность от метро).</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodologyPage;
