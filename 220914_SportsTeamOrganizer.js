var appns = {};

var curYear = 0; // active year in calender (table)
var curMonth = 0; // active month in calender (1-12)
var curDate = ""; // YYYY-MM-DD

appns.init = function(){
  document.getElementById("opening").style.display="block";
  document.getElementById("openDiv").style.display="none";
  document.getElementById("dayselected").style.display="none";
  document.getElementById("eventselected").style.display="none";
  document.getElementById("eventeditselected").style.display="none";
  /*paste calendar according to current day*/
  const cdate = new Date();
  cdate.getDate();
  var sdate = cdate.toDateString();
  // console.log(sdate); // weekday month day year

  var swday = "";
  var smonth = "";
  var sday = "";
  var syear = "";
  var x = 0;

  for (var i = 0; sdate[i] != " "; i++) {
    swday += sdate[i];
    x++;
  }

  x++;

  for (var i = x; sdate[i] != " "; i++) {
    smonth += sdate[i];
    x++;
  }

  x++;

  for (var i = x; sdate[i] != " "; i++) {
    sday += sdate[i];
    x++;
  }

  x++;
  var c = 0;

  for (var i = x; c < 4; i++) {
    syear += sdate[i];
    c++;
  }

  //console.log(swday + " " + smonth + " " + sday + " " + syear);
  // sday to int (1 - 31)
  var iday = parseInt(sday); // day as integer
  // swday to int (1 - 7)
  var iwday = 0; // var holds weekday as integer
  if (swday == "Mon") {
    iwday = 1;
  } else if (swday == "Tue") {
    iwday = 2;
  } else if (swday == "Wed") {
    iwday = 3;
  } else if (swday == "Thu") {
    iwday = 4;
  } else if (swday == "Fri") {
    iwday = 5;
  } else if (swday == "Sat") {
    iwday = 6;
  } else {
    iwday = 7;
  }
  // dayDist = intDay % 7
  var dayDist = iday % 7;
  // startwday = iwday - dayDist (if dayDist > iwday : 7 - (dayDist - iwday))
  var startwday = 0; // int of weekday when month starts
  if (dayDist > iwday) {
    startwday = 7 - (dayDist - iwday);
  } else {
    startwday = iwday - dayDist;
  }
  // startwday is first day of month start filling calendar from there
  // if smonth == feb && syear to int % 4 with rest == 0 : month has 29 days
  var iyear = parseInt(syear);
  var numDays = 0; // number of days in month
  if (smonth == "Feb" && 0 == iyear % 4) {
    numDays = 29;
  } else if (smonth == "Feb") {
    // else if smonth == Feb : month has 28 days
    numDays = 28;
  } else if (smonth == "Apr" || smonth == "Jun" || smonth == "Sep" || smonth == "Nov") {
    // else if smonth == april, Juni, Sep, Nov : month has 30 days
    numDays = 30;
  } else {
    // else month has 31 days
    numDays = 31;
  }

  // startwday is start of the month on what weekday (1 - 7)
  // numDays is number of Days in the month (28 - 31)
  var tbody = document.getElementById("calTableBody");

  var curweekday = startwday; // pointer through weekdays for second forloop
  curweekday++;

  var newRow = tbody.insertRow(); // start with first week

  for (var i = 1; i < curweekday; i++) {
    var newCell = newRow.insertCell();
    newCell.id = "b" + i.toString();
  }
  // fill in blank cells before month starts
  // blank ids have id's that start with a 'b'

  for (var i = 1; i < numDays + 1; i++) {
    //console.log(curweekday);
    if (curweekday == 8) {
      curweekday = 1;
      newRow = tbody.insertRow();
    }
    var newCell = newRow.insertCell();
    newCell.id = i.toString();
    newCell.innerHTML = i.toString();
    curweekday++;
  }

  while (curweekday != 8) {
    var newCell = newRow.insertCell();
    newCell.id = "b" + numDays.toString();
    numDays++;
    curweekday++;
  }

  // fill table - add new row for the week, fill row with seven td that have numDays as innerHTML
  // startwday is number between 1 and 7 (weekday when month starts)
  // numDays is how many days there are in the month
  // id of table body = calTableBody

  // Insert a row at the end of table

  // Insert a cell at the end of the row

  // iday is current day - find that in table by id and make color different to highlight as current day
  var id = iday.toString();
  //curDay = id;
  var element = document.getElementById(id);
  element.style.background = "lightgrey";
  element.style.color = "darkgreen";

  if (smonth == "Jan") {
    curMonth = 1;
  } else if (smonth == "Feb") {
    curMonth = 2;
  } else if (smonth == "Mar") {
    curMonth = 3;
  } else if (smonth == "Apr") {
    curMonth = 4;
  } else if (smonth == "May") {
    curMonth = 5;
  } else if (smonth == "Jun") {
    curMonth = 6;
  } else if (smonth == "Jul") {
    curMonth = 7;
  } else if (smonth == "Aug") {
    curMonth = 8;
  } else if (smonth == "Sep") {
    curMonth = 9;
  } else if (smonth == "Oct") {
    curMonth = 10;
  } else if (smonth == "Nov") {
    curMonth = 11;
  } else {
    curMonth = 12;
  }

  curYear = parseInt(syear);

  let tempStringMonth;
  if (curMonth < 10) {
    tempStringMonth = "0" + curMonth.toString();
  } else {
    tempStringMonth = curMonth.toString();
  }

  // YYYY-MM-DD
  curDate = syear + "-" + tempStringMonth + "-" + sday;

  // put smonth and syear into mainTitle
  document.getElementById("mainTitle").innerHTML = smonth + " " + syear;
  appns.populateTable();
}

appns.populateTable = function(){
  //console.log("in populateTable\n");
  // run through data_events and check for each it year == curYear && month == curMonth
  // if both true: check if ul is in td
  // if true: add li in ul (eventName - time)
  // else: add ul in td, add li in ul (eventName - time)
  for (var i = 0; i < data_events.length; i++) {
    var tempDateString = data_events[i].date;
    var tempMon = tempDateString[5] + tempDateString[6];
    var tempYear = tempDateString[0] + tempDateString[1] + tempDateString[2] + tempDateString[3];
    //console.log(tempMon + "  " + tempYear)
    if (curYear == parseInt(tempYear) && curMonth == parseInt(tempMon)) {
      let tempId = "";
      if (tempDateString[8] == '0') {
        tempId = tempDateString[9];
      } else {
        tempId = tempDateString[8] + tempDateString[9];
      }
      let tableCell = document.getElementById(tempId);
      //console.log("TD ID: " + tableCell.id);
      //console.log("Temp ID: " + tempId);
      //console.log(tableCell.childNodes.length);
      //console.log(tableCell.childNodes);
      /*if (tableCell.childNodes.length > 1) {
        // ul already here - add li in existing ul
        // format: eventName - time
      } else {
        // create ul in tableCell and add li in ul
        // format: eventName - time
        //let ul = document.createElement("ul");
        //let li = document.createElement("li");
        //li.innerHTML = data_events[i].eventName + " - " + data_events[i].time;
        //ul.append(li);
        //tableCell.append(ul);
      }*/
      let p = document.createElement("p");
      p.innerHTML = data_events[i].eventName.toUpperCase() + " - " + data_events[i].time;
      if (data_events[i].eventName.toUpperCase() == "GAME" && data_events[i].title == "away") {
        p.style.color = "blue";
      } else if (data_events[i].eventName.toUpperCase() == "GAME" && data_events[i].title == "home") {
        p.style.color = "maroon";
      } else if (data_events[i].eventName.toUpperCase() == "PRACTICE") {
        p.style.color = "green";
      } else if (data_events[i].eventName.toUpperCase() == "VIDEO") {
        p.style.color = "orange";
      }

      tableCell.append(p);
      tempId = "";
    }
    // check if there are events on curDate ()
    if (data_events[i].date == curDate) {
      // if true, put that into todaysEvents div
      let p = document.createElement("p");
      p.innerHTML = data_events[i].eventName.toUpperCase() + " - " + data_events[i].time;
      if (data_events[i].eventName.toUpperCase() == "GAME" && data_events[i].title == "away") {
        p.style.color = "blue";
      } else if (data_events[i].eventName.toUpperCase() == "GAME" && data_events[i].title == "home") {
        p.style.color = "maroon";
      } else if (data_events[i].eventName.toUpperCase() == "PRACTICE") {
        p.style.color = "green";
      } else if (data_events[i].eventName.toUpperCase() == "VIDEO") {
        p.style.color = "orange";
      } else {
        p.style.color = "white";
      }
      let div = document.getElementById("todaysEvents");
      div.append(p);
    }
  }
}

appns.showdayscreen = function(ev){
  // alert(ev.target.nodeName);
  // alert(ev.target.innerHTML);
  if (ev.target.nodeName == "TD") {
    var tid = ev.target.id;
    if (tid[0] != 'b') {
      // day was clicked - dayselected pops up
      // clear viewDayDiv first
      var div = document.getElementById("viewDayDiv");
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
      document.getElementById("viewDay").innerHTML = tid + " " + document.getElementById("mainTitle").innerHTML;
      document.getElementById("viewDay").value = tid;
      // copy innerHTML form ev.target without day number - run through child nodes but skip first one
      // put that text into viewDayDiv
      if (event.target.id.length < event.target.innerHTML.length) {
        // console.log("There are events on that day");
        let numb = ev.target.children.length;
        numb++;
        let nodeList = ev.target.childNodes;
        for (let i = 1; i < numb; i++) {
          // console.log(nodeList[i] + " " + numb + " " + i);
          let tempP = nodeList[i].cloneNode(true);
          tempP.style.textAlign = "left";
          document.getElementById("viewDayDiv").append(tempP);
        }
      }

      document.getElementById("dayselected").style.display="block";
      document.getElementById("opening").style.display="none";
    }
  } else {
    // specific event was clicked
    appns.showEvent(ev.target.innerHTML, ev.target.parentNode.id);
    document.getElementById("opening").style.display="none";
  }
}

appns.todaysEventsSelected = function(ev){
  // alert(ev.target.nodeName);
  // alert(ev.target.innerHTML);
  if (ev.target.nodeName == "P") {
    // specific event was clicked
    // get day as int
    let stringDay = curDate[8] + curDate[9];
    appns.showEvent(ev.target.innerHTML, parseInt(stringDay));
  }
  document.getElementById("opening").style.display="none";
}

appns.viewDayDivSelected = function(ev){
  // alert(ev.target.nodeName);
  // alert(ev.target.innerHTML);
  if (ev.target.nodeName == "P") {
    // specific event was clicked
    // get day as int
    // day can be one or 2 digits, doesn't matter
    let stringDay = document.getElementById("viewDay").value;
    appns.showEvent(ev.target.innerHTML, parseInt(stringDay));
  }
  document.getElementById("dayselected").style.display="none";
}

appns.showEvent = function (targetDisc, tdId){
  // targetDisc is Event discription from calender (EVENT - time)
  // use curYear & curMonth & tdId to find event date
  // time is next key
  document.getElementById("eventselected").style.display="block";
  let stdId = "";
  if (tdId < 10) {
    stdId = "0" + tdId.toString();
  } else {
    stdId = tdId.toString();
  }
  let evDate = curYear.toString() + "-" + curMonth.toString() + "-" + stdId;
  // evDate has date of selected Event in format: "YYYY-MM-DD"

  let idx = 0;
  while (targetDisc[idx] != '-') {
    idx++;
  }
  idx++;
  idx++;
  let evTime = "";
  for (let i = idx; i < targetDisc.length; i++) {
    evTime = evTime + targetDisc[i];
  }
  //evTime has time of selected Event in format: "HH-MM"
  // console.log("Selected Event Date: " + evDate);
  // console.log("Selected Event Time: " + evTime);

  // use that to find event from data_events[] using loop
  idx = 0;
  while (data_events[idx].date != evDate || data_events[idx].time != evTime) {
    // neither is true
    idx++;
  }
  var selEvent = data_events[idx];
  console.log("Event found. Name: " + selEvent.eventName);

  // event found and saved as selEvent

  // clear viewEventDiv before putting anything in there

  var div = document.getElementById("viewEventDiv");
  div.value = "";
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }

  // viewEventDiv is clear

  if (selEvent.title != "") {
    let hName = document.createElement("h2");
    hName.innerHTML = selEvent.eventName.toUpperCase() + ": " + selEvent.title.toUpperCase();
    div.append(hName);
  } else {
    let hName = document.createElement("h2");
    hName.innerHTML = selEvent.eventName.toUpperCase();
    div.append(hName);
  }
  let pDate = document.createElement("p");
  pDate.innerHTML = "On " + selEvent.date;
  div.append(pDate);

  let pTime = document.createElement("p");
  pTime.innerHTML = "At " + selEvent.time;
  div.append(pTime);

  let pLoc = document.createElement("p");
  pLoc.innerHTML = "At " + selEvent.location;
  div.append(pLoc);

  if (selEvent.meetTime != "") {
    let pMTime = document.createElement("p");
    pMTime.innerHTML = "Meet at " + selEvent.meetTime;
    div.append(pMTime);
  }

  if (selEvent.meetLoc != "") {
    let pMLoc = document.createElement("p");
    pMLoc.innerHTML = "Meet at " + selEvent.meetLoc;
    div.append(pMLoc);
  }

  if (selEvent.outfit != "") {
    let pOutfit = document.createElement("p");
    pOutfit.innerHTML = "Outfit: " + selEvent.outfit;
    div.append(pOutfit);
  }

  if (selEvent.other != "") {
    let pOther = document.createElement("p");
    let tempString = "";
    for (let i = 0; i < selEvent.other.length; i++) {
      if (selEvent.other[i] == '-') {
        tempString = tempString + " ";
      } else {
        tempString = tempString + selEvent.other[i];
      }
    }
    pOther.innerHTML = "Note:  " + tempString.toUpperCase();
    div.append(pOther);
  }
  //div.value = selEvent.eventName + selEvent.date + selEvent.time;
  div.value = selEvent;
}

appns.backtoopening = function(){
  document.getElementById("dayselected").style.display="none";
  document.getElementById("opening").style.display="block";
}

appns.backtohomeevent = function(){
  document.getElementById("eventselected").style.display="none";
  document.getElementById("opening").style.display="block";
}

appns.readFile = function() {
  document.getElementById("openDiv").style.display = "none";
	fin.uploadTextFile();
  // fin.uploadTextFile(document.getElementById("#gFile"));
  document.getElementById("opening").style.display = "block";
  appns.init();
}

appns.newEventDiv = function() {
  // new Event div opened
  document.getElementById("dayselected").style.display = "none";
  document.getElementById("eventeditselected").style.display = "block";
  document.getElementById("backToHomeFromSaveEvent").value = "add";
  appns.gameSelect();
}

appns.gameSelect = function() {
  // get date and preset that as "date" for event
  // console.log(document.getElementById("viewDay").value);
  var div = document.getElementById("addEditDiv");

  /*<label for="selEventName">Event Name: </label>
  <select id="selEventName" name="evNames">
    <option value="game">Game</option>
    <option value="practice">Practice</option>
    <option value="video">Video</option>
    <option value="other">Other</option>
  </select>*/
  // append options with appendChild to select
  div.appendChild(document.createElement("br"));
  var typeLbl = document.createElement("LABEL");
  var typeSel = document.createElement("select");
  typeLbl.innerHTML = "Type: ";
  typeLbl.for = typeSel;
  typeSel.id = "selType";
  var typeOp1 = document.createElement("option");
  typeOp1.innerHTML = "Home";
  var typeOp2 = document.createElement("option");
  typeOp2.innerHTML = "Away";
  typeSel.appendChild(typeOp1);
  typeSel.appendChild(typeOp2);
  div.appendChild(typeLbl);
  div.appendChild(typeSel);
  div.appendChild(document.createElement("br"));
  div.appendChild(document.createElement("br"));

  // format time right: YYYY-MM-DD
  var sYear = curYear.toString();
  var sMonth = curMonth.toString();
  var sDay = document.getElementById("viewDay").value;

  if (sMonth.length < 2) {
    sMonth = "0" + sMonth;
  }
  if (sDay.length < 2) {
    sDay = "0" + sDay;
  }

  var newDate = sYear + "-" + sMonth + "-" + sDay;
  var dateDiv = document.createElement("div");
  dateDiv.innerHTML = "Date: " + newDate;
  dateDiv.id = "divDate";
  dateDiv.value = newDate;
  div.appendChild(dateDiv);
  div.appendChild(document.createElement("br"));

  // time
  var timeLbl = document.createElement("LABEL");
  var timeIpt = document.createElement("input");
  timeLbl.for = timeIpt;
  timeLbl.innerHTML = "Time: ";
  div.appendChild(timeLbl);
  timeIpt.type = "time";
  timeIpt.min = "00:00";
  timeIpt.max = "23:59";
  timeIpt.defaultValue = "12:00";
  timeIpt.id = "iptTime";
  //timeIpt.value = "14:00";
  div.appendChild(timeIpt);
  div.appendChild(document.createElement("br"));
  div.appendChild(document.createElement("br"));

  // location
  var locLbl = document.createElement("LABEL");
  var locIpt = document.createElement("input");
  locLbl.for = locIpt;
  locLbl.innerHTML = "Location: ";
  locIpt.id = "iptLoc";
  locIpt.type = "text";
  div.appendChild(locLbl);
  div.appendChild(locIpt);
  div.appendChild(document.createElement("br"));
  div.appendChild(document.createElement("br"));

  // meetTime
  var mtimeLbl = document.createElement("LABEL");
  var mtimeIpt = document.createElement("input");
  mtimeLbl.for = mtimeIpt;
  mtimeLbl.innerHTML = "Meeting Time: ";
  div.appendChild(mtimeLbl);
  mtimeIpt.type = "time";
  mtimeIpt.min = "00:00";
  mtimeIpt.max = "23:59";
  mtimeIpt.defaultValue = "12:00";
  mtimeIpt.id = "iptMTime";
  //timeIpt.value = "14:00";
  div.appendChild(mtimeIpt);
  div.appendChild(document.createElement("br"));
  div.appendChild(document.createElement("br"));

  // meetLoc
  var mlocLbl = document.createElement("LABEL");
  var mlocIpt = document.createElement("input");
  mlocLbl.for = mlocIpt;
  mlocLbl.innerHTML = "Meeting Location: ";
  mlocIpt.id = "iptMLoc";
  mlocIpt.type = "text";
  div.appendChild(mlocLbl);
  div.appendChild(mlocIpt);
  div.appendChild(document.createElement("br"));
  div.appendChild(document.createElement("br"));

  // outfit
  var oftLbl = document.createElement("LABEL");
  var oftIpt = document.createElement("input");
  oftLbl.for = oftIpt;
  oftLbl.innerHTML = "Outfit: ";
  oftIpt.type = "text";
  oftIpt.id = "iptOft";
  div.appendChild(oftLbl);
  div.appendChild(oftIpt);
  div.appendChild(document.createElement("br"));
  div.appendChild(document.createElement("br"));

  // other
  var otrLbl = document.createElement("LABEL");
  var otrIpt = document.createElement("input");
  otrLbl.for = otrIpt;
  otrLbl.innerHTML = "Other: ";
  otrIpt.type = "text";
  otrIpt.id = "iptOtr";
  div.appendChild(otrLbl);
  div.appendChild(otrIpt);
  div.appendChild(document.createElement("br"));
}

appns.practiceSelect = function() {
  // get date and preset that as "date" for event
  // console.log(document.getElementById("viewDay").value);
  var div = document.getElementById("addEditDiv");

  /*<label for="selEventName">Event Name: </label>
  <select id="selEventName" name="evNames">
    <option value="game">Game</option>
    <option value="practice">Practice</option>
    <option value="video">Video</option>
    <option value="other">Other</option>
  </select>*/
  // append options with appendChild to select
  div.appendChild(document.createElement("br"));

  // format time right: YYYY-MM-DD
  var sYear = curYear.toString();
  var sMonth = curMonth.toString();
  var sDay = document.getElementById("viewDay").value;

  if (sMonth.length < 2) {
    sMonth = "0" + sMonth;
  }
  if (sDay.length < 2) {
    sDay = "0" + sDay;
  }

  var newDate = sYear + "-" + sMonth + "-" + sDay;
  var dateDiv = document.createElement("div");
  dateDiv.innerHTML = "Date: " + newDate;
  dateDiv.id = "divDate";
  dateDiv.value = newDate;
  div.appendChild(dateDiv);
  div.appendChild(document.createElement("br"));

  // time
  var timeLbl = document.createElement("LABEL");
  var timeIpt = document.createElement("input");
  timeLbl.for = timeIpt;
  timeLbl.innerHTML = "Time: ";
  div.appendChild(timeLbl);
  timeIpt.type = "time";
  timeIpt.min = "00:00";
  timeIpt.max = "23:59";
  timeIpt.defaultValue = "12:00";
  timeIpt.id = "iptTime";
  //timeIpt.value = "14:00";
  div.appendChild(timeIpt);
  div.appendChild(document.createElement("br"));
  div.appendChild(document.createElement("br"));

  // location
  var locLbl = document.createElement("LABEL");
  var locIpt = document.createElement("input");
  locLbl.for = locIpt;
  locLbl.innerHTML = "Location: ";
  locIpt.id = "iptLoc";
  locIpt.type = "text";
  div.appendChild(locLbl);
  div.appendChild(locIpt);
  div.appendChild(document.createElement("br"));
  div.appendChild(document.createElement("br"));

  // meetTime
  var mtimeLbl = document.createElement("LABEL");
  var mtimeIpt = document.createElement("input");
  mtimeLbl.for = mtimeIpt;
  mtimeLbl.innerHTML = "Meeting Time: ";
  div.appendChild(mtimeLbl);
  mtimeIpt.type = "time";
  mtimeIpt.min = "00:00";
  mtimeIpt.max = "23:59";
  mtimeIpt.defaultValue = "12:00";
  mtimeIpt.id = "iptMTime";
  //timeIpt.value = "14:00";
  div.appendChild(mtimeIpt);
  div.appendChild(document.createElement("br"));
  div.appendChild(document.createElement("br"));

  // outfit
  var oftLbl = document.createElement("LABEL");
  var oftIpt = document.createElement("input");
  oftLbl.for = oftIpt;
  oftLbl.innerHTML = "Outfit: ";
  oftIpt.type = "text";
  oftIpt.id = "iptOft";
  div.appendChild(oftLbl);
  div.appendChild(oftIpt);
  div.appendChild(document.createElement("br"));
  div.appendChild(document.createElement("br"));

  // other
  var otrLbl = document.createElement("LABEL");
  var otrIpt = document.createElement("input");
  otrLbl.for = otrIpt;
  otrLbl.innerHTML = "Other: ";
  otrIpt.type = "text";
  otrIpt.id = "iptOtr";
  div.appendChild(otrLbl);
  div.appendChild(otrIpt);
  div.appendChild(document.createElement("br"));
}

appns.videoSelect = function() {
  // get date and preset that as "date" for event
  // console.log(document.getElementById("viewDay").value);
  var div = document.getElementById("addEditDiv");
  div.appendChild(document.createElement("br"));
  /*<label for="selEventName">Event Name: </label>
  <select id="selEventName" name="evNames">
    <option value="game">Game</option>
    <option value="practice">Practice</option>
    <option value="video">Video</option>
    <option value="other">Other</option>
  </select>*/
  // append options with appendChild to select

  // format time right: YYYY-MM-DD
  var sYear = curYear.toString();
  var sMonth = curMonth.toString();
  var sDay = document.getElementById("viewDay").value;

  if (sMonth.length < 2) {
    sMonth = "0" + sMonth;
  }
  if (sDay.length < 2) {
    sDay = "0" + sDay;
  }

  var newDate = sYear + "-" + sMonth + "-" + sDay;
  var dateDiv = document.createElement("div");
  dateDiv.innerHTML = "Date: " + newDate;
  dateDiv.id = "divDate";
  dateDiv.value = newDate;
  div.appendChild(dateDiv);
  div.appendChild(document.createElement("br"));

  // time
  var timeLbl = document.createElement("LABEL");
  var timeIpt = document.createElement("input");
  timeLbl.for = timeIpt;
  timeLbl.innerHTML = "Time: ";
  div.appendChild(timeLbl);
  timeIpt.type = "time";
  timeIpt.min = "00:00";
  timeIpt.max = "23:59";
  timeIpt.defaultValue = "12:00";
  timeIpt.id = "iptTime";
  //timeIpt.value = "14:00";
  div.appendChild(timeIpt);
  div.appendChild(document.createElement("br"));
  div.appendChild(document.createElement("br"));

  // location
  var locLbl = document.createElement("LABEL");
  var locIpt = document.createElement("input");
  locLbl.for = locIpt;
  locLbl.innerHTML = "Location: ";
  locIpt.id = "iptLoc";
  locIpt.type = "text";
  div.appendChild(locLbl);
  div.appendChild(locIpt);
  div.appendChild(document.createElement("br"));
  div.appendChild(document.createElement("br"));

  // other
  var otrLbl = document.createElement("LABEL");
  var otrIpt = document.createElement("input");
  otrLbl.for = otrIpt;
  otrLbl.innerHTML = "Other: ";
  otrIpt.type = "text";
  otrIpt.id = "iptOtr";
  div.appendChild(otrLbl);
  div.appendChild(otrIpt);
  div.appendChild(document.createElement("br"));
}

appns.otherSelect = function() {
  // get date and preset that as "date" for event
  // console.log(document.getElementById("viewDay").value);
  var div = document.getElementById("addEditDiv");

  /*<label for="selEventName">Event Name: </label>
  <select id="selEventName" name="evNames">
    <option value="game">Game</option>
    <option value="practice">Practice</option>
    <option value="video">Video</option>
    <option value="other">Other</option>
  </select>*/
  // append options with appendChild to select
  div.appendChild(document.createElement("br"));
  // title
  var ttlLbl = document.createElement("LABEL");
  var ttlIpt = document.createElement("input");
  ttlLbl.for = ttlIpt;
  ttlLbl.innerHTML = "Title: ";
  ttlIpt.id = "ttlLoc";
  ttlIpt.type = "text";
  div.appendChild(ttlLbl);
  div.appendChild(ttlIpt);
  div.appendChild(document.createElement("br"));
  div.appendChild(document.createElement("br"));

  // format time right: YYYY-MM-DD
  var sYear = curYear.toString();
  var sMonth = curMonth.toString();
  var sDay = document.getElementById("viewDay").value;

  if (sMonth.length < 2) {
    sMonth = "0" + sMonth;
  }
  if (sDay.length < 2) {
    sDay = "0" + sDay;
  }

  var newDate = sYear + "-" + sMonth + "-" + sDay;
  var dateDiv = document.createElement("div");
  dateDiv.innerHTML = "Date: " + newDate;
  dateDiv.id = "divDate";
  dateDiv.value = newDate;
  div.appendChild(dateDiv);
  div.appendChild(document.createElement("br"));

  // time
  var timeLbl = document.createElement("LABEL");
  var timeIpt = document.createElement("input");
  timeLbl.for = timeIpt;
  timeLbl.innerHTML = "Time: ";
  div.appendChild(timeLbl);
  timeIpt.type = "time";
  timeIpt.min = "00:00";
  timeIpt.max = "23:59";
  timeIpt.defaultValue = "12:00";
  timeIpt.id = "iptTime";
  //timeIpt.value = "14:00";
  div.appendChild(timeIpt);
  div.appendChild(document.createElement("br"));
  div.appendChild(document.createElement("br"));

  // location
  var locLbl = document.createElement("LABEL");
  var locIpt = document.createElement("input");
  locLbl.for = locIpt;
  locLbl.innerHTML = "Location: ";
  locIpt.id = "iptLoc";
  locIpt.type = "text";
  div.appendChild(locLbl);
  div.appendChild(locIpt);
  div.appendChild(document.createElement("br"));
  div.appendChild(document.createElement("br"));

  // meetTime
  var mtimeLbl = document.createElement("LABEL");
  var mtimeIpt = document.createElement("input");
  mtimeLbl.for = mtimeIpt;
  mtimeLbl.innerHTML = "Meeting Time: ";
  div.appendChild(mtimeLbl);
  mtimeIpt.type = "time";
  mtimeIpt.min = "00:00";
  mtimeIpt.max = "23:59";
  mtimeIpt.defaultValue = "12:00";
  mtimeIpt.id = "iptMTime";
  //timeIpt.value = "14:00";
  div.appendChild(mtimeIpt);
  div.appendChild(document.createElement("br"));
  div.appendChild(document.createElement("br"));

  // meetLoc
  var mlocLbl = document.createElement("LABEL");
  var mlocIpt = document.createElement("input");
  mlocLbl.for = mlocIpt;
  mlocLbl.innerHTML = "Meeting Location: ";
  mlocIpt.id = "iptMLoc";
  mlocIpt.type = "text";
  div.appendChild(mlocLbl);
  div.appendChild(mlocIpt);
  div.appendChild(document.createElement("br"));
  div.appendChild(document.createElement("br"));

  // outfit
  var oftLbl = document.createElement("LABEL");
  var oftIpt = document.createElement("input");
  oftLbl.for = oftIpt;
  oftLbl.innerHTML = "Outfit: ";
  oftIpt.type = "text";
  oftIpt.id = "iptOft";
  div.appendChild(oftLbl);
  div.appendChild(oftIpt);
  div.appendChild(document.createElement("br"));
  div.appendChild(document.createElement("br"));

  // other
  var otrLbl = document.createElement("LABEL");
  var otrIpt = document.createElement("input");
  otrLbl.for = otrIpt;
  otrLbl.innerHTML = "Other: ";
  otrIpt.type = "text";
  otrIpt.id = "iptOtr";
  div.appendChild(otrLbl);
  div.appendChild(otrIpt);
  div.appendChild(document.createElement("br"));
}

appns.onchangeSelect = function() {
  // eventName in select changed - check what changed to and go to according function
  var optionEvName = document.getElementById("selEventName");
  var evNameString = optionEvName.options[optionEvName.selectedIndex].text;

  // clear div first!!!
  var div = document.getElementById("addEditDiv");
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }

  if (evNameString == "Game") {
    appns.gameSelect();
  } else if (evNameString == "Practice") {
    appns.practiceSelect();
  } else if (evNameString == "Video") {
    appns.videoSelect();
  } else {
    appns.otherSelect();
  }
}

appns.editEventDiv = function() {
  // new Event div opened with info from selected Event
  document.getElementById("eventselected").style.display = "none";
  document.getElementById("eventeditselected").style.display = "block";
  document.getElementById("backToHomeFromSaveEvent").value = "edit";
  // get event (value from div)
  var selEv = document.getElementById("viewEventDiv").value;
  //console.log("editEventDiv " + selEv.eventName);
  
  // fill in data
  var idx = "";
  if (selEv.eventName == "game") {
	  idx = 0;
	  appns.gameEdit(selEv);
  } else if (selEv.eventName == "practice") {
	  idx = 1;
	  appns.practiceEdit(selEv);
  } else if (selEv.eventName == "video") {
	  idx = 2;
	  appns.videoEdit(selEv);
  } else {
	  idx = 3;
	  appns.otherEdit(selEv);
  }
  
  var optionEvName = document.getElementById("selEventName");
  optionEvName[idx].selected = true;
}

appns.gameEdit = function(selEv) {
    var div = document.getElementById("addEditDiv");
	
	var idx = 0;
	if (selEv.title == "away") {
		idx = 1;
	}

    div.appendChild(document.createElement("br"));
    var typeLbl = document.createElement("LABEL");
    var typeSel = document.createElement("select");
    typeLbl.innerHTML = "Type: ";
    typeLbl.for = typeSel;
    typeSel.id = "selType";
    var typeOp1 = document.createElement("option");
    typeOp1.innerHTML = "Home";
    var typeOp2 = document.createElement("option");
    typeOp2.innerHTML = "Away";
    typeSel.appendChild(typeOp1);
    typeSel.appendChild(typeOp2);
	typeSel[idx].selected = true;
    div.appendChild(typeLbl);
    div.appendChild(typeSel);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));

    // format time right: YYYY-MM-DD
	// get time from selEv.date
	var sYear = selEv.date[0] + selEv.date[1] + selEv.date[2] + selEv.date[3];
    // var sYear = curYear.toString();
	var sMonth = selEv.date[5] + selEv.date[6];
    // var sMonth = curMonth.toString();
	var sDay = selEv.date[8] + selEv.date[9];
    // var sDay = document.getElementById("viewDay").value;

    if (sMonth.length < 2) {
      sMonth = "0" + sMonth;
    }
    if (sDay.length < 2) {
      sDay = "0" + sDay;
    }

    var newDate = sYear + "-" + sMonth + "-" + sDay;
    var dateDiv = document.createElement("div");
    dateDiv.innerHTML = "Date: " + newDate;
    dateDiv.id = "divDate";
    dateDiv.value = newDate;
    div.appendChild(dateDiv);
    div.appendChild(document.createElement("br"));

    // time
    var timeLbl = document.createElement("LABEL");
    var timeIpt = document.createElement("input");
    timeLbl.for = timeIpt;
    timeLbl.innerHTML = "Time: ";
    div.appendChild(timeLbl);
    timeIpt.type = "time";
    timeIpt.min = "00:00";
    timeIpt.max = "23:59";
	var timeVal = selEv.time[0] + selEv.time[1] + ':' + selEv.time[3] + selEv.time[4];
    timeIpt.defaultValue = timeVal;
    timeIpt.id = "iptTime";
    //timeIpt.value = "14:00";
    div.appendChild(timeIpt);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));

    // location
    var locLbl = document.createElement("LABEL");
    var locIpt = document.createElement("input");
    locLbl.for = locIpt;
    locLbl.innerHTML = "Location: ";
    locIpt.id = "iptLoc";
    locIpt.type = "text";
	locIpt.value = selEv.location;
    div.appendChild(locLbl);
    div.appendChild(locIpt);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));

    // meetTime
    var mtimeLbl = document.createElement("LABEL");
    var mtimeIpt = document.createElement("input");
    mtimeLbl.for = mtimeIpt;
    mtimeLbl.innerHTML = "Meeting Time: ";
    div.appendChild(mtimeLbl);
    mtimeIpt.type = "time";
    mtimeIpt.min = "00:00";
    mtimeIpt.max = "23:59";
	timeVal = selEv.meetTime[0] + selEv.meetTime[1] + ':' + selEv.meetTime[3] + selEv.meetTime[4];
    mtimeIpt.defaultValue = timeVal;
    mtimeIpt.id = "iptMTime";
    //timeIpt.value = "14:00";
    div.appendChild(mtimeIpt);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));

    // meetLoc
    var mlocLbl = document.createElement("LABEL");
    var mlocIpt = document.createElement("input");
    mlocLbl.for = mlocIpt;
    mlocLbl.innerHTML = "Meeting Location: ";
    mlocIpt.id = "iptMLoc";
    mlocIpt.type = "text";
	mlocIpt.value = selEv.meetLoc;
    div.appendChild(mlocLbl);
    div.appendChild(mlocIpt);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));

    // outfit
    var oftLbl = document.createElement("LABEL");
    var oftIpt = document.createElement("input");
    oftLbl.for = oftIpt;
    oftLbl.innerHTML = "Outfit: ";
    oftIpt.type = "text";
    oftIpt.id = "iptOft";
	oftIpt.value = selEv.outfit;
    div.appendChild(oftLbl);
    div.appendChild(oftIpt);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));

    // other
    var otrLbl = document.createElement("LABEL");
    var otrIpt = document.createElement("input");
    otrLbl.for = otrIpt;
    otrLbl.innerHTML = "Other: ";
    otrIpt.type = "text";
    otrIpt.id = "iptOtr";
	otrIpt.value = selEv.other;
    div.appendChild(otrLbl);
    div.appendChild(otrIpt);
    div.appendChild(document.createElement("br"));
}

appns.practiceEdit = function(selEv) {
    var div = document.getElementById("addEditDiv");

    /*<label for="selEventName">Event Name: </label>
    <select id="selEventName" name="evNames">
      <option value="game">Game</option>
      <option value="practice">Practice</option>
      <option value="video">Video</option>
      <option value="other">Other</option>
    </select>*/
    // append options with appendChild to select
    div.appendChild(document.createElement("br"));

    // format time right: YYYY-MM-DD
	// get time from selEv.date
	var sYear = selEv.date[0] + selEv.date[1] + selEv.date[2] + selEv.date[3];
    // var sYear = curYear.toString();
	var sMonth = selEv.date[5] + selEv.date[6];
    // var sMonth = curMonth.toString();
	var sDay = selEv.date[8] + selEv.date[9];
    // var sDay = document.getElementById("viewDay").value;

    if (sMonth.length < 2) {
      sMonth = "0" + sMonth;
    }
    if (sDay.length < 2) {
      sDay = "0" + sDay;
    }

    var newDate = sYear + "-" + sMonth + "-" + sDay;
    var dateDiv = document.createElement("div");
    dateDiv.innerHTML = "Date: " + newDate;
    dateDiv.id = "divDate";
    dateDiv.value = newDate;
    div.appendChild(dateDiv);
    div.appendChild(document.createElement("br"));

    // time
    var timeLbl = document.createElement("LABEL");
    var timeIpt = document.createElement("input");
    timeLbl.for = timeIpt;
    timeLbl.innerHTML = "Time: ";
    div.appendChild(timeLbl);
    timeIpt.type = "time";
    timeIpt.min = "00:00";
    timeIpt.max = "23:59";
	var timeVal = selEv.time[0] + selEv.time[1] + ':' + selEv.time[3] + selEv.time[4];
    timeIpt.defaultValue = timeVal;
    timeIpt.id = "iptTime";
    //timeIpt.value = "14:00";
    div.appendChild(timeIpt);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));

    // location
    var locLbl = document.createElement("LABEL");
    var locIpt = document.createElement("input");
    locLbl.for = locIpt;
    locLbl.innerHTML = "Location: ";
    locIpt.id = "iptLoc";
    locIpt.type = "text";
	locIpt.value = selEv.location;
    div.appendChild(locLbl);
    div.appendChild(locIpt);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));

    // meetTime
    var mtimeLbl = document.createElement("LABEL");
    var mtimeIpt = document.createElement("input");
    mtimeLbl.for = mtimeIpt;
    mtimeLbl.innerHTML = "Meeting Time: ";
    div.appendChild(mtimeLbl);
    mtimeIpt.type = "time";
    mtimeIpt.min = "00:00";
    mtimeIpt.max = "23:59";
	timeVal = selEv.meetTime[0] + selEv.meetTime[1] + ':' + selEv.meetTime[3] + selEv.meetTime[4];
    mtimeIpt.defaultValue = timeVal;
    mtimeIpt.id = "iptMTime";
    //timeIpt.value = "14:00";
    div.appendChild(mtimeIpt);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));

    // outfit
    var oftLbl = document.createElement("LABEL");
    var oftIpt = document.createElement("input");
    oftLbl.for = oftIpt;
    oftLbl.innerHTML = "Outfit: ";
    oftIpt.type = "text";
    oftIpt.id = "iptOft";
	oftIpt.value = selEv.outfit
    div.appendChild(oftLbl);
    div.appendChild(oftIpt);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));

    // other
    var otrLbl = document.createElement("LABEL");
    var otrIpt = document.createElement("input");
    otrLbl.for = otrIpt;
    otrLbl.innerHTML = "Other: ";
    otrIpt.type = "text";
    otrIpt.id = "iptOtr";
	otrIpt.value = selEv.other;
    div.appendChild(otrLbl);
    div.appendChild(otrIpt);
    div.appendChild(document.createElement("br"));
}

appns.videoEdit = function(selEv) {
    // get date and preset that as "date" for event
    // console.log(document.getElementById("viewDay").value);
    var div = document.getElementById("addEditDiv");
    div.appendChild(document.createElement("br"));
    /*<label for="selEventName">Event Name: </label>
    <select id="selEventName" name="evNames">
      <option value="game">Game</option>
      <option value="practice">Practice</option>
      <option value="video">Video</option>
      <option value="other">Other</option>
    </select>*/
    // append options with appendChild to select

    // format time right: YYYY-MM-DD
	// get time from selEv.date
	var sYear = selEv.date[0] + selEv.date[1] + selEv.date[2] + selEv.date[3];
    // var sYear = curYear.toString();
	var sMonth = selEv.date[5] + selEv.date[6];
    // var sMonth = curMonth.toString();
	var sDay = selEv.date[8] + selEv.date[9];
    // var sDay = document.getElementById("viewDay").value;

    if (sMonth.length < 2) {
      sMonth = "0" + sMonth;
    }
    if (sDay.length < 2) {
      sDay = "0" + sDay;
    }

    var newDate = sYear + "-" + sMonth + "-" + sDay;
    var dateDiv = document.createElement("div");
    dateDiv.innerHTML = "Date: " + newDate;
    dateDiv.id = "divDate";
    dateDiv.value = newDate;
    div.appendChild(dateDiv);
    div.appendChild(document.createElement("br"));

    // time
    var timeLbl = document.createElement("LABEL");
    var timeIpt = document.createElement("input");
    timeLbl.for = timeIpt;
    timeLbl.innerHTML = "Time: ";
    div.appendChild(timeLbl);
    timeIpt.type = "time";
    timeIpt.min = "00:00";
    timeIpt.max = "23:59";
	var timeVal = selEv.time[0] + selEv.time[1] + ':' + selEv.time[3] + selEv.time[4];
    timeIpt.defaultValue = timeVal;
    timeIpt.id = "iptTime";
    //timeIpt.value = "14:00";
    div.appendChild(timeIpt);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));

    // location
    var locLbl = document.createElement("LABEL");
    var locIpt = document.createElement("input");
    locLbl.for = locIpt;
    locLbl.innerHTML = "Location: ";
    locIpt.id = "iptLoc";
    locIpt.type = "text";
	locIpt.value = selEv.location;
    div.appendChild(locLbl);
    div.appendChild(locIpt);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));

    // other
    var otrLbl = document.createElement("LABEL");
    var otrIpt = document.createElement("input");
    otrLbl.for = otrIpt;
    otrLbl.innerHTML = "Other: ";
    otrIpt.type = "text";
    otrIpt.id = "iptOtr";
	otrIpt.value = selEv.other;
    div.appendChild(otrLbl);
    div.appendChild(otrIpt);
    div.appendChild(document.createElement("br"));
}

appns.otherEdit = function(selEv) {
    var div = document.getElementById("addEditDiv");

    /*<label for="selEventName">Event Name: </label>
    <select id="selEventName" name="evNames">
      <option value="game">Game</option>
      <option value="practice">Practice</option>
      <option value="video">Video</option>
      <option value="other">Other</option>
    </select>*/
    // append options with appendChild to select
    div.appendChild(document.createElement("br"));
    // title
    var ttlLbl = document.createElement("LABEL");
    var ttlIpt = document.createElement("input");
    ttlLbl.for = ttlIpt;
    ttlLbl.innerHTML = "Title: ";
    ttlIpt.id = "ttlLoc";
    ttlIpt.type = "text";
	ttlIpt.value = selEv.title;
    div.appendChild(ttlLbl);
    div.appendChild(ttlIpt);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));

    // format time right: YYYY-MM-DD
	// get time from selEv.date
	var sYear = selEv.date[0] + selEv.date[1] + selEv.date[2] + selEv.date[3];
    // var sYear = curYear.toString();
	var sMonth = selEv.date[5] + selEv.date[6];
    // var sMonth = curMonth.toString();
	var sDay = selEv.date[8] + selEv.date[9];
    // var sDay = document.getElementById("viewDay").value;

    if (sMonth.length < 2) {
      sMonth = "0" + sMonth;
    }
    if (sDay.length < 2) {
      sDay = "0" + sDay;
    }

    var newDate = sYear + "-" + sMonth + "-" + sDay;
    var dateDiv = document.createElement("div");
    dateDiv.innerHTML = "Date: " + newDate;
    dateDiv.id = "divDate";
    dateDiv.value = newDate;
    div.appendChild(dateDiv);
    div.appendChild(document.createElement("br"));

    // time
    var timeLbl = document.createElement("LABEL");
    var timeIpt = document.createElement("input");
    timeLbl.for = timeIpt;
    timeLbl.innerHTML = "Time: ";
    div.appendChild(timeLbl);
    timeIpt.type = "time";
    timeIpt.min = "00:00";
    timeIpt.max = "23:59";
	var timeVal = selEv.time[0] + selEv.time[1] + ':' + selEv.time[3] + selEv.time[4];
    timeIpt.defaultValue = timeVal;
    timeIpt.id = "iptTime";
    //timeIpt.value = "14:00";
    div.appendChild(timeIpt);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));

    // location
    var locLbl = document.createElement("LABEL");
    var locIpt = document.createElement("input");
    locLbl.for = locIpt;
    locLbl.innerHTML = "Location: ";
    locIpt.id = "iptLoc";
    locIpt.type = "text";
	locIpt.value = selEv.location;
    div.appendChild(locLbl);
    div.appendChild(locIpt);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));

    // meetTime
    var mtimeLbl = document.createElement("LABEL");
    var mtimeIpt = document.createElement("input");
    mtimeLbl.for = mtimeIpt;
    mtimeLbl.innerHTML = "Meeting Time: ";
    div.appendChild(mtimeLbl);
    mtimeIpt.type = "time";
    mtimeIpt.min = "00:00";
    mtimeIpt.max = "23:59";
	timeVal = selEv.meetTime[0] + selEv.meetTime[1] + ':' + selEv.meetTime[3] + selEv.meetTime[4];
    mtimeIpt.defaultValue = timeVal;
    mtimeIpt.id = "iptMTime";
    //timeIpt.value = "14:00";
    div.appendChild(mtimeIpt);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));

    // meetLoc
    var mlocLbl = document.createElement("LABEL");
    var mlocIpt = document.createElement("input");
    mlocLbl.for = mlocIpt;
    mlocLbl.innerHTML = "Meeting Location: ";
    mlocIpt.id = "iptMLoc";
    mlocIpt.type = "text";
	mlocIpt.value = selEv.meetLoc;
    div.appendChild(mlocLbl);
    div.appendChild(mlocIpt);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));

    // outfit
    var oftLbl = document.createElement("LABEL");
    var oftIpt = document.createElement("input");
    oftLbl.for = oftIpt;
    oftLbl.innerHTML = "Outfit: ";
    oftIpt.type = "text";
    oftIpt.id = "iptOft";
	oftIpt.value = selEv.outfit;
    div.appendChild(oftLbl);
    div.appendChild(oftIpt);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));

    // other
    var otrLbl = document.createElement("LABEL");
    var otrIpt = document.createElement("input");
    otrLbl.for = otrIpt;
    otrLbl.innerHTML = "Other: ";
    otrIpt.type = "text";
    otrIpt.id = "iptOtr";
	otrIpt.value = selEv.other;
    div.appendChild(otrLbl);
    div.appendChild(otrIpt);
    div.appendChild(document.createElement("br"));
}

appns.backtohomeeditevent = function() {
  // cancel edit/new Event and return to home
  document.getElementById("opening").style.display = "block";
  document.getElementById("eventeditselected").style.display = "none";
  var div = document.getElementById("addEditDiv");
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
  document.getElementById("selEventName")[0].selected = true;
  //optionEvName[idx].selected = true;
}

appns.backtohomesaveevent = function() {
  // edited/new Event saved - if edited, override old info
  // save new event (for now) & add to array + add to calendar
  // add ids to elements in gameSelect()
  // selEventName - select
  // selType - select
  // divDate.value
  // iptTime - input time
  // iptLoc - input text
  // iptMTime - input time
  // iptMLoc - input text
  // iptOft - input text
  // iptOtr - input text
	
  var mode = document.getElementById("backToHomeFromSaveEvent").value;

  var optionEvName = document.getElementById("selEventName");
  var evNameString = optionEvName.options[optionEvName.selectedIndex].text;
  evNameString = evNameString.toLowerCase();

  var optionType = document.getElementById("selType");
  var typeString = "";
  if (typeof(optionType) != 'undefined' && optionType != null) {
    typeString = optionType.options[optionType.selectedIndex].text;
    typeString = typeString.toLowerCase();
  }
  
  var titleOp = document.getElementById("ttlLoc");
  if (typeof(titleOp) != 'undefined' && titleOp != null) {
    typeString = titleOp.value;
  }

  for (var i = 0; i < typeString.length; i++) {
    if (typeString[i] == ' ') {
      typeString[i] = '-';
    }
  }

  var dateString = document.getElementById("divDate").value;

  // input time - gets time in 24hr format
  var timeString = document.getElementById("iptTime").value;
  timeString = timeString[0] + timeString[1] + '-' + timeString[3] + timeString[4];

  // for input - replace spaces with '-'
  // check that it's not empty
  var locString = document.getElementById("iptLoc").value;

  if (locString == "") {
    alert("Location must not be empty");
    return;
  }
  for (var i = 0; i < locString.length; i++) {
    //console.log(locString[i]);
    if (locString[i] == ' ') {
      locString[i] = '-';
      //console.log(locString[i]);
    }
  }
  //console.log(locString);

  //rest is optional to fill in - check if they exist except other
  var inputMTime = document.getElementById("iptMTime");
  var mtimeString = "";
  if (typeof(inputMTime) != 'undefined' && inputMTime != null) {
    mtimeString = inputMTime.value;
	mtimeString = mtimeString[0] + mtimeString[1] + '-' + mtimeString[3] + mtimeString[4];
  }

  var inputMLoc = document.getElementById("iptMLoc");
  var mlocString = "";
  if (typeof(inputMLoc) != 'undefined' && inputMLoc != null) {
    mlocString = inputMLoc.value;
  }
  for (var i = 0; i < mlocString.length; i++) {
    //console.log(locString[i]);
    if (mlocString[i] == ' ') {
      mlocString[i] = '-';
      //console.log(locString[i]);
    }
  }

  var inputOft = document.getElementById("iptOft");
  var outfitString = "";
  if (typeof(inputOft) != 'undefined' && inputOft != null) {
    outfitString = inputOft.value;
  }

  for (var i = 0; i < outfitString.length; i++) {
    //console.log(locString[i]);
    if (outfitString[i] == ' ') {
      outfitString[i] = '-';
      //console.log(locString[i]);
    }
  }

  var otherString = document.getElementById("iptOtr").value;

  for (var i = 0; i < otherString.length; i++) {
    //console.log(locString[i]);
    if (otherString[i] == ' ') {
      otherString[i] = '-';
      //console.log(locString[i]);
    }
  }

  // evNameString
  // typeString
  // dateString
  // timeString
  // locString
  // mtimeString
  // mlocString
  // outfitString
  // otherString

  let	newEvent = Object.create(data_eventType);
  	newEvent.eventName = evNameString;
	newEvent.title = typeString;
	newEvent.date = dateString;
	newEvent.time = timeString;
	newEvent.location = locString;
	newEvent.meetTime = mtimeString;
	newEvent.meetLoc = mlocString;
	newEvent.outfit = outfitString;
	newEvent.other = otherString;
	
	if (mode == "add") {
		data_events.push(newEvent);
	} else if (mode == "edit") {
		var selEv = document.getElementById("viewEventDiv").value;
		for (var i = 0; i < data_events.length; i++) {
			if (data_events[i].eventName == selEv.eventName && data_events[i].date == selEv.date && data_events[i].time == selEv.time) {
				data_events[i] = newEvent;
				console.log("appns.backtohomesaveevent - old event overwritten");
			}
		}
	}
	//------------------------------------------------------

  // make table clear/erase function
  // call that function
  // call appns.init()
  // clear div
  appns.clearTable();
  appns.init();
  var div = document.getElementById("addEditDiv");
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
  optionEvName.getElementsByTagName('option')[0].selected = 'selected';
  //appns.populateTable();
}

appns.clearTable = function() {
  /*<table id="calendartable" bgcolor="lightgrey" align="center" cellspacing="21" cellpadding="21">
    <thead>
      <tr>
        <th>Mon</th>
        <th>Tue</th>
        <th>Wed</th>
        <th>Thu</th>
        <th>Fri</th>
        <th>Sat</th>
        <th>Sun</th>
      </tr>
    </thead>

    <tbody id="calTableBody">
    </tbody>
  </table>
  <div id="todaysEvents"> </div>*/
  // this is the html that needs to be left after clearing everything
  var div = document.getElementById("todaysEvents");
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
  div.innerHTML = "";
  var tbl = document.getElementById("calTableBody");
  while (tbl.firstChild) {
    tbl.removeChild(tbl.firstChild);
  }
}

appns.saveData = function() {
  /*fin.downloadTextFile = function (txt, name = 'file.txt')*/
  let fname = prompt("Please enter a new file name", "TeamOrganizer.txt");
  if (fname != null) {
    let dat = data_bundleData();
    if (fname == "") {
      fname = "file.txt";
    }

    fin.downloadTextFile(dat, fname);
    alert("Saved successfully");
  }
}

window.onload = function(){
  document.getElementById("newUser").addEventListener('click', appns.init);
  document.getElementById("calendartable").addEventListener('click', appns.showdayscreen);
  document.getElementById("backToOpening").addEventListener('click', appns.backtoopening);
  document.getElementById("gFile").addEventListener("change", appns.readFile);
  document.getElementById("backToHomeFromEvent").addEventListener('click', appns.backtohomeevent);
  document.getElementById("todaysEvents").addEventListener('click', appns.todaysEventsSelected);
  document.getElementById("addEvent").addEventListener('click', appns.newEventDiv);
  document.getElementById("editEvent").addEventListener('click', appns.editEventDiv);
  document.getElementById("backToHomeFromEditEvent").addEventListener('click', appns.backtohomeeditevent);
  document.getElementById("backToHomeFromSaveEvent").addEventListener('click', appns.backtohomesaveevent);
  document.getElementById("viewDayDiv").addEventListener('click', appns.viewDayDivSelected);
  document.getElementById("saveData").addEventListener('click', appns.saveData);
  document.getElementById("selEventName").addEventListener('change', appns.onchangeSelect);
}
