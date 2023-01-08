// api key imported from another js file
// it is better to do this method in order to have the api key secured
import { MY_API_KEY } from './cartconfig.js';

(function onLoad()
{
    // function variable for button to function
    setButtonFunctions();

    // fetch API when the page has been loaded
    getCurrencyExchangeRates();
})();

function setButtonFunctions()
{
    // funtion for button when clicked
    document.getElementById('buttonCurrency').onclick = getCurrencyExchangeRates;
}

// Currency Exchange rates
async function getCurrencyExchangeRates()
{
    const from = document.getElementById('inputCurrencyFrom').value;
    const to = document.getElementById('inputCurrencyTo').value;
    // online api location
    await fetch("https://currency-exchange.p.rapidapi.com/exchange?q=1.0&from=" + from + "&to=" + to, {
        "method": "GET",
        "headers": {
            // api host and key to function
            "x-rapidapi-host": "currency-exchange.p.rapidapi.com",
            "x-rapidapi-key": MY_API_KEY
        }
    })
    // currency exchange rates response when called function has been set
    // api response 
    .then(response => response.json())
    .then(response => {
        console.log("Currency Exchange API object:");
        console.log(response);
        console.log("\n");

        // display data
        document.getElementById('currencyResult').innerHTML = 'Result: ' + response;
    })
    .catch(err => {
        console.log(err);
    });
}