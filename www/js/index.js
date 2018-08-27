/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	// Application Constructor
	initialize: function () {
		document.addEventListener('deviceready', download, false);
	

	},


	onDeviceReady: function () {
		this.receivedEvent('deviceready');

	},

	receivedEvent: function (id) {
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');

		console.log('Received Event: ' + id);
	}
};

app.initialize();





function getPermission() {
	window.plugins.calendar.hasReadWritePermission(
		function (result) {
			setCalendar();
			if (!result)
				window.plugins.calendar.requestReadWritePermission();
		}
	)
}



function alertCallback() {

}


var weekdays = new Array(7);
weekdays[0] = "CN";
weekdays[1] = "T2";
weekdays[2] = "T3";
weekdays[3] = "T4";
weekdays[4] = "T5";
weekdays[5] = "T6";
weekdays[6] = "T7";

var lich;
function checkDate(d) {
	if (d < 10)
		return "0" + d;
	else
		return d;
}

function download() {

	$('#cal').html('<ul class="table-view">');
	var myRand = Math.floor((Math.random() * 1000) + 1);
	var html = '<ul class="table-view">';
	$.getJSON('http://115.79.42.45:9090/tbhuy/www/index.html?p=' + myRand, function (result) {
		lich = result;
		var oldday = "";
		$.each(result, function (i, cal) {

			var startDate = new Date(cal.startDate);
			var day = weekdays[startDate.getDay()];
			var showmessage = "";
			if (cal.message !== "")
				showmessage = " <span class='icon icon-forward'></span>" + cal.message;
			if (day == oldday) {

				html = html + "<br/>" + checkDate(startDate.getHours()) + ":" + checkDate(startDate.getMinutes()) + " <b>" + cal.title + " </b><span class='icon icon-home'></span>" + cal.location + showmessage;
			}
			else {

				html = html + '</p></li><li class="table-view-cell">' + day + " (" + checkDate(startDate.getDate()) + "/" + checkDate(startDate.getMonth() + 1) + ") <p>" + checkDate(startDate.getHours()) + ":" + checkDate(startDate.getMinutes()) + " <b>" + cal.title + " </b><span class='icon icon-home'></span>" + cal.location + showmessage;
				oldday = day;
			}

		});

		$('#cal').html(html);


	});


}


function reload() {

	if (window.location.href.lastIndexOf("index") > 0)
		location.reload();
	else

		location.href = "index.html";
}

function share() {
	var caltext = "";
	$.each(lich, function (i, cal) {

		var startDate = new Date(cal.startDate);
		var endDate = new Date(startDate);
		var startDate = new Date(cal.startDate);
		var day = weekdays[startDate.getDay()];
		endDate.setMinutes(startDate.getMinutes() + cal.duration);
		caltext += day + "(" + startDate.getDate() + "/" + (startDate.getMonth() + 1) + ") " + startDate.getHours() + ":" + startDate.getMinutes() + " " + cal.title + " " + " \n DD: " + cal.location + " ND:" + cal.message + "\n";

	});

	navigator.share(caltext, "Lich lam viec", null);
}

function showStatus(status) {
	alert(status);
}

function setCalendar() {
	var calOptions = window.plugins.calendar.getCalendarOptions(); // grab the defaults
	calOptions.firstReminderMinutes = 30; // default is 60, pass in null for no reminder (alarm)
	calOptions.secondReminderMinutes = 5;

	$.each(lich, function (i, cal) {

		var startDate = new Date(cal.startDate);
		var endDate = new Date(startDate);
		endDate.setMinutes(startDate.getMinutes() + cal.duration);
		window.plugins.calendar.createEventWithOptions(cal.title, cal.location, cal.message, startDate, endDate, calOptions, showStatus, showStatus);

	});

} 
