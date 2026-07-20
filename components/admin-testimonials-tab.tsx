import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TestimonialForm from "@/components/testimonial-form";
import { useToast } from "@/hooks/use-toast";

export default function AdminTestimonialsTab() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    fetch("/api/testimonials?admin=true")
      .then(res => res.json())
      .then(setTestimonials)
      .catch(() => toast({ title: "Error", description: "Failed to load testimonials", variant: "destructive" }))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(testimonial: any) {
    const method = editingTestimonial ? "PUT" : "POST";
    // Ensure createdAt is a valid ISO string for the API
    const payload = editingTestimonial
      ? { ...testimonial, id: editingTestimonial.id, createdAt: testimonial.createdAt ? new Date(testimonial.createdAt).toISOString() : undefined }
      : { ...testimonial, createdAt: testimonial.createdAt ? new Date(testimonial.createdAt).toISOString() : undefined };
    const res = await fetch("/api/testimonials", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setModalOpen(false);
      setEditingTestimonial(null);
      toast({ title: "Success", description: "Testimonial saved!" });
      setTestimonials(await fetch("/api/testimonials?admin=true").then(r => r.json()));
    } else {
      toast({ title: "Error", description: "Failed to save testimonial", variant: "destructive" });
    }
  }

  async function handleDelete(id: any) {
    if (!confirm("Are you sure?")) return;
    const res = await fetch("/api/testimonials", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setTestimonials(testimonials.filter(t => t.id !== id));
      toast({ title: "Deleted", description: "Testimonial deleted." });
    } else {
      toast({ title: "Error", description: "Failed to delete testimonial", variant: "destructive" });
    }
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Testimonials</h2>
        <Button onClick={() => { setModalOpen(true); setEditingTestimonial(null); }}>Add Testimonial</Button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th><th>Rating</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map(testimonial => (
              <tr key={testimonial.id}>
                <td>{testimonial.customerName}</td>
                <td>{testimonial.rating}</td>
                <td>{testimonial.status}</td>
                <td>
                  <Button size="sm" onClick={() => { setModalOpen(true); setEditingTestimonial(testimonial); }}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(testimonial.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
          </DialogHeader>
          <TestimonialForm
            initialData={editingTestimonial}
            onSave={handleSave}
            onClose={() => { setModalOpen(false); setEditingTestimonial(null); }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
} 