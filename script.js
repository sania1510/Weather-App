const container = document.querySelector(".container");
const search= document.querySelector(".search button");
const weatherBox= document.querySelector(".weather-box");
const weatherDetails= document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");



search.addEventListener('click',()=>{
    const APIkeys="b152871c1f1182ec154359ecdb2ed01b";
    const city=document.querySelector('.search input').value;

    if (city=='')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkeys}`).then(response => response.json()).then(json => {
        if (json.cod=='404'){
            container.style.height='404px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        container.style.height='555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

        
        const image=document.querySelector('.weather-box img');
        const temperature=document.querySelector('.weather-box .temperature');
        const description=document.querySelector('.weather-box .description');
        const humidity=document.querySelector('.weather-details .humidity span');
        const wind=document.querySelector('.weather-details .wind span');


        switch (json.weather[0].main) {
            case 'Clear':
                image.src='sun.png';
                break;
            case 'Rain':
                image.src='rain.png';
                break;
            case 'Snow':
                image.src='snow.png';
                break;
            case 'Clouds':
                image.src='clouds.png';
                break;
            case 'Mist':
                image.src='mist.png';
                break;
            case 'Haze':
                image.src='haze.png';
                break;
        
            default:
                image.src="cloudy sun.png"
        }
        temperature.innerHTML=`${parseInt(json.main.temp)}<span><span>`;
        description.innerHTML=`${json.weather[0].description}`;
        humidity.innerHTML=`${json.main.humidity}%`;
        wind.innerHTML=`${parseInt(json.wind.speed)}Km/h`;



    });


})