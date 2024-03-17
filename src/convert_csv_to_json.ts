import { csvToRowsList } from "./helper";
import _ from "lodash";

export interface IConvertCsvToJsonLangData {
  csvData: string;
  defaultLang: string;

  /**@default true */
  isHandleDeepKey?: boolean;
}

/**
 * Mapping csv format i18n to json language data
 */
const convertCsvToJsonLangData = ({
  isHandleDeepKey = true,
  ...params
}: IConvertCsvToJsonLangData) => {
  const { csvData } = params;

  const rowsSheet = csvToRowsList(csvData);

  const langList = rowsSheet[0];

  const languages: Record<string, string | any> = {};

  ///TODO: Loop list lang
  for (const indexLang in langList) {
    if (+indexLang === 0) {
      /// skip row language name
      continue;
    }

    const lang = rowsSheet[0][indexLang].toLowerCase();

    if (!lang) {
      continue;
    }

    ///TODO: init lang object
    if (!languages[lang]) {
      languages[lang] = {};
    }

    const localeJsonFile: Record<string, object | string> = {};

    const REGEX_IGNORE_CODE_FIELD = /\/+/gm;

    for (let indexRow = 1; indexRow < rowsSheet.length; indexRow++) {
      const codeField = rowsSheet[indexRow][0];
      let valueField = rowsSheet[indexRow][indexLang];

      ///TODO:  Check and ignore row
      if (!codeField || REGEX_IGNORE_CODE_FIELD.test(codeField)) {
        continue;
      }

      /** Nếu ngôn ngữ khác rỗng thì get value của lang default */
      if (!valueField) {
        valueField = _.get(languages[params.defaultLang], codeField, "");
      }

      if (isHandleDeepKey) {
        _.set(localeJsonFile, codeField, valueField);
      }

      if (!isHandleDeepKey) {
        localeJsonFile[codeField] = valueField;
      }
    }

    /** Set data set lang for each sheet section
     */
    languages[lang] = localeJsonFile;
  }

  return languages;
};

export default convertCsvToJsonLangData;
