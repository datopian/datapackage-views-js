import { DataView } from "./App";
import i18n from "./i18n/i18n"

window.DatapackageView = DataView;

if (i18n.options.resources) {
  console.log('Translations loaded')
}

export { DataView }
