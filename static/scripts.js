document.addEventListener("DOMContentLoaded",() => {
  document.getElementById("waterLevel").addEventListener("click", async function () {
    console.log("clicked")

    var response = await fetch("http://localhost:5500/data", {method:"GET", headers:{"Content-type":"application/json"} })
    console.log(response)

    var body = await response.json()
    console.log(body)

  //   await fetch("http://localhost:5500/data", {method:"GET", headers:{"Content-type":"application/json"} })
  //     .then((res) => {
  //       return res.json()
  //     })
  //     .then((data) => {
  //       console.log(data)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  })
})