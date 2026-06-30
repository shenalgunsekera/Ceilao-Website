// Builds the customer-facing quote form from the SAME product catalogue the
// staff app uses. Built-in products come from lib/products.js; custom products
// added through the Admin Panel are read live from Firestore `products` — so a
// new product appears on the website automatically (spec §6.1).

import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
// Plain JS catalogue shared with the staff app (allowJs resolves it).
import { PRODUCTS } from './products.js';

export type Field = {
  name: string;
  label: string;
  section: string;
  type?: string;
  required?: boolean;
  options?: string[];
  showIf?: { field: string; value: string };
  accept?: string;
  maxLength?: number;
};

export type Product = {
  key: string;
  label: string;
  prefix?: string;
  icon?: string;
  color?: string;
  customerNameField?: string;
  fields: Field[];
};

// Only these sections are shown to customers. Everything else (premiums,
// underwriting, sum insured internals, clauses) stays staff-only.
export const CUSTOMER_SECTIONS = [
  'Proposer Details',
  'Period of Insurance',
  'Financial Interest',
  'Risk Information',
  'Covers Required',
  'Document Uploads',
] as const;

type RawProducts = Record<string, Omit<Product, 'key'>>;

/** Merge built-in products with custom products stored in Firestore. */
export async function loadProducts(): Promise<Product[]> {
  const builtIn = PRODUCTS as unknown as RawProducts;
  const merged: RawProducts = { ...builtIn };

  try {
    const snap = await getDocs(collection(db, 'products'));
    snap.forEach((d) => {
      const data = d.data() as Omit<Product, 'key'>;
      if (data && Array.isArray((data as { fields?: unknown }).fields)) {
        merged[d.id] = data;
      }
    });
  } catch {
    // offline / rules — fall back to built-ins only
  }

  return Object.entries(merged).map(([key, v]) => ({ key, ...v }));
}

/** Fields for a product, limited to the customer-facing sections. */
export function customerFields(product: Product): Field[] {
  const allowed = new Set<string>(CUSTOMER_SECTIONS);
  return (product.fields || []).filter((f) => allowed.has(f.section));
}

/** Should a showIf-gated field be visible given current values. */
export function isVisible(field: Field, values: Record<string, string>): boolean {
  if (!field.showIf) return true;
  return values[field.showIf.field] === field.showIf.value;
}

/** Reference like MT-20260630-7421-JOHNDOE (mirrors the staff format). */
export function genRef(product: Product, customerName: string): string {
  const prefix = product.prefix || product.key.slice(0, 3).toUpperCase();
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  const name = (customerName || 'CUSTOMER').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12) || 'CUSTOMER';
  return `${prefix}-${ymd}-${rand}-${name}`;
}
