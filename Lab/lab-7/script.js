const xhrSearchBtn = document.getElementById("xhrSearch");
xhrSearchBtn.addEventListener("click", searchUsingXHR);

const fetchSearchBtn = document.getElementById("fetchSearch");
fetchSearchBtn.addEventListener("click", searchUsingFetch);

const fetchAsyncAwaitSearchBtn = document.getElementById("fetchAsyncAwaitSearch");
fetchAsyncAwaitSearchBtn.addEventListener("click", searchUsingFetchAsyncAwait);

const searchQuery = document.getElementById("searchQuery");

const API_URL = "https://api.unsplash.com/search/photos";
const ACCESS_Key = "tPXmSEPjMIqv1o_L7mpGychjIrONJnVOtg0aDmVY2eU";


//search using XMLHTTPRequest
function searchUsingXHR() {
    let queryTerm = searchQuery.value.trim();
    // create request
    const xhr = new XMLHttpRequest();
    xhr.open("GET", API_URL + "?query=" + queryTerm); // API URL
    xhr.setRequestHeader("Authorization", "Client-ID " + ACCESS_Key); // access key

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            let responseText = xhr.responseText;
            let responseObject = JSON.parse(responseText);

            createImages(responseObject);
        }    
    }

    xhr.send();
}

async function searchUsingFetchAsyncAwait() {
    let queryTerm = searchQuery.value.trim();
    const response = await fetch(API_URL + "?query=" + queryTerm ,{
        method: "GET",
        headers: {
            "Authorization": "Client-ID " + ACCESS_Key
        }
    })
    if (response.ok) {
        const responseObj = await response.json();
        createImages(responseObj);
    }
    
}

function searchUsingFetch() {
    let queryTerm = searchQuery.value.trim();
    const response = fetch(API_URL + "?query=" + queryTerm ,{
        method: "GET",
        headers: {
            "Authorization": "Client-ID " + ACCESS_Key
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        createImages(data);
    })
}

function createImages(data){
    const resultsElem = document.getElementById("results");

    for (let item of data.results) {
        let img = document.createElement("img");
        img.src = item.urls.small;
        img.alt = item.alt_description;
        resultsElem.appendChild(img);
    }
}
