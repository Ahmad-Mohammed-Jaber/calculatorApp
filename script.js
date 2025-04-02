const numberBtns = document.querySelectorAll("[data-number]")
const operationBtns = document.querySelectorAll("[data-operation]")
const acBtn= document.querySelector("[data-ac]")
const deleteBtn = document.querySelector("[data-del]")
const equalsBtn = document.querySelector("[data-equals]")
const resTextElement = document.querySelector("[data-res]")
const prevResTextElement = document.querySelector("[data-prevRes]")
let prevOp = null


function appendNumber(number) {
    let inner = resTextElement.innerText 
    if (inner.includes(".") && number === ".") return
    inner += number
    console.log((inner))
    
    // if (inner.includes("."))
    // {
    //     resTextElement.innerText = inner
    //     return
    // }
        
    inner = inner.split(",").join("")
    resTextElement.innerText = parseFloat(inner).toLocaleString("en")
}

numberBtns.forEach(btn => {
    btn.addEventListener('click', () => appendNumber(btn.innerText))
});

function deleteNumber() {
    let text = resTextElement.innerText
    resTextElement.innerText = text.substr(0, text.length - 1)
}

deleteBtn.addEventListener("click", deleteNumber)

function ac() {
    resTextElement.innerText = "";
    prevResTextElement.innerText = "";
}

acBtn.addEventListener("click", ac)


function calc() 
{
    let num1 = prevResTextElement.innerText.split(",").join("")
    let num2 = resTextElement.innerText.split(",").join("")
    let res

    if (num1 === "" || num2 === "") return
    num1 = num1.substr(0, num1.length - 2)

    switch (prevOp) {
        case "+":
            res = parseFloat(num1) + parseFloat(num2)
            break    
        case "-":
            res = parseFloat(num1) - parseFloat(num2)
            break    
        case "*":
            res = parseFloat(num1) * parseFloat(num2)
            break    
        case "/":
            res = parseFloat(num1) / parseFloat(num2)
            break    
    }

    resTextElement.innerText = res.toLocaleString("en")
    prevResTextElement.innerText = ""
}   

equalsBtn.addEventListener("click", calc)

function doOperation(op) {
    let prev = prevResTextElement.innerText
    let cur = resTextElement.innerText

    console.log(prevOp)

    if (cur === "") 
    {
        prev = prev.substr(0, prev.length - 2)
        prev += " " + op;
        prevResTextElement.innerText = prev
        return
    }

    if (prevOp === null)
    {
        prevResTextElement.innerText = cur + " " + op
        resTextElement.innerText = ""
        prevOp = op
        return 
    }

    calc()
    prevResTextElement.innerText = resTextElement.innerText + " " + op
    resTextElement.innerText = ""
    prevOp = op
}

operationBtns.forEach(btn => {
    btn.addEventListener("click", () => doOperation(btn.innerText))
});


