// fetch location

async function getWeatherResponse(location) {
    const url = `https://api.weatherapi.com/v1/current.json?key=520b990a2eb04e97a5e133316230110&q=${location}`;
    const mode = {mode: "cors"};
    try {
        const response = await fetch(url, mode);
        if (!response.ok) {
        throw new Error("Error! Could not fetch data");
        }
        const data = response.json();
        render(data);
    } catch(error) {
        if (error instanceof TypeError) {
            console.log("Type Error");
        }
        else if (error instanceof SyntaxError) {
            console.log("Error Parsing File to Json");
        }
        else {
            console.log("WHo cares really")
        }
    }
}

async function getFetchData(location) {
    try {
        setLoadingState(true);
        const fetchData = await getWeather(location);
        setLoadingState(false);
        renderWeatherInfo(data)
    }
}

//dom update
function renderWeatherInfo(data) {
    const location = document.querySelector(".location");
    const temperature = document.querySelector(".temperature");
    const extra = document.querySelector(".extra");

    location.textContent = data.location.name;
    temperature.innerHTML = `${data.current.temp_c}&deg;C`;
    extra.querySelector(".condition").textContent = data.current.condition.text;
    extra.querySelector(".windspeed").textContent = data.current.wind_kph;
    extra.querySelector(".humidity").textContent = `${data.current.humidity}% humidity`;
}


// spinner
function setLoadingState(value) {
    const spinner = document.querySelector(".spinner");
    if (value) {
        spinner.classList.add("loading");
    }
    else {
        spinner.classList.remove("loading");
    }
}