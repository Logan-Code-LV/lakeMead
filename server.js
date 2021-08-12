const express = require('express')
const axios = require('axios')
var cors = require('cors');
var app = express();

//app.use(cors({origin:"*"}));

app.use("/static", express.static('./static/'));

app.listen(5500, () => {
	console.log("server runnin")
})

app.get("/", async (req,res) => {
	res.sendFile('/index.html', { root: __dirname });
})

app.get("/data", (req,res) => {
	var config = {
		method: 'get',
		url: 'https://www.usbr.gov/lc/region/g4000/riverops/webreports/hourlyweb.json',
		headers: { 
			"Access-Control-Allow-Origin": "*"
		}
	}
	axios(config)
	.then((response) => {
		console.log("AXIOS START")
		console.log("response: ",response)
		res.send(response.data)
		console.log("AXIOS END")
	})
	.catch((error) => {
		console.log(error);
	})
})
