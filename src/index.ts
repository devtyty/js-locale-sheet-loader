import loadLangFromGridSheet from "./load_language_grid_sheet";
import loadLangFromSheet from "./load_languages_from_sheet";
import convertCsvToJsonLangData from "./convert_csv_to_json";
import fs from "fs";
import { assert } from "console";

const ColorsConsole = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",

  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",

  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[46m",
  BgWhite: "\x1b[47m",
};

/**
 * List function related to languages
 *
 */
export const LanguagesHelper = {
  loadLangFromSheet,
  loadLangFromGridSheet,
  convertCsvToJson: convertCsvToJsonLangData,
};

/**Load your data from sheet and generate on your output dir */
export async function generateLangFromGridSheet(
  _params: Parameters<typeof loadLangFromGridSheet>["0"] & {
    /**This should to your absolute path */
    outputDir: string;
  }
) {
  const output = _params.outputDir;

  assert(!!output, "Please provide your output dir!");

  const results = await LanguagesHelper.loadLangFromGridSheet(_params);

  if (!fs.existsSync(output)) {
    fs.mkdirSync(output);
  }

  let importConfig = "";

  /// Generate locale folder
  for (const lang in results) {
    fs.writeFile(
      `${output}/${lang}.json`,
      JSON.stringify(results[lang], null, 2),
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );

    importConfig += `export {default as ${lang}} from './${lang}.json';\n`;
  }

  ///Generate config resource
  fs.writeFile(`${output}/index.ts`, importConfig, (err) => {
    if (err) {
      console.error(err);
    }
  });

  console.log(
    ColorsConsole.FgGreen,
    "Generated languages successfully!",
    ColorsConsole.Reset
  );
}

export type IConfig = {
  /**Google sheet id */
  ssid: string;
  sheetId: string;
  defaultLang: string;
  outputDir: string;
};
