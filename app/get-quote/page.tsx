'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import emailjs from '@emailjs/browser';
import { db, storage } from '@/lib/firebase';
import { useAuth } from '@/lib/AuthProvider';
import {
  loadProducts,
  customerFields,
  isVisible,
  genRef,
  CUSTOMER_SECTIONS,
  type Product,
  type Field,
} from '@/lib/customerQuote';

export default function GetQuotePage() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, File>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  // Gate: must be logged in.
  useEffect(() => {
    if (!loading && !user) router.replace('/login?next=/get-quote');
  }, [loading, user, router]);

  useEffect(() => {
    loadProducts().then((p) => setProducts(p.sort((a, b) => a.label.localeCompare(b.label))));
  }, []);

  // Prefill name/mobile from the account.
  useEffect(() => {
    if (selected && profile) {
      setValues((v) => ({
        ...v,
        [selected.customerNameField || 'proposer_name']: v[selected.customerNameField || 'proposer_name'] || profile.full_name || '',
        mobile: v.mobile || profile.phone || '',
      }));
    }
  }, [selected, profile]);

  const fields = useMemo(() => (selected ? customerFields(selected) : []), [selected]);
  const sections = useMemo(() => {
    const bySection: Record<string, Field[]> = {};
    fields.forEach((f) => {
      if (!isVisible(f, values)) return;
      (bySection[f.section] ||= []).push(f);
    });
    return CUSTOMER_SECTIONS.filter((s) => bySection[s]?.length).map((s) => ({ title: s, fields: bySection[s] }));
  }, [fields, values]);

  const set = (name: string, val: string) => setValues((v) => ({ ...v, [name]: val }));

  const submit = async () => {
    if (!selected || !user) return;
    setError('');

    // Required check (visible required fields only).
    const missing = fields.filter((f) => f.required && isVisible(f, values) && f.type !== 'file' && !values[f.name]);
    const email = values.email?.trim();
    if (!email) return setError('Please enter your email — your confirmation is sent there.');
    if (missing.length) return setError(`Please complete: ${missing.map((f) => f.label).join(', ')}.`);

    setBusy(true);
    try {
      const nameField = selected.customerNameField || 'proposer_name';
      const customerName = values[nameField] || profile?.full_name || 'Customer';
      const reference = genRef(selected, customerName);

      // Upload any documents.
      const uploads: Record<string, string> = {};
      for (const [field, file] of Object.entries(files)) {
        const path = `customer_uploads/${user.uid}/${reference}/${field}_${file.name}`;
        const r = storageRef(storage, path);
        await uploadBytes(r, file);
        uploads[field] = await getDownloadURL(r);
      }

      const formData = { ...values, ...uploads, ceilao_ib_file_no: reference };

      await addDoc(collection(db, 'quotes'), {
        reference,
        product_key: selected.key,
        product_label: selected.label,
        form_data: formData,
        status: 'draft',
        source: 'website',
        customer_uid: user.uid,
        client_name: customerName,
        client_mobile: values.mobile || profile?.phone || '',
        client_email: email,
        sent_to: [],
        responses: [],
        created_by: user.uid,
        created_by_name: profile?.full_name || customerName,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });

      // Confirmation email to the customer (new EmailJS template).
      const SID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_yz6mw9l';
      const TID = process.env.NEXT_PUBLIC_EMAILJS_CONFIRM_TEMPLATE_ID;
      const PK = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'bYa9JNcVpGNhyqbMV';
      if (SID && TID && PK && !TID.includes('REPLACE')) {
        try {
          await emailjs.send(SID, TID, {
            to_email: email,
            to_name: customerName,
            reference,
            product: selected.label,
          }, { publicKey: PK });
        } catch { /* non-fatal */ }
      }

      router.push('/dashboard?submitted=1');
    } catch (err: unknown) {
      setError((err as Error)?.message || 'Could not submit your request. Please try again.');
      setBusy(false);
    }
  };

  if (loading || !user) {
    return <main className="min-h-screen bg-ink flex items-center justify-center"><p className="text-gray-500 font-body text-sm">Loading…</p></main>;
  }

  return (
    <main className="min-h-screen bg-ink bg-brand-radial pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="font-body text-xs tracking-widest3 text-brand-light uppercase mb-3">Get a Quote</p>
        <h1 className="font-display text-chalk text-5xl tracking-wide mb-8">
          {selected ? selected.label.toUpperCase() : 'CHOOSE A PRODUCT'}
        </h1>

        {!selected ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((p) => (
              <button
                key={p.key}
                onClick={() => { setSelected(p); setValues({}); setFiles({}); }}
                className="group text-left bg-gray-900/70 border border-gray-800 rounded-xl p-6 hover:border-brand transition-colors"
              >
                <div className="text-3xl mb-3">{p.icon || '📄'}</div>
                <h3 className="font-heading text-chalk text-lg mb-1">{p.label}</h3>
                <span className="font-body text-xs tracking-widest uppercase text-gray-500 group-hover:text-brand-light transition-colors">
                  Start →
                </span>
              </button>
            ))}
            {products.length === 0 && <p className="text-gray-500 font-body text-sm">Loading products…</p>}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button onClick={() => setSelected(null)} className="font-body text-xs text-gray-500 hover:text-chalk mb-6">
              ← Choose a different product
            </button>

            <div className="flex flex-col gap-8">
              {sections.map((sec) => (
                <section key={sec.title}>
                  <h2 className="font-body text-xs tracking-widest2 uppercase text-brand-light border-l-2 border-brand pl-3 mb-4">
                    {sec.title}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sec.fields.map((f) => (
                      <FieldInput
                        key={f.name}
                        field={f}
                        value={values[f.name] || ''}
                        onChange={(v) => set(f.name, v)}
                        onFile={(file) => setFiles((m) => ({ ...m, [f.name]: file }))}
                        fileName={files[f.name]?.name}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="mt-6 rounded-lg bg-brand-600/15 border border-brand-600/30 px-4 py-3">
                  <p className="font-body text-sm text-brand-300">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button onClick={submit} disabled={busy} className="btn-brand mt-8 w-full sm:w-auto px-10">
              {busy ? 'Submitting…' : 'Submit request'}
            </button>
            <p className="mt-3 font-body text-xs text-gray-500">
              Our brokers complete the underwriting and send your request to insurers. You&apos;ll get a confirmation email and can track progress on your dashboard.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}

function FieldInput({
  field, value, onChange, onFile, fileName,
}: {
  field: Field;
  value: string;
  onChange: (v: string) => void;
  onFile: (f: File) => void;
  fileName?: string;
}) {
  const wide = field.type === 'textarea' || field.section === 'Document Uploads';
  const base = 'bg-ink border border-gray-700 rounded-lg px-4 py-3 text-chalk font-body text-sm outline-none focus:border-brand transition-colors w-full';
  const labelEl = (
    <span className="font-body text-[11px] tracking-widest uppercase text-gray-500">
      {field.label}{field.required && <span className="text-brand"> *</span>}
    </span>
  );

  let control: React.ReactNode;
  if (field.type === 'select' || (field.options && field.options.length)) {
    control = (
      <select value={value} onChange={(e) => onChange(e.target.value)} className={base}>
        <option value="">Select…</option>
        {(field.options || []).map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  } else if (field.type === 'yesno') {
    control = (
      <select value={value} onChange={(e) => onChange(e.target.value)} className={base}>
        <option value="">Select…</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    );
  } else if (field.type === 'textarea') {
    control = <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={base} />;
  } else if (field.type === 'date') {
    control = <input type="date" value={value} onChange={(e) => onChange(e.target.value)} className={base} />;
  } else if (field.type === 'file') {
    control = (
      <label className={`${base} flex items-center justify-between cursor-pointer`}>
        <span className="text-gray-400 truncate">{fileName || 'Choose file…'}</span>
        <span className="text-brand-light text-xs uppercase tracking-widest">Browse</span>
        <input type="file" className="hidden" accept={field.accept ? field.accept.split(',').map((e) => `.${e.trim()}`).join(',') : undefined}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
      </label>
    );
  } else {
    const inputType = field.type === 'email' ? 'email' : field.type === 'number' || field.type === 'currency' ? 'number' : 'text';
    control = <input type={inputType} value={value} onChange={(e) => onChange(e.target.value)} className={base} />;
  }

  return (
    <label className={`flex flex-col gap-1.5 ${wide ? 'sm:col-span-2' : ''}`}>
      {labelEl}
      {control}
    </label>
  );
}
