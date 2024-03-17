export interface SheetData {
  spreadsheetId: string;
  properties: SheetDataProperties;
  sheets: Sheet[];
  spreadsheetUrl: string;
}

export interface SheetDataProperties {
  title: string;
  locale: string;
  autoRecalc: string;
  timeZone: string;
  defaultFormat: DefaultFormat;
  spreadsheetTheme: SpreadsheetTheme;
}

export interface DefaultFormat {
  backgroundColor: BackgroundColorClass;
  padding: Padding;
  verticalAlignment: string;
  wrapStrategy: string;
  textFormat: TextFormat;
  backgroundColorStyle: BackgroundColorStyle;
}

export interface BackgroundColorClass {
  red?: number;
  green?: number;
  blue?: number;
}

export interface BackgroundColorStyle {
  rgbColor: BackgroundColorClass;
}

export interface Padding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface TextFormat {
  foregroundColor: ForegroundColorClass;
  fontFamily: string;
  fontSize: number;
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  foregroundColorStyle: ForegroundColorStyle;
}

export interface ForegroundColorClass {}

export interface ForegroundColorStyle {
  rgbColor: ForegroundColorClass;
}

export interface SpreadsheetTheme {
  primaryFontFamily: string;
  themeColors: ThemeColor[];
}

export interface ThemeColor {
  colorType: string;
  color: BackgroundColorStyle;
}

export interface Sheet {
  properties: SheetProperties;
}

export interface SheetProperties {
  sheetId: number;
  title: string;
  index: number;
  sheetType: SheetType;
  gridProperties: GridProperties;
}

export interface GridProperties {
  rowCount: number;
  columnCount: number;
  frozenRowCount?: number;
  frozenColumnCount?: number;
}

export enum SheetType {
  Grid = "GRID",
}

/// own define
export interface ILanguageMessage {
  codeName: string;
  lang: string;
  message: string;
}

export interface IFetchGridSheet {
  /**grid id on sheet url */
  sheetId: number;

  /**
   * Google sheet ssid
   * You can take it on url sheet
   */
  ssid: string;
}

export interface IFetchAllGridSheet extends IFetchGridSheet {
  /**
   * Google api key from your console
   */
  apiKey: string;
}
