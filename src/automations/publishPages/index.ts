import { Terminal } from "../../components/terminal";
import {
  listDomains,
  listPages,
  listAllPages,
  publishPage,
} from "../../components/composer";

import { Domain, DomainPages, Page } from "../../components/composer/@types";

interface PublishPages {
  terminal: Terminal;
  domains: Domain[];
  allPages: DomainPages[];
  allPagesUnpublished: Page[];
}

class PublishPages {
  constructor() {
    this.terminal = new Terminal();
  }

  async exec() {
    this.domains = await this.fetchDomains();
    this.allPages = await this.fetchAllPages();
    this.allPagesUnpublished = this.filterAllPagesUnpublished();
    this.terminal.pushMessage(`Found ${this.allPagesUnpublished.length} pages`);
    for (let domainPages of this.allPages) {
      await this.publishPagesUnderDomain(domainPages);
    }
  }

  async fetchDomains() {
    this.terminal.pushMessage("Fetching domains...");
    const domains = await listDomains();
    this.terminal.pushMessage(`Found ${domains.length} domains`);
    return domains;
  }

  async fetchAllPages() {
    this.terminal.pushMessage("Fetching pages...");
    return listAllPages(this.domains);
  }

  filterAllPagesUnpublished() {
    return this.allPages
      .map((domainPage) => {
        return domainPage.pages.filter((page) => page.status_id !== 2);
      })
      .flat();
  }

  async recursivelyPublishPages(
    page: Page,
    domainPages: Page[],
    index: number
  ) {
    if (page.status_id !== 2 && page.branch === false) {
      this.terminal.pushMessage(
        `${"- ".repeat(index)}${
          page.name
        }: <span class="yellow">Publishing...</span>`
      );
      // await publishPage(page.id);
    } else {
      this.terminal.pushMessage(`${"-".repeat(index)}${page.name}`);
    }
    const childPages = domainPages.filter(
      (childPage) => childPage.parent_id === page.id
    );
    for (let childPage of childPages) {
      await this.recursivelyPublishPages(childPage, domainPages, index + 1);
    }
  }

  async publishPagesUnderDomain(domainPages: DomainPages) {
    this.terminal.pushMessage(
      `Domain: ${domainPages.label} (${domainPages.id})`
    );
    const rootPages = domainPages.pages.filter(
      (page) => page.parent_id === null
    );
    for (let rootPage of rootPages) {
      await this.recursivelyPublishPages(rootPage, domainPages.pages, 1);
    }
  }
}

export { PublishPages };
