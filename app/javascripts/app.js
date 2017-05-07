var meta;
$(function(){
  var metaAbi = [{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getBalanceInEth","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"}];
  var metaAddress = "0x58c2360e5d3258a1c85038f4258821d3c8d083c1";
  meta = web3.eth.contract(metaAbi).at(metaAddress);

  let accounts = web3.eth.accounts,
      account;


  var event = meta.Transfer();
  event.watch(function(error, result){
    if (!error){
      if (result.args._from === account || result.args._to === account){
        onBalanceChange();
      }
    }
  });

  for(let account of accounts){
    $("#account-switcher").append(`<option value="${account}">${account}</option>`);
  }

  function onBalanceChange() {
    var bal = getBalance(account);
    console.log(bal);
    $(".balance").text(bal);
  }

  function onAccountChange() {
    account = $("#account-switcher").val();
    console.log(account);
    onBalanceChange();
  }

  onAccountChange();

  $("#account-switcher").on('change', onAccountChange);


  function getBalance(acc) {
    return meta.getBalance.call(acc).toNumber();
  }

  function sendCoin() {
    var amount = $("#send-meta-amount").val();
    var destination = $("#send-meta-address").val();
    meta.sendCoin(destination, amount, {from: account})
  }

  $(".send-meta__button").click(sendCoin);
});
