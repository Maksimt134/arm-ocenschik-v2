const fs = require('fs');
const file = './src/components/PassportPanel.tsx';
let content = fs.readFileSync(file, 'utf8');

const moreMappings = {
  'Сретенский бульвар, 6/1': 22,
  'Колпачный переулок, дом 5, строение 2': 18,
  'Спиридоновка, 17': 15,
  'Спиридоновка, 21': 28,
  'Сретенский бульвар, 9': 35,
  'Сретенский бульвар, 2': 41,
  'Колпачный пер., д. 10': 47,
  'Покровский бульвар, вл. 5': 52,
  'Малый Никитский пер., 6': 25,
  'Милютинский пер., 5': 33,
  'Поварская ул., 22': 38,
  'Большая Никитская, 47': 29,
  'Большой Харитоньевский переулок, 10': 44,
  'Малый Златоустинский пер.': 39,
  'Подкопаевский пер., д. 4': 55,
  'ул. Забелина, д. 3': 31,
  'Старосадский пер., д. 9': 27,
  'ул. Солянка, д. 12': 48,
  'Хохловский пер., д. 7-9': 36,
  'Фролов пер., 2': 42,
  'Спиридоновка, 3-5': 19,
  'Спиридоновка, 12': 61
};

const lines = content.split('\n');
let replaced = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('name: ')) {
    for (const [key, val] of Object.entries(moreMappings)) {
      if (lines[i].includes('name: ' + "'" + key + "'") || lines[i].includes('name: "' + key + '"') || lines[i].includes(key)) {
        lines[i] = lines[i].replace(/wear_pct: \d+/, 'wear_pct: ' + val);
        replaced++;
        break;
      }
    }
  }
}

console.log('Replaced ' + replaced + ' lines');
fs.writeFileSync(file, lines.join('\n'));