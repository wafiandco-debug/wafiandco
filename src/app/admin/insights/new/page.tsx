import InsightForm from "@/components/admin/InsightForm";

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
