import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import InquiryForm from "@/components/inquiry-form";
import { useToast } from "@/hooks/use-toast";
import { Eye, Edit, Trash2 } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800/50",
  responded: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800/50",
  closed: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-800/50",
};

function DetailRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
      <span className="text-sm text-foreground">{value}</span>
    </div>
  );
}

export default function AdminInquiriesTab() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [kittens, setKittens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInquiry, setEditingInquiry] = useState<any>(null);
  const [viewingInquiry, setViewingInquiry] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);

    const fetchInquiries = fetch("/api/inquiries").then(async (res) => {
      if (!res.ok) throw new Error(`Inquiries API error: ${res.status}`);
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    });

    const fetchKittens = fetch("/api/kittens").then(async (res) => {
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    });

    fetchInquiries
      .then((inquiries) => {
        setInquiries(inquiries);
        fetchKittens.then(setKittens).catch(() => { });
      })
      .catch(() =>
        toast({ title: "Error", description: "Failed to load inquiries", variant: "destructive" })
      )
      .finally(() => setLoading(false));
  }, []);

  async function refreshInquiries() {
    const res = await fetch("/api/inquiries");
    if (res.ok) {
      const data = await res.json();
      setInquiries(Array.isArray(data) ? data : []);
    }
  }

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
      refreshInquiries();
    } else {
      toast({ title: "Error", description: "Failed to save inquiry", variant: "destructive" });
    }
  }

  async function handleDelete(id: any) {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-foreground">Inquiries</h2>
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={() => { setModalOpen(true); setEditingInquiry(null); }}
        >
          Add Inquiry
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
        </div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No inquiries yet.</div>
      ) : (
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-foreground/80">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground/80">Email</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground/80">Kitten</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground/80">Date</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground/80">Status</th>
                <th className="text-right px-4 py-3 font-semibold text-foreground/80">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {inquiries.map(inquiry => (
                <tr key={inquiry.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{inquiry.customerName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{inquiry.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {inquiry.kitten?.name || inquiry.kittenName || <span className="italic text-foreground/40">—</span>}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={STATUS_COLORS[inquiry.status] ?? STATUS_COLORS.closed}>
                      {inquiry.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600"
                        onClick={() => setViewingInquiry(inquiry)}
                        title="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600"
                        onClick={() => { setModalOpen(true); setEditingInquiry(inquiry); }}
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600"
                        onClick={() => handleDelete(inquiry.id)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Dialog */}
      <Dialog open={!!viewingInquiry} onOpenChange={(open) => { if (!open) setViewingInquiry(null); }}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              Inquiry from {viewingInquiry?.customerName}
              {viewingInquiry && (
                <Badge className={STATUS_COLORS[viewingInquiry.status] ?? STATUS_COLORS.closed}>
                  {viewingInquiry.status}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>

          {viewingInquiry && (
            <div className="space-y-4 pt-2">
              {/* Contact Info */}
              <div className="rounded-lg bg-secondary/30 p-4 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Contact Info</p>
                <DetailRow label="Name" value={viewingInquiry.customerName} />
                <DetailRow label="Email" value={viewingInquiry.email} />
                <DetailRow label="Phone" value={viewingInquiry.phone} />
                <DetailRow label="City" value={viewingInquiry.city} />
                <DetailRow label="State" value={viewingInquiry.state} />
              </div>

              {/* Kitten Interest */}
              <div className="rounded-lg bg-secondary/30 p-4 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Kitten Interest</p>
                <DetailRow label="Kitten" value={viewingInquiry.kitten?.name || viewingInquiry.kittenName} />
                <DetailRow label="Purchase Timeline" value={viewingInquiry.purchaseTimeline?.replace(/_/g, " ")} />
              </div>

              {/* About Them */}
              <div className="rounded-lg bg-secondary/30 p-4 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">About Them</p>
                <DetailRow label="Has Pets" value={viewingInquiry.hasPets} />
                <DetailRow label="Breeding Intentions" value={viewingInquiry.breedingIntentions} />
              </div>

              {/* Message */}
              {viewingInquiry.message && (
                <div className="rounded-lg bg-secondary/30 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Message</p>
                  <p className="text-sm text-foreground whitespace-pre-wrap">{viewingInquiry.message}</p>
                </div>
              )}

              <p className="text-xs text-muted-foreground text-right">
                Received {new Date(viewingInquiry.createdAt).toLocaleString()}
              </p>

              <div className="flex justify-end gap-2 pt-1">
                <Button variant="outline" onClick={() => setViewingInquiry(null)}>Close</Button>
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => {
                    setViewingInquiry(null);
                    setEditingInquiry(viewingInquiry);
                    setModalOpen(true);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit / Add Dialog */}
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