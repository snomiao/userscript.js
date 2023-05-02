import { exec } from 'child_process';
import clipboard from 'clipboardy';
import { globby } from 'globby';
import { promisify } from 'util';

const scripts = await globby('**/*.user.js');

const out = await Promise.all(
    scripts.map((path) => {
        return encodeURI(
            'https://raw.githubusercontent.com/snomiao/userscript.js/master/' +
                path
        );
    })
);
const outString = out.join('\n');
console.log(outString);
await clipboard.write(outString);

console.log(
    'userscript links copied, please open import page to paste https://greasyfork.org/en/import'
);

await promisify(exec)('cmd /c start chrome https://greasyfork.org/en/import');
