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
    initialize: function() {
        document.addEventListener('deviceready', Download2, false);
		//document.getElementById("setCal").addEventListener("click", setCalendar); 
		
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
	
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();


	
	

function getPermission()
{
	 window.plugins.calendar.hasReadWritePermission(
      function(result) {
        // if this is 'false' you probably want to call 'requestReadWritePermission' now
		setCalendar();
		//navigator.notification.alert(result, alertCallback, "Permission", "Info");
        if(result===false)
			    window.plugins.calendar.requestReadWritePermission();
      }
    )
  }



   function alertCallback() {
      console.log("Alert is Dismissed!");
	  
}

var folderName = 'xyz';
var fileName;

function downloadFile(URL) {
    //step to request a file system 
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);

    function fileSystemSuccess(fileSystem) {
        var download_link = encodeURI(URL);
        fileName = download_link.substr(download_link.lastIndexOf('/') + 1); //Get filename of URL
        var directoryEntry = fileSystem.root; // to get root path of directory
        directoryEntry.getDirectory(folderName, {
            create: true,
            exclusive: false
        }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
        var rootdir = fileSystem.root;
        var fp = fileSystem.root.toNativeURL(); // Returns Fullpath of local directory

        fp = fp + "/" + folderName + "/" + fileName; // fullpath and name of the file which we want to give
        // download function call
        filetransfer(download_link, fp);
    }

    function onDirectorySuccess(parent) {
        // Directory created successfuly
    }

    function onDirectoryFail(error) {
        //Error while creating directory
        alert("Unable to create new directory: " + error.code);

    }

    function fileSystemFail(evt) {
        //Unable to access file system
        alert(evt.target.error.code);
    }
}

function filetransfer(download_link, fp) {
    var fileTransfer = new FileTransfer();
    // File download function with URL and local path
    fileTransfer.download(download_link, fp,
        function(entry) {
            alert("download complete: " + entry.fullPath);
        },
        function(error) {
            //Download abort errors or download failed errors
            alert("download error source " + error.source);
        }
    );
}	
	
function Download()
{
	
		
    var uri = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Red-crested_Turaco_RWD.jpg/300px-Red-crested_Turaco_RWD.jpg";
	var nameFile="test.jpg";
    var fileTransfer = new window.FileTransfer();
    var fileURL = cordova.file.externalRootDirectory;
	navigator.notification.alert(fileURL, alertCallback, "Permission", "Info");

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
function checkDate(d)
{
	if(d<10)
		return "0"+d;
	else 
		return d;
}
	
function Download2()
{
	//$.ajax({url: "http://115.79.42.45:9090/tbhuy/www/", success: function(result){
   //     alert(result);
   // }});
   
     
		
	
	    $('#cal').html('<ul class="table-view">');
		var myRand = Math.floor((Math.random()*1000)+1);
		var html='<ul class="table-view">';
	    $.getJSON('http://115.79.42.45:9090/tbhuy/www/index.html?p='+myRand, function(result){
			    lich=result;
				var oldday="";
                 $.each(result, function(i, cal){
                  
				  var startDate = new Date(cal.startDate);
				  var day=weekdays[startDate.getDay()];
			      var showmessage="";
		          if(cal.message!=="") 
					  showmessage=" <span class='icon icon-forward'></span>"+cal.message;
				  if(day==oldday)
				  {
				
					html=html+"<br/>"+checkDate(startDate.getHours())+":" +checkDate(startDate.getMinutes())+" <b>"+cal.title+" </b><span class='icon icon-home'></span>"+cal.location+showmessage;
				  }					
			      else
				  {	 
       			 
				    html=html+'</p></li><li class="table-view-cell">'+ day+" ("+checkDate(startDate.getDate())+"/"+checkDate(startDate.getMonth()+1)+") <p>"+checkDate(startDate.getHours())+":" +checkDate(startDate.getMinutes())+" <b>"+cal.title+" </b><span class='icon icon-home'></span>"+cal.location+showmessage;
					oldday=day;
				  }
       
               });
			   
		  $('#cal').html(html);  
		   
		  
               });
		
	          
		  

	//download( "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Red-crested_Turaco_RWD.jpg/300px-Red-crested_Turaco_RWD.jpg","test.jpg");
	//downloadFile("http://192.168.1.3:8080/calendar/index.html");
	//window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory,success,fail);

}

function success(fileEntry){
	
	downloader.init({folder: cordova.file.externalRootDirectory});
document.addEventListener("DOWNLOADER_gotFolder", function(event){
  var data = event.data;
  navigator.notification.alert(data, alertCallback, "Permission", "Info");
});
downloader.get("https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Red-crested_Turaco_RWD.jpg/300px-Red-crested_Turaco_RWD.jpg");

}

function reload()
{
	
	if(window.location.href.lastIndexOf("index")>0)
	    location.reload();
	else
		location.href="index.html";
}
function share()
{
	  var caltext="";
	  $.each(lich, function(i, cal){
                  
				  var startDate = new Date(cal.startDate);
				  var endDate= new Date ( startDate );
				  var startDate = new Date(cal.startDate);
				  var day=weekdays[startDate.getDay()];
				  endDate.setMinutes ( startDate.getMinutes() + cal.duration );
			 caltext+= day+"("+ startDate.getDate()+"/"+(startDate.getMonth()+1)+") "+startDate.getHours()+":" +startDate.getMinutes()+" "+cal.title+" " +" \n DD: "+cal.location+" ND:"+cal.message +"\n";
       
               }); 
			   
	navigator.share(caltext,"Lich lam viec",null);
}

function showStatus(status)
{
	alert(status);
}
	
function setCalendar()
{
  var calOptions = window.plugins.calendar.getCalendarOptions(); // grab the defaults
  calOptions.firstReminderMinutes = 30; // default is 60, pass in null for no reminder (alarm)
  calOptions.secondReminderMinutes = 5;
 
 
  $.each(lich, function(i, cal){
                  
				  var startDate = new Date(cal.startDate);
				  var endDate= new Date ( startDate );
				  endDate.setMinutes ( startDate.getMinutes() + cal.duration );
				  window.plugins.calendar.createEventWithOptions(cal.title,cal.location,cal.message,startDate,endDate,calOptions,showStatus,showStatus);
       
               }); 

} 