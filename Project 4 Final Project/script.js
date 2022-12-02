// google geo charts library 
      google.charts.load('current', {
        'packages':['geochart'],
      });
      var chart = google.charts.setOnLoadCallback(drawRegionsMap);
    
      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
          // used information found on https://allthingsfoxes.com/where-do-foxes-live/ to get potential locations for the fox
          ['Country', 'Does your fox live here? (1 = yes!) '],
          ['Mexico', 0],
          ['United States', 0],
          ['Australia', 0],
          ['Canada', 0],
          ['France', 0],
          ['Norway', 0],
          ['Iceland', 0],
          ['Russia', 0],
        ]);

        var options = {
        };

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        
        console.log(data)
        
        
        
      
        // event handler for the sumbit button that starts the calculations and gives the user the generated fox image, lo and traits
        var click = document.getElementById("btn")
      click.addEventListener("click", function(){
        //input validation so that the user must name the fox
        var textinput = document.getElementById("name").value
          if (textinput == "") {
            alert("Name must be filled")
            return false
          }
          if (textinput.length > 15) {
            alert("Name cannot be longer than 15 characters")
            return false
          }
        // sets the fox's name as a variable and changes the p tag's innerHTML
        var foxname = document.getElementById("foxname")
        foxname.innerHTML = "Your fox's name is" + ' ' + textinput + "!"
        newImg()
        
        
      // random values to determine attributes
        
      country = Math.floor(Math.random() * 8)
      color = Math.floor(Math.random() * 10)
      climate = Math.floor(Math.random() * 8)
      personality = Math.floor(Math.random() * 10)
      
      // a while loop to delete all the values on the map each time the button is pressed
      var count = 0
      while (count < 8) {
        data.Wf[count].c[1].v = 0
        count += 1
      }
      
      // changing the randomly selected country's value to 1
      var name = document.getElementById("name").value
      data.Wf[country].c[1].v = 1;

      // adds each randomly generated trait to a string that is presented in the HTML
      var colortag = document.getElementById("color") 
      colortag.innerHTML = "Their favorite color is" + ' ' + favoriteColor[color]

      var location = document.getElementById("location") 
      location.innerHTML = name + " is from" + ' ' + countries[country] + "!"
        
      var climatetag = document.getElementById("climate") 
      climatetag.innerHTML = "Their prefered envrionment is" + ' ' + preferedEnviro[climate]
      
        
      var personalitytag = document.getElementById("personality") 
      personalitytag.innerHTML = "They're very" + ' ' + traits[personality]

      // draws the map
      chart.draw(data, options)
  

      })

      // lists for countries and possible traits for the fox
  var countries = ["Mexico", "the United States", "Australia", "Canada", "France", "Norway", "Iceland", "Russia"]
  var favoriteColor = ["green!", "blue!", "yellow!", "red!", "brown!", "purple!", "pink!", "orange!", "white", "black"]
        
  var preferedEnviro = ["the cold outdoors!", "a warm climate!", "the indoors with changable temperatures!", "anywhere. It just loves being outside!", "the snow!", "out in the fields!", "the beach!", "the rain!"]
        
  var traits = ["snarky.", "protective.", "outgoing.", "loud.", "quiet.", "nervous.", "curious.", "adventurous.", "demanding.", "fun."]
        
  
      }


//connects to the random fox api
async function getImg() {
  var response = await fetch("https://randomfox.ca/floof", {
      method: "GET"
    });
  console.log(response);
//takes the image from the json given by the random fox api
  var object = await response.json();
  return object.image;
  var fox = document.querySelector("img")
  fox = await object.image
  
}


async function newImg() {
//sets the img in the html to the image of the fox
    var newfox = await getImg();
    console.log(newfox);
    document.getElementById('image').src = newfox;
};




