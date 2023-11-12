const elementName = document.querySelector("#placeName");
const elementLocation = document.querySelector("#location");
const elementCapacity = document.querySelector("#capacity");
const elementTimezone = document.querySelector("#timezone");
const elementRequirement = document.querySelector("#requirement");

let placeList = [];
const KEY_PLACE = "place";
const KEY_SELECTED_PLACE = "selectedPlace";
if(localStorage.getItem(KEY_PLACE)) {
    const newPlaceList = JSON.parse(localStorage.getItem(KEY_PLACE));
    placeList = newPlaceList;
    console.log(placeList);
}
const elementForm = document.querySelector("#formSection");
elementForm.addEventListener("submit", (event) => {
    let isPossible = true;
    const name2Check = elementName.value;
    placeList.forEach((item) => {
        if(item.name==name2Check) {
            // alert("IDENTICAL");
            isPossible = false;
        }
        // else alert("DIFFERENT");
    });
    if(isPossible==false) {
        alert("Already Existing Place!!");
        event.preventDefault();
        return;
    }
    const newPlace = {
        name: elementName.value,
        location: elementLocation.value,
        capacity: elementCapacity.value,
        timezone: elementTimezone.value,
        requirement: elementRequirement.value
    };
    placeList.push(newPlace);
    localStorage.setItem(KEY_SELECTED_PLACE, JSON.stringify(newPlace));
    localStorage.setItem(KEY_PLACE, JSON.stringify(placeList));
    console.log(placeList);
    alert("Registration Completed!!");
});