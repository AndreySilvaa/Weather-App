const btbuscar = document.getElementById("btbuscar").addEventListener("click", cidade)
const info = document.getElementById("infos")
const load = document.querySelector(".load")
const city = document.getElementById("name")
const temperatura = document.getElementById("temp")
const img = document.getElementById("icon")
const desc = document.getElementById("desc")
const humi = document.getElementById("humi")
const vent = document.getElementById("vento")
const st = document.getElementById("st")
window.addEventListener("load", getLocation)

let weather = {
    "apikey": "06fc99db436cb270cbaac1b43dfe9e4f",

    "URL": "https://api.openweathermap.org/data/2.5/weather?lat=-9.3978624&lon=-38.2337024&appid=06fc99db436cb270cbaac1b43dfe9e4f&units=metric", //cidade atual

    FetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="+city+"&lang=pt_br&units=metric&appid=" + this.apikey
        )
        .then((response) => response.json())
        .then((data) => this.displayinfo(data))
    },

    FetchWeatherCurrent: function(lon, lat){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=06fc99db436cb270cbaac1b43dfe9e4f&units=metric&lang=pt_br"
        )
        .then((response) => response.json())
        .then((data) => this.displayinfo(data))
    },

    displayinfo: function(data){
        console.log(data)
        let name = data.name
        let temp = data.main.temp.toFixed()
        let vento = data.wind.speed
        let description = data.weather[0].description
        let humidade = data.main.humidity
        let icon = data.weather[0].icon
        let country = data.sys.country
        let feellike = data.main.feels_like

        city.innerText = `Tempo em ${name} (${country})`
        temperatura.innerText = `${temp}°`
        img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
        desc.innerText = description
        humi.innerText = `Umidade: ${humidade}%`
        vent.innerText = `Vento: ${vento}km/h`
        st.innerText = `Sensação Térmica: ${feellike.toFixed(0)}°`
        
        load.classList.add("hidden")
        info.classList.remove("hidden")
        console.log(name,temp, vento, description, humidade, icon)
    }
}

function cidade(){
    let inputcity = document.getElementById("barrapesquisa").value
    weather.FetchWeather(inputcity)
}


// PEGANDO A LOCALIZAÇÃO
function getLocation(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
    else{
        x.innerHTML="Geolocation is not supported by this browser.";
    }
}

function showPosition(position){
    lat=position.coords.latitude;
    lon=position.coords.longitude;
    weather.FetchWeatherCurrent(lon, lat)
}

function showError(error){
    switch(error.code){
        case error.PERMISSION_DENIED:
            x.innerHTML="User denied the request for Geolocation."
        break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML="Location information is unavailable."
        break;
        case error.TIMEOUT:
            x.innerHTML="The request to get user location timed out."
        break;
        case error.UNKNOWN_ERROR:
            x.innerHTML="An unknown error occurred."
        break;
    }
}