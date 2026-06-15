import React from 'react';

const pageStyle = {
  backgroundColor: '#ffffff',
  width: '210mm',
  minHeight: '297mm',
  margin: '0 auto 30px auto',
  padding: '20mm',
  boxSizing: 'border-box' as const,
  boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  pageBreakAfter: 'always' as const,
  position: 'relative' as const
};

interface BtiPassportReportProps {
  okn: any;
  details: any;
  uchetNum: string;
  cadastral: string;
  address: string;
}

export const BtiPassportReport: React.FC<BtiPassportReportProps> = ({
  okn,
  details,
  uchetNum,
  cadastral,
  address
}) => {
  const currentDate = new Date().toLocaleDateString('ru-RU');
  // Fallback to local image if blueprintDataUrl is not provided via props (since it's not in the interface)
  const blueprintDataUrl = "/images/bti_floor_plan.png";

  return (
    <div style={{ backgroundColor: '#525659', padding: '30px 0', minHeight: '100vh', fontFamily: '"Times New Roman", Times, serif', fontSize: '13px', lineHeight: '1.4', color: '#000' }}>
      
      {/* ЛИСТ 1 */}
      <div style={pageStyle}>
        {/* ОФИЦИАЛЬНАЯ ШАПКА */}
        <div style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>
          <div style={{ fontSize: '16px' }}>РОССИЙСКАЯ ФЕДЕРАЦИЯ</div>
          <div style={{ fontSize: '16px' }}>ПРАВИТЕЛЬСТВО МОСКВЫ</div>
          <div style={{ fontSize: '18px', textDecoration: 'underline', marginTop: '5px' }}>ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ УЧРЕЖДЕНИЕ "МОСГОРБТИ"</div>
          <div style={{ fontSize: '14px', marginTop: '10px', fontWeight: 'normal' }}>Фонд технической документации г. Москвы. / Учетное дело № ОКН-48-233 / Сектор государственной оценки</div>
        </div>

        <h1 style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '2px', margin: '20px 0 5px 0' }}>ТЕХНИЧЕСКИЙ ПАСПОРТ</h1>
        <p style={{ textAlign: 'center', fontSize: '16px', marginBottom: '30px' }}>на здание (строение), объект культурного наследия</p>

        {/* ТАБЛИЦА 1: РЕКВИЗИТЫ И РЕГИСТРАЦИЯ */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px', fontSize: '15px' }}>
          <tbody>
            <tr>
              <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold', width: '35%' }}>Инвентарный номер (учетный)</td>
              <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{uchetNum || 'ИНВ-29402/ОКН'}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold' }}>Кадастровый номер</td>
              <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{cadastral || okn?.cadastralNumber || '77:01:0001068:1019'}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold' }}>Статус ОКН</td>
              <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Объект культурного наследия федерального значения (на основании Постановления Правительства РФ № 1210-р от 05.10.1995 г.)</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold' }}>Дата внесения в Реестр</td>
              <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>12.11.1995 г. / Регистрационный № 771510001068</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold' }}>Охранное обязательство</td>
              <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>№ ОКН-77/001019-15 от 20.03.2015 г. (выдано Департаментом культурного наследия г. Москвы)</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold' }}>Адрес (местоположение)</td>
              <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{address || okn?.address || 'г. Москва'}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold' }}>Выдан</td>
              <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Государственному бюджетному учреждению культуры города Москвы</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold' }}>Взамен</td>
              <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Технического паспорта от 12.05.2014 г.</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '10px', fontWeight: 'bold' }}>Цель составления / Исполнитель</td>
              <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Актуализация ТЭП для Цифрового паспорта ОКН / Кадастровый инженер Смирнов К.А.</td>
            </tr>
          </tbody>
        </table>

        {/* ТАБЛИЦА 2: АРХИТЕКТУРНЫЕ ПОКАЗАТЕЛИ */}
        <h3 style={{ textAlign: 'center', fontSize: '18px', marginBottom: '15px' }}>I. Архитектурно-планировочные и эксплуатационные показатели</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px', fontSize: '15px' }}>
          <tbody>
            <tr>
              <td style={{ border: '1px solid black', padding: '10px' }}>Год постройки</td>
              <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>{details?.year || okn?.yearBuilt || '1969'}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '10px' }}>Общая площадь (кв. м)</td>
              <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{details?.area || okn?.area || '15400'}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '10px' }}>Материал наружных стен</td>
              <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Кирпич</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '10px' }}>Перекрытия</td>
              <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Железобетонные (смешанные)</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '10px' }}>Фундамент</td>
              <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Ленточный, бутобетонный</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '10px' }}>Тип кровли</td>
              <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>Скатная, металлическая фальцевая</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '10px' }}>Процент физического износа</td>
              <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center', color: '#dc2626', fontWeight: 'bold' }}>{okn?.wear_pct || okn?.wearPercentage || 61}%</td>
            </tr>
          </tbody>
        </table>

        <p style={{ fontSize: '13px', fontFamily: '"Times New Roman", Times, serif', textAlign: 'justify', marginBottom: '30px', lineHeight: '1.4' }}>
          Настоящий документ является результатом комплексного технического обследования объекта, проведенного с целью актуализации технико-экономических показателей и формирования Цифрового паспорта в соответствии с требованиями Постановления Правительства Москвы № 475-ПП. Выписка содержит актуализированные данные по состоянию на 01.06.2026 г., включая сведения об архитектурно-планировочных решениях, технических характеристиках основных конструктивных элементов, а также сведения о наличии и составе охранных ограничений, зарегистрированных в Едином государственном реестре объектов культурного наследия народов Российской Федерации. Графические материалы (чертежи) не являются окончательным документом для отвода земельных участков и требуют дополнительного согласования при проведении реставрационных работ.
        </p>
      </div>

      {/* ЛИСТ 2 */}
      <div style={pageStyle}>
        {/* ЧЕРТЕЖ И ПОДПИСИ */}
        <h3 style={{ textAlign: 'center', fontSize: '18px', marginBottom: '15px' }}>II. Поэтажный план объекта (экспликация)</h3>
        <div style={{ border: '2px solid #000000', padding: '5px', backgroundColor: '#ffffff', marginBottom: '15px' }}>
          <img src={blueprintDataUrl} alt="Архитектурный чертеж фасада и планов ГБУ МосгорБТИ" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
        <p style={{ textAlign: 'center', fontStyle: 'italic', fontSize: '11px', marginTop: '5px', marginBottom: '25px', color: '#333333' }}>
          * Архитектурно-строительный чертеж: Главный северный фасад (North Elevation) и план первого этажа (Ground Floor Plan). Масштаб 1:200. Лист БП-012. Утверждено Техническим управлением МосгорБТИ.
        </p>
      </div>

      {/* ЛИСТ 3 */}
      <div style={pageStyle}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '25px', marginBottom: '10px', borderBottom: '1px solid #000', paddingBottom: '3px' }}>II-А. Ведомость (экспликация) помещений первого этажа</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '25px', fontSize: '11px', fontFamily: 'Arial, sans-serif' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f4f7', textAlign: 'center', fontWeight: 'bold' }}>
              <th style={{ border: '1px solid black', padding: '5px', width: '8%' }}>№ пом.</th>
              <th style={{ border: '1px solid black', padding: '5px', width: '45%' }}>Наименование части помещения, назначение и внутренний функционал</th>
              <th style={{ border: '1px solid black', padding: '5px', width: '15%' }}>Категория доступа</th>
              <th style={{ border: '1px solid black', padding: '5px', width: '17%' }}>Высота потолков (м)</th>
              <th style={{ border: '1px solid black', padding: '5px', width: '15%' }}>Площадь (кв. м)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>101</td>
              <td style={{ border: '1px solid black', padding: '5px' }}><strong>ENTRANCE HALL & VESTIBULE</strong> — Главный вестибюль, распределительный холл центрального входа с парадным порталом (Grand Portico)</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>Общий доступ</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>4.50 м</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>245.0</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>102</td>
              <td style={{ border: '1px solid black', padding: '5px' }}><strong>CENTRAL ATRIUM</strong> — Центральный световой атриум со сквозным зенитным фонарем купольной ротонды и главной парадной лестницей (Main Staircase)</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>Общий доступ</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>14.20 м</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>612.5</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>103</td>
              <td style={{ border: '1px solid black', padding: '5px' }}><strong>PUBLIC GALLERY (Left Wing)</strong> — Публичные выставочные галереи левого крыла, анфиладная планировка, исторические интерьеры</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>Выставочная</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>4.20 м</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>480.0</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>104</td>
              <td style={{ border: '1px solid black', padding: '5px' }}><strong>READING ROOMS</strong> — Пространства читальных залов, библиотечные фонды открытого типа, реставрированная лепнина</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>Специальная</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>4.20 м</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>310.0</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>105</td>
              <td style={{ border: '1px solid black', padding: '5px' }}><strong>ARCHIVE</strong> — Сектор архивного хранения технической и проектной документации повышенной секретности</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>Ограниченный доступ</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>3.80 м</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>195.0</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>106</td>
              <td style={{ border: '1px solid black', padding: '5px' }}><strong>ADMINISTRATIVE OFFICES</strong> — Рабочие кабинеты руководства, административного аппарата и сопутствующие офисные ячейки (Right Wing)</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>Служебная зона</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>3.60 м</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>540.0</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>107</td>
              <td style={{ border: '1px solid black', padding: '5px' }}><strong>COURTYARD</strong> — Внутренний открытый хозяйственный и рекреационный двор здания (замощение гранитным брусчатым камнем)</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>Техническая</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>—</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>820.0</td>
            </tr>
            <tr style={{ fontWeight: 'bold', backgroundColor: '#f9fafb' }}>
              <td colSpan={4} style={{ border: '1px solid black', padding: '6px', textAlign: 'right' }}>ИТОГО ПО ПЕРВОМУ ЭТАЖУ ОБЪЕКТА (полезная площадь):</td>
              <td style={{ border: '1px solid black', padding: '6px', textAlign: 'center' }}>3202.5 кв.м</td>
            </tr>
          </tbody>
        </table>

        {/* ДОБАВЛЕНИЕ НОВОГО МАССИВНОГО РАЗДЕЛА III (Техническое описание) */}
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '25px', marginBottom: '10px', borderBottom: '1px solid #000', paddingBottom: '3px' }}>III. Техническое описание конструктивных элементов и систем здания</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <th style={{ border: '1px solid black', padding: '6px', width: '30%', fontWeight: 'bold', textAlign: 'left' }}>Конструктивный элемент</th>
              <th style={{ border: '1px solid black', padding: '6px', fontWeight: 'bold', textAlign: 'left' }}>Техническое описание, материал, состояние и дефекты</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid black', padding: '6px', fontWeight: 'bold' }}>Фундамент и основания</td>
              <td style={{ border: '1px solid black', padding: '6px' }}>Ленточный бутовый на сложном растворе. Признаки глубоких деформаций, сквозных трещин и осадки основания в ходе инструментального контроля не зафиксированы. Состояние удовлетворительное.</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '6px', fontWeight: 'bold' }}>Стены и перегородки</td>
              <td style={{ border: '1px solid black', padding: '6px' }}>Капитальные стены — полнотелый обожженный глиняный кирпич. Наблюдаются локальные выветривания швов кладки цокольной части. Внутренние перегородки — кирпичные и крупноблочные.</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '6px', fontWeight: 'bold' }}>Перекрытия и кровля</td>
              <td style={{ border: '1px solid black', padding: '6px' }}>Перекрытия смешанные (сборный железобетон и металлические балки с деревянным заполнением). Кровля скатная стропильная, покрытие — оцинкованная листовая сталь. Требуется локальный ремонт примыканий.</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '6px', fontWeight: 'bold' }}>Внутренняя отделка</td>
              <td style={{ border: '1px solid black', padding: '6px' }}>Штукатурка, окраска, облицовка керамической плиткой. В зонах общего пользования зафиксированы исторические элементы лепного декора, подлежащие строгому сохранению и научной реставрации.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ЛИСТ 4 */}
      <div style={pageStyle}>
        {/* ДОБАВЛЕНИЕ РАЗДЕЛА IV (Юридический статус и нормативная база) */}
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '20px', marginBottom: '8px' }}>IV. Особые отметки, регистрация ограничений и нормативно-правовая база</h3>
        <p style={{ textAlign: 'justify', fontSize: '11px', color: '#111111', marginBottom: '25px', lineHeight: '1.5' }}>
          Данный технический паспорт составлен в соответствии с требованиями Федерального закона № 73-ФЗ «Об объектах культурного наследия...», Жилищного кодекса Российской Федерации и Приказа Минэкономразвития РФ. Объект обладает специальным правовым статусом. Любые виды строительных, ремонтных, земляных и отделочных работ на объекте, а также перепланировка и изменение объемно-планировочных решений внутренних помещений без официального письменного разрешения Департамента культурного наследия города Москвы и ГБУ «МосгорБТИ» категорически запрещены. Настоящие сведения внесены в Единый реестр технической документации недвижимого имущества города Москвы. Технический аудит конструкций выполнен с использованием сертифицированных средств неразрушающего контроля.
        </p>

        <p style={{ textAlign: 'justify', fontSize: '11px', color: '#222222', marginTop: '15px', marginBottom: '25px', fontStyle: 'italic' }}>
          * Дополнительное примечание к инвентаризационному делу: Настоящие технико-экономические показатели, включая детальную планировку помещений литер А, Б, В, согласованы с архивными планами Городской управы и Мосгорнаследия. Пересчет полезной площади произведен с учетом толщины капитальных кирпичных стен и колоннадных групп (Grand Portico, Column Diameter 2'-4"). Сведения носят характер строгой отчетности и подлежат автоматической выгрузке в аналитический модуль АРМ Оценщика для проведения комплексной оценки.
        </p>

        <div style={{ marginTop: '50px' }}>
          {/* БЛОКИ ПОДПИСЕЙ оценщика (Смирнов К.А.) и СИНЯЯ ПЕЧАТЬ №14 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', paddingTop: '20px', borderTop: '1px solid #ccc', color: '#000', pageBreakInside: 'avoid' }}>
            <div style={{ width: '45%' }}>
              <div style={{ marginBottom: '50px', fontWeight: 'bold', textTransform: 'uppercase' }}>Руководитель ГБУ МосгорБТИ</div>
              <div style={{ position: 'relative' }}>
                <div style={{ borderBottom: '1px solid black', width: '250px', marginBottom: '4px' }}></div>
                <div style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between', width: '250px' }}>
                  <span>(подпись)</span>
                  <span>(М.И. Петров)</span>
                </div>
                {/* СИНЯЯ ПЕЧАТЬ №14 */}
                <div style={{ 
                  position: 'absolute', top: '-50px', left: '100px', width: '110px', height: '110px', 
                  border: '4px solid #0033a0', borderRadius: '50%', display: 'flex', alignItems: 'center', 
                  justifyContent: 'center', transform: 'rotate(-12deg)', opacity: '0.9', 
                  boxShadow: 'inset 0 0 4px rgba(0,51,160,0.5)', pointerEvents: 'none', mixBlendMode: 'multiply'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '7px', fontWeight: 'bold', color: '#0033a0', textTransform: 'uppercase' }}>Правительство Москвы</div>
                    <div style={{ fontSize: '10px', fontWeight: '900', color: '#0033a0', textTransform: 'uppercase', marginTop: '4px' }}>ГБУ МосгорБТИ</div>
                    <div style={{ fontSize: '8px', fontWeight: 'bold', color: '#0033a0', marginTop: '4px' }}>ПЕЧАТЬ №14</div>
                    <div style={{ fontSize: '6px', color: '#0033a0', marginTop: '4px', fontWeight: 'bold' }}>ДЛЯ ДОКУМЕНТОВ</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: '45%' }}>
              <div style={{ marginBottom: '50px', fontWeight: 'bold', textTransform: 'uppercase' }}>Кадастровый инженер</div>
              <div style={{ position: 'relative' }}>
                <div style={{ borderBottom: '1px solid black', width: '250px', marginBottom: '4px' }}></div>
                <div style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between', width: '250px', fontWeight: 'bold' }}>
                  <span>(подпись)</span>
                  <span>(Смирнов К. А.)</span>
                </div>
                <div style={{ marginTop: '16px', fontWeight: 'bold' }}>
                  Дата выдачи: <span style={{ fontWeight: 'normal', textDecoration: 'underline' }}>{currentDate}</span> г.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '20mm', left: '20mm', right: '20mm', fontSize: '10px', color: '#555', fontStyle: 'italic', textAlign: 'justify' }}>
          * ВНИМАНИЕ: Технический паспорт ОКН не заменяет правоустанавливающие документы на объект недвижимости и предназначен исключительно для целей государственной оценки, инвентаризации и формирования Цифрового паспорта ОКН. Изменение технико-экономических характеристик объекта в процессе реставрации или перепланировки требует обязательной повторной инвентаризации в ГБУ «МосгорБТИ». Копия верна.
        </div>
      </div>

    </div>
  );
};