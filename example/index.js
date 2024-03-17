const {
  generateLangFromGridSheet,
} = require("@megabee/js-locale-sheet-loader");

generateLangFromGridSheet({
  defaultLang: "en",
  sheetId: "0",
  ssid: "1qH_wY1khh48iGCmIrRwXhOdTR-21aK1zKrExptOFECY",
  outputDir: "./i18n-resources",
});
