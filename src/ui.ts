import { evaluate, isValid } from "./evaluator.js";
import { saveHistory, renderHistory } from "./calcHistory.js";
import { display } from "./main.js";


export const FUNCTIONS= ["sin", "cos", "tan", "ln", "log", "sqrt", "abs"] ;

export function handleButtonClick(event: Event) :void{
    if(!display)  throw new Error("Could not find .display in the DOM");

    const target = <HTMLButtonElement>event.target 

    if (target.tagName !== "BUTTON") return;

    if (target.id === "angle-mode") return;

    const buttonValue = target.dataset.value || target.textContent;

    if (buttonValue === "AC") {
        display.textContent = "";
        return;
    }

    if (buttonValue === "DEL") {
        display.textContent = display.textContent.slice(0, -1);
        return;
    }

    if (buttonValue === "=") {
        return handleEvaluation();
    }

    if (buttonValue === "1/x") {
        return handleReciprocal();
    }

    if (FUNCTIONS.includes(buttonValue)) {
        display.textContent += buttonValue + "(";
    } else {

        display.textContent += buttonValue;
    }
}


function handleEvaluation():void {
        if (!display) throw new Error("Could not find .display in the DOM");
        const expression = display.textContent;
        const error = isValid(expression);

        if (!error) {
            return;
        }

        if (expression) {
            const result = evaluate(expression);

            if (result == undefined) {
                throw new Error("Result Undefined")
            }
            

            display.textContent = result.toString();
            saveHistory(expression, result);
            renderHistory();
        }
    
}

function handleReciprocal():void {
    if (!display) throw new Error("Could not find .display in the DOM");
    const error = isValid(display.textContent);

    if (!error) {
        return;
    }


    const result = evaluate(display.textContent);
    if (result !== undefined) {
        const answer = 1 / result;
        display.textContent = answer.toString()
    }

}