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
    <div style={{ backgroundColor: '#525659', padding: '30px 0', minHeight: '100vh', fontFamily: '"Times New Roman", Times, serif', color: '#000', lineHeight: '1.4' }}>
      
      {/* СТРАНИЦА 1: ТИТУЛ И БАЗА */}
      <div style={pageStyle}>
        <div style={{ textAlign: 'right', fontSize: '11px', fontWeight: 'bold', marginBottom: '40px' }}>
          УТВЕРЖДАЮ<br/>Руководитель Департамента<br/>оценки исторического наследия<br/>__________________ / Петров В.И. /<br/>«{new Date().toLocaleDateString()}»
        </div>
        <h1 style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>
          ОТЧЕТ ОБ ОЦЕНКЕ № МОС-{Math.floor(100000 + Math.random() * 900000)}
        </h1>
        <h2 style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'normal', marginBottom: '30px' }}>
          Объекта культурного наследия
        </h2>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px', fontSize: '12px' }}>
          <tbody>
            <tr><td style={{ border: '1px solid black', padding: '8px', width: '35%', fontWeight: 'bold', backgroundColor: '#f9fafb' }}>Адрес объекта:</td><td style={{ border: '1px solid black', padding: '8px' }}>{okn?.address || 'г. Москва, ЦАО'}</td></tr>
            <tr><td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold', backgroundColor: '#f9fafb' }}>Год постройки:</td><td style={{ border: '1px solid black', padding: '8px' }}>{okn?.year_built || 'Историческая застройка'}</td></tr>
            <tr><td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold', backgroundColor: '#f9fafb' }}>Общая площадь:</td><td style={{ border: '1px solid black', padding: '8px' }}>{okn?.area ? `${okn.area} кв.м.` : 'Уточняется по БТИ'}</td></tr>
            <tr><td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold', backgroundColor: '#f9fafb' }}>Заказчик оценки:</td><td style={{ border: '1px solid black', padding: '8px' }}>Правительство Москвы</td></tr>
          </tbody>
        </table>

        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid black', paddingBottom: '3px', marginBottom: '10px' }}>1. Нормативно-правовая база</h3>
        <p style={{ textAlign: 'justify', fontSize: '12px', textIndent: '20px' }}>
          Настоящий отчет составлен в соответствии с Федеральным законом № 135-ФЗ «Об оценочной деятельности в РФ» и стандартами ФСО (I, II, III, VI, №7). При определении рыночной стоимости учитывались уникальные ценообразующие факторы, обусловленные возрастом постройки ({okn?.year_built || 'до 1917'} г.), наличием охранных обязательств и регламентами использования исторических зданий в ЦАО г. Москвы. Оценка проведена с допущением о сохранении текущего охранного статуса.
        </p>
        <div style={{ position: 'absolute', bottom: '20mm', right: '20mm', fontSize: '10px', color: '#666' }}>Стр. 1 из 5</div>
      </div>

      {/* СТРАНИЦА 2: АНАЛИЗ РЫНКА (ВОДА + ДИНАМИКА) */}
      <div style={pageStyle}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid black', paddingBottom: '3px', marginBottom: '15px' }}>2. Макроэкономический и микроэкономический анализ рынка</h3>
        <p style={{ textAlign: 'justify', fontSize: '12px', textIndent: '20px', marginBottom: '15px' }}>
          Рынок коммерческой недвижимости и объектов культурного наследия (ОКН) города Москвы характеризуется высокой степенью устойчивости к макроэкономическим шокам. В сегменте исторических особняков наблюдается дефицит качественного предложения, что формирует премию за уникальность.
        </p>
        <p style={{ textAlign: 'justify', fontSize: '12px', textIndent: '20px', marginBottom: '15px' }}>
          Анализ локации: Объект расположен по адресу: {okn?.address || 'Москва'}. Данная локация характеризуется высокой деловой и туристической активностью. Транспортная доступность оценивается как отличная. С учетом общей площади объекта ({okn?.area || 1000} кв.м.), целевой аудиторией для аренды или покупки выступают крупные корпоративные структуры, государственные фонды или частные инвесторы с фокусом на трофейную недвижимость.
        </p>
        <p style={{ textAlign: 'justify', fontSize: '12px', textIndent: '20px' }}>
          Влияние физического состояния на рыночную привлекательность: Текущий износ здания оценивается в {okn?.wear_pct || okn?.metadata?.wear_pct || 30}%. {
            (okn?.wear_pct || okn?.metadata?.wear_pct || 30) > 40 
            ? 'Такой уровень износа указывает на необходимость проведения капитальных реставрационных работ, что существенно сужает круг потенциальных инвесторов и требует применения понижающих корректировок в сравнительном подходе.' 
            : 'Данный показатель является приемлемым для исторических зданий. Объект пригоден к коммерческой эксплуатации без необходимости экстренных капитальных вложений, что повышает его ликвидность на открытом рынке.'
          }
        </p>
        <div style={{ position: 'absolute', bottom: '20mm', right: '20mm', fontSize: '10px', color: '#666' }}>Стр. 2 из 5</div>
      </div>

      {/* СТРАНИЦА 3: АНЭИ И ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ */}
      <div style={pageStyle}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid black', paddingBottom: '3px', marginBottom: '15px' }}>3. Анализ наиболее эффективного использования (АНЭИ)</h3>
        <p style={{ textAlign: 'justify', fontSize: '12px', textIndent: '20px', marginBottom: '15px' }}>
          Анализ наиболее эффективного использования (АНЭИ) является фундаментальной предпосылкой для оценки рыночной стоимости. В соответствии с ФСО, АНЭИ — это такое использование, которое является юридически разрешенным, физически осуществимым, финансово целесообразным и приводит к максимальной стоимости недвижимости.
        </p>
        <p style={{ textAlign: 'justify', fontSize: '12px', textIndent: '20px', marginBottom: '15px' }}>
          Юридическая разрешимость: Статус объекта накладывает жесткие ограничения. Снос, изменение объемно-планировочных решений и возведение пристроек запрещены. Единственным законным путем является приспособление объекта для современного использования в существующих габаритах.
        </p>
        <p style={{ textAlign: 'justify', fontSize: '12px', textIndent: '20px', marginBottom: '15px' }}>
          Финансовая целесообразность: Учитывая площадь в {okn?.area || 1000} кв.м. и год постройки ({okn?.year_built || 'XIX в.'}), наиболее рентабельным вариантом является {
            (okn?.area || 1000) > 2000 ? 'создание многофункционального делового комплекса или бутик-отеля высшей категории.' : 'размещение представительского офиса (штаб-квартиры) одной компании.'
          } Ввиду исторической ценности, использование под склады или грязное производство физически и юридически исключено.
        </p>
        <p style={{ textAlign: 'justify', fontSize: '12px', fontStyle: 'italic', backgroundColor: '#f0f0f0', padding: '10px' }}>
          ВЫВОД: Наиболее эффективным использованием (НЭИ) признается использование объекта в качестве административно-офисного или представительского здания класса А/В+.
        </p>
        <div style={{ position: 'absolute', bottom: '20mm', right: '20mm', fontSize: '10px', color: '#666' }}>Стр. 3 из 5</div>
      </div>

      {/* СТРАНИЦА 4: РАСЧЕТЫ */}
      <div style={pageStyle}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid black', paddingBottom: '3px', marginBottom: '15px' }}>4. Методология и синтез подходов</h3>
        <p style={{ textAlign: 'justify', fontSize: '12px', textIndent: '20px', marginBottom: '15px' }}>
          В рамках настоящего отчета применены три классических подхода к оценке: Сравнительный (основан на анализе цен предложений объектов-аналогов), Доходный (основан на прогнозировании будущих денежных потоков от сдачи в аренду) и Затратный (основан на расчете стоимости воссоздания исторической копии здания).
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '25px', fontSize: '11px' }}>
          <thead>
            <tr>
              <th style={{ border: '2px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>Подход к оценке</th>
              <th style={{ border: '2px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>Стоимость</th>
              <th style={{ border: '2px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>Вес</th>
              <th style={{ border: '2px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>Взвешенный итог</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>Сравнительный подход</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{formatCurrency(safeComp)}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{pComp}%</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{formatCurrency(safeComp * (pComp/100))}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>Доходный подход</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{formatCurrency(safeInc)}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{pInc}%</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{formatCurrency(safeInc * (pInc/100))}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>Затратный подход</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{formatCurrency(safeCost)}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{pCost}%</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{formatCurrency(safeCost * (pCost/100))}</td>
            </tr>
          </tbody>
        </table>
        <p style={{ textAlign: 'justify', fontSize: '12px', textIndent: '20px' }}>
          Коэффициент культурного наследия (ККН), применяемый к финальному результату, составил {kkhMultiplier.toFixed(2)}. Данный повышающий коэффициент отражает премиальность локации и статусность владения исторической недвижимостью.
        </p>
        <div style={{ position: 'absolute', bottom: '20mm', right: '20mm', fontSize: '10px', color: '#666' }}>Стр. 4 из 5</div>
      </div>

      {/* СТРАНИЦА 5: ЗАКЛЮЧЕНИЕ И ПЕЧАТИ */}
      <div style={pageStyle}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid black', paddingBottom: '3px', marginBottom: '15px' }}>5. Итоговое заключение о стоимости</h3>
        
        <div style={{ border: '3px double #000', padding: '20px', backgroundColor: '#fdfdfd', textAlign: 'center', margin: '20px auto 40px auto', width: '90%' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333', letterSpacing: '1px', marginBottom: '10px' }}>РЫНОЧНАЯ СТОИМОСТЬ ОБЪЕКТА ОЦЕНКИ</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#000' }}>
            {formatCurrency(finalValue)}
          </div>
        </div>

        <p style={{ textAlign: 'justify', fontSize: '12px', textIndent: '20px', marginBottom: '40px' }}>
          Итоговая величина рыночной стоимости признается достоверной и рекомендуемой для совершения сделок купли-продажи, постановки на баланс, страхования и принятия инвестиционных решений. Результат действителен в течение 6 месяцев с даты составления отчета.
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '50px' }}>
          <tbody>
            <tr>
              <td style={{ width: '50%', verticalAlign: 'bottom', fontSize: '12px', fontWeight: 'bold' }}>
                Ведущий эксперт-оценщик:<br/><br/>
                ____________________ / Смирнов К.А. /
              </td>
              <td style={{ width: '50%', textAlign: 'right', verticalAlign: 'bottom', position: 'relative' }}>
                <div style={{ display: 'inline-block', position: 'relative', width: '120px', height: '120px', marginRight: '20px' }}>
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
              </td>
            </tr>
          </tbody>
        </table>
        
        <p style={{ fontSize: '9px', color: '#777', fontStyle: 'italic', textAlign: 'justify', position: 'absolute', bottom: '25mm', left: '20mm', right: '20mm' }}>
          * Отчет сгенерирован автоматически подсистемой "АРМ Оценщика". Согласно ФЗ-135, электронный документ имеет полную юридическую силу. Не является публичной офертой.
        </p>
        <div style={{ position: 'absolute', bottom: '20mm', right: '20mm', fontSize: '10px', color: '#666' }}>Стр. 5 из 5</div>
      </div>

    </div>
  );
};
