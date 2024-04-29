const apiKey = '17f83690aec913a5880c77f899653a57';

const date = new Date();
const hour = date.getHours();

const heading = document.getElementById('heading');
const message = document.getElementById('message');
const errorP = document.getElementById('error');
const notInCleveland = document.getElementById('notInCleveland');
let enteredCity = document.getElementById('city').value;

document.getElementById('submit').addEventListener('click', getWeather(enteredCity));
notInCleveland.addEventListener('click', showCityOption());
window.onload = event => {
    getWeather('Cleveland');
}

async function getWeather(city){    
    if (city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeather(weatherData);
        }
        catch(error){
            displayError(error);
        }
        errorP.innerText = '';
    } else {
        displayError("Please enter the city where you're currently located.");
    }
}

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok){
        // displayError("Where??");
        throw new Error("Could not fetch weather data.");
    }
    return await response.json();
}

function displayWeather(data){
    const {name: city, 
        main: {temp, humidity}, 
        weather: [{description, id}]} = data;
    var timeOfDay;
    if (hour >= 4 && hour < 12){
        timeOfDay = 'morning';
    } else if (hour >= 12 && hour < 17){
        timeOfDay = 'afternoon';
    } else if (hour >= 5 && hour < 21){
        timeOfDay = 'evening';
    } else {
        timeOfDay = 'night';
    }
    heading.innerText = `Good ${timeOfDay}, Gabby!`;
    message.innerText = `It's rainy in ${city}.`;
    if (getDate() == '29'){
        message.innerText += "Don't forget: you have your divorces coming up!";
    } else if (getDate() == '12'){
        message.innerText += "It's a great day for ice cream!";
    }
}

function getImage(weatherId){

}

function displayError(message){
    heading.innerText = '';
    errorP.innerText = message;
}

function showCityOption(){
    document.getElementById('otherLocation').classList.toggle('hidden');
    document.getElementById('inCleveland').classList.remove('height80');
    document.getElementById('inCleveland').classList.add('height70');
    notInCleveland.classList.add('hidden');
}





















