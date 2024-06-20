import { publishPages } from "./automations/publishPages";

declare global {
  interface Window {
    publishPages: () => void;
  }
}

window.publishPages = publishPages;
