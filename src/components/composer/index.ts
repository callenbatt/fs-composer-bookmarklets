import { Domain, DomainPages, Page } from "./@types";

const req = async (
  path: string,
  params?: string,
  method: string = "GET",
  body?: any
) => {
  try {
    const url = params ? `${path}?${params}` : path;
    const token = document
      .querySelector('[name="csrf-token"]')
      ?.getAttribute("content");
    if (!token) throw Error("CSRF token not found");
    const res = await fetch(url, {
      method: method,
      body: body,
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "X-CSRF-TOKEN": token,
      },
    });
    // throw an error if not 2xx
    if (!res.ok) throw Error(`(${res.status}):[${res.url}]:${res.statusText}`);

    return await res.json();
  } catch (e: any) {
    console.error(`Error::req: ${e.message}`);
    return { error: true, message: e.message };
  }
};

export async function listDomains(): Promise<Domain[]> {
  return req("/fs/domains.json");
}

export async function listPages(domainId: number): Promise<DomainPages> {
  return req(`/fs/domains/${domainId}.json`);
}

export async function listAllPages(domains: Domain[]): Promise<DomainPages[]> {
  return Promise.all(domains.map((domain) => listPages(domain.id)));
}

export async function publishPage(pageId: number) {
  return req(`/fs/pages/drafts/${pageId}/publish`, undefined, "PUT");
}
