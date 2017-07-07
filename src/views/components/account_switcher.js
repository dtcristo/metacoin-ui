import m from 'mithril';

export default class AccountSwitcher {
  view({ attrs }){
    return (
      m(".content.account-switcher", [
        m("label[for='account-select']", "Account"),
        m("select.account-switcher__select[id='account-select'][name='account-switcher-select']", {
          onchange: function(){
            attrs.action(this.value);
          }
        }, [
          attrs.items.map((account) =>
                          m("option[value='"+ account +"']", account)
                         )
        ])
      ])
    );
  }
};
