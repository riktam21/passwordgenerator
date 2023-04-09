const passwordDisplay = document.querySelector('.disPass');
const dataCopy = document.querySelector('.data-copy');
const dataMsg = document.querySelector('.data-copy-msg');
const slider = document.querySelector('[data-lengthSlider]');
const display = document.querySelector('[data-lengthNumber]');
const upper = document.querySelector('#uppercase');
const lower = document.querySelector('#lowercase');
const number = document.querySelector('#numbers');
const symbol = document.querySelector('#symbols');
const indicator = document.querySelector('.indicator');
const generateBtn = document.querySelector('.btn');
const allCheckBox = document.querySelectorAll('input[type=checkbox]');
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password="";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
setIndicator("#ccc");
function handleSlider()
{
    slider.value = passwordLength;
    display.innerText = passwordLength;
    const min = slider.min;
    const max = slider.max;
    slider.style.backgroundSize = ((passwordLength - min)*100/(max - min)) + "% 100%"
}

function setIndicator(color)
{
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRndInteger(0,9);
}

function generateLowerCase() {  
    return String.fromCharCode(getRndInteger(97,123))
}

function generateUpperCase() {  
 return String.fromCharCode(getRndInteger(65,91))
}

function generateSymbol() {
 const randNum = getRndInteger(0, symbols.length);
 return symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (upper.checked) hasUpper = true;
    if (lower.checked) hasLower = true;
    if (number.checked) hasNum = true;
    if (symbol.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}
async function copyContent() {
    try{
        navigator.clipboard.writeText(passwordDisplay.value);
        dataMsg.innerText = "copied";
    }
    catch(e) {
        dataMsg.innerText = "error";
    }
    dataMsg.classList.add("active");

    setTimeout( () => {
        dataMsg.classList.remove("active");
    },2000);
}
function shufflePassword(array){
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

slider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})
dataCopy.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    if(passwordLength < checkCount ) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

generateBtn.addEventListener('click', () =>{
    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    password = "";

    let funcArr = [];
    if(upper.checked)
        funcArr.push(generateUpperCase);

    if(lower.checked)
        funcArr.push(generateLowerCase);

    if(number.checked)
        funcArr.push(generateRandomNumber);

    if(symbol.checked)
        funcArr.push(generateSymbol);

    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("Compulsary adddition done");

    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");

    password = shufflePassword(Array.from(password));
    console.log("Password Shuffling Done");
   
    passwordDisplay.value = password;
    calcStrength();

});