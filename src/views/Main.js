import m from 'mithril';
import Web3 from 'web3';
import contract from 'truffle-contract';

let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Import our contract artifacts and turn them into usable abstractions.
import metacoin_artifacts from '../../build/contracts/MetaCoin.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
window.MetaCoin = contract(metacoin_artifacts);

function metaModel(){
  return {
    accounts: []
  }
}

const actions = {
  fetchAccounts(model){
    model.accounts = web3.eth.accounts;
  },
  switchAccounts(){
    // TOOD swap accounts logic here.
  }
}

const accountSwitcherUI = {
  view({ attrs }){
    return (
      m(".content.account-switcher", [
        m("label[for='account-select']", "Account"),
        m("select.account-switcher__select[id='account-select'][name='account-switcher-select']", [
          attrs.items.map((account) =>
            m("option", account)
          )
        ])
      ])
    );
  }
};

const loaderUI = {
  view(){
    return(
      m("span.loading", [
        m("span.loader-1", "."),
        m("span.loader-2", "."),
        m("span.loader-3", ".")
      ])
    );
  }
}

const accountBalancesUI = {
  view(){
    return (
      m(".content.account-balances", [
        m("span.account-balances__label",
          m("strong", "MetaCoin Balance:")
        ),
        m("span.account-balances__value", [
          m(loaderUI),
          m("span.account-balances__meta-coin")
        ]),
        m("span.account-balances__label",
          m("strong", "Ether Balance:")
        ),
        m("span.account-balances__value",[
          m(loaderUI),
          m("span.account-balances__ether")
        ])
      ])
    );
  }
};

const transactionUI = {
  view(){
    return(
      m("form.content.send-meta", [
        m("h2.send-meta__title", "Send MetaCoin"),
        m("ul.input-list", [
          m("li.input-list__item", [
            m("label[for='send-meta-address']", "Address"),
            m("input.send-meta__input[id='send-meta-address'][name='address'][placeholder='e.g. 0x0359b919f373b18e29ff92c1687990549e51875a'][required=''][type='text']")
          ]),
          m("li.input-list__item", [
            m("label[for='send-meta-amount']", "Amount"),
            m("input.send-meta__input[id='send-meta-amount'][min='0'][name='amount'][required=''][type='number']")
          ])
        ]),
        m("button.button.send-meta__button[type='submit']", [
          m("span.default", "Send"),
          m(loaderUI)
        ])
      ])
    );
  }
};

export default class Main {
  view(){
    const model = metaModel();

    window.MetaCoin.setProvider(web3.currentProvider);
    actions.fetchAccounts(model);

    return m(".container", [
      m("h1", "MetaCoin"),
      m(accountSwitcherUI, {
        items: model.accounts,
        action: actions.switchAccounts
      }),
      m(accountBalancesUI),
      m(transactionUI)
    ]);
  }
}
