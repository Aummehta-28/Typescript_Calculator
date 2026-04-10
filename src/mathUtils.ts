import { angleModeBtn } from "./main.js";
type mode = "DEG" | "RAD"

let angleMode: mode = "DEG"

export function handleAnglemod() {
    if(!angleModeBtn) throw new Error("Not found in dom")
    let newMode = angleMode
    if (newMode === "DEG") {
        newMode = "RAD";
    } else {
        newMode = "DEG";
    }

    angleMode=newMode;

    angleModeBtn.textContent = newMode;
}



export function applyOperator(a: number, b: number, operator: string): number {
    if (operator === "+") return a + b;

    if (operator === "-") return a - b;

    if (operator === "*") return a * b;

    if (operator === "/") {
        if (b === 0) throw new Error("Infinity");
        return a / b;
    }

    if (operator === "%") {
        if (b === 0) throw new Error("Modulo by zero not allowed");
        return a % b;
    }

    if (operator === "^") return Math.pow(a, b);
    throw new Error("Not valid")
}




export function applyFunction(value: number, func: string): number {

    if (func === "sin") {
        if (angleMode === "DEG") {
            return Math.sin(value * Math.PI / 180);
        }
        return Math.sin(value);
    }

    if (func === "cos") {
        if (angleMode === "DEG") {
            return Math.cos(value * Math.PI / 180);
        }
        return Math.cos(value);
    }

    if (func === "tan") {
        if (angleMode === "DEG") {
            return Math.tan(value * Math.PI / 180);
        }
        return Math.tan(value);
    }

    if (func === "log") {
        if (value <= 0) {
            throw new Error("log of zero or negative number undefined");
        }
        return Math.log10(value);
    }

    if (func === "ln") {
        if (value <= 0) {
            throw new Error("ln of zero or negative number undefined");
        }
        return Math.log(value);
    }

    if (func === "sqrt") {
        if (value < 0) {
            throw new Error("sqrt of negative number undefined");
        }
        return Math.sqrt(value);
    }

    if (func === "abs") return Math.abs(value);
    throw new Error("Function not valid")
}


export function factorial(n: number): number {

    if (!Number.isInteger(n) || n < 0) throw new Error("Invalid factorial");

    let ans = 1;

    for (let i = n; i >= 1; i--) {
        ans *= i;
    }

    return ans;
}


export function precedence(operator: string): number {
    if (operator == "^") return 3;

    if (operator == "*" || operator == "/" || operator == "%") return 2;

    if (operator == "+" || operator == "-") return 1;

    return 0
}