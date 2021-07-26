// Get Quotes from API
// asynq fetch request within a try catch statement
// asynq func can run at any time, independently, and it wont stop the browser from completing the loading of a page
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const facebookBtn = document.getElementById('facebook');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// loading function - show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// empty array
let apiQuotes = [];

// show new Quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array\
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    authorText.textContent = quote.author;

    if (quote.text.length > 50) {
        // add a css class
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
    document.querySelector('meta[property="og:title"]').setAttribute("content", quote.text);

    //console.log(document.querySelector('meta[property="og:title"]').content);
    document.title = quote.text;
    //console.log(document.title);
}


//Check quote length to determine the styling


async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    // try catch allows us to attempt to complete a fetch request, but if it doesnt work we can catch the error info
    try {
        // fetch request
        // this constant will not be populated untill it has some data fetched from our API
        const response = await fetch(apiUrl);
        // we are getting json from our api as a response and we are turning it into a json object and we pass that into a global variable apiQuotes
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch error here
    }
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);

// On Load run our function
getQuotes();

