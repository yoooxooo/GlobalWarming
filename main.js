import {setYearInfo} from "./neuro-module.1.js";
import {Neuro} from "./neuro-module.2.js";
import {insertImage} from "./neuro-module.3.js";

setYearInfo();

const neuro = new Neuro(
    document.querySelector("#neuro-status"),
    document.querySelector("#result-data"),
    () => { insertImage(document.querySelector(".app-footer")) }
);

neuro.startNeuro(0);