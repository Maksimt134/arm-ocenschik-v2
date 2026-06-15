import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('Uncaught error in ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="bg-rose-900/20 border border-rose-500 p-6 rounded-xl text-white">
          <h2 className="text-lg font-bold mb-2">Критическая ошибка компонента</h2>
          <p className="font-mono text-sm break-all">
            {this.state.error?.message || 'Неизвестная ошибка'}
          </p>
          <p className="text-xs text-rose-300 mt-2">Проверьте консоль браузера для деталей.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
