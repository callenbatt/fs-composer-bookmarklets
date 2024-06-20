import "./style.css";

export interface Terminal {
  terminalElement: HTMLElement;
  overlayElement: HTMLElement;
  messageWindowElement: HTMLElement;
  inputWindowElement: HTMLElement;
}

export class Terminal {
  constructor() {
    this.terminalElement =
      document.getElementById("terminal") || this.createElement();
    this.overlayElement =
      document.getElementById("terminal-overlay") || this.createOverlay();
    this.messageWindowElement =
      document.getElementById("terminal-message-window") ||
      this.createMessageWindow();
    this.inputWindowElement =
      document.getElementById("terminal-input-window") ||
      this.createInputWindow();
  }

  createElement() {
    let el = document.createElement("div");
    el.id = "terminal";
    document.body.appendChild(el);
    return el;
  }

  clearMessageWindow() {
    this.messageWindowElement.innerHTML = "";
  }

  createOverlay() {
    let el = document.createElement("div");
    el.id = "terminal-overlay";
    document.body.appendChild(el);
    return el;
  }

  createMessageWindow() {
    let el = document.createElement("div");
    el.id = "terminal-message-window";
    this.terminalElement.appendChild(el);
    return el;
  }

  createInputWindow() {
    let el = document.createElement("div");
    el.id = "terminal-input-window";
    this.terminalElement.appendChild(el);
    return el;
  }

  updateMessageWindowScroll() {
    this.messageWindowElement.scrollTop =
      this.messageWindowElement.scrollHeight;
  }

  pushMessage(message: string) {
    let messageEl = document.createElement("div");
    messageEl.className = "message";
    messageEl.innerHTML = message;
    this.messageWindowElement.appendChild(messageEl);
    this.updateMessageWindowScroll();
  }
}
