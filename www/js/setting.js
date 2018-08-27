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
var img=[];
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
		//document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture); 
		//document.getElementById("share").addEventListener("click", share); 
		 $('#cameraTakePicture').click(function(){
 
        var camerOptions = { 
            quality: 90,
            destinationType: Camera.DestinationType.FILE_URI,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 320,
            targetHeight: 180
        };
 
        navigator.camera.getPicture(function(imageURI){
 
           // var image = $('#photo');
          //  image.attr('src', imageURI);
		  $("#share-container").append("<img class='pict' src='"+imageURI+"'/>");
            $('#share-container').show();
             
        }, function(errorMessage){
            alert('The following error occured: ' + errorMessage)
        }, camerOptions);
 
    });
 
    $('#share').click(function(){
        var photo_src = $('#photo').attr('src');
        var caption = $('#caption').val();
        window.plugins.socialsharing.share('myphotos', null, img, null);
    });
	
	$('body').on('click','.pict',function(){	
        $(this).toggleClass("selected");
		img.push($(this).attr('src'));
		})
	

	
	
	
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
       
    }
	
//	document.getElementById("getLocalStorageByKey").addEventListener("click", getLocalStorageByKey);  
//    var localStorage = window.localStorage;



};


app.initialize();

function reload()
{
	
	if(window.location.href.lastIndexOf("index")>0)
	    location.reload();
	else
		location.href="index.html";
}