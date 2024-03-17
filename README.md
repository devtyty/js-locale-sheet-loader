# @megabee/js-locale-sheet-loader

## Getting started

To make it easy for you to get started with js locale generator, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Install package

- with **npm**

```sh
npm install --save-dev @megabee/js-locale-sheet-loader
```

- with **yarn**

```sh
yarn add --dev @megabee/js-locale-sheet-loader
```

## 🔱 Multiple module (all grid sheet)
#

1. Create `apiKey` on google console with your account
2. Get ssid on your url google sheet or sheet id
    > Format: `https://docs.google.com/spreadsheets/d/{{your_ssid}}/edit#gid={{your_sheet_id}}`
3. Generate
    ```javascript
    const {LanguagesHelper} = require("@megabee/js-locale-sheet-loader");

    LanguagesHelper.loadLangFromSheet({
        ssid: "...your ssid",
        apiKey: "...your google api key",
        defaultLang: "en",
    }).then((dataLanguage) => {
        console.log("result: ", dataLanguage);

        /// You can do something with this data
        /// Generate to your file translation
    });
    ```

## 🔱 Single grid sheet
#

1. Get ssid on your url google sheet or sheet id
    > Format: https://docs.google.com/spreadsheets/d/`[your ssid]`/edit#gid=`[sheet id]`
3. Generate
    ```javascript
    const {LanguagesHelper} = require("@megabee/js-locale-sheet-loader");

    LanguagesHelper.loadLangFromGridSheet({
        ssid: "your ssid",
        sheetId: "your sheet id",
        defaultLang: "en",
    }).then((dataLanguage) => {
        console.log("result: ", dataLanguage);
        /// You can do something with this data
        /// Generate to your file translation
    });
    ```
4. Generate with your output folder
    ```javascript
    const {
        generateLangFromGridSheet,
    } = require("@megabee/js-locale-sheet-loader");

    generateLangFromGridSheet({
        defaultLang: "en",
        sheetId: "0",
        ssid: "1qH_wY1khh48iGCmIrRwXhOdTR-21aK1zKrExptOFECY",
        outputDir: "./i18n-resources",
    });
    ```

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
