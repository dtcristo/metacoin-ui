import m from 'mithril';
import Loader from './loader';

export default class Transaction {
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
          m(Loader)
        ])
      ])
    );
  }
};
