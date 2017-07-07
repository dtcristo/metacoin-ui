import m from 'mithril';
import Loader from './loader';

export default class AccountBalances {
  view(){
    return (
      m(".content.account-balances", [
        m("span.account-balances__label",
          m("strong", "MetaCoin Balance:")
         ),
         m("span.account-balances__value", [
           m(Loader),
           m("span.account-balances__meta-coin")
         ]),
         m("span.account-balances__label",
           m("strong", "Ether Balance:")
          ),
          m("span.account-balances__value",[
            m(Loader),
            m("span.account-balances__ether")
          ])
      ])
    );
  }
};

