// @ts-check

import * as esbuild from "./../node_modules/esbuild/lib/main.js";

import fs from 'fs';

import path from "path";


var packageInfo = (() => {
    var packageJson = fs.readFileSync("package.json", { encoding: "utf-8" });
    var result = JSON.parse(packageJson);
    return result;
})();

/**
 * Format bytes as human-readable text.
 * 
 * @param {number} bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use 
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 * 
 * @return Formatted string.
 */
function humanFileSize(bytes, si = false, dp = 1) {
    //const thresh = si ? 1000 : 1024;
    const thresh = 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    /*
    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
*/
    const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


    return bytes.toFixed(dp) + ' ' + units[u];
}

async function main() {

    const dist_directory = "dist";

    for (const file of fs.readdirSync(dist_directory)) {
        fs.unlinkSync(path.join(dist_directory, file));
    }

    var filename_1 = `${dist_directory}/event-emitter.${packageInfo.version}.esm.js`;

    await esbuild.build({
        entryPoints: ['./index.js'],
        bundle: true,
        minify: false,
        outfile: filename_1,
        platform: `neutral`,
        banner: { "js": `// version ${packageInfo.version}` }
    });

    var filesize_1 = fs.statSync(filename_1).size;

    var filename_2 = `${dist_directory}/event-emitter.${packageInfo.version}.min.esm.js`;

    await esbuild.build({
        entryPoints: ['./index.js'],
        bundle: true,
        minify: true,
        outfile: filename_2,
        platform: `neutral`,
        banner: { "js": `// version ${packageInfo.version}` }
    });


    var filesize_2 = fs.statSync(filename_2).size;

    console.table({
        1: {
            file: filename_1,
            size: humanFileSize(filesize_1, false, 2)
        },
        2: {
            file: filename_2,
            size: humanFileSize(filesize_2, false, 2)
        }
    },
        ["file", "size"]);

}

main();

