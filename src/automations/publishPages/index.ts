import { Terminal } from "../../components/terminal";
import {
  listDomains,
  listPages,
  listAllPages,
  publishPage,
} from "../../components/composer";

export async function publishPages() {
  const terminal = new Terminal();
  terminal.pushMessage("Fetching domains...");
  const domains = await listDomains();
  terminal.pushMessage(`Found ${domains.length} domains`);
}
