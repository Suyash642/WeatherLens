let weather = {
    apiKey:"API KEY",

    fetchweatherinfo : function(city)
    {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+this.apiKey
            )
            .then((response)=>{ 
                if (!response.ok)
                {
                    alert("No Weather found for this city!");
                    throw new Error("No Weather found for this city!");
                }
                return response.json();
            })
            .then((data) => this.displayweatherinfo(data));
    },
    
    displayweatherinfo: function(data)
    {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        let visible = data.visibility/1000;
        let  sunrisetimestamp = weather.convertunixtostandard(data.sys.sunrise);
        let sunsettimestamp = weather.convertunixtostandard(data.sys.sunset);

        document.querySelector(".city").innerHTML = "Weather in "+ name;
        document.querySelector(".temp").innerHTML = temp + "°C";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+icon+".png";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".humidity").innerHTML = "Humidity : "+humidity+"%";
        document.querySelector(".windspeed").innerHTML = "Wind Speed : "+speed+" Km/hr";
        document.querySelector(".visibility").innerHTML = "Visibility : Upto "+visible+" Km";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1700x900/?cloudy,"+description+ "')";
        document.querySelector(".sunrise").innerHTML = "Sunrise : "+ sunrisetimestamp;
        document.querySelector(".sunset").innerHTML = "Sunset : "+ sunsettimestamp;
        document.querySelector(".daydetails").innerHTML = weather.dateandday(data.dt);
    },

    search: function()
    {
        this.fetchweatherinfo(document.querySelector(".search-bar").value);
    },

    convertunixtostandard: function(timestamp)
    {
        date = new Date(timestamp*1000);

        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = hours < 10 ? '0'+hours : hours; 
        minutes = minutes < 10 ? '0'+minutes : minutes;
        seconds = seconds < 10 ? '0'+seconds : seconds;
        var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
        return strTime;
    },

    dateandday : function(timestamp)
    {
        dateobj = new Date(timestamp*1000);
        utcString = dateobj.toUTCString();
        var day = utcString.slice(0, 4);
        var date = utcString.slice(5,16);
        var daydate = day+" "+date;
        return daydate;
    },
};

document.querySelector(".search button").addEventListener("click", function()
{
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup",function(event)
{
    if(event.key == "Enter")
    {
        weather.search();
    }
});



weather.fetchweatherinfo("Nagpur");


