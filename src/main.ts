import { PublishPages } from "./automations/publishPages";

declare global {
  interface Window {
    automations: {
      publishPages: () => void;
    };
  }
}

window.automations = {
  publishPages: () => {
    const publishPagesAutomation = new PublishPages();
    publishPagesAutomation.exec();
  },
};
