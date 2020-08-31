const apiInfo = {
  api: 'https://api.ratesapi.io/api/',
  endpoint: 'latest'
}

const url = `${apiInfo.api}${apiInfo.endpoint}`


window.onload = () => {
  setupEventHandlers();  
}

const setupEventHandlers = () => {
  const searchButton = document.querySelector('#search-button');
  searchButton.addEventListener('click', handleSearchEvent);

  const clearButton = document.querySelector('#clear-button');
  clearButton.addEventListener('click', clearList);

  const inputText = document.querySelector('#currency-input');
  inputText.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      handleSearchEvent();
    }
  });
}

const handleSearchEvent = () => {
  const currencyValue = document.querySelector('#currency-input').value;

  if (currencyValue === '') {
    renderEmptyAlert()
  } else {
    clearList();
    fetchCurrency(currencyValue);
  }
}

const renderEmptyAlert = () => {
  window.alert('Por favor, insira alguma moeda!');
}

const clearList = () => {
  const currencyList = document.querySelector('#currency-list');
  currencyList.innerHTML = '';
}

const fetchCurrency = (currency) => {
  const endpoint = `${url}?base=${currency}`;

  fetch(endpoint)
    .then((response) => response.json())
    .then((object) => {
      if (object.error) {
        throw new Error(object.error);
      } else {
        handleRates(object.rates);
      }
    })
    .catch((error) => handleError(error))
}

const handleError = (errorMessage) => {
  window.alert(errorMessage);
}

const handleRates = (rates) => {
  const ratesKeys = Object.keys(rates).sort();
  let currencyNumber = document.querySelector('#currency-number').value;

  if(!currencyNumber) currencyNumber = 1;

  ratesKeys.forEach((key) => {
    const value = ((Math.round(rates[key] * 100)) / 100) * currencyNumber;
    console.log(value);
    renderRate(key, value);
  })
}

const renderRate = (key, value) => {
  const currencyList = document.querySelector('#currency-list');
  const formattedValue = value.toFixed(2);

  const li = document.createElement('li');
  li.innerHTML = `<b>${key}:</b> ${formattedValue}`;

  currencyList.appendChild(li);
}
