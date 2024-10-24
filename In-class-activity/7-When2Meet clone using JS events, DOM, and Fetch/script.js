const startTimeSelectElem = document.getElementById("start-time");
const endTimeSelectElem = document.getElementById("end-time");
const submitButton = document.getElementById("submit-btn");

let startHour = 8;
let endHour = 17;

populateDropDownMenu(startTimeSelectElem, 8);
populateDropDownMenu(endTimeSelectElem, 17);
function populateDropDownMenu(selectElem, selectedValue) {
    for (let i = 0; i < 24; i++) {
        optionElem = document.createElement("option");
        let hour = i % 12 === 0 ? 12 : i % 12; // this if statement is will get the 12 hour time format from a 24 hour time format
        hour += ':00'
        hour += i<12 ? ' AM' : ' PM'; // if i is less than 12 add AM else add PM
        optionElem.text = hour;
        optionElem.value = i;

        if (i === selectedValue) {
            optionElem.selected = true;
        }
        selectElem.appendChild(optionElem);
    }
}


// event listeners
// no earlier than listener
startTimeSelectElem.addEventListener("change", function () {
    startHour = parseInt(this.value); // this == startTimeSelectElem
    createTimeTable()
})

// no later than listener
endTimeSelectElem.addEventListener("change", function () {
    endHour = parseInt(this.value); // this == endTimeSelectElem
    createTimeTable()
})


// function to create the table
function createTimeTable() {
    const divContainer = document.getElementById("timeTable");
    // create table as a string and use divContainer.innerHTML
    let tableHTML = '<table> <thead><tr><th></th>';
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    days.forEach(day => {
        tableHTML += `<th class="day-header">${day}</th>`
    })
    tableHTML += '</tr></thead><tbody>'

    // add time slots to <tbody>
    for (let i = startHour; i <= endHour; i++) {
        let hour = i % 12 === 0 ? 12 : i % 12; // this if statement is will get the 12 hour time format from a 24 hour time format
        hour += ':00'
        hour += i<12 ? ' AM' : ' PM'; // if i is less than 12 add AM else add PM

        // create time slots (table rows)
        tableHTML += `<tr><td class="time-label">${hour}</td>`;
        days.forEach(day => {
            // add time slots with onclick event
            tableHTML += `
            <td class="time-slot" 
                onclick="toggleTimeSlot(this)"
                data-day="${day}" 
                data-time="${hour}">
            </td>
            `; // data-day and data-time are used to set a unique id for each time slot, in function toggleTimeSlot()
        });
        tableHTML += '</tr>'
    }

    tableHTML += '</tbody></table>'
    divContainer.innerHTML = tableHTML
}


// toggle selected time slots green
const selectedTimeSlots = new Set();
function toggleTimeSlot(tdElem){
    
    const timeSlotId = `${tdElem.dataset.day}-${tdElem.dataset.time}`; // set a unique id for each time slot using the data-day and data-time
    console.log(timeSlotId);
    // if the time slot has already been selected, remove it
    if(selectedTimeSlots.has(timeSlotId)){
        selectedTimeSlots.delete(timeSlotId);
        tdElem.classList.remove("selected");
    } else { // else add it
        selectedTimeSlots.add(timeSlotId);
        tdElem.classList.add("selected");
    }
}

// submit button listener
document.getElementById("submitMeeting").addEventListener("click", async function () {
    const username = document.getElementById("user-name").value;
    const eventName = document.getElementById("event-name").value;
    
    if(!username || !eventName){
        alert("Please enter your name and event name")
        return;
    }

    const bodyPayload ={
        username: username,
        eventName: eventName,
        slots: [...selectedTimeSlots]
    }
    
    const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // this url will post the data to the server and get it back
    const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(bodyPayload),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();


    console.log(`we got this back from the server`);
    console.log(data);
})

createTimeTable()
