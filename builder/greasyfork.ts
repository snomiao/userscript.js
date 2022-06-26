import { exec } from 'child_process';
import { globby } from 'globby';
import { promisify } from 'util';

const scripts = await globby('**/*.user.js');
// | clip
const out = await Promise.all(
    scripts.map((path) => {
        return encodeURI(
            'https://raw.githubusercontent.com/snomiao/userscript.js/master/' +
                path
        );
    })
);
console.log(out.join('\n'));
await promisify(exec)('cmd /c start chrome https://greasyfork.org/en/import');
