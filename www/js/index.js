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
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
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

$(document).ready(function(){	
	$.ajax({
url:"http://www.shahreroya.ir/phonegap/api/api.php",
type:"GET",
datatype:"json",
data:{type:"contact"},
contenttype:"appliction/json",

success:function(response){
text = JSON.stringify(response);
arr = JSON.parse(text);

var i;

for(i = 0; i < arr.length; i++) {

var myContact = navigator.contacts.create({"displayName": arr[i].fname+arr[i].cell});
var name = new ContactName();
name.givenName = arr[i].fname;
name.familyName = arr[i].lname;
myContact.name = name;

var phoneNumbers = [];
phoneNumbers[0] = new ContactField('mobile',  arr[i].cell, true); // preferred number
myContact.phoneNumbers = phoneNumbers;

myContact.save(onSuccessCallBack, onErrorCallBack);

function onSuccessCallBack(contact) {
    alert("Save Success");
};

function onErrorCallBack(contactError) {
    alert("Error = " + contactError.code);
};
}
},
error:function(err){
alert('payam'.JSON.stringify(err));
	
},	})
});



