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

const pageStyle = {
  backgroundColor: '#ffffff',
  width: '210mm',
  minHeight: '297mm',
  margin: '0 auto 30px auto',
  padding: '20mm',
  boxSizing: 'border-box' as const,
  boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  pageBreakAfter: 'always' as const,
  position: 'relative' as const,
  fontFamily: '"Times New Roman", Times, serif',
  color: '#000000',
  lineHeight: '1.3'
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

  const stampStyle: React.CSSProperties = {
    position: 'absolute',
    right: '50px',
    top: '-30px',
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
    pointerEvents: 'none',
    zIndex: 10
  };

  const stampInnerStyle: React.CSSProperties = {
    position: 'absolute',
    width: '120px',
    height: '120px',
    border: '1px solid #1d4ed8',
    borderRadius: '50%'
  };

  return (
    <div style={{ backgroundColor: '#525659', padding: '30px 0', minHeight: '100vh' }}>
      
      {/* ЛИСТ 1 */}
      <div style={pageStyle}>
        <div style={{ textAlign: 'right', fontSize: '11px', fontWeight: 'bold', marginBottom: '40px', lineHeight: '1.4' }}>
          УТВЕРЖДАЮ<br/>
          Руководитель Департамента<br/>
          оценки исторического наследия<br/>
          __________________ / Петров В.И. /<br/>
          «{new Date().toLocaleDateString()}»
        </div>

        <h1 style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>
          ОТЧЕТ ОБ ОЦЕНКЕ № МОС-863093
        </h1>
        <h2 style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'normal', marginBottom: '5px' }}>
          Объекта культурного наследия
        </h2>
        <h3 style={{ textAlign: 'center', fontSize: '16px', fontStyle: 'italic', marginBottom: '30px' }}>
          {okn?.name || 'Городская усадьба (наименование объекта)'}
        </h3>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px', fontSize: '12px' }}>
          <tbody>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px', width: '35%', fontWeight: 'bold', backgroundColor: '#f9fafb' }}>Адрес объекта оценки:</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{okn?.address || 'г. Москва, ул. Забелина, д. 3, стр. 2'}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold', backgroundColor: '#f9fafb' }}>Кадастровый номер:</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{okn?.cadastralNumber || okn?.cadastral_number || '77:01:0001034:1047'}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold', backgroundColor: '#f9fafb' }}>Охранный статус:</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{okn?.okn_category || 'Объект культурного наследия регионального значения'}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold', backgroundColor: '#f9fafb' }}>Заказчик оценки:</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>Правительство Москвы (МосгорБТИ)</td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid black', paddingBottom: '3px', marginBottom: '10px' }}>
          1. Нормативно-правовая база и стандарты оценки
        </h3>
        <p style={{ textAlign: 'justify', fontSize: '11px', textIndent: '20px', marginBottom: '20px' }}>
          Настоящий отчет составлен в строгом соответствии с требованиями Федерального закона от 29.07.1998 № 135-ФЗ «Об оценочной деятельности в Российской Федерации», а также Федеральными стандартами оценки (ФСО I, ФСО II, ФСО III, ФСО VI, ФСО №7). При определении рыночной стоимости учитывались уникальные ценообразующие факторы, обусловленные наличием охранных обязательств, техническим состоянием конструктивных элементов исторического здания и регламентами Правительства Москвы по использованию объектов культурного наследия.
        </p>

        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid black', paddingBottom: '3px', marginBottom: '10px' }}>
          2. Архитектурно-технические характеристики
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '11px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '6px', backgroundColor: '#f9fafb', textAlign: 'left', width: '40%' }}>Параметр</th>
              <th style={{ border: '1px solid black', padding: '6px', backgroundColor: '#f9fafb', textAlign: 'left' }}>Характеристика по данным технической инвентаризации</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ border: '1px solid black', padding: '6px', fontWeight: 'bold' }}>Материал капитальных стен</td><td style={{ border: '1px solid black', padding: '6px' }}>Кирпич исторической кладки, сложный раствор</td></tr>
            <tr><td style={{ border: '1px solid black', padding: '6px', fontWeight: 'bold' }}>Физический износ конструкций</td><td style={{ border: '1px solid black', padding: '6px' }}>По результатам инструментального контроля (см. Паспорт БТИ) - {okn?.wear_pct || okn?.metadata?.wear_pct || 35}%</td></tr>
            <tr><td style={{ border: '1px solid black', padding: '6px', fontWeight: 'bold' }}>Функциональное назначение</td><td style={{ border: '1px solid black', padding: '6px' }}>Административно-офисное (с ограничениями КГИОП)</td></tr>
          </tbody>
        </table>
        <div style={{ position: 'absolute', bottom: '20mm', width: '170mm', textAlign: 'center', fontSize: '10px', color: '#666' }}>Страница 1 из 2</div>
      </div>

      {/* ЛИСТ 2 */}
      <div style={pageStyle}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid black', paddingBottom: '3px', marginBottom: '15px' }}>
          3. Расчет рыночной стоимости (Синтез подходов)
        </h3>
        <p style={{ textAlign: 'justify', fontSize: '11px', textIndent: '20px', marginBottom: '15px' }}>
          Оценка проведена с применением трех классических подходов. Итоговые веса сбалансированы экспертно-аналитическим методом в зависимости от ликвидности объекта, полноты рыночной информации и специфики коммерческого использования исторической недвижимости.
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '25px', fontSize: '11px' }}>
          <thead>
            <tr>
              <th style={{ border: '2px solid black', borderRight: '1px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>Подход к оценке</th>
              <th style={{ border: '2px solid black', borderLeft: '1px solid black', borderRight: '1px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>Базовая стоимость (Без НДС)</th>
              <th style={{ border: '2px solid black', borderLeft: '1px solid black', borderRight: '1px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>Удельный вес</th>
              <th style={{ border: '2px solid black', borderLeft: '1px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>Взвешенный результат</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>Сравнительный подход<br/><span style={{fontSize: '9px', fontWeight: 'normal', color: '#444'}}>(Рыночная экстракция)</span></td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>{formatCurrency(safeComp)}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{pComp}%</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center', backgroundColor: '#fafafa' }}>{formatCurrency(safeComp * (pComp / 100))}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>Доходный подход<br/><span style={{fontSize: '9px', fontWeight: 'normal', color: '#444'}}>(Дисконтирование потоков)</span></td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>{formatCurrency(safeInc)}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{pInc}%</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center', backgroundColor: '#fafafa' }}>{formatCurrency(safeInc * (pInc / 100))}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>Затратный подход<br/><span style={{fontSize: '9px', fontWeight: 'normal', color: '#444'}}>(Стоимость замещения)</span></td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>{formatCurrency(safeCost)}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{pCost}%</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center', backgroundColor: '#fafafa' }}>{formatCurrency(safeCost * (pCost / 100))}</td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid black', paddingBottom: '3px', marginBottom: '15px' }}>
          4. Итоговое согласование стоимости
        </h3>
        <p style={{ textAlign: 'justify', fontSize: '11px', textIndent: '20px', marginBottom: '20px' }}>
          Итоговая стоимость рассчитывается путем средневзвешенного сложения результатов трех подходов с применением специализированного Коэффициента Культурного Наследия (ККН), отражающего инвестиционную привлекательность статуса объекта.
        </p>

        <div style={{ border: '3px double #000', padding: '20px', backgroundColor: '#fdfdfd', textAlign: 'center', margin: '0 auto 30px auto', width: '90%' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333', letterSpacing: '1px', marginBottom: '10px' }}>ИТОГОВАЯ ВЗВЕШЕННАЯ СТОИМОСТЬ ОБЪЕКТА</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#000' }}>{formatCurrency(finalValue)}</div>
        </div>

        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid black', paddingBottom: '3px', marginBottom: '10px' }}>
          5. Заключение
        </h3>
        <p style={{ textAlign: 'justify', fontSize: '11px', textIndent: '20px', marginBottom: '40px' }}>
          На основании проведенного анализа, изучения текущей рыночной конъюнктуры и специфики объекта оценки, комиссия приходит к выводу об объективности и достоверности рассчитанной рыночной стоимости. Все расчеты произведены без учета налога на добавленную стоимость (НДС).
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '30px' }}>
          <tbody>
            <tr>
              <td style={{ width: '40%', verticalAlign: 'bottom', fontSize: '12px', fontWeight: 'bold' }}>
                Ведущий оценщик-аналитик<br/><br/>
                ____________________ / Смирнов К.А. /
              </td>
              <td style={{ width: '60%', textAlign: 'right', verticalAlign: 'bottom' }}>
                <div style={{ display: 'inline-block', position: 'relative', width: '120px', height: '120px' }}>
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
                </div>
                <span style={{ fontSize: '12px', fontWeight: 'bold', marginLeft: '20px' }}>М.П.</span>
              </td>
            </tr>
          </tbody>
        </table>
        
        <p style={{ fontSize: '9px', color: '#777', fontStyle: 'italic', textAlign: 'justify', marginTop: '20px' }}>
          * Настоящий отчет сгенерирован автоматизированной системой АРМ «Оценщик» на базе утвержденных методик МосгорБТИ. Документ содержит завершенную имитацию оценки и имеет юридическую силу при сопровождении цифровым сертификатом ЭЦП.
        </p>
        <div style={{ position: 'absolute', bottom: '20mm', width: '170mm', textAlign: 'center', fontSize: '10px', color: '#666' }}>Страница 2 из 2</div>
      </div>
    </div>
  );
};
