import { supabase } from "@/lib/supabase";

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  author_name?: string | null;
  author_position?: string | null;
  author_photo_url?: string | null;
};

// Used until the Supabase "insights" table is configured (see SETUP.md),
// and as a safety net if the database is unreachable.
const fallbackInsights: Insight[] = [
  {
    slug: "gst-return-due-dates",
    title: "GST Return Due Dates You Shouldn't Miss",
    excerpt:
      "A quick reference to monthly, quarterly and annual GST filing deadlines, and how to avoid late fees.",
    content:
      "Staying on top of GST due dates is one of the simplest ways to avoid unnecessary late fees and interest. Monthly filers should track GSTR-1 and GSTR-3B deadlines closely, while quarterly filers under the QRMP scheme have their own separate timeline. Annual returns and reconciliation statements add a further layer to plan for. For advice specific to your filing frequency and business type, get in touch with our team.",
    date: "2026-06-15",
    category: "GST",
  },
  {
    slug: "itr-filing-checklist",
    title: "ITR Filing Checklist for This Assessment Year",
    excerpt:
      "The documents and disclosures individuals and businesses need in hand before filing their income tax return.",
    content:
      "Before filing your income tax return, it helps to gather your income statements, TDS certificates (Form 16/16A), bank interest certificates, investment proofs for deductions, and details of any capital gains or foreign assets. Businesses will additionally need their books of accounts and audit reports where applicable. Getting these ready in advance makes for a smoother, more accurate filing.",
    date: "2026-06-01",
    category: "ITR",
  },
  {
    slug: "why-a-virtual-cfo",
    title: "Why Growing Businesses Are Turning to a Virtual CFO",
    excerpt:
      "How outsourced financial leadership gives small and mid-sized businesses the clarity of a full-time CFO, at a fraction of the cost.",
    content:
      "A Virtual CFO gives growing businesses access to senior financial oversight — budgeting, cash flow forecasting, MIS reporting, and investor-ready statements — without the cost of a full-time hire. It's a practical middle ground for businesses that have outgrown basic bookkeeping but aren't yet ready for an in-house finance leadership team.",
    date: "2026-05-18",
    category: "Virtual CFO",
  },
];

export async function getInsights(): Promise<Insight[]> {
  if (!supabase) return fallbackInsights;

  const { data, error } = await supabase
    .from("insights")
    .select("*")
    .order("date", { ascending: false });

  if (error || !data || data.length === 0) return fallbackInsights;
  return data as Insight[];
}

export async function getInsight(slug: string): Promise<Insight | undefined> {
  const all = await getInsights();
  return all.find((post) => post.slug === slug);
}
