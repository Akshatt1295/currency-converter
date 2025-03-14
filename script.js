const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption =document.createElement("option");
        newOption.innerText =currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
         else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag=(element)=>{
    let currCode = element.value;
    let countrycode = countryList[currCode];
    let newsrc =`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amVal = amount.value;
    if (amVal==="" || amVal<1) {
        amVal=1;
        amount.value="1";
    }
    
    const URL =`${BASE_URL}/${fromCurr.value.tolowercase()}/${toCurr.value.tolowercase()}.json`;
    let response = await fetch(URL);
    console.log(response);
});