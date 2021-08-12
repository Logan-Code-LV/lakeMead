document.addEventListener("DOMContentLoaded", async function () {
  var displayData = ""

  console.log("fetching ...")
  var response = await fetch("http://localhost:5500/data", {method:"GET", headers:{"Content-type":"application/json"} })
  var body = await response.json()

  var acreFeet = body.value
  var display = (+acreFeet / 28945000) * 100
  var x = Math.round(100 * display) / 100
  displayData = x.toString() + "%"

  console.log(displayData)


  const lakeLevel = document.createElement("h1");
  const textNode = document.createTextNode(displayData);
  lakeLevel.appendChild(textNode);
  
  const element = document.getElementById("start");
  element.appendChild(lakeLevel);

  document.getElementById("loader").remove()

  })

