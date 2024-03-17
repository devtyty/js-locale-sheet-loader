import { fetchTabSheetData } from "./helper";
import convertCsvToJsonLangData from "./convert_csv_to_json";

export interface ILoadLangFromGridSheet {
  /**
   * Google sheet ssid
   * You can take it on url sheet
   */
  ssid: string;

  /**grid id on sheet url */
  sheetId: number;

  defaultLang: string;
  /**
   * @value false: data just handle only one layer key
   */
  isHandleDeepKey?: boolean;
}

async function loadLangFromGridSheet(params: ILoadLangFromGridSheet) {
  const csvData = await fetchTabSheetData(params.sheetId, params.ssid);

  const dataFormatted = convertCsvToJsonLangData({
    csvData,
    defaultLang: params.defaultLang,
    isHandleDeepKey: params.isHandleDeepKey,
  });

  return dataFormatted;
}

export default loadLangFromGridSheet;
