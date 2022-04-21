import { globby } from 'globby';

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
// await promisify(exec)('chrome https://greasyfork.org/en/import');
