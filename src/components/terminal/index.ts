import "./style.css";

export interface Terminal {
  el: HTMLElement;
  elOverlay: HTMLElement;
}

export class Terminal {
  constructor() {
    this.el = document.getElementById("terminal") || this.createElement();
    this.elOverlay =
      document.getElementById("terminal-overlay") || this.createOverlay();
  }

  createElement() {
    let el = document.createElement("div");
    el.id = "terminal";
    document.body.appendChild(el);
    return el;
  }

  clear() {
    this.el.innerHTML = "";
  }

  createOverlay() {
    let el = document.createElement("div");
    el.id = "terminal-overlay";
    document.body.appendChild(el);
    return el;
  }

  updateScroll() {
    this.el.scrollTop = this.el.scrollHeight;
  }

  pushMessage(message: string) {
    let messageEl = document.createElement("div");
    messageEl.className = "message";
    messageEl.textContent = message;
    this.el.appendChild(messageEl);
    this.updateScroll();
  }
}
