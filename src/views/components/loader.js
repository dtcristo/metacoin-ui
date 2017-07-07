import m from 'mithril';

export default class Loader {
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
