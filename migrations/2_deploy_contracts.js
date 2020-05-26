var room = artifacts.require("./Room.sol");
module.exports = function(deployer) {
  deployer.deploy(room);//passing account 9 as speaker account to the constructor
};
