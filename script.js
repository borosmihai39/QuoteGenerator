// Get Quotes from API
// asynq fetch request within a try catch statement
// asynq func can run at any time, independently, and it wont stop the browser from completing the loading of a page
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const facebookBtn = document.getElementById('facebook');
const newQuoteBtn = document.getElementById('new-quote');

// empty array
let apiQuotes = [];

// show new Quote
function newQuote() {
    // Pick a random quote from apiQuotes array\
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    authorText.textContent = quote.author;

    if (quote.text.length > 50) {
        // add a css class
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;
}

//Check quote length to determine the styling


async function getQuotes() {
    document.querySelector('meta[name="og:title"]').setAttribute("content", quoteText);
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

// On Load run our function
getQuotes();