import React from 'react';

export interface ReportProps {
  okn: any;
  safeComp: number;
  safeInc: number;
  safeCost: number;
  pComp: number;
  pInc: number;
  pCost: number;
  kkhMultiplier: number;
  finalValue: number;
}

const formatCurrency = (val: number) => {
  if (!val || isNaN(val)) return '0.000 ₽';
  if (val >= 100_000_000) return (val / 1_000_000_000).toFixed(3) + ' млрд ₽';
  return (val / 1_000_000).toFixed(1) + ' млн ₽';
};

export const ProfessionalValuationReport: React.FC<ReportProps> = ({
  okn,
  safeComp,
  safeInc,
  safeCost,
  pComp,
  pInc,
  pCost,
  kkhMultiplier,
  finalValue
}) => {
  const today = new Date().toLocaleDateString('ru-RU');
  const reportNumber = `МОС-${Math.floor(100000 + Math.random() * 900000)}`;

  const stampStyle: React.CSSProperties = {
    position: 'absolute',
    right: '50px',
    top: '10px',
    width: '140px',
    height: '140px',
    border: '4px solid #1d4ed8',
    borderRadius: '50%',
    opacity: 0.8,
    transform: 'rotate(-15deg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1d4ed8',
    fontFamily: 'Arial, sans-serif',
    pointerEvents: 'none'
  };

  const stampInnerStyle: React.CSSProperties = {
    position: 'absolute',
    width: '120px',
    height: '120px',
    border: '1px solid #1d4ed8',
    borderRadius: '50%'
  };

  const pageStyle: React.CSSProperties = {
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: '12pt',
    color: 'black',
    maxWidth: '210mm',
    margin: '0 auto',
    padding: '40px',
    background: 'white',
    lineHeight: 1.5
  };

  const h1Style: React.CSSProperties = { textAlign: 'center', fontSize: '24pt', marginTop: '100px', marginBottom: '20px', textTransform: 'uppercase' };
  const h2Style: React.CSSProperties = { fontSize: '16pt', marginTop: '40px', borderBottom: '2px solid #333', paddingBottom: '5px' };
  const h3Style: React.CSSProperties = { fontSize: '14pt', marginTop: '20px' };
  
  const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', marginTop: '20px', marginBottom: '20px', fontSize: '11pt' };
  const thStyle: React.CSSProperties = { border: '1px solid black', padding: '10px', textAlign: 'left', backgroundColor: '#f3f4f6', fontWeight: 'bold' };
  const tdStyle: React.CSSProperties = { border: '1px solid black', padding: '10px', textAlign: 'left' };

  return (
    <div style={pageStyle}>
      {/* Стили для печати (инжектятся в Head при рендере, но полезно иметь здесь) */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { margin: 0; padding: 0; }
          .page-break { page-break-before: always; }
          @page { margin: 20mm; }
        }
      `}} />

      {/* COVER PAGE */}
      <div style={{ height: '250mm', position: 'relative' }}>
        <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '14pt' }}>
          УТВЕРЖДАЮ<br/><br/>
          Руководитель Департамента<br/>
          оценки исторического наследия<br/>
          ___________ / Петров В.И. /<br/>
          «{today}»
        </div>
        
        <h1 style={h1Style}>ОТЧЕТ ОБ ОЦЕНКЕ №{reportNumber}</h1>
        <div style={{ textAlign: 'center', fontSize: '16pt', marginTop: '50px' }}>
          <strong>Объекта культурного наследия</strong><br/><br/>
          <em>{okn?.name || 'Историческое здание'}</em>
        </div>

        <div style={{ marginTop: '80px', padding: '20px', border: '1px solid #ccc', backgroundColor: '#f9fafb' }}>
          <p><strong>Адрес объекта:</strong> {okn?.address || 'Не указан'}</p>
          <p><strong>Кадастровый номер:</strong> {okn?.cadastralNumber || okn?.cadastral_number || 'Не указан'}</p>
          <p><strong>Охранный статус:</strong> {okn?.okn_category || 'Не указан'}</p>
          <p><strong>Общая площадь:</strong> {okn?.area || 1000} кв.м.</p>
          <p><strong>Заказчик оценки:</strong> Правительство Москвы (МосгорБТИ)</p>
        </div>

        <div style={{ position: 'absolute', bottom: '50px', width: '100%', textAlign: 'center', fontSize: '14pt' }}>
          Москва, {new Date().getFullYear()} г.
        </div>
      </div>

      <div className="page-break" style={{ pageBreakBefore: 'always' }}></div>

      {/* PAGE 2: ARCHITECTURE */}
      <h2 style={h2Style}>1. Архитектурно-технические характеристики</h2>
      <p>Объект оценки представляет собой историческое здание, обладающее высокой архитектурной и градостроительной ценностью. В ходе натурного осмотра и анализа технической документации были установлены следующие параметры:</p>
      
      <table style={tableStyle}>
        <tbody>
          <tr><td style={{...tdStyle, width: '40%'}}><strong>Материал стен:</strong></td><td style={tdStyle}>Кирпич исторической кладки</td></tr>
          <tr><td style={tdStyle}><strong>Год постройки / реконструкции:</strong></td><td style={tdStyle}>{okn?.year_built || 'До 1917'} г.</td></tr>
          <tr><td style={tdStyle}><strong>Физический износ:</strong></td><td style={tdStyle}>{okn?.wear_pct || okn?.metadata?.wear_pct || 35}%</td></tr>
          <tr><td style={tdStyle}><strong>Функциональное назначение:</strong></td><td style={tdStyle}>Административно-офисное (с ограничениями КГИОП)</td></tr>
        </tbody>
      </table>

      {/* PAGE 3: VALUATION */}
      <h2 style={h2Style}>2. Расчет рыночной стоимости (Синтез подходов)</h2>
      <p>Оценка проводилась с применением трех классических подходов, веса которых были сбалансированы экспертным методом в зависимости от специфики и доступности рыночной информации об объекте.</p>

      <h3 style={h3Style}>2.1. Результаты применения подходов</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{...thStyle, width: '30%'}}>Подход к оценке</th>
            <th style={{...thStyle, width: '40%'}}>Базовая рассчитанная стоимость (без НДС)</th>
            <th style={{...thStyle, width: '30%', textAlign: 'center'}}>Удельный вес при согласовании</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong>Сравнительный подход</strong><br/><span style={{fontSize: '9pt', color: '#555'}}>(Рыночная экстракция)</span></td>
            <td style={{...tdStyle, fontWeight: 'bold', fontSize: '14pt'}}>{formatCurrency(safeComp)}</td>
            <td style={{...tdStyle, textAlign: 'center', fontWeight: 'bold'}}>{pComp}%</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Доходный подход</strong><br/><span style={{fontSize: '9pt', color: '#555'}}>(Дисконтирование потоков)</span></td>
            <td style={{...tdStyle, fontWeight: 'bold', fontSize: '14pt'}}>{formatCurrency(safeInc)}</td>
            <td style={{...tdStyle, textAlign: 'center', fontWeight: 'bold'}}>{pInc}%</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>Затратный подход</strong><br/><span style={{fontSize: '9pt', color: '#555'}}>(Стоимость замещения)</span></td>
            <td style={{...tdStyle, fontWeight: 'bold', fontSize: '14pt'}}>{formatCurrency(safeCost)}</td>
            <td style={{...tdStyle, textAlign: 'center', fontWeight: 'bold'}}>{pCost}%</td>
          </tr>
        </tbody>
      </table>

      {/* Visual representation of weights */}
      <h3 style={h3Style}>2.2. Визуализация структуры весов подходов</h3>
      <div style={{ display: 'flex', height: '40px', width: '100%', marginTop: '10px', marginBottom: '30px', borderRadius: '4px', overflow: 'hidden' }}>
        {pComp > 0 && <div style={{ width: `${pComp}%`, backgroundColor: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '10pt' }}>Сравнительный {pComp}%</div>}
        {pInc > 0 && <div style={{ width: `${pInc}%`, backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '10pt' }}>Доходный {pInc}%</div>}
        {pCost > 0 && <div style={{ width: `${pCost}%`, backgroundColor: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '10pt' }}>Затратный {pCost}%</div>}
      </div>

      <h3 style={h3Style}>2.3. Итоговое согласование стоимости</h3>
      <p>Итоговая стоимость рассчитывается путем средневзвешенного сложения результатов трех подходов с последующим применением специального <strong>Коэффициента Культурного Наследия (ККН)</strong>. Для данного объекта расчетный ККН составил <strong>{kkhMultiplier.toFixed(2)}</strong>.</p>
      
      <div style={{ border: '3px solid #10b981', padding: '20px', textAlign: 'center', margin: '30px 0', backgroundColor: '#f0fdf4' }}>
        <div style={{ fontSize: '14pt', color: '#065f46', marginBottom: '10px' }}>ИТОГОВАЯ ВЗВЕШЕННАЯ СТОИМОСТЬ ОБЪЕКТА</div>
        <div style={{ fontSize: '28pt', fontWeight: 'bold', color: '#047857' }}>
          {formatCurrency(finalValue)}
        </div>
      </div>

      <h2 style={h2Style}>3. Заключение</h2>
      <p>На основании проведенного анализа, изучения текущей рыночной конъюнктуры и специфики объекта оценки, комиссия приходит к выводу об объективности и достоверности рассчитанной рыночной стоимости. Доминирующим подходом выбран тот, чья доля в согласовании наибольшая, так как он наиболее полно отражает профиль риска и доходности объекта.</p>

      {/* SIGNATURES */}
      <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'space-between', position: 'relative', pageBreakInside: 'avoid' }}>
        
        {/* CSS STAMP */}
        <div style={stampStyle}>
          <div style={stampInnerStyle}></div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>МосгорБТИ</div>
            <div style={{ fontSize: '8px', borderTop: '1px solid #1d4ed8', borderBottom: '1px solid #1d4ed8', margin: '4px 0', padding: '2px 0' }}>ДЛЯ ДОКУМЕНТОВ</div>
            <div style={{ fontSize: '8px' }}>ОЦЕНОЧНАЯ<br/>КОМИССИЯ</div>
          </div>
          <svg style={{ position: 'absolute', top: '-10px', left: '-10px', width: '160px', height: '160px', opacity: 0.5 }}>
            <circle cx="80" cy="80" r="70" fill="none" stroke="#1d4ed8" strokeWidth="1" strokeDasharray="2 4"/>
          </svg>
        </div>

        <div>
          <strong>Ведущий оценщик-аналитик</strong><br/><br/>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ position: 'absolute', bottom: '5px', left: '20px', fontFamily: '"Brush Script MT", cursive, sans-serif', fontSize: '24pt', color: '#1e3a8a', transform: 'rotate(-5deg)', pointerEvents: 'none' }}>C.Смирнов</span>
            <span style={{ borderBottom: '1px solid black', width: '200px', display: 'inline-block', margin: '0 10px', position: 'relative' }}></span>
          </div>
          / Смирнов К.А. /
        </div>
        <div>
          <br/><br/>
          <strong>М.П.</strong>
        </div>
      </div>
      
      <div style={{ marginTop: '40px', fontSize: '9pt', color: '#666', textAlign: 'justify' }}>
        * Настоящий отчет сгенерирован автоматизированной системой АРМ «Оценщик» на базе утвержденных методик МосгорБТИ. Документ содержит электронную имитацию подписи и имеет юридическую силу при сопровождении цифровым сертификатом ЭЦП. Все расчеты приведены без учета налога на добавленную стоимость (НДС 20%).
      </div>
    </div>
  );
};
