const url = "https://api.open-meteo.com/v1/forecast?latitude=46.3231&longitude=-0.4588&current=temperature_2m,wind_speed_10m,weather_code,wind_direction_10m&timezone=Europe/Paris";

const weather_code = [
    [0 , "Ciel clair",                  "./Assets/icon/clear_day.svg"],
    [1 , "Peu nuageux",                 "./Assets/icon/partly_cloudy_day.svg"],
    [2 , "Partiellement nuageux",       "./Assets/icon/partly_cloudy_day.svg"],
    [3 , "Couvert",                     "./Assets/icon/cloudy_day_night.svg"],
    [45, "Brouillard",                  "./Assets/icon/fog_day_night.svg"],
    [48, "Brouillard givrant",          "./Assets/icon/fog_day_night.svg"],
    [51, "Bruine faible",               "./Assets/icon/drizzle_day_night.svg"],
    [53, "Bruine modérée",              "./Assets/icon/drizzle_day_night.svg"],
    [55, "Bruine forte",                "./Assets/icon/drizzle_day_night.svg"],
    [56, "Bruine verglaçante faible",   "./Assets/icon/sleet_day_night.svg"],
    [57, "Bruine verglaçante forte",    "./Assets/icon/sleet_day_night.svg"],
    [61, "Pluie faible",                "./Assets/icon/rain_day_night.svg"],
    [63, "Pluie modérée",               "./Assets/icon/rain_day_night.svg"],
    [65, "Pluie forte",                 "./Assets/icon/rain_day_night.svg"],
    [66, "Pluie verglaçante faible",    "./Assets/icon/sleet_day_night.svg"],
    [67, "Pluie verglaçante forte",     "./Assets/icon/sleet_day_night.svg"],
    [71, "Neige faible",                "./Assets/icon/snow_day_night.svg"],
    [73, "Neige modérée",               "./Assets/icon/snow_day_night.svg"],
    [75, "Neige forte",                 "./Assets/icon/snow_day_night.svg"],
    [77, "Grains de neige",             "./Assets/icon/snow_day_night.svg"],
    [80, "Averse de pluie faible",      "./Assets/icon/rain_day_night.svg"],
    [81, "Averse de pluie modérée",     "./Assets/icon/rain_day_night.svg"],
    [82, "Averse de pluie violente",    "./Assets/icon/rain_day_night.svg"],
    [85, "Averse de neige faible",      "./Assets/icon/snow_day_night.svg"],
    [86, "Averse de neige forte",       "./Assets/icon/snow_day_night.svg"],
    [95, "Orage faible ou modéré",      "./Assets/icon/thunder_day_night.svg"],
    [96, "Orage avec grêle faible",     "./Assets/icon/hail_day_night.svg"],
    [99, "Orage avec grêle forte",      "./Assets/icon/hail_day_night.svg"],
];

try {
    const data = await fetchWeather(url);
    insertWeatherData(data);
} catch (error) {
    alert("Erreur : "+ error.message);
}

async function fetchWeather(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Erreur API ${response.status} : ${response.statusText}`);
    }
    return response.json();
}

function insertWeatherData(data) {
    // Temperature
    const temperature = document.getElementById("temperature");
    temperature.textContent = Math.round(data.current.temperature_2m) + data.current_units.temperature_2m;

    // Condition
    const code = data.current.weather_code;
    const condition_data = weather_code.find(item => item[0] === code);
    const condition = document.getElementById("condition");
    condition.innerHTML = `
    <img src="${condition_data[2]}" alt="${condition_data[1]}">
    <p>${condition_data[1]}</p>
    `;

    //  Wind
    document.documentElement.style.setProperty("--wind_degree", data.current.wind_direction_10m);
    const wind = document.getElementById("wind");
    wind.textContent = Math.round(data.current.wind_speed_10m / 5) * 5 + " " + data.current_units.wind_speed_10m;

    // updatedAt
    const updatedAt = document.getElementById("updatedAt");
    updatedAt.textContent = "Mis à jour à " + new Date(data.current.time).toLocaleTimeString("fr-FR", {hour: "2-digit",minute: "2-digit"});;
}

