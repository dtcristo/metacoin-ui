import m from 'mithril';
import Web3 from 'web3';
import contract from 'truffle-contract';
import AccountSwitcher from './components/account_switcher';
import AccountBalances from './components/account_balances';
import Transaction from './components/transaction';

let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Import our contract artifacts and turn them into usable abstractions.
import metacoin_artifacts from '../../build/contracts/MetaCoin.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
window.MetaCoin = contract(metacoin_artifacts);


export default class Main {
  view(){
    return m(".container", [
      m("h1", "MetaCoin"),
      m(AccountSwitcher, {
        items: this.model.accounts,
        action: this.switchAccounts
      }),
      m(AccountBalances),
      m(Transaction)
    ]);
  }

  oninit(){
    window.MetaCoin.setProvider(web3.currentProvider);
    this.model = this.metaModel();
    this.fetchAccounts(this.model);
  }

  metaModel(){
    return {
      accounts        : [],
      selectedAccount : null,
      metaBalance     : null,
      etherBalance    : null,
      toAddress       : null,
      ammount         : null 
    }
  }


  ////////////////////////////////////////
  // Actions
  ////////////////////////////////////////


  fetchAccounts(model){
    //model.accounts = web3.eth.accounts;

    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      model.accounts = accs;
      m.redraw();
    });
  }

  switchAccounts(account){
    console.log(account)
    // do stuff with the new account
  }
}
