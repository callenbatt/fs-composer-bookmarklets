export type Domain = {
  active_host_name: string;
  host_name: string | null;
  id: number;
  internal_subdomain_suffix: string | null;
  label: string;
  live: boolean;
  locked_at: string | null;
  ssl_enabled: boolean;
};

export type DomainPages = {
  id: number;
  host_name: string | null;
  internal_subdomain_suffix: string | null;
  label: string;
  ssl_enabled: boolean;
  pages: Page[];
};

export type Page = {
  branch: boolean;
  id: number;
  name: string;
  parent_id: number | null;
  status_id: 0 | 1 | 2;
};
