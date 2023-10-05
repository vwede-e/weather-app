// fetch weather location

async function getWeatherResponse(location) {
    const url = `https://api.weatherapi.com/v1/current.json?key=520b990a2eb04e97a5e133316230110&q=${location}`;
    const mode = {mode: "cors"};
    try {
        const response = await fetch(url, mode);
        if (response.status === 400) {
            throw new Error("Error! Enter Valid City");
        }
        const data = await response.json();
        return data;
    } catch(error) {
        if (error instanceof TypeError) {
            console.log("Type Error");
        }
        else if (error instanceof SyntaxError) {
            console.log("Error Parsing File to Json");
        }
        else if (error.message.includes("Enter Valid City")) {
            throw error;
        }
        else {
            console.log("WHo cares really");

        }
    }
}

//get fetch data and call render function
async function getFetchData(location) {
    try {
        setLoadingState(true);
        const fetchData = await getWeatherResponse(location);
        renderWeatherInfo(fetchData)
    } catch(error) {
        if (error.message.includes("Enter Valid City")) {
            alert(error.message);
        }
    } finally {
        setLoadingState(false);
    }
}

//render weather details
function renderWeatherInfo(data) {
    const location = document.querySelector(".location");
    const temperature = document.querySelector(".temperature");
    const extra = document.querySelector(".extra");

    location.textContent = data.location.name;
    temperature.innerHTML = `${data.current.temp_c}&deg;C`;
    extra.querySelector(".condition").textContent = data.current.condition.text;
    extra.querySelector(".windspeed").textContent = `${data.current.wind_kph}kph`;
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

//event listener
const submit = document.querySelector(".search-button");
const search = document.querySelector('input[type="search"]');
submit.addEventListener("click", handleSearch)

window.addEventListener("keydown", (event)=> {
    if (document.activeElement === search && event.key === "Enter") {
        handleSearch();
        search.blur();
    }
})

function handleSearch() {
    if (search.validity.valueMissing) {
        search.setCustomValidity("City Entry Cannot Be Empty");
        search.reportValidity();
    }
    else {
        search.setCustomValidity("");
        getFetchData(search.value);
    }

}

if (navigator.onLine) {
    getFetchData("Calabar");
}
else {
    alert("No Internet Connection");
}