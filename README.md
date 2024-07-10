# Support generate sheet's data for i18n multilang format

## Getting started

To make it easy for you to get started with js locale generator, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Install package

- with **cli** by config file

```sh
npx @megabeedev/js-locale-sheet-loader
```

- with **npm**

```sh
npm install --save-dev @megabeedev/js-locale-sheet-loader
```

- with **yarn**

```sh
yarn add --dev @megabeedev/js-locale-sheet-loader
```

## 🔱 Your sheet format

Example:

[https://docs.google.com/spreadsheets/d/1qH_wY1khh48iGCmIrRwXhOdTR-21aK1zKrExptOFECY/edit#gid=0](https://docs.google.com/spreadsheets/d/1qH_wY1khh48iGCmIrRwXhOdTR-21aK1zKrExptOFECY/edit#gid=0)

```javascript
ssid: 1qH_wY1khh48iGCmIrRwXhOdTR-21aK1zKrExptOFECY
sheetId: 0
```

## Gen language with config file

1. Create config file `locale.config.js` in your root project
2. Setup your config by sheet info

    ```javascript
    /**
    * Locale configuration
    * @type {import('@megabeedev/js-locale-sheet-loader').IConfig}
    */
    const config = {
        ssid: "1qH_wY1khh48iGCmIrRwXhOdTR-21aK1zKrExptOFECY",
        defaultLang: "en",
        sheetId: "0",
        outputDir: "./i18n-resources",
    };

    module.exports = config;
    ```

3. Run cli when you need refresh data from sheet

    ```sh
    npx @megabeedev/js-locale-sheet-loader
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

---

<a href="https://buymeacoffee.com/megabee" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" />