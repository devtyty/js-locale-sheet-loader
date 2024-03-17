import https from "https";
import { SheetData } from "./@types/language";
import _, { isArray } from "lodash";

const fetchNetwork = {
  get: async (url: string): Promise<string> => {
    const promise = new Promise<string>((resolve, reject) => {
      https
        .get(url, (resp) => {
          // Vietnamese support
          resp.setEncoding("utf8");

          let data = "";
          resp.on("data", (chunk) => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on("end", () => {
            resolve(data);
          });
        })
        .on("error", (err) => {
          console.log("Error: " + err.message);
          reject(err);
        });
    });

    return promise;
  },
};

export interface IFetchListSheet {
  /**
   * Google sheet ssid
   * You can take it on url sheet
   */
  ssid: string;

  /**
   * Google api key from your console
   */
  apiKey: string;
}

export const fetchListSheet = async (params: IFetchListSheet) => {
  const response = await fetchNetwork.get(
    `https://sheets.googleapis.com/v4/spreadsheets/${params.ssid}?key=${params.apiKey}`
  );

  const data = JSON.parse(response) as SheetData;
  return data;
};

export const fetchTabSheetData = async (sheetId: number, ssid: string) => {
  const url = `https://docs.google.com/spreadsheets/d/${ssid}/gviz/tq?tqx=out:csv&gid=${sheetId}`;

  const csv = await fetchNetwork.get(url);

  return csv;
};

/// format functions

export const capitalizeAfterSpecial = (input: string) => {
  return input.toString().replace(/[\.\-_\s&]+([a-zA-Z0-9])/g, (_, char) => {
    return char.toUpperCase();
  });
};

/** separator rows record */
export const csvToRowsList = (csv: string) => {
  const rowsSheet = csv
    /// split rows
    .split(/\n(?=")/gm)
    /// split column
    .map((row) => {
      const fieldsColumn = row.split(/(?<="),(?=")/gm);
      /// Remove quoted
      return fieldsColumn.map((cellValue) =>
        cellValue
          .replace(/^"((.|\n)*)"$/gm, "$1")
          ///Remove double quote with csv output
          .replace(/""/gm, '"')
      );
    });

  return rowsSheet;
};

/**
 * Convert json data to csv
 * @output string
 */
export const convertJsonToCsv = (
  jsonData: Record<string, string | any>,
  defaultLang = "en"
): string => {
  const languages = Object.keys(jsonData);

  let dataCSV = `"code_name",${languages.map((lang) => '"' + lang + '"')}\n`;

  const codeNamesXor = _.xor(
    ...languages.map((lang) =>
      Object.keys(xorAllKeysLangToOne({ source: jsonData[lang] }))
    )
  );

  const codeNames = _.union(
    codeNamesXor,
    Object.keys(xorAllKeysLangToOne({ source: jsonData[defaultLang] }))
  );

  for (const keyTranslate of codeNames) {
    const fieldsWithLang = languages.map(
      (lang) =>
        `"${
          _.get(jsonData[lang], keyTranslate, "")?.replace?.(/"/gm, '""') ?? ""
        }"`
    );
    dataCSV += `"${keyTranslate}",${fieldsWithLang.join(",")}\n`;
  }

  return dataCSV;
};

export interface IXorAllKeysLangToOne {
  source: Record<string, any> | string | null | undefined | Array<object>;
  parentKeys?: string[];
}

/**
 * Handle merge all key lang from json to single layer key
 */
export const xorAllKeysLangToOne = (
  params: IXorAllKeysLangToOne
): Record<string, string> => {
  const { source, parentKeys = [] } = params;

  if (typeof source === "string" || !source) {
    return { [parentKeys.join(".")]: source ?? "" };
  }

  let dataMapping: Record<string, string> = {};

  /// Array i18n: key.1 | key.2 | key.3
  if (isArray(source)) {
    for (let i = 0; i < source.length; i++) {
      dataMapping = {
        ...dataMapping,
        ...xorAllKeysLangToOne({
          source: source[i],
          parentKeys: [...parentKeys, i.toString()],
        }),
      };
    }

    return dataMapping;
  }

  for (let nestedKey in source) {
    dataMapping = {
      ...dataMapping,
      ...xorAllKeysLangToOne({
        source: source[nestedKey],
        parentKeys: [...parentKeys, nestedKey],
      }),
    };
  }

  return dataMapping;
};
