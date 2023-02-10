/***************************************************************************
DATA.JS
****************************************************************************/



const data_eventType = {
	eventName: null,
	title: null,
	date: null,
	time: null,
	location: null,
	meetTime: null,
	meetLoc: null,
	outfit: null,
	other: null
};

let data_events = [];	//: An array of Events

data_bundleData = function() {
		var jsonData = JSON.stringify(data_events);
	return jsonData;
}

data_createFullEventFromFile = function (dataStr){
	let	newEvent = Object.create(data_eventType);
	newEvent.eventName = dataStr.eventName;
	newEvent.title = dataStr.title;
	newEvent.date = dataStr.date;
	newEvent.time = dataStr.time;
	newEvent.location = dataStr.location;
	newEvent.meetTime = dataStr.meetTime;
	newEvent.meetLoc = dataStr.meetLoc;
	newEvent.outfit = dataStr.outfit;
	newEvent.other = dataStr.other;
	data_events.push(newEvent);
}

data_unbundleData = function(txt) {
	var parsedJson = JSON.parse(txt);
	for (var i = 0; i < parsedJson.length; i++) {
		console.log(parsedJson[i].eventName);
		data_createFullEventFromFile(parsedJson[i]);
	}
	appns.populateTable();
}



