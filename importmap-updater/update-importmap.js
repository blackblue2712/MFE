/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
// Note that this file requires node@13.2.0 or higher (or the --experimental-modules flag)
const fs = require("fs");
const path = require("path")
const https = require("https");

function urlNotDownloadable(url, err) {
  throw Error(
        `Refusing to update import map - could not download javascript file at url ${url}. Error was '${err.message}'`
    );
}

const importMapFilePath = path.resolve(process.cwd(), "importmap.json");
const importMap = JSON.parse(fs.readFileSync(importMapFilePath));
const urls = [
    `https://nghiadang-single-spa.s3.ap-southeast-1.amazonaws.com/root-config/${process.env.GITHUB_SHA}/nghiadang-root-config.js`,
    `https://nghiadang-single-spa.s3.ap-southeast-1.amazonaws.com/app1/${process.env.GITHUB_SHA}/nghiadang-app1.js`,
    `https://nghiadang-single-spa.s3.ap-southeast-1.amazonaws.com/app2/${process.env.GITHUB_SHA}/nghiadang-app2.js`,
];

const moduleNames = [
    "@nghiadang/root-config",
    "app1",
    "app2"
]

console.log("url", urls);


for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    https
        .get(url, (res) => {
            // HTTP redirects (301, 302, etc) not currently supported, but could be added
            if (res.statusCode >= 200 && res.statusCode < 300) {
                if (
                    res.headers["content-type"] &&
                    res.headers["content-type"].toLowerCase().trim() ===
                    "application/javascript"
                ) {
                    const moduleName = moduleNames[i];
                    importMap.imports[moduleName] = url;
                    fs.writeFileSync(importMapFilePath, JSON.stringify(importMap, null, 2));
                    console.log(
                        `Updated import map for module ${moduleName}. New url is ${url}.`
                    );
                } else {
                    urlNotDownloadable(
                        url,
                        Error(`Content-Type response header must be application/javascript`)
                    );
                }
            } else {
                urlNotDownloadable(
                    url,
                    Error(`HTTP response status was ${res.statusCode}`)
                );
            }
        })
        .on("error", (err) => {
            urlNotDownloadable(url, err);
        });
}

