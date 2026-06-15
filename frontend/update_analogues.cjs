const fs = require('fs');
const path = require('path');
const p = path.join('C:\\Users\\Максим\\.gemini\\antigravity\\scratch\\arm-ocenschik\\frontend\\src\\data\\mockAnalogues.ts');
let code = fs.readFileSync(p, 'utf8');

const map = {
  'analogue-rossiya-1': 'analog_b_hariton_10',
  'analogue-rossiya-2': 'analog_kursovoy_1',
  'analogue-rossiya-3': 'analog_prechistenka_28',
  'analogue-rossiya-4': 'analog_arbat_35',
  'analogue-rossiya-5': 'analog_gogol_21',
  'analogue-rossiya-6': 'analog_romanov_3',
  'analogue-rossiya-7': 'analog_myasnitskaya_15',
  'analogue-rossiya-8': 'analog_pokrovka_2_1',
  'analogue-rossiya-9': 'analog_tverskaya_25',
  'analogue-rossiya-10': 'analog_b_lubyanka_14',
  'analogue-rossiya-11': 'analog_novokuznetskaya_34',
  'analogue-rossiya-12': 'analog_stoleshnikov_11',
  'analogue-rossiya-13': 'analog_myasnitskaya_22',
  'analogue-rossiya-14': 'analog_podkopaevsky_4'
};

for (const [id, folder] of Object.entries(map)) {
  const regex = new RegExp('(id:\\s*\"' + id + '\"[\\s\\S]*?coordinates:\\s*\\[[^\\]]+\\])(\\s*})', 'g');
  code = code.replace(regex, '$1,\n    photosFolder: "' + folder + '"$2');
}

fs.writeFileSync(p, code);
console.log('Done!');
