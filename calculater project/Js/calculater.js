const output = document.getElementById("output");
const answer = document.getElementById("answer");

const buttons = {
    "0": document.getElementById("0"),
    "1": document.getElementById("1"),
    "2": document.getElementById("2"),
    "3": document.getElementById("3"),
    "4": document.getElementById("4"),
    "5": document.getElementById("5"),
    "6": document.getElementById("6"),
    "7": document.getElementById("7"),
    "8": document.getElementById("8"),
    "9": document.getElementById("9"),
    "+": document.getElementById("+"),
    "-": document.getElementById("-"),
    "*": document.getElementById("*"),
    "/": document.getElementById("/"),
    ".": document.getElementById("."),
    "^": document.getElementById("^"),
    "=": document.getElementById("="),
    clear: document.getElementById("C"),
    delete: document.getElementById("AC")
};

let justEvaluated = false;

function setExpression(value) {
    output.innerText = value || "0";
}

function appendValue(value) {
    const currentValue = output.innerText === "0" || justEvaluated ? "" : output.innerText;
    output.innerText = currentValue + value;
    answer.innerText = "Ready";
    justEvaluated = false;
}

buttons.clear.addEventListener("click", () => {
    setExpression("0");
    answer.innerText = "Ready";
    justEvaluated = false;
});

buttons.delete.addEventListener("click", () => {
    if (justEvaluated) {
        setExpression("0");
        answer.innerText = "Ready";
        justEvaluated = false;
        return;
    }

    const nextValue = output.innerText.slice(0, -1);
    setExpression(nextValue);
    answer.innerText = "Ready";
});

["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+", "-"].forEach((key) => {
    buttons[key].addEventListener("click", () => appendValue(key));
});

buttons["*"].addEventListener("click", () => appendValue("*"));
buttons["/"].addEventListener("click", () => appendValue("/"));
buttons["^"].addEventListener("click", () => appendValue("**"));

buttons["="].addEventListener("click", () => {
    try {
        const expression = output.innerText;
        const result = eval(expression);

        if (!Number.isFinite(result)) {
            throw new Error("Invalid calculation");
        }

        setExpression(`${result.toFixed(4)}`);
        answer.innerText = expression;
        justEvaluated = true;
    } catch (error) {
        console.error(error);
        answer.innerText = "Invalid expression";
        justEvaluated = false;
    }
});
