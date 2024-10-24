const initalLikes = 100;
const initalDisLikes = 20;

let likeCount = initalLikes;
let dislikeCount = initalDisLikes;

//get all UI elemnets
const likesBtn = document.getElementById("like-btn");
const disLikesBtn = document.getElementById("dislike-btn");
const commentBox = document.getElementById("comment-box");
const submmitBtn = document.getElementById("submmit");
const clearBtn = document.getElementById("clear");
const commentsList = document.getElementById("comments-list");

// set the inital values for the buttons
likesBtn.innerText = "👍" + likeCount;
disLikesBtn.innerText = "👎" + dislikeCount;

// Handle like btn
likesBtn.addEventListener("click", () => {
    likeCount++;
    likesBtn.innerText = "👍" + likeCount;
    setCookie();
})

// Handle dislike btn
disLikesBtn.addEventListener("click", () => {
    dislikeCount++;
    disLikesBtn.innerText = "👎" + dislikeCount;
    setCookie();
})


// handle submit a comment
// create <p> and add the comment to it
// add <p> to the comments list
// clear the comment box
// set cookie
submmitBtn.addEventListener("click", () => {
    const pElem = document.createElement("p");
    pElem.innerText = commentBox.value.trim();
    commentsList.appendChild(pElem);
    commentBox.value = "";
    setCookie();
})

// handle clear
clearBtn.addEventListener("click", () => {
    // reset list
    commentBox.value = "";
    // clear cookie
    document.cookie = "voted=true; path=/; expires=" + new Date(Date.now() -1).toUTCString();
    console.log("cookie cleared");
})

// set cookies
function setCookie() {
    // set the cookie to expire in one minute
    const expireOn = new Date(Date.now() + 1 * 60 * 1000);
    const cookieString = "voted=true; path=/; expires=" + expireOn.toUTCString();
    document.cookie = cookieString;
}


// check for coockies when the page is loading
window.onload = function() {
    // check if the user already voted
    if (document.cookie.valueOf("voted") && document.cookie.indexOf("voted") > -1) {
        console.log("cookie found");
        // disable all buttons
        likesBtn.disabled = true;
        disLikesBtn.disabled = true;
        submmitBtn.disabled = true;
    }
}