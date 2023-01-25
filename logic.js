const search = document.getElementById('search')
const searchBtn = document.getElementById('searchBtn')
const fahrBtn = document.getElementById('fahr');
const para = document.querySelector('.dataDisplay')
const modal = document.querySelector('.modal');
const closeModal = document.getElementById('close-modal')

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';

})

searchBtn.addEventListener('click', () => {
    call(search.value);

  })


const getData = async function(location){
    let units = "";
    if (fahrBtn.checked == true) {
        units = "imperial";
    } else {
        units = "metric"
    }
    
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=bb641ae623edfeb53a4b7cd838966a9b&units=${units}`,{mode:'cors'});
    if (!response.ok) {
        const messsage = response.status;
        throw new Error(messsage);
    }
    const responseObj = await response.json()
    return responseObj;
}
  

  const processData = function(obj) {
      return {
          description: obj.weather[0]["description"],
          temp: obj["main"]["temp"],
          humidity: obj["main"]["humidity"],
          "feels like": obj["main"]["feels_like"],
          min: obj["main"]["temp_min"],
          max: obj["main"]["temp_max"],
      }
  }

  const errorMessage = function() {

  }

  const displayData = function(data) {
    let unit;
    if (fahrBtn.checked == true) {
        unit = "°F"
        
    } else {
        unit = "°C"
    }
    para.innerHTML = 
    `Description: ${data.description} <br><br>
     Temperature: ${data.temp} ${unit} <br><br>
     Humidity: ${data.humidity} % <br><br>
     Feels Like: ${data["feels like"]} ${unit} <br><br>
     Min: ${data.min} ${unit} <br><br>
     Max: ${data.max} ${unit}`


  }
  
  
      
const call = async function(location) {
    
    const data = await getData(location)
    .catch(function(err) {
        console.log(err);
        modal.style.display = 'block';
    })

    if(data) {
        const processedObj = processData(data);
        displayData(processedObj)
    }
   
}
      
    
  

  