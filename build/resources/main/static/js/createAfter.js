const elementTitle = document.querySelector("#displayTitle");
const elementNumber = document.querySelector("#displayNumber");

let placeList = [];
const KEY_PLACE = "place";
const KEY_SELECTED_PLACE = "selectedPlace";
if(localStorage.getItem(KEY_PLACE)) {
    const newPlaceList = JSON.parse(localStorage.getItem(KEY_PLACE));
    placeList = newPlaceList;
}
if(localStorage.getItem(KEY_SELECTED_PLACE)) {
    const objectPlace = JSON.parse(localStorage.getItem(KEY_SELECTED_PLACE));
    elementTitle.innerText = objectPlace.name;
    elementNumber.innerText = "Current Member:\n" + Math.floor(objectPlace.capacity * Math.random()) + "/" + objectPlace.capacity;
    console.log("PLACE INFORMATION: " + JSON.stringify(objectPlace));
}

const elementList = document.querySelector("#downSection ul");
const elementForm = document.querySelector("#downSection form");
const elementInput = elementForm.querySelector("input");
let ledgerList = [];
const KEY_LEDGER = "ledger";
function addButton(newLister) {
    const newDelete = document.createElement("button");
    // const newFix = document.createElement("button");
    newDelete.innerText = "❌";
    newDelete.addEventListener("click", (event) => {
        event.preventDefault();
        const TARGET_ID = event.target.parentElement.id;
        event.target.parentElement.remove();
        const newList = ledgerList.filter((item) => {
            if(item.id==TARGET_ID) return false;
            else return true;
        });
        ledgerList = newList;
        console.log(ledgerList);
        localStorage.setItem(KEY_LEDGER, JSON.stringify(ledgerList));
    });
    // newFix.innerText = "👀";
    // newFix.addEventListener("click", (event) => {
    //   event.preventDefault();
    //   const TARGET_ID = event.target.parentElement.id;
    // });
    newLister.appendChild(newDelete);
    // newLister.appendChild(newFix);
}
if(localStorage.getItem(KEY_LEDGER)) {
    ledgerList = JSON.parse(localStorage.getItem(KEY_LEDGER));
    ledgerList.forEach((item) => {
        const newLister = document.createElement("li");
        newLister.innerText = item.text;
        newLister.id = item.id;
        addButton(newLister);
        elementList.appendChild(newLister);
    });
}
elementForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newId = Date.now();
    ledgerList.push({id: newId, text: elementInput.value});
    const newLister = document.createElement("li");
    newLister.id = newId;
    newLister.innerText = elementInput.value;
    addButton(newLister);
    elementList.appendChild(newLister);
    elementInput.value = "";
    localStorage.setItem(KEY_LEDGER, JSON.stringify(ledgerList));
});