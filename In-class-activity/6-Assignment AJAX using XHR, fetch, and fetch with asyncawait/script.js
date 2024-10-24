let btnFetch = document.getElementById('fetchSearch');
let searchText = document.querySelector('input[type="text"]');
let searchResults = document.getElementById("searchResults");


// handle search button click
btnFetch.addEventListener("click", function () {
    // clear previous search results
    searchResults.innerHTML = "";

    console.log(` btn event ${searchText.value}`);
    fetchWheather(searchText.value)
});

// fetch with asyncawait
async function fetchWheather(keyword) {
    var url = "https://api.weatherapi.com/v1/forecast.json";

    var apiKey = "210a3b9a0a1b4feaa0275717241610";
    var params = "key=" + apiKey + "&q=" + encodeURIComponent(keyword) + "&days=1&aqi=no&alerts=no";
    if (!keyword) {
        return;
    }
    var requestOptions = {
        method: 'GET'
    };

    const response = await fetch(url + "?" + params, requestOptions); // Wait until the request completes.
    const data = await response.json(); // waits until the response completes
    
    processResponse(data);
}

function processResponse(respObj) {
    
    let nameElem = document.createElement("p");
    nameElem.innerHTML = respObj.location.name;
    searchResults.appendChild(nameElem);
    
    let temp = document.createElement("p");
    temp.innerHTML = respObj.current.temp_c + " C";
    searchResults.appendChild(temp);

    let condition = document.createElement("p");
    condition.innerHTML = respObj.current.condition.text;
    searchResults.appendChild(condition);

}