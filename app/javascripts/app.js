var acc0;
var acc1;
var acc2;

function main() {
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

    acc0 = web3.eth.accounts[0];
    acc1 = web3.eth.accounts[1];
    acc2 = web3.eth.accounts[2];
  }
}

function getBalance() {
  console.log(web3.fromWei(web3.eth.getBalance(acc0), 'ether').toNumber());
}
