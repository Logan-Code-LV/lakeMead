document.addEventListener("DOMContentLoaded", async function () {
  var displayData = ""

  var response = await fetch("http://localhost:3000/data", {method:"GET", headers:{"Content-type":"application/json"} })
  var body = await response.json()
  console.log(body)




  var acreFeet = body[0].v
  if(acreFeet){
    var display = (+acreFeet / 28945000) * 100
    var x = Math.round(100 * display) / 100
    var displayData = "Is at " + x.toString() + "% capacity"
  
    const lakeLevel = document.createElement("h1");
    const textNode = document.createTextNode(displayData);
    lakeLevel.appendChild(textNode);
    
    const element = document.getElementById("start");
    element.appendChild(lakeLevel);
  
  }else{
    var displayData = "30.2% capacity"
  
    const lakeLevel = document.createElement("h1");
    const textNode = document.createTextNode(displayData);
    lakeLevel.appendChild(textNode);
    
    const element = document.getElementById("start");
    element.appendChild(lakeLevel);
  
    document.getElementById("loader").remove()
  }


  })

