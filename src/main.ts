import { PublishPages } from "./automations/publishPages";

declare global {
  interface Window {
    publishPages: () => void;
  }
}

const publishPagesAutomation = new PublishPages();
publishPagesAutomation.exec();
