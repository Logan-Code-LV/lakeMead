var _ = require('lodash')
var moment = require('moment')
const express = require('express')
const axios = require('axios')
var app = express();

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
		filteredRes = response.data.Series[22].Data
		var newArray = []
		_.map(filteredRes, (i) => {
			if (i !== undefined) {
				if (i !== null) {
					if(i.v !== "") {
						formatDate = new Date(i.t)
						returnObj = { time:moment(formatDate).valueOf(), value:i.v }
						newArray.push(returnObj)
					}}}
			})
	res.send(_.last(newArray))
})
	.catch((error) => {
		console.log(error);
	})
})
