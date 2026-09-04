import type { Metadata } from "next";
import InsightForm from "@/components/admin/InsightForm";

export const metadata: Metadata = {
  title: "New Article | WAFI & CO. Admin",
};

export default function NewInsightPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl text-navy">New article</h1>
      <div className="mt-6">
        <InsightForm />
      </div>
    </div>
  );
}
