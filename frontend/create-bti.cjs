const fs = require('fs');
const path = require('path');

const b64Path = path.join(__dirname, 'public', 'blueprint.b64');
let blueprintBase64 = '';
if (fs.existsSync(b64Path)) {
  blueprintBase64 = fs.readFileSync(b64Path, 'utf8').trim();
}

const componentCode = `import React from 'react';

export interface BtiPassportProps {
  okn: any;
  details: any;
  uchetNum: string;
  cadastral: string;
  address: string;
}

export const BtiPassportReport: React.FC<BtiPassportProps> = ({
  okn,
  details,
  uchetNum,
  cadastral,
  address
}) => {
  const currentDate = new Date().toLocaleDateString('ru-RU');
  
  // Base64 blueprint image
  const blueprintDataUrl = "data:image/jpeg;base64,${blueprintBase64}";

  return (
    <div style={{
      fontFamily: '"Times New Roman", Times, serif',
      fontSize: '12pt',
      color: '#000',
      background: '#fff',
      margin: '0 auto',
      padding: '40px',
      maxWidth: '800px',
      boxSizing: 'border-box',
      lineHeight: '1.4'
    }}>
      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ fontSize: '14pt', fontWeight: 'bold' }}>РОССИЙСКАЯ ФЕДЕРАЦИЯ</div>
        <div style={{ fontSize: '14pt', fontWeight: 'bold' }}>ПРАВИТЕЛЬСТВО МОСКВЫ</div>
        <div style={{ fontSize: '14pt', fontWeight: 'bold', textDecoration: 'underline' }}>ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ УЧРЕЖДЕНИЕ "МОСГОРБТИ"</div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '24pt', fontWeight: 'bold', margin: '0 0 10px 0', letterSpacing: '2px' }}>ТЕХНИЧЕСКИЙ ПАСПОРТ</h1>
        <div style={{ fontSize: '14pt' }}>на здание (строение), объект культурного наследия</div>
      </div>

      {/* TABLE 1 - Identification */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #000', padding: '10px', width: '40%', fontWeight: 'bold' }}>Инвентарный номер (учетный)</td>
            <td style={{ border: '1px solid #000', padding: '10px', textAlign: 'center', fontSize: '14pt', fontWeight: 'bold' }}>{uchetNum}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #000', padding: '10px', fontWeight: 'bold' }}>Кадастровый номер</td>
            <td style={{ border: '1px solid #000', padding: '10px', textAlign: 'center', fontSize: '14pt', fontWeight: 'bold' }}>{cadastral}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #000', padding: '10px', fontWeight: 'bold' }}>Адрес (местоположение)</td>
            <td style={{ border: '1px solid #000', padding: '10px' }}>{address}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #000', padding: '10px', fontWeight: 'bold' }}>Наименование объекта</td>
            <td style={{ border: '1px solid #000', padding: '10px' }}>{okn?.name || 'Здание (строение)'}</td>
          </tr>
        </tbody>
      </table>

      {/* TABLE 2 - Technical details */}
      <h3 style={{ fontSize: '14pt', textAlign: 'center', margin: '0 0 15px 0' }}>I. Архитектурно-планировочные и эксплуатационные показатели</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px' }}>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #000', padding: '8px', width: '50%' }}>Серия, тип проекта</td>
            <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>Индивидуальный (Исторический)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #000', padding: '8px' }}>Год постройки</td>
            <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{details?.year || '-'}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #000', padding: '8px' }}>Общая площадь (кв. м)</td>
            <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>{details?.area || '-'}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #000', padding: '8px' }}>Число этажей (надземных)</td>
            <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{details?.floors || '-'}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #000', padding: '8px' }}>Материал наружных стен</td>
            <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{details?.material || 'Кирпич исторический'}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #000', padding: '8px' }}>Процент физического износа</td>
            <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', fontWeight: 'bold', color: '#b91c1c' }}>{okn?.wear_pct || okn?.metadata?.wear_pct || 30}%</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #000', padding: '8px' }}>Статус ОКН</td>
            <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{okn?.okn_category || 'Не указан'}</td>
          </tr>
        </tbody>
      </table>

      {/* BLUEPRINT / PLAN */}
      <h3 style={{ fontSize: '14pt', textAlign: 'center', margin: '0 0 15px 0' }}>II. Поэтажный план объекта (экспликация)</h3>
      <div style={{ 
        width: '100%', 
        height: '400px', 
        border: '2px solid #000', 
        marginBottom: '10px',
        padding: '10px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {blueprintBase64 ? (
          <img src={blueprintDataUrl} alt="Поэтажный план" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        ) : (
          <div style={{ color: '#666', fontStyle: 'italic' }}>ЧЕРТЕЖ ОТСУТСТВУЕТ / НАХОДИТСЯ В АРХИВЕ</div>
        )}
      </div>
      <div style={{ fontSize: '10pt', fontStyle: 'italic', marginBottom: '40px', textAlign: 'right' }}>
        * Масштаб 1:200. Копия верна. Выписка из архива ГБУ МосгорБТИ.
      </div>

      {/* SIGNATURES AND STAMPS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '60px', position: 'relative' }}>
        
        {/* Left Signature Block */}
        <div style={{ width: '45%' }}>
          <div style={{ marginBottom: '20px' }}>
            <span style={{ display: 'inline-block', width: '120px' }}>Руководитель</span>
            <span style={{ display: 'inline-block', width: '100px', borderBottom: '1px solid #000', margin: '0 10px', textAlign: 'center' }}>
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 40'><path d='M10,20 Q30,5 40,25 T70,10 T90,25' fill='none' stroke='%23000080' stroke-width='2'/></svg>" style={{ height: '30px', transform: 'translateY(10px)' }} alt="" />
            </span>
            <span style={{ display: 'inline-block' }}>/ А.В. Смирнов /</span>
          </div>
          <div>
            <span style={{ display: 'inline-block', width: '120px' }}>Исполнитель</span>
            <span style={{ display: 'inline-block', width: '100px', borderBottom: '1px solid #000', margin: '0 10px', textAlign: 'center' }}>
              <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 40'><path d='M5,30 Q20,10 50,35 T80,15 T95,20' fill='none' stroke='%23000080' stroke-width='1.5'/></svg>" style={{ height: '25px', transform: 'translateY(5px)' }} alt="" />
            </span>
            <span style={{ display: 'inline-block' }}>/ Е.С. Иванова /</span>
          </div>
        </div>

        {/* Right Stamp Block */}
        <div style={{ width: '45%', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-40px', right: '40px', opacity: 0.85, transform: 'rotate(-5deg)' }}>
            <svg width="150" height="150" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              {/* Outer double border */}
              <circle cx="100" cy="100" r="95" fill="none" stroke="#1e3a8a" strokeWidth="3"/>
              <circle cx="100" cy="100" r="90" fill="none" stroke="#1e3a8a" strokeWidth="1"/>
              {/* Inner border */}
              <circle cx="100" cy="100" r="60" fill="none" stroke="#1e3a8a" strokeWidth="2"/>
              
              {/* Outer Text Path */}
              <path id="outerTextPath" d="M 100, 15 A 85,85 0 1,1 99.9,15" fill="none" stroke="none" />
              <text fill="#1e3a8a" fontSize="12" fontWeight="bold" letterSpacing="1">
                <textPath href="#outerTextPath" startOffset="50%" textAnchor="middle">
                  * ПРАВИТЕЛЬСТВО МОСКВЫ * ГБУ МОСГОРБТИ *
                </textPath>
              </text>
              
              {/* Inner Text Path */}
              <path id="innerTextPath" d="M 100, 45 A 55,55 0 1,1 99.9,45" fill="none" stroke="none" />
              <text fill="#1e3a8a" fontSize="9" fontWeight="bold" letterSpacing="0.5">
                <textPath href="#innerTextPath" startOffset="50%" textAnchor="middle">
                  ДЛЯ ДОКУМЕНТОВ И СПРАВОК
                </textPath>
              </text>
              
              {/* Center Logo/Text */}
              <text x="100" y="95" fill="#1e3a8a" fontSize="16" fontWeight="bold" textAnchor="middle">БТИ</text>
              <text x="100" y="115" fill="#1e3a8a" fontSize="10" textAnchor="middle">№ 14</text>
              
              {/* Star decorations */}
              <path d="M 25,100 L 30,105 L 23,105 Z" fill="#1e3a8a"/>
              <path d="M 175,100 L 180,105 L 173,105 Z" fill="#1e3a8a"/>
            </svg>
          </div>
          
          <div style={{ marginTop: '80px', textAlign: 'right', fontSize: '10pt', color: '#444' }}>
            Дата выдачи паспорта: <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>{currentDate} г.</span>
          </div>
        </div>
      </div>
      
      {/* Footer / Meta */}
      <div style={{ marginTop: '50px', borderTop: '1px solid #ccc', paddingTop: '10px', fontSize: '8pt', color: '#666', textAlign: 'center' }}>
        Документ сформирован автоматически в подсистеме АРМ Оценщик. Идентификатор запроса: BTI-{Date.now().toString().slice(-6)}
      </div>

    </div>
  );
};
`;

fs.writeFileSync(path.join(__dirname, 'src', 'components', 'BtiPassportReport.tsx'), componentCode, 'utf8');
console.log("Created BtiPassportReport.tsx");
