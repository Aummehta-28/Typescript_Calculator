import { applyFunction, applyOperator, precedence, factorial } from "./mathUtils.js";
import { FUNCTIONS } from "./ui.js";


export function evaluate(expression: string): number {
    const valueStack: number[] = [];
    const operatorStack: string[] = [];

    let currentNumber = "";
    let i = 0;

    while (i < expression.length) {

        let char = expression[i]
        if (char === undefined) {
            throw new Error("char is undefined")
        }

        currentNumber = "";
        // Handle unary minus before parentheses or functions
        // Example: -(3+4)  or  -sin(30)00


        if (isUnaryMinus(char, expression, i)) {

            valueStack.push(-1);
            operatorStack.push("*");
            i++;
            continue;
        }

        // Parse numbers (including decimals and negative numbers)
        if (isDigit(char) || char === "." || ((char === "-") && (i === 0 || isOperator(expression[i - 1])))) {

            // Solves for cases : (-3)3 
            if (expression[i - 1] === ")") {
                operatorStack.push("*");
            }

            // Handles negative numbers
            if (char === '-' && expression[i + 1] !== "(") {
                currentNumber += char;

                i++;
            }
            // Process until Number or Dot found
            while (isDigit(expression[i]) || expression[i] === ".") {
                currentNumber += expression[i];
                i++;

            }

            valueStack.push(parseFloat(currentNumber));
            continue;
        }




        // Detect functions like sin, cos, tan, sqrt etc.
        const funName = FUNCTIONS.find(fn => expression.startsWith(fn, i))
        if (funName) {

            // Handle implicit multiplication like 2sin(30) 

            explicitMultiply(valueStack, operatorStack, expression, i);

            operatorStack.push(funName);

            i += funName.length;

            continue;

        }

        if (char === "π") {

            explicitMultiply(valueStack, operatorStack, expression, i);
            valueStack.push(Math.PI);
            i++;
            continue;
        }

        if (char === "e") {

            explicitMultiply(valueStack, operatorStack, expression, i);

            valueStack.push(Math.E);
            i++;
            continue;

        }
        if (char === "!") {
            const value = popValue(valueStack)
            valueStack.push(factorial(value));

            i++;
            continue;
        }




        if (char === "(") {
            explicitMultiply(valueStack, operatorStack, expression, i);

            operatorStack.push(char);

            i++;
            continue;
        }

        // Process stack until matching "(" is found
        if (char === ")") {
            while (operatorStack.length && operatorStack.at(-1) !== "(") {
                processStack(valueStack, operatorStack);
            }
            operatorStack.pop();

            if (operatorStack.length && FUNCTIONS.includes(lastElement(operatorStack))) {
                let value = popValue(valueStack);
                let func = popOperator(operatorStack)

                valueStack.push(applyFunction(value, func));
            }
            i++;
            continue;
        }
        if (isOperator(char)) {
            // Check precedence of last character in Operator Stack , 
            // if higher then proceed to Stack else push to operator Stack
            while (
                operatorStack.length &&
                ((precedence(lastElement(operatorStack)) > precedence(char)) ||
                    (precedence(lastElement(operatorStack)) === precedence(char) && char !== "^")
                )
            ) {
                processStack(valueStack, operatorStack);
            }
            operatorStack.push(char);
            i++;
        }
    }
    while (operatorStack.length) {
        processStack(valueStack, operatorStack);
    }

    const a = valueStack.pop();
    if (a === undefined) {
        throw new Error("Error")
    }
    return a
}

function isOperator(ch: string | undefined): boolean {
    if (ch === undefined) return false;

    if ("+-*/(^".includes(ch)) return true;

    return false;
}

function isDigit(ch: string | undefined): boolean {
    if (ch === undefined) return false;

    if (/^[0-9]$/.test(ch)) return true;

    return false;
}

function popOperator(stack: string[]): string {
    const op = stack.pop();

    if (op === undefined) {
        throw new Error("Invalid expression");
    }

    return op;
}

function popValue(stack: number[]): number {
    const val = stack.pop();

    if (val === undefined) {
        throw new Error("Invalid expression");
    }
    return val;
}

function explicitMultiply(
    valueStack: number[],
    operatorStack: string[],
    expression: string,
    i: number): void {
    if (valueStack.length >= 1 && (isDigit(expression[i - 1]) || expression[i - 1] === ")")) {
        operatorStack.push("*");
    }
}

function processStack(valueStack: number[], operatorStack: string[]): void {
    const b = popValue(valueStack);
    const a = popValue(valueStack);

    const operator = popOperator(operatorStack)

    const result = applyOperator(a, b, operator);
    valueStack.push(result);

}


function lastElement(operatorStack: string[]): string {
    const last = operatorStack[operatorStack.length - 1];

    if (last === undefined) {
        return "";
    }

    return last;
}

function isUnaryMinus(char: string, expression: string, i: number): boolean {

    const nextFunction = FUNCTIONS.some(fn => expression.startsWith(fn, i + 1));

    if (char === "-"
        && (i === 0 || isOperator(expression[i - 1]))
        && ((expression[i + 1] === "(") || nextFunction)) {
        return true
        
    }
    return false
}


export function isValid(expression: string): boolean {
    if (/^[+*/%!]/.test(expression)) {
        alert("Cannot start with operator");
        return false;
    }

    if (expression === "") {
        alert("Empty expression");
        return false;
    }

    if (/[+\-*/.]$/.test(expression)) {
        alert("Cannot end with operator");
        return false;
    }

    if (/[+*/]{2,}/.test(expression)) {
        alert("Invalid operator sequence");
        return false;
    }

    if (/\d*\.\d*\./.test(expression)) {
        alert("Multiple decimals in number");
        return false;
    }

    let count = 0;

    for (const ch of expression) {

        if (ch === "(") count++;

        if (ch === ")") count--;

        if (count < 0) {
            alert("Invalid order of parentheses");
            return false;
        }
    }

    if (count !== 0) {
        alert("Unbalanced parentheses");
        return false;
    }
    return true;
}