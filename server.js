var _ = require('lodash')
var moment = require('moment')
const express = require('express')
const axios = require('axios')
var app = express();

app.use("/static", express.static('./static/'));
app.use("/assets", express.static('./assets/'));
app.use("/images", express.static('./images/'));

const PORT = 3000;

app.listen(PORT, () => {
	console.log("server runnin")
})

app.get("/", async (req,res) => {
	res.sendFile('/newIndex.html', { root: __dirname });
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
		console.log("response: ",response)
		var body = response.data.Series

		// Find only Lake Mead data
		var filterData = body.filter(item => item.SiteName === "Lake Mead" && item.DataTypeName === "storage, end of period reading")
		var readings = filterData[0].Data

		// Filter out future readings (they dont have data yet)
		var filterData = readings.filter((item) => item.v != "")

		//Conver timestamp to moment time
		var convertToMoment =  filterData.map(reading => {
			var time = moment(reading.t).valueOf()
			return {...reading, time:time}
		})

		// console.log("convertToMoment: ",convertToMoment)
		x = Math.max.apply(Math, convertToMoment.map(function(obj) { return obj.time; }))

		// Filter array down to latest timestamp
		var filterData = convertToMoment.filter((item) => item.time === x)

	res.send(filterData)
})
	.catch((error) => {
		console.log(error);
	})
})
