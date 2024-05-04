const apiKey = '17f83690aec913a5880c77f899653a57';

const date = new Date();
const hour = date.getHours();

const heading = document.getElementById('heading');
const message = document.getElementById('message');
const errorP = document.getElementById('error');
const notInCleveland = document.getElementById('notInCleveland');
const pic = document.getElementById('image');

var img = document.createElement('img');

window.onload = async event => {
    try{
        const weatherData = await getWeather('Cleveland');
        displayWeather(weatherData);
    }
    catch(error){
        displayError(error);
    }
    errorP.innerText = '';
}

document.getElementById('submit').addEventListener('click', async function(){
    const city = document.getElementById('city').value;
    if (city){
        try{
            const weatherData = await getWeather(city);
            displayWeather(weatherData);
        }
        catch(error){
            displayError(error);
        }
        errorP.innerText = '';
    } else {
        displayError("Please enter the city where you're currently located.");
    }
})

async function getWeather(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok){
        message.innerText = "We can't find that... Try the nearest major city.";
        heading.classList.add('hidden');
        pic.classList.add('hidden');
    }
    return await response.json();
}

function displayWeather(data){
    pic.innerHTML = '';
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
    var additionalMessage;
    if (date.getDate() == '29'){
        additionalMessage = " Don't forget: you have your divorces coming up!";
    } else if (date.getDate() == '12'){
        additionalMessage = " It's a great day for ice cream!";
    } else if (date.getDate() == '7'){
        additionalMessage = " And you're doing outstanding, soldier. Outstanding!";
    } else {
        additionalMessage = '';
    }
    var messageText = `It's ${((temp - 273.15) * (9/5) +32).toFixed(1)}°F with ${description} and ${humidity}% humidity in ${city}.${additionalMessage}`;
    heading.classList.remove('hidden');
    pic.classList.remove('hidden');
    heading.innerText = `Good ${timeOfDay}, Gabby!`;
    message.innerText = messageText;
    img.height = 200;
    img.width = 200;
    if (id >= 200 && id < 300){
        if (date.getDate() % 2 == 0){
            img.src = "./img/storm1.jpg";
            img.alt = "a young boy, wrapped in a blanket, looks up and smiles.";
        } else {
            img.src = "./img/storm2.jpg";
            img.alt = "a young boy, dressed in a frog costume with a coat over top, looks slightly disappointed.";
        }
    } else if (id >= 300 && id < 400){
        if (date.getDate() % 2 == 0){
            img.src = "./img/drizzle1.jpg";
            img.alt = "a young boy, dressed in a raincoat and mask, sits in a mechanical boat ride.";
        } else {
            img.src = "./img/drizzle2.jpg";
            img.alt = "a young boy, dressed a jacket, hat, and rain boots, sits in a massage chair.";
        }
    } else if (id >= 500 && id < 600){
        if (date.getDate() % 2 == 0){
            img.src = "./img/rain1.jpg";
            img.alt = "a young boy, dressed in a raincoat, stands with a resigned look on his face.";
        } else {
            img.src = "./img/rain2.jpg";
            img.alt = "a young boy, dressed a raincoat, stands with a smile on his face.";
        }
    } else if (id >= 600 && id < 700){
        if (date.getDate() % 2 == 0){
            img.src = "./img/snow1.jpg";
            img.alt = "a young boy, dressed in snow gear, bends down in the snow.";
        } else {
            img.src = "./img/snow2.jpg";
            img.alt = "a young boy, dressed snow gear, stands in the snow, throwing a snowball.";
        }
    } else if (id >= 700 && id < 800){
        if (date.getDate() % 2 == 0){
            img.src = "./img/fog1.jpg";
            img.alt = "a young boy holds a stuffed baby.";
        } else {
            img.src = "./img/fog2.jpg";
            img.alt = "a young baby, dressed as a shark, sits in his carseat.";
        }
    } else if (id === 800){
        if (date.getDate() % 2 == 0){
            img.src = "./img/sun1.jpg";
            img.alt = "a young boy, wearing a Hawaiian shirt, stands smiling.";
        } else {
            img.src = "./img/sun2.jpg";
            img.alt = "a young boy with a backpack stands smiling.";
        }
    } else if (id >= 801 && id < 810){
        if (date.getDate() % 2 == 0){
            img.src = "./img/clouds1.jpg";
            img.alt = "a young boy sits outside on a cloudy day, eating a pastry.";
        } else {
            img.src = "./img/clouds2.jpg";
            img.alt = "a young boy sits outside on a cloudy day, eating a pastry.";
        }
    } else {
        img.src = "./img/sharks.jpg";
        img.alt = "a young boy greets adults dressed in shark costumes.";
    }
    pic.append(img);
}

function displayError(message){
    heading.innerText = '';
    message.innerText = '';
    errorP.innerText = message;
}

function showCityOption(){
    document.getElementById('otherLocation').classList.toggle('hidden');
    document.getElementById('inCleveland').classList.remove('height80');
    document.getElementById('inCleveland').classList.add('height70');
    errorP.classList.add('hidden');
    notInCleveland.classList.add('hidden');
}





















