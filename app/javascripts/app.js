import "../stylesheets/app.css";

// Import libraries we need.
import {  default as Web3 } from 'web3';
import {  default as contract } from 'truffle-contract';

// Import our contract artifacts and turn them into usable abstractions.
import room_artifacts from '../../build/contracts/Room.json'

// Parking is our usable abstraction, which we'll use through the code below.
var Room = contract(room_artifacts);

var accounts, account;
var room,temp;


function getBalance(address) {
  //console.log(accounts)
  //console.log(web3.fromWei(web3.eth.getBalance(address).toNumber(), 'ether'));
  //console.log("balance is "+web3.fromWei(web3.eth.getBalance(address).toNumber(), 'ether'));
    return web3.fromWei(web3.eth.getBalance(address).toNumber(), 'ether');
}



window.App = {
    start: function() {
        var self = this;
        //console.log("in start function");

        web3.eth.getAccounts(function(err, accs) {
            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }

            if (accs.length == 0) {
                alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }


            accounts = accs;
            //console.log("error is "+err)
            //console.log("acoounts are" +accounts);
            
            self.initializeRoom();
        });
    },

    initializeRoom: function() {
        var self = this;
        Room.deployed().then(function(instance) {
            room = instance;
            $("#roomAddress").html(room.address);
            for(var i=0;i<accounts.length;i++){
              if(i==0)
              $("#table4").append("<tr><td>" + accounts[i] + "</td><td>" +  "Owner"  + "</td></tr>" );
              else
              $("#table4").append("<tr><td>" + accounts[i] + "</td><td>" +  "Address" +i + "</td></tr>" );

            }
            self.checkValues();
        }).catch(function(e) {
            console.log(e);
        });
    },

    checkValues: function() {
        Room.deployed().then(function(instance) {
            room = instance;
	   }).then(
            function() {
                    return getBalance(room.address);
                }).then(

                function(balance) {
                    $("#roomBalance").html(balance);
                    
                
        }).catch(function(e) {
            console.log(e);
        });
    },



addDevice: function(DeviceName,DeviceID) {
       var self = this;
      Room.deployed().then(function(instance) {
          room = instance;
           room.addDevice(DeviceName, DeviceID,{
               from:accounts[0],gas:900000
           })

             room.DeviceMapRev.call(DeviceID).then(
                function(val){
                   //console.log("value is "+ val.toString());                                    
                   //console.log("temp is "+temp.toString());        
                room.DeviceMap.call(val.toString()).then(
                   function(val) {
                   console.log("value is "+val.toNumber()+" DeviceId " +DeviceID);
                   var msgResult;
                   console.log("entered");
                   if (val.toNumber() ==DeviceID) {
                        msgResult = "adding successful";
                        $("#table1").append("<tr><td>" + DeviceID + "</td><td>" +  DeviceName  + "</td></tr>" );
                   } 
                    else {
                        msgResult = "adding failed";
                    }  
                    
                    $("#DeviceAddResult").html(msgResult);
    
                  });
                });
            
       }).catch(function(e) {
           console.log(e);
       });
   },
  


   ControlTv: function(status) {
       var self = this;

      Room.deployed().then(function(instance) {
          room = instance;
          //console.log("in tv")
          var res= room.tv.call();
          res.then(
              function(val){
                //console.log(val.toNumber());
                if(val.toNumber()==0 && status==0)
                  console.log("Already turned off ");
                else if(val.toNumber()==0 && status==1)
                  console.log("turning on");
                else if(val.toNumber()==1 && status==0)
                  console.log("turning off");
                else
                  console.log("Already on");
              }
            );
            room.Tv(status,{
               from:accounts[0],gas:900000
           })
          
          room.tv.call().then(
              function(val){
                if(val.toNumber()==0)
                //console.log("Tv is off ");
                $("#SetTvResult").html("Tv is off");
                else
                //console.log("Tv is on");
                $("#SetTvResult").html("Tv is on");

              }
            );


       }).catch(function(e) {
           console.log(e);
       });
   },


   ControlTemp: function(temp) {
       var self = this;
      Room.deployed().then(function(instance) {
          room = instance;
          
          if(temp<15){
          console.log("Too cold turing off fan and ac for room1 ");
          }
          else if(temp>=15 && temp<25){
          console.log( "Turning on the Fan for room1");
          }

          else if(temp>=25 && temp<35){
          console.log( "turing on the ac for room1 ");
          }
          else{
          console.log( "turning on the fan and ac for room1");
          }


            room.Temperature(temp,{
               from:accounts[0],gas:900000
           });

          room.ac.call().then(
              function(val){
                if(val.toNumber()==0)
                //console.log("Ac is off ");
                $("#SetAcResult").html("Ac is off");                              
                else
                //console.log("Ac is on");
                $("#SetAcResult").html("Ac is On");                

              }
            );
          
          room.fan.call().then(
              function(val){
                if(val.toNumber()==0)
                $("#SetFanResult").html("Fan is off");                
                //console.log("Fan is off ");
                else
                $("#SetFanResult").html("Fan is On");                  
                //console.log("Fan is on");
              }
            );


       }).catch(function(e) {
           console.log(e);
       });
   },


   ControlLight: function(status) {
       var self = this;
      Room.deployed().then(function(instance) {
          room = instance;

          var res= room.light.call();
          res.then(
              function(val){
                //console.log(val.toNumber());
                if(val.toNumber()==0 && status==0)
                  console.log("Already Lights for room1 are turned off ");
                else if(val.toNumber()==0 && status==1)
                  console.log("turning on The lights for room1");
                else if(val.toNumber()==1 && status==0)
                  console.log("turning off the lights for room1");
                else
                  console.log("Already lights are turned on ");
              }
            );

          room.Light(status,{
               from:accounts[0],gas:900000
           });
          
          room.light.call().then(
              function(val){
                if(val.toNumber()==0)
                //console.log("Light is off ");
                $("#SetLightResult").html("Light is Off");                  
                else
                //console.log("Light is on");
                $("#SetLightResult").html("Light is On");                  

              }
            );


       }).catch(function(e) {
           console.log(e);
       });
   },

   ControlPower: function(status) {
      var self = this;
      Room.deployed().then(function(instance) {
          room = instance;

          var res= room.power.call();
          res.then(
              function(val){
                //console.log(val.toNumber());
                if(val.toNumber()==0 && status==0)
                  console.log("Already Power for room1 is turned off ");
                else if(val.toNumber()==0 && status==1)
                  console.log("turning on The Power for room1");
                else if(val.toNumber()==1 && status==0)
                  console.log("turning off the Power for room1");
                else
                  console.log("Already Power are turned on ");
              }
            );

           room.Power(status,{
               from:accounts[0],gas:900000
           });

              room.power.call().then(
              function(val){
                if(val.toNumber()==0)
                //console.log("Power is off ");
                $("#SetPowerResult").html("Power is Off");                  
                else
                //console.log("Power is on");
                $("#SetPowerResult").html("Power is On");                                
              }
            );

       }).catch(function(e) {
           console.log(e);
       });
   },


};
window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    //console.log("type is "typeof web3  );


    if (typeof web3 !== 'undefined') {
        //console.log("tupe of web3" + typeof web3)
        console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask");
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

        //window.web3 = new Web3(web3.currentProvider);
    } else {
        console.warn("No web3 detected. Falling back to http://localhost:7545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
        //fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        //window.web3 = new Web3(web3.currentProvider);
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

    }

    Room.setProvider(web3.currentProvider);
    App.start();

    // Wire up the UI elements
    
    $("#DeviceAdd").click(function() {
        var DeviceId = $("#DeviceNum").val();
        var DeviceName = $("#DeviceName").val();
        App.addDevice(DeviceName, DeviceId);  
    });

    $("#SetTv").click(function() {
        var val = $("#tv").val();
        App.ControlTv(val);
    });

    $("#SetTemp").click(function() {
        var val = $("#temp").val();
        App.ControlTemp(val);
    });

    $("#SetLight").click(function() {
        var val = $("#light").val();
        App.ControlLight(val);
    });

    $("#SetPower").click(function() {
        var val = $("#power").val();
        App.ControlPower(val);
    });
    
  
});

