import { handleButtonClick } from "./ui.js";
import { clearHistory,renderHistory} from "./calcHistory.js";
import { handleAnglemod } from "./mathUtils.js";


const display = document.querySelector<HTMLDivElement>('#display')

const button = document.querySelector<HTMLButtonElement>('.buttons') 

const clearHistoryBtn = document.querySelector<HTMLButtonElement>(".clear-history") 
const angleModeBtn = document.querySelector<HTMLButtonElement>("#angle-mode") 


if (!display) throw new Error("Could not find .display in the DOM");
if (!button) throw new Error("Could not find .buttons in the DOM");
if (!clearHistoryBtn) throw new Error("Could not find .ClearHistory Button in the DOM");
if (!angleModeBtn) throw new Error("Could not find .Angle mode btn in the DOM");

button.addEventListener("click", handleButtonClick);

clearHistoryBtn.addEventListener("click", clearHistory);

angleModeBtn.addEventListener("click",handleAnglemod)  




renderHistory();

export {display,angleModeBtn}