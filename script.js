let input = document.querySelector("input");
let btn = document.querySelector("button");
let body = document.querySelector("body");
const apiKeys=[
    "57e758d52e8247b136bf54d2f7d97dc0",
    "1cfe95445905baed35fb3cc4a868d943",
    "17109a63da94bd7a04196d057f58ec11"
]
let result = document.createElement("div");
body.appendChild(result);
function windDirection(deg) {
    if (deg > 337.5 || deg <= 22.5) return "N";
    if (deg > 22.5 && deg <= 67.5) return "NE";
    if (deg > 67.5 && deg <= 112.5) return "E";
    if (deg > 112.5 && deg <= 157.5) return "SE";
    if (deg > 157.5 && deg <= 202.5) return "S";
    if (deg > 202.5 && deg <= 247.5) return "SW";
    if (deg > 247.5 && deg <= 292.5) return "W";
    if (deg > 292.5 && deg <= 337.5) return "NW";
}

async function meteo(city) {
    for (let key of apiKeys) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

        try {
            const res = await fetch(url);
            if (res.status === 401) {
                continue;
            }
            if (res.status === 404) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Ville introuvable");
            }
            if (!res.ok) {
                throw new Error("Erreur API: " + res.status);
            }
            return await res.json();

        } catch (err) {
            if (err.message === "city not found" || err.message === "Ville introuvable") {
                throw err;
            }

            continue;
        }
    }

    throw new Error("Toutes les clés API ont échoué");
}



btn.addEventListener("click",()=> {
    let ville = input.value.trim().toLowerCase();
    ville = ville.charAt(0).toUpperCase() + ville.slice(1);
    if(!ville.trim()){
    result.innerText="Ecrivez le nom d'une ville";
    return;
    }
    result.innerHTML=""
    result.innerText="Chargement...."
    meteo(ville)
        .then(data =>
            result.innerHTML=`
            <p>Ville : ${data.name}</p>
            <p>Pays : ${data.sys.country}</p>
            <p>Température : ${data.main.temp}°C</p>
            <p>Ressenti : ${data.main.feels_like}°C</p>
            <p>Min / Max : ${data.main.temp_min}/${data.main.temp_max}</p>
            <p>Humidité : ${data.main.humidity}%</p>
            <p>Pression : ${data.main.pressure}hPa</p>
            <p>Vent : ${data.wind.speed} m/s ${windDirection(data.wind.deg)} ${data.wind.deg}°</p>
            <p>Description : ${data.weather[0].description}</p>
            <p>Nuages : ${data.clouds.all}%</p>
            <p>Visibilité : ${data.visibility}m</p>
            `)
        .catch(err => result.innerHTML = err.message);
    input.value="";
});
input.addEventListener('keydown', (e) => {
if (e.key === 'Enter'){
let ville = input.value.trim().toLowerCase();
ville = ville.charAt(0).toUpperCase() + ville.slice(1);
if(!ville.trim()){
    result.innerText="Ecrivez le nom d'une ville";
    return;
    }
    result.innerHTML=""
    result.innerText="Chargement...."
    meteo(ville)
        .then(data =>
            result.innerHTML=`
            <p>Ville : ${data.name}</p>
            <p>Pays : ${data.sys.country}</p>
            <p>Température : ${data.main.temp}°C</p>
            <p>Ressenti : ${data.main.feels_like}°C</p>
            <p>Min / Max : ${data.main.temp_min}/${data.main.temp_max}</p>
            <p>Humidité : ${data.main.humidity}%</p>
            <p>Pression : ${data.main.pressure}hPa</p>
            <p>Vent : ${data.wind.speed} m/s ${windDirection(data.wind.deg)} ${data.wind.deg}°</p>
            <p>Description : ${data.weather[0].description}</p>
            <p>Nuages : ${data.clouds.all}%</p>
            <p>Visibilité : ${data.visibility}m</p>
            `)
        .catch(err => result.innerHTML = err.message);
    input.value="";
}
});
