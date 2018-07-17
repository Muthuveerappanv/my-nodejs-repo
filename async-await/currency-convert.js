const axios = require('axios');
const request = require('request');

const getExchangeValue = async (to) => {
    try {
        const response = await axios.get('http://data.fixer.io/api/latest?access_key=6a6da9ccb8f3bed2d2edaa81b80616f0&format=1');
        if(!response.data.rates[to]){
            throw new Error();
        }
        return response.data.rates[to];
    } catch (e) {
        throw new Error(`Unable to get get Exchange Rate for EUR to ${to}`);
    }
}

const countryRes = async (curr) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${curr}`);
        return response.data.map(country => country.name);
    } catch (e) {
        throw new Error(`Unable to get Countries acccepting currency ${curr}`);
    }
}


const convertEURtoAny = async (to, val) => {
    const exchRate = await getExchangeValue(to);
    const acceptedCountries = await countryRes(to);
    return `${val} EUR equals ${exchRate * val} ${to}, it is accpeted in following countries: \n *** ${acceptedCountries} ***`;

}

convertEURtoAny('MMM', 6000).then(res => console.log(res)).catch(err => console.log(err.message));