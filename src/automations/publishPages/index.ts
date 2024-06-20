import { Terminal } from "../../components/terminal";
import {
  listDomains,
  listPages,
  listAllPages,
  publishPage,
} from "../../components/composer";

import { DomainPages, Page } from "../../components/composer/@types";

function findUnpublishedPages(domainPages: DomainPages[]) {
  let pages: Page[] = [];
  domainPages.forEach((domainPage) => {
    domainPage.pages.forEach((page) => {
      if (page.status_id !== 2) {
        pages.push(page);
      }
    });
  });
  return pages;
}

export async function publishPages() {
  const terminal = new Terminal();
  terminal.pushMessage("Fetching domains...");
  const domains = await listDomains();
  terminal.pushMessage(`Found ${domains.length} domains`);
  terminal.pushMessage("Fetching pages...");
  const domainPages = await listAllPages(domains);
  const pages = findUnpublishedPages(domainPages);
  console.log(pages);
  terminal.pushMessage(`Found ${pages.length} domain pages`);
}
