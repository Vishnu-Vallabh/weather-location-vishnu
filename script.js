// OpenWeatherMap API Key (Replace with your own API key)
const apiKey = 'dac502c0107912d10a6c642e8da958ac';

// Function to fetch weather data
async function getWeatherData(latitude, longitude) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        if (data.cod === 200) {
            const temperature = data.main.temp;
            const location = data.name;
            document.getElementById('temperature').textContent = `${temperature}°C`;
            document.getElementById('location').textContent = location;
            document.getElementById('loader').style.display = 'none';
        } else {
            alert('Weather data not available!');
        }
    } catch (error) {
        alert('Error fetching weather data!');
    }
}

// Function to get user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                getWeatherData(latitude, longitude);
            },
            () => {
                alert("Geolocation is not supported or permission denied.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Call the function to get location and weather data
getLocation();
