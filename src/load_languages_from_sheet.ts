/**
 *  Script generate multi sheet
 *  Preset các biến trong config
 *  Ngôn ngữ mặc định nên để ở cột đầu tiên trên sheet
 */

import _ from "lodash";
import { Sheet } from "./@types/language";
import {
  IFetchListSheet,
  capitalizeAfterSpecial,
  fetchListSheet,
  fetchTabSheetData,
} from "./helper";
import convertCsvToJsonLangData from "./convert_csv_to_json";

const languages: Record<string, string | any> = {};

/**Lấy danh sách các sheet.
 *
 * Lưu ý: mỗi sheet là một mini-app
 * */
const loadListSheet = async (params: ILoadLangFromSheet) => {
  const sheetData = await fetchListSheet({
    ssid: params.ssid,
    apiKey: params.apiKey,
  });

  const listPendingHandle = [];

  for (const sheet of sheetData.sheets) {
    listPendingHandle.push(
      loadSheetData(sheet, params.ssid, params.defaultLang)
    );
  }

  return Promise.all(listPendingHandle);
};

/**Fetch sheet data and handle to i118n files */
const loadSheetData = async (
  sheetData: Sheet,
  ssid: string,
  defaultLang: string
) => {
  const sheetId = sheetData.properties.sheetId;
  const sheetNameFormatted = capitalizeAfterSpecial(sheetData.properties.title);

  const csvData = await fetchTabSheetData(sheetId, ssid);

  const dataFormatted = convertCsvToJsonLangData({
    csvData,
    defaultLang: defaultLang,
  });

  /// Assign module Name
  const dataReMap: Record<string, string | any> = {};

  Object.keys(dataFormatted).forEach((langName) => {
    dataReMap[langName] = {};
    dataReMap[langName][sheetNameFormatted] = { ...dataFormatted[langName] };
  });

  _.merge(languages, dataReMap);
};

export interface ILoadLangFromSheet extends IFetchListSheet {
  defaultLang: string;
}

const loadLangFromSheet = async (config: ILoadLangFromSheet) => {
  await loadListSheet(config);

  return languages;
};

export default loadLangFromSheet;
