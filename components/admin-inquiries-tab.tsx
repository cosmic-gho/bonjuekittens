import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import InquiryForm from "@/components/inquiry-form";
import { useToast } from "@/hooks/use-toast";

export default function AdminInquiriesTab() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [kittens, setKittens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInquiry, setEditingInquiry] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("/api/inquiries").then(res => res.json()),
      fetch("/api/kittens").then(res => res.json())
    ])
      .then(([inquiries, kittens]) => {
        setInquiries(inquiries);
        setKittens(kittens);
      })
      .catch(() => toast({ title: "Error", description: "Failed to load data", variant: "destructive" }))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(inquiry: any) {
    const method = editingInquiry ? "PUT" : "POST";
    const res = await fetch("/api/inquiries", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingInquiry ? { ...inquiry, id: editingInquiry.id } : inquiry),
    });
    if (res.ok) {
      setModalOpen(false);
      setEditingInquiry(null);
      toast({ title: "Success", description: "Inquiry saved!" });
      setInquiries(await fetch("/api/inquiries").then(r => r.json()));
    } else {
      toast({ title: "Error", description: "Failed to save inquiry", variant: "destructive" });
    }
  }

  async function handleDelete(id: any) {
    if (!confirm("Are you sure?")) return;
    const res = await fetch("/api/inquiries", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setInquiries(inquiries.filter(i => i.id !== id));
      toast({ title: "Deleted", description: "Inquiry deleted." });
    } else {
      toast({ title: "Error", description: "Failed to delete inquiry", variant: "destructive" });
    }
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Inquiries</h2>
        <Button onClick={() => { setModalOpen(true); setEditingInquiry(null); }}>Add Inquiry</Button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map(inquiry => (
              <tr key={inquiry.id}>
                <td>{inquiry.customerName}</td>
                <td>{inquiry.email}</td>
                <td>{inquiry.status}</td>
                <td>
                  <Button size="sm" onClick={() => { setModalOpen(true); setEditingInquiry(inquiry); }}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(inquiry.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingInquiry ? "Edit Inquiry" : "Add Inquiry"}</DialogTitle>
          </DialogHeader>
          <InquiryForm
            initialData={editingInquiry}
            kittens={kittens}
            onSave={handleSave}
            onClose={() => { setModalOpen(false); setEditingInquiry(null); }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
} 