import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function BreedForm({ initialData, onSave, onClose }: any) {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: initialData || {
      name: "",
      description: "",
      characteristics: "",
      colors: "",
      patterns: "",
      temperament: "",
      size: "",
      lifespan: "",
      imageUrl: "",
    },
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    reset(initialData || {
      name: "",
      description: "",
      characteristics: "",
      colors: "",
      patterns: "",
      temperament: "",
      size: "",
      lifespan: "",
      imageUrl: "",
    });
  }, [initialData, reset, setValue]);

  function onSubmit(data: any) {
    onSave(data);
  };

  const [isUploading, setIsUploading] = useState(false);

  async function handleFileChange(e: any) {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setIsUploading(true);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Upload failed");
      }
      const data = await res.json();
      if (data.secure_url) {
        setValue("imageUrl", data.secure_url);
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      alert(error.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <Input {...register("name", { required: true })} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <Textarea {...register("description")} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Characteristics</label>
        <Input {...register("characteristics")} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Colors</label>
        <Input {...register("colors")} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Patterns</label>
        <Input {...register("patterns")} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Temperament</label>
        <Input {...register("temperament")} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Size</label>
        <Input {...register("size")} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Lifespan</label>
        <Input {...register("lifespan")} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Image Upload</label>
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} disabled={isUploading} />
        {isUploading && <p className="text-sm text-muted-foreground mt-1 animate-pulse">Uploading...</p>}
        {watch("imageUrl") && typeof watch("imageUrl") === "string" && watch("imageUrl").trim() && (
          <img src={watch("imageUrl")} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
        )}
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
} 