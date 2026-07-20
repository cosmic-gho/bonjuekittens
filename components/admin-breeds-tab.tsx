import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import BreedForm from "@/components/breed-form";
import { useToast } from "@/hooks/use-toast";

export default function AdminBreedsTab() {
  const [breeds, setBreeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBreed, setEditingBreed] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    fetch("/api/breeds")
      .then(res => res.json())
      .then(setBreeds)
      .catch(() => toast({ title: "Error", description: "Failed to load breeds", variant: "destructive" }))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(breed: any) {
    const method = editingBreed ? "PUT" : "POST";
    const res = await fetch("/api/breeds", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingBreed ? { ...breed, id: editingBreed.id } : breed),
    });
    if (res.ok) {
      setModalOpen(false);
      setEditingBreed(null);
      toast({ title: "Success", description: "Breed saved!" });
      setBreeds(await fetch("/api/breeds").then(r => r.json()));
    } else {
      toast({ title: "Error", description: "Failed to save breed", variant: "destructive" });
    }
  }

  async function handleDelete(id: any) {
    if (!confirm("Are you sure?")) return;
    const res = await fetch("/api/breeds", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setBreeds(breeds.filter(b => b.id !== id));
      toast({ title: "Deleted", description: "Breed deleted." });
    } else {
      toast({ title: "Error", description: "Failed to delete breed", variant: "destructive" });
    }
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Breeds</h2>
        <Button onClick={() => { setModalOpen(true); setEditingBreed(null); }}>Add Breed</Button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th><th>Description</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {breeds.map(breed => (
              <tr key={breed.id}>
                <td>{breed.name}</td>
                <td>{breed.description}</td>
                <td>
                  <Button size="sm" onClick={() => { setModalOpen(true); setEditingBreed(breed); }}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(breed.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingBreed ? "Edit Breed" : "Add Breed"}</DialogTitle>
          </DialogHeader>
          <BreedForm
            initialData={editingBreed}
            onSave={handleSave}
            onClose={() => { setModalOpen(false); setEditingBreed(null); }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
} 