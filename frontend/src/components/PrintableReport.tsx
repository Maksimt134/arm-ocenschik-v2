import React from 'react';
import { ValuationWeights, OknObject } from '../types';

interface PrintableReportProps {
  okn?: OknObject;
  comparativeValue: number;
  incomeValue: number;
  costValue: number;
  weights: ValuationWeights;
  finalValue: number;
  justificationText: string;
  chartImages?: {
    cashflow?: string;
    weights?: string;
  };
}

const PrintableReport = React.forwardRef<HTMLDivElement, PrintableReportProps>(
  ({ comparativeValue, incomeValue, costValue, weights, finalValue, justificationText, chartImages = {} }, ref) => {
    const formatBln = (n: number) => `${(n / 1_000_000_000).toFixed(2)} млрд ₽`;

    return (
      <div
        ref={ref}
        style={{
          position: 'absolute',
          top: '-9999px',
          left: '-9999px',
          width: '800px',
          background: 'white',
          color: 'black',
          padding: '40px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontSize: '14px',
          lineHeight: '1.4',
          boxSizing: 'border-box',
        }}
      >
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', textTransform: 'uppercase' }}>
          ВЫПИСКА ИЗ ОТЧЕТА ОБ ОЦЕНКЕ ОКН
        </h1>

        {/* Результаты трех подходов */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #000', paddingBottom: '4px' }}>
            Результаты подходов
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #000' }}>
                <th style={{ textAlign: 'left', padding: '6px 4px', fontWeight: 'normal' }}>Подход</th>
                <th style={{ textAlign: 'right', padding: '6px 4px', fontWeight: 'normal' }}>Стоимость</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: '6px 4px' }}>Сравнительный подход</td>
                <td style={{ textAlign: 'right', padding: '6px 4px', fontFamily: 'monospace' }}>{formatBln(comparativeValue)}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: '6px 4px' }}>Доходный подход</td>
                <td style={{ textAlign: 'right', padding: '6px 4px', fontFamily: 'monospace' }}>{formatBln(incomeValue)}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 4px' }}>Затратный подход</td>
                <td style={{ textAlign: 'right', padding: '6px 4px', fontFamily: 'monospace' }}>{formatBln(costValue)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Согласование весов */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #000', paddingBottom: '4px' }}>
            Согласование
          </h2>
          <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
            Сравнительный подход: {(weights.comparative * 100).toFixed(0)}%<br />
            Доходный подход: {(weights.income * 100).toFixed(0)}%<br />
            Затратный подход: {(weights.cost * 100).toFixed(0)}%
          </div>
        </div>

        {/* График окупаемости */}
        {chartImages.cashflow && (
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #000', paddingBottom: '4px' }}>
              График окупаемости
            </h2>
            <img src={chartImages.cashflow} className="w-full object-contain my-4" alt="График окупаемости" />
          </div>
        )}

        {/* Структура весов */}
        {chartImages.weights && (
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #000', paddingBottom: '4px' }}>
              Структура весов
            </h2>
            <img src={chartImages.weights} className="w-full object-contain my-4" alt="Структура весов" />
          </div>
        )}

        {/* Итоговая стоимость */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #000', paddingBottom: '4px' }}>
            Итоговая рыночная стоимость
          </h2>
          <div style={{ fontSize: '28px', fontWeight: 'bold', fontFamily: 'monospace', margin: '8px 0' }}>
            {formatBln(finalValue)}
          </div>
        </div>

        {/* ИИ-обоснование */}
        {justificationText && (
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid #000', paddingBottom: '4px' }}>
              Обоснование
            </h2>
            <div style={{ fontSize: '13px', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
              {justificationText}
            </div>
          </div>
        )}
      </div>
    );
  }
);

PrintableReport.displayName = 'PrintableReport';

export default PrintableReport;
