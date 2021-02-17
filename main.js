const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', getCountryData);

const searchField = document.getElementById('search-field')
searchField.addEventListener('keyup', setQuery);

// maak query een globale variabele, zodat we deze zowel in de setQuery als in de getCountryData functie kunnen gebruiken (kopie vanuit uitwerking, aangezien ik de oplossing niet gemaakt kreeg)
let query = '';

// geef het event object mee en haal de waarde eruit als er op 'enter' gedrukt wordt (kopie vanuit uitwerking, aangezien ik de oplossing niet gemaakt kreeg)
function setQuery(e) {
    query = e.target.value;
    if (e.keyCode === 13) {
        getCountryData();
    }
}

// koppel het element met id country-container uit index.html met dit js
const countryContainer = document.getElementById('country-container')

async function getCountryData() {

    // haal het land uit het input field
    const countryField = document.getElementById('search-field').value;
    // const countryField = "belgium";

    // zoeken met deels naam of volledige naam
    // const url = `https://restcountries.eu/rest/v2/name/${countryField}`

    // alleen zoeken met volledige naam
    const url = `https://restcountries.eu/rest/v2/name/${countryField}?fullText=true`

    // maakt een lege error ruimte welke gevuld word bij een onjuiste invoering
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';

    // // sla de referentie op naar de country-container waarin de informatie van een land staat
    const previousSearchResult = document.getElementById('country');
    // // als deze referentie bestaat (en er dus al een land op de pagina wordt weergegeven) dan halen we deze eerst weg
    if (previousSearchResult) {
        countryContainer.removeChild(previousSearchResult);
    }

    //
    try {
        console.clear();
        const response = await axios.get(url);
        const countryInfo = response.data[0];

        // laat de inhoud van de API zien
        console.log(countryInfo);

        //een div element word aangemaakt met id country
        const country = document.createElement('div');
        country.setAttribute('id', 'country');

        const countryLeft = document.createElement('div');
        countryLeft.setAttribute('class', 'info-left');
        country.appendChild(countryLeft);

        const countryRight = document.createElement('div');
        countryRight.setAttribute('class', 'info-right');
        country.appendChild(countryRight);

        // een img element word aangemaakt en toegevoegd aan de country div
        const countryFlag = document.createElement('img');
        countryFlag.setAttribute('src', countryInfo.flag);
        countryFlag.setAttribute('id', 'flag')
        countryLeft.appendChild(countryFlag);

        // een h1 element word aangemaakt en toegevoegd aan de country div
        const countryName = document.createElement('h1')
        countryName.setAttribute('class', 'country-info-right')
        countryName.textContent = countryInfo.name;
        countryRight.appendChild(countryName);

        // een p element word aangemaakt en toegevoegd aan de country div
        const countryPopulation = document.createElement('p')
        countryPopulation.setAttribute('class', 'country-info-right')
        countryPopulation.textContent = `${countryInfo.name} is situated in ${countryInfo.subregion}. It has a population of ${countryInfo.population}.`;
        countryRight.appendChild(countryPopulation);

        // een p element word aangemaakt en toegevoegd aan de country div
        const countryCapital = document.createElement('p');
        countryCapital.setAttribute('class', 'country-info-right')
        countryCapital.textContent = `The capital is ${countryInfo.capital} and you can pay with ${currencyDescription(countryInfo.currencies)}`;
        countryRight.appendChild(countryCapital);

        // een p element word aangemaakt en toegevoegd aan de country div
        const countryLanguage = document.createElement('p');
        countryLanguage.setAttribute('class', 'country-info-right')
        countryLanguage.textContent = languageDescription(countryInfo.languages);
        countryRight.appendChild(countryLanguage);

        // de country div word toegevoegd aan de country-container div
        countryContainer.appendChild(country);

        // functie om de valuta's weer te geven
        function currencyDescription(currencies) {
            if (currencies.length >= 2) {
                return `${currencies[0].name}'s and ${currencies[1].name}'s.`;
            }
            return `${currencies[0].name}'s.`;
        }

        // functie om de talen weer te geven
        function languageDescription(languages) {
            let output = `They speak `;

            for (let i = 0; i < languages.length; i++) {
                if (i === languages.length - 1) {
                    return output = output + languages[i].name + `.`;
                }
                if (languages.length === 2 || i === languages.length - 2) {
                    output = output + languages[i].name + ` and `;
                } else {
                    output = output + languages[i].name + `, `;
                }
            }
        }
    // de volgende code word uitgevoerd in het geval van een error in het het bovenstaande stuk (try)
    } catch {
        console.clear()
        console.log(`Invalid country.`);
        if (countryField === '') {
            errorMessage.textContent = `Please enter a valid country.`
        } else {
            errorMessage.textContent = `${countryField} doesn't exist, please enter a valid country.`
        }
    }

    // maakt het zoekveld leeg
    document.getElementById("search-field").value = "";
}