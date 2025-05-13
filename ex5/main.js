const apiKey = '4ffe122ddc97e87cc61838e3315ca9db';

fetch('https://ipwho.is/')
    .then(response => response.json())
    .then(data => {
        const city = data.city;
        if (city) {
            getWeather(city);
        } else {
            document.getElementById("weather").innerText = "Cidade não encontrada.";
        }
    })
    .catch(error => {
        document.getElementById("weather").innerText = "Erro ao detectar localização.";
        console.error("Erro na geolocalização:", error);
    });

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const temp = data.main.temp;
                const desc = data.weather[0].description;
                document.getElementById("weather").innerText = `Tempo em ${city}: ${temp}°C, ${desc}`;
            } else {
                document.getElementById("weather").innerText = `Erro: ${data.message}`;
            }
        })
        .catch(error => {
            document.getElementById("weather").innerText = "Erro ao buscar o clima.";
            console.error("Erro no OpenWeather:", error);
        });
}