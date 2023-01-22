import chalk from 'chalk';
import esMain from 'es-main';
import esbuild from 'esbuild';
import { watch, writeFile } from 'fs/promises';
import { globby } from 'globby';
import readFileUtf8 from 'read-file-utf8';
{
    if (esMain(import.meta)) main();
}
export async function main() {
    await buildTs();
}

async function buildTs() {
    const tsInputs = await globby('ts/*.user.ts');
    console.log({ ls: tsInputs });
    const jsOutputs = await Promise.all(
        tsInputs.map(async (entry) => {
            await userscriptBuild(entry).catch(console.error);
            for await (const _event of watch(entry))
                await userscriptBuild(entry).catch(console.error);
        })
    );
    console.log(jsOutputs);
}

async function userscriptBuild(tsEntry: string) {
    const content = await readFileUtf8(tsEntry);
    if (!content) return;
    const header = content.replace(/\r/g, '').match(/^(\/\/.*\n)+/i)?.[0];
    if (!header) throw new Error('Userscript header not found in ' + tsEntry);

    const banner = `${header}\n/* eslint-disable */`;
    console.log('banner', chalk.green(banner));

    console.log('building contents');
    const buildResult = await esbuild.build({
        outdir: 'src',
        entryPoints: [tsEntry],
        legalComments: 'eof',
        platform: 'browser', //will convert into iife
        format: 'esm',
        target: 'esnext',
        bundle: true,
        banner: { js: banner },
        write: false,
    });
    const outfile = buildResult.outputFiles[0];
    if (!outfile) throw new Error('No output file');
    const { path: jsPath, text } = outfile;
    const outContent = text
        .replace(/(?<=^\s*\/\/.*)node_modules(?:.*?node_modules)\//gm, '')
        .replace(/(?<=^\s*\/\/.*)\/dist\/.*/gm, '')
        .replace(/(?<=^\s*\/\/.*)ts\//gm, '')
        .replace(/(?<=^\s*\/\/.*)(\.user)?\.(?:[cm]?[jt]s)/gm, '');
    // console.log('writing', chalk.cyan(outContent));

    await writeFile(jsPath, outContent);
    console.log(chalk.greenBright(`Built ${jsPath}`));
    return jsPath;
}
