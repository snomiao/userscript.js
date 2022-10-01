import { globby } from 'globby';
import esbuild from 'esbuild';
import chalk from 'chalk';
import readFileUtf8 from 'read-file-utf8';
import { Writer } from 'steno';

const ls = await globby('ts/*.user.ts');

// return;
console.log(ls);

console.log(
    await Promise.all(
        ls.map(async (f) => {
            await userscriptBuild(f);
            return;
        })
    )
);
async function userscriptBuild(f: string) {
    const content = await readFileUtf8(f);
    const rawHead = content.match(
        /\/\/\s=+Userscript=+\n[\s\S]*?[^\\]\n\n/i
    )?.[0];
    if (!rawHead) throw new Error('Userscript head not found in ' + f);

    const head = rawHead;
    console.log('head', chalk.green(head));

    console.log('building contents');
    const buildResult = await esbuild.build({
        outdir: 'src',
        entryPoints: [f],
        legalComments: 'none',
        platform: 'browser', //will convert into iife
        target: 'esnext',
        bundle: true,
        banner: { js: head },
        write: false,
    });
    const { path, text } = buildResult.outputFiles[0];
    // const outContent = head + '\n' + text;
    const outContent = text;
    console.log('writing', chalk.cyan(outContent));
    await new Writer(path).write(outContent);
    console.log(chalk.greenBright('ALL DONE'));
}
