import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import KittenForm from "@/components/kitten-form";
import { useToast } from "@/hooks/use-toast";

export default function AdminKittensTab() {
  const [kittens, setKittens] = useState<any[]>([]);
  const [breeds, setBreeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingKitten, setEditingKitten] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("/api/kittens").then(res => res.json()),
      fetch("/api/breeds").then(res => res.json())
    ])
      .then(([kittens, breeds]) => {
        setKittens(kittens);
        setBreeds(breeds);
      })
      .catch(() => toast({ title: "Error", description: "Failed to load data", variant: "destructive" }))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(kitten: any) {
    try {
      const method = editingKitten ? "PUT" : "POST";
      const res = await fetch("/api/kittens", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingKitten ? { ...kitten, id: editingKitten.id } : kitten),
      });
      
      if (res.ok) {
        setModalOpen(false);
        setEditingKitten(null);
        toast({ title: "Success", description: "Kitten saved!" });
        const updated = await fetch("/api/kittens").then(r => r.json());
        setKittens(updated);
      } else {
        const errorText = await res.text();
        console.error('API Error:', errorText);
        toast({ title: "Error", description: `Failed to save kitten: ${errorText}`, variant: "destructive" });
      }
    } catch (error: any) {
      console.error('Save error:', error);
      toast({ title: "Error", description: `Failed to save kitten: ${error.message}`, variant: "destructive" });
    }
  }

  async function handleDelete(id: any) {
    if (!confirm("Are you sure?")) return;
    const res = await fetch("/api/kittens", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setKittens(kittens.filter(k => k.id !== id));
      toast({ title: "Deleted", description: "Kitten deleted." });
    } else {
      toast({ title: "Error", description: "Failed to delete kitten", variant: "destructive" });
    }
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Kittens</h2>
        <Button onClick={() => { setModalOpen(true); setEditingKitten(null); }}>Add Kitten</Button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th><th>Breed</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {kittens.map(kitten => (
              <tr key={kitten.id}>
                <td>{kitten.name}</td>
                <td>{kitten.breed?.name}</td>
                <td>{kitten.status}</td>
                <td>
                  <Button size="sm" onClick={() => { setModalOpen(true); setEditingKitten(kitten); }}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(kitten.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingKitten ? "Edit Kitten" : "Add Kitten"}</DialogTitle>
          </DialogHeader>
          <KittenForm
            initialData={editingKitten}
            breeds={breeds}
            onSave={handleSave}
            onClose={() => { setModalOpen(false); setEditingKitten(null); }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
} 