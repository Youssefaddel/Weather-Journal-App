// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=be6227c06d0086014fa2945317feea01&units=imperial";

// URL
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";

/* Global Variables */
const zipCode = document.getElementById("zip");
const FeelingsInput = document.getElementById("feelings");
const generateBtn = document.getElementById("generate");

// Server Link
const server = "http://127.0.0.1:8000";


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Click event to Generate Btn
generateBtn.addEventListener("click", generateData);
function generateData() {
    if (!zipCode.value) {
        alert("You must enter a valid Zip Code");
        return;
    }
    else if (!FeelingsInput.value) {
        alert("You must enter your Feelings");
        return;
    }
    else {
        getWeatherData(baseUrl, zipCode, apiKey)
            .then((data) =>
                postDataToServer("/addData", {
                    date: newDate,
                    temp: data.main.temp,
                    feelings: FeelingsInput.value
                })
            ).then(() => updateUI());
    };
}


// Get the temperature of the weather
async function getWeatherData(baseUrl, zipCode, apiKey) {
    const res = await fetch(baseUrl + zipCode.value + apiKey);

    try {
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

// Post request to the server
async function postDataToServer(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    try {
        const result = await response.json()
        return result;
    }
    catch (error) {
        console.error(error);
    }
}

// Update UI
async function updateUI() {
    const response = await fetch("/all");
    try {
        const data = await response.json();

        document.getElementById("date").innerHTML = data.newDate;
        document.getElementById("temp").innerHTML = Math.round(data.temp)+ 'degrees';
        document.getElementById("content").innerHTML = data.feelings;
    }
    catch (error) {
        console.error(error);
    }
}







