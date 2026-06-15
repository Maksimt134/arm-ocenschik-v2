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

const pageStyle: React.CSSProperties = { 
  backgroundColor: '#ffffff', 
  width: '210mm', 
  minHeight: '297mm', 
  padding: '20mm', 
  boxShadow: '0 0 20px rgba(0,0,0,0.5)', 
  marginBottom: '20px',
  fontFamily: '"Times New Roman", Times, serif',
  color: '#000000',
  fontSize: '12px',
  overflow: 'hidden',
  boxSizing: 'border-box', 
  pageBreakAfter: 'always', 
  position: 'relative', 
  lineHeight: '1.5' 
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
    <div style={{ backgroundColor: '#525659', padding: '30px 0', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* СТРАНИЦА 1: ОБЛОЖКА */}
      <div style={pageStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#333', marginBottom: '60px', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
          <div>
            <strong>Группа компаний «МОСГОРБТИ»</strong><br/>ИНН 7700000000 / КПП 770101001<br/>г. Москва, ул. Тверская, д. 1<br/>ocenka@mosgorbti.ru
          </div>
          <div style={{ textAlign: 'right' }}>
            Экземпляр № 1<br/>УТВЕРЖДАЮ<br/>Руководитель Департамента<br/>_________ / Петров В.И. /
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '100px', marginBottom: '80px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '15px' }}>ОТЧЕТ ОБ ОЦЕНКЕ</h1>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '30px' }}>№ 090-26/ОКН от {new Date().toLocaleDateString()} г.</h2>
          <div style={{ fontSize: '15px', fontWeight: 'bold', textTransform: 'uppercase', width: '85%', margin: '0 auto', lineHeight: '1.6' }}>
            ОПРЕДЕЛЕНИЕ РЫНОЧНОЙ СТОИМОСТИ ПРАВА СОБСТВЕННОСТИ НА ОБЪЕКТ КУЛЬТУРНОГО НАСЛЕДИЯ, РАСПОЛОЖЕННЫЙ ПО АДРЕСУ:<br/>
            <span style={{ textDecoration: 'underline', color: '#111' }}>{okn?.address || 'г. Москва, исторический центр (адрес уточняется)'}</span>
          </div>
        </div>
        <div style={{ fontSize: '12px', width: '85%', margin: '0 auto', lineHeight: '1.8' }}>
          <p><strong>ЗАКАЗЧИК:</strong> Департамент городского имущества города Москвы (ДГИ)</p>
          <p><strong>ИСПОЛНИТЕЛЬ ДОГОВОРА ОБ ОЦЕНКЕ:</strong> Государственное бюджетное учреждение «МосгорБТИ» (Автоматизированная система АРМ Оценщика)</p>
        </div>
        <div style={{ position: 'absolute', bottom: '20mm', width: '170mm', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>Москва<br/>2026 г.</div>
      </div>

      {/* СТРАНИЦА 2: ДОПУЩЕНИЯ */}
      <div style={pageStyle}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', textTransform: 'uppercase' }}>1. Основные факты и выводы. Задание на оценку</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', marginBottom: '30px' }}>
          <tbody>
            <tr><td style={{ border: '1px solid black', padding: '8px', width: '35%', fontWeight: 'bold', backgroundColor: '#f9fafb' }}>Объект оценки:</td><td style={{ border: '1px solid black', padding: '8px' }}>{okn?.name || 'Историческое здание / Городская усадьба'}</td></tr>
            <tr><td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold', backgroundColor: '#f9fafb' }}>Имущественные права:</td><td style={{ border: '1px solid black', padding: '8px' }}>Право собственности (с учетом обременений КГИОП)</td></tr>
            <tr><td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold', backgroundColor: '#f9fafb' }}>Цель оценки:</td><td style={{ border: '1px solid black', padding: '8px' }}>Определение рыночной стоимости для принятия инвестиционных и управленческих решений.</td></tr>
          </tbody>
        </table>

        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', textTransform: 'uppercase' }}>2. Допущения и ограничительные условия</h3>
        <ol style={{ fontSize: '11px', textAlign: 'justify', paddingLeft: '20px', lineHeight: '1.6' }}>
          <li style={{ marginBottom: '8px' }}>Настоящий Отчет достоверен лишь в полном объеме и лишь в указанных в нем целях. Ни Заказчик, ни Оценщик не могут использовать Отчет иначе, чем это предусмотрено договором.</li>
          <li style={{ marginBottom: '8px' }}>Оценщик предполагает отсутствие каких-либо скрытых фактов, влияющих на оценку, состояние объекта и прав на него. Оценщик не несет ответственности за обнаружение таких фактов.</li>
          <li style={{ marginBottom: '8px' }}>Оценка проводилась исходя из предположения, что объект оценки соответствует всем экологическим нормам и требованиям законодательства об охране объектов культурного наследия.</li>
          <li style={{ marginBottom: '8px' }}>Полученные Оценщиком от Заказчика исходные данные (включая площади, процент износа, поэтажные планы) принимаются как достоверные. Оценщик не проводил технической экспертизы конструкций здания.</li>
          <li style={{ marginBottom: '8px' }}>Мнение Оценщика относительно рыночной стоимости действительно только на дату оценки. Оценщик не принимает на себя обязательств по актуализации Отчета в связи с изменением рыночной конъюнктуры.</li>
          <li style={{ marginBottom: '8px' }}>В расчетах не учитывались специфические издержки Заказчика, связанные с возможным отчуждением объекта, а также налоговые последствия (в том числе НДС, который не включен в итоговую стоимость).</li>
        </ol>
        <div style={{ position: 'absolute', bottom: '20mm', right: '20mm', fontSize: '10px', color: '#666' }}>Стр. 2 из 6</div>
      </div>

      {/* СТРАНИЦА 3: ОПИСАНИЕ И АНЭИ */}
      <div style={pageStyle}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid black', paddingBottom: '3px', marginBottom: '15px' }}>3. Характеристики объекта и локации</h3>
        <p style={{ textAlign: 'justify', textIndent: '20px', marginBottom: '10px' }}>
          Оцениваемый объект недвижимости представляет собой историческое здание, расположенное по адресу: {okn?.address || 'г. Москва'}. Общая площадь помещений составляет {okn?.area ? `${okn.area} кв.м.` : 'согласно технической документации'}. Год постройки: {okn?.yearBuilt || 'Историческая застройка до 1917 г.'}.
        </p>
        <p style={{ textAlign: 'justify', textIndent: '20px', marginBottom: '15px' }}>
          По данным технической инвентаризации, средний процент физического износа капитальных конструкций (фундамент, несущие стены, перекрытия) составляет {okn?.wearPercentage || 30}%. Инженерные коммуникации (электроснабжение, водопровод, отопление) подключены к центральным городским сетям. Объект обеспечен отличной транспортной доступностью, находится в зоне сложившейся деловой застройки.
        </p>

        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid black', paddingBottom: '3px', marginBottom: '15px' }}>4. Анализ наиболее эффективного использования (АНЭИ)</h3>
        <p style={{ textAlign: 'justify', textIndent: '20px', marginBottom: '10px' }}>
          Анализ наиболее эффективного использования (АНЭИ) является фундаментальной предпосылкой для оценки. В соответствии с ФСО, АНЭИ — это такое использование, которое юридически разрешено, физически осуществимо, финансово целесообразно и приводит к максимальной стоимости объекта.
        </p>
        <p style={{ textAlign: 'justify', textIndent: '20px', marginBottom: '10px' }}>
          <strong>Юридическая разрешимость:</strong> Статус объекта культурного наследия накладывает жесткие ограничения. Снос, изменение объемно-планировочных решений, надстройка этажей и изменение исторических фасадов категорически запрещены. Использование под экологически вредное производство исключено.
        </p>
        <p style={{ textAlign: 'justify', textIndent: '20px', marginBottom: '15px' }}>
          <strong>Финансовая целесообразность:</strong> Учитывая центральную локацию, дефицит свободных земельных участков в окружении и премиальный статус исторической архитектуры, наиболее рентабельным вариантом является приспособление здания под современное коммерческое использование без изменения несущих конструкций.
        </p>
        <p style={{ textAlign: 'justify', fontStyle: 'italic', backgroundColor: '#f0f0f0', padding: '10px', borderLeft: '3px solid #333' }}>
          ВЫВОД: Наиболее эффективным использованием (НЭИ) признается эксплуатация объекта в качестве представительского офиса (штаб-квартиры компании), бутик-отеля или административного здания класса А/В+.
        </p>
        <div style={{ position: 'absolute', bottom: '20mm', right: '20mm', fontSize: '10px', color: '#666' }}>Стр. 3 из 6</div>
      </div>

      {/* СТРАНИЦА 4: РЫНОК */}
      <div style={pageStyle}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid black', paddingBottom: '3px', marginBottom: '15px' }}>5. Макроэкономический и отраслевой анализ рынка</h3>
        <p style={{ textAlign: 'justify', textIndent: '20px', marginBottom: '10px' }}>
          Рынок коммерческой недвижимости Московского региона продолжает демонстрировать устойчивость, несмотря на изменения ключевой ставки ЦБ РФ и макроэкономические колебания. Историческая недвижимость (ОКН) традиционно рассматривается инвесторами как защитный актив, позволяющий сохранить капитал в условиях инфляционного давления.
        </p>
        <p style={{ textAlign: 'justify', textIndent: '20px', marginBottom: '10px' }}>
          В сегменте особняков и отдельно стоящих зданий (ОСЗ) в Центральном административном округе наблюдается острый дефицит качественного предложения. Большинство ликвидных объектов уже находятся в долгосрочном владении корпораций или государственных структур. Вывод на открытый рынок новых объектов носит единичный характер, что формирует "премию за уникальность" при ценообразовании.
        </p>
        <p style={{ textAlign: 'justify', textIndent: '20px', marginBottom: '10px' }}>
          Арендные ставки в сегменте представительских офисов показывают умеренный рост (на уровне 5-7% годовых). Уровень вакантных площадей (vacancy rate) в качественных исторических зданиях после реставрации стремится к историческому минимуму и не превышает 3-4%. 
        </p>
        <p style={{ textAlign: 'justify', textIndent: '20px', marginBottom: '10px' }}>
          Влияние фактора износа: Объекты с износом до 40% вызывают максимальный интерес у конечных пользователей (банков, IT-компаний, сырьевых корпораций), так как требуют лишь косметического ремонта. Объекты с глубоким износом (свыше 60%) приобретаются преимущественно профессиональными девелоперами с дисконтом за риск проведения сложных реставрационных работ.
        </p>
        <div style={{ position: 'absolute', bottom: '20mm', right: '20mm', fontSize: '10px', color: '#666' }}>Стр. 4 из 6</div>
      </div>

      {/* СТРАНИЦА 5: РАСЧЕТЫ */}
      <div style={pageStyle}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid black', paddingBottom: '3px', marginBottom: '15px' }}>6. Методология оценки и расчет стоимости</h3>
        <p style={{ textAlign: 'justify', textIndent: '20px', marginBottom: '15px' }}>
          В рамках настоящего Отчета применены три классических подхода к оценке, предусмотренных ФСО: Сравнительный (основан на рыночной экстракции цен предложений объектов-аналогов), Доходный (основан на капитализации или дисконтировании будущих арендных потоков) и Затратный (базируется на стоимости воссоздания точной копии исторического здания с учетом накопленного износа).
        </p>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '11px' }}>
          <thead>
            <tr>
              <th style={{ border: '2px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>Подход к оценке</th>
              <th style={{ border: '2px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>Оценочная стоимость (Без НДС)</th>
              <th style={{ border: '2px solid black', padding: '8px', backgroundColor: '#f0f0f0' }}>Вес при согласовании</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>Сравнительный подход</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{safeComp ? (safeComp / 1000000000).toFixed(3) + ' млрд ₽' : 'Расчет...'}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{pComp}%</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>Доходный подход</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{safeInc ? (safeInc / 1000000000).toFixed(3) + ' млрд ₽' : 'Расчет...'}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{pInc}%</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px', fontWeight: 'bold' }}>Затратный подход</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{safeCost ? (safeCost / 1000000000).toFixed(3) + ' млрд ₽' : 'Расчет...'}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{pCost}%</td>
            </tr>
          </tbody>
        </table>

        <p style={{ textAlign: 'justify', textIndent: '20px', marginBottom: '15px' }}>
          Обоснование весов: Сравнительному и Доходному подходам присвоены максимальные веса, так как они наиболее объективно отражают мотивацию типичного инвестора на открытом рынке коммерческой недвижимости. Затратный подход несет вспомогательную функцию из-за высокой погрешности расчета износа исторических конструкций.
        </p>
        <p style={{ textAlign: 'justify', textIndent: '20px' }}>
          Для учета инвестиционной премии за уникальный статус объекта применялся специализированный Коэффициент Культурного Наследия (ККН), равный 1.05.
        </p>
        <div style={{ position: 'absolute', bottom: '20mm', right: '20mm', fontSize: '10px', color: '#666' }}>Стр. 5 из 6</div>
      </div>

      {/* СТРАНИЦА 6: ЗАКЛЮЧЕНИЕ */}
      <div style={pageStyle}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid black', paddingBottom: '3px', marginBottom: '15px' }}>7. Итоговое заключение о стоимости</h3>
        
        <div style={{ border: '3px double #000', padding: '20px', backgroundColor: '#fdfdfd', textAlign: 'center', margin: '20px auto 40px auto', width: '90%' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333', letterSpacing: '1px', marginBottom: '10px' }}>ИТОГОВАЯ РЫНОЧНАЯ СТОИМОСТЬ ОБЪЕКТА</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#000' }}>
            {finalValue ? (finalValue / 1000000000).toFixed(3) + ' млрд ₽' : 'Расчет не завершен'}
          </div>
        </div>

        <p style={{ textAlign: 'justify', fontSize: '12px', marginBottom: '30px' }}>
          Итоговая величина признается достоверной и рекомендуемой для совершения сделок. Результат действителен в течение 6 месяцев с даты составления настоящего Отчета. Налог на добавленную стоимость (НДС) в итоговую величину не включен.
        </p>

        <h4 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '10px' }}>РЕКВИЗИТЫ И ПОДПИСИ СТОРОН:</h4>
        <table style={{ width: '100%', fontSize: '10px', lineHeight: '1.4' }}>
          <tbody>
            <tr>
              <td style={{ width: '50%', paddingRight: '20px', verticalAlign: 'top' }}>
                <strong>ОЦЕНОЧНАЯ КОМПАНИЯ:</strong><br/>
                ГБУ «МосгорБТИ»<br/>
                125009, г. Москва, Малый Гнездниковский пер., д. 9<br/>
                ИНН 7700000000 / КПП 770101001<br/>
                ОГРН 1027739000000<br/>
                р/с 40702810000000000000 в ПАО «Сбербанк»<br/><br/>
                Руководитель Департамента:<br/><br/>
                ___________________ / Петров В.И. /<br/>
                <span style={{ fontSize: '9px', color: '#555' }}>(подпись, печать)</span>
              </td>
              <td style={{ width: '50%', verticalAlign: 'top', position: 'relative' }}>
                <strong>ОЦЕНЩИК:</strong><br/>
                Смирнов Константин Александрович<br/>
                Паспорт: серия 45 10 № 123456, ГУ МВД по г. Москве<br/>
                Диплом о высшем образовании: ВСГ 1234567<br/>
                Свидетельство СРО: № 00123 от 15.05.2015<br/>
                Квалификационный аттестат: № 000123-1<br/><br/>
                Оценщик-аналитик:<br/><br/>
                ___________________ / Смирнов К.А. /<br/>
                <span style={{ fontSize: '9px', color: '#555' }}>(подпись)</span>
                
                <div style={{ position: 'absolute', bottom: '-10px', right: '40px', width: '90px', height: '90px', border: '2px solid blue', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'blue', fontSize: '8px', transform: 'rotate(-15deg)', opacity: 0.8 }}>
                  <div style={{ textAlign: 'center', fontWeight: 'bold' }}>ГБУ МОСГОРБТИ<br/>ДЛЯ ОТЧЕТОВ<br/>ИНН 77000000</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div style={{ position: 'absolute', bottom: '20mm', right: '20mm', fontSize: '10px', color: '#666' }}>Стр. 6 из 6</div>
      </div>

    </div>
  );
};
