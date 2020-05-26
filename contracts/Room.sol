pragma solidity 0.5.16;

contract Room {

  
  mapping (string  => uint) public DeviceMap;
  mapping (uint => string) public DeviceMapRev;
  uint public fan;
  uint public ac;
  uint public light;
  uint public tv;
  uint public power;
  string[] public DeviceName;
  uint public numDeviceAdd;


  constructor() public  {
  fan=0;
  ac=0;
  light=0;
  tv=0;
  power=1;
  numDeviceAdd=0;
}



function addDevice(string memory  Devicename, uint DeviceId) public {
	require(DeviceMap[Devicename]==0, "Device is already registered");
    //require((DeviceMapRev[DeviceId])==0, "Device is already registered");
	DeviceMap[Devicename] = DeviceId;
	DeviceMapRev[DeviceId] = Devicename;
	numDeviceAdd++;
	DeviceName.push(Devicename);
}


function Numberofdevice () public returns (uint num){
	return numDeviceAdd;
}

function Temperature(uint _temp) public returns (string memory res){
	if(_temp<15){
		ac=0;
		fan=0;
		return "Too cold turing off fan and ac for room1 ";
	}
	if(_temp>=15 && _temp<25){
	 ac=0;
	 fan=1;
	 return "Turning on the Fan for room1";
	}

	else if(_temp>=25 && _temp<35){
		ac=1;
		fan=0;
		return "turing on the ac for room1 ";
	}
	else{
		ac=1;
		fan=1;
		return "turning on the fan and ac for room1";
	}
}

function Light(uint _var) public returns (string memory res){
	if(_var==0)
	{
		if(light==0)
		return "Already light is off ";
		light=0;
		return "Switching off the light ";
	}
	else
	{
		if(light==1)
		return "Already light is on ";
		light=1;
		return "Switching on the light ";
	}
}


function Tv(uint _var) public returns (string memory res){
	if(_var==1){
		if(tv==1)
		return "Already Tv is on";
		tv=1;
		return "Turning on the TV";
	}
	else{
		if(tv==0)
		return "Tv is already off";

		tv=0;
		return "Turning off the tv";
	}

}

function Power(uint _var) public returns (string memory res){
	if(_var==1){
		if(power==1)
		return "Already Power is On for room1";
		power=1;
		return "Succefully Turned on power for room1";
	}
	else{
		if(power==0)
		return "Already power is off for room 1";
		power=0;
		return "Succefully Turned off power of room1";
	}
}


}



//////////////////////////////////////////////////////////////////////////////////////




