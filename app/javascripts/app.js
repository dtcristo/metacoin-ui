$(function(){
  var metaAbi = [{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getBalanceInEth","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"}];
  var metaAddress = "0xaead76b9fbb9d33b49c189dd687143c7ff0baadb";
  var meta = web3.eth.contract(metaAbi).at(metaAddress);

  let accounts = web3.eth.accounts,
      account;

  var event = meta.Transfer();
  event.watch(function(error, result){
    if (!error){
      if (result.args._from === account || result.args._to === account){
        onMetaBalanceChange();
      }
    }
  });

  var filter = web3.eth.filter('latest');
  filter.watch(function(error, result){
    if (!error){
      onEtherBalanceChange();
    }
  });

  for(let account of accounts){
    $("#account-select").append(`<option value="${account}">${account}</option>`);
  }

  function onMetaBalanceChange() {
    var bal = getMetaBalance(account);
    $(".account-balances__meta-coin").text(bal).show().prev(".loading").hide();
  }

  function onEtherBalanceChange() {
    var bal = getEtherBalance(account);
    $(".account-balances__ether").text(bal).show().prev(".loading").hide();
  }

  function onAccountChange() {
    account = $("#account-select").val();
    $(".account-balances__value .loading").show().next().hide();
    onMetaBalanceChange();
    onEtherBalanceChange();
  }

  onAccountChange();

  $("#account-select").on('change', onAccountChange);

  function getMetaBalance(acc) {
    return meta.getBalance.call(acc).toNumber();
  }

  function getEtherBalance(acc) {
    return web3.fromWei(web3.eth.getBalance(acc), "ether").toNumber();
  }

  function sendCoin() {
    var amount = $("#send-meta-amount").val();
    var destination = $("#send-meta-address").val();

    meta.sendCoin.sendTransaction(destination, amount, {from: account}, function(error, result){
      if(!error){
        alert("Success");
      } else {
        alert("Something went wrong :(");
      }
      $(".send-meta__button").removeAttr("disabled").children().toggle();
      $(".send-meta")[0].reset();
    });

    $(".send-meta__button").attr("disabled", "disabled");
    $(".send-meta__button").children().toggle();
    $(".account-balances__value .loading").show().next().hide();
    return false;
  }

  $(".send-meta__button").click(sendCoin);
});
