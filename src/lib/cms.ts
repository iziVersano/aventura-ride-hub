const BASE_URL = import.meta.env.VITE_CMS_BASE_URL as string;
const SITE_ID = import.meta.env.VITE_CMS_SITE_ID as string;
const API_KEY = import.meta.env.VITE_CMS_API_KEY as string;

function endpoint(resource: string) {
  return `${BASE_URL}/api/v1/${SITE_ID}/${resource}`;
}

async function fetchCMS<T>(resource: string): Promise<T> {
  const res = await fetch(endpoint(resource), {
    headers: { "x-api-key": API_KEY },
  });
  if (!res.ok) throw new Error(`CMS ${resource}: ${res.status}`);
  return res.json() as Promise<T>;
}

// ── Types ────────────────────────────────────────────────────────────────────

export interface CMSPost {
  id: string;
  title: string;
  slug: string;
  body: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CMSProduct {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CMSSection {
  id: string;
  type: string;
  order: number;
  data: Record<string, unknown>;
}

export interface CMSPage {
  id: string;
  title: string;
  slug: string;
  body: string | null;
  sections: CMSSection[];
  createdAt: string;
  updatedAt: string;
}

export interface CMSMedia {
  id: string;
  url: string;
  filename: string;
  createdAt: string;
}

// ── API calls ─────────────────────────────────────────────────────────────────

export const getCMSPosts = () => fetchCMS<CMSPost[]>("posts");
export const getCMSProducts = () => fetchCMS<CMSProduct[]>("products");
export const getCMSPages = () => fetchCMS<CMSPage[]>("pages");
export const getCMSPage = (slug: string) => fetchCMS<CMSPage>(`pages/${slug}`);
export const getCMSMedia = () => fetchCMS<CMSMedia[]>("media");
