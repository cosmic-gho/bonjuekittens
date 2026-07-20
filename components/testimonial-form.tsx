import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TestimonialForm({ initialData, onSave, onClose }: any) {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: initialData || {
      customerName: "",
      rating: 5,
      comment: "",
      status: "pending",
      imageUrl: "",
      createdAt: new Date().toISOString().slice(0, 10),
    },
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    reset(initialData || {
      customerName: "",
      rating: 5,
      comment: "",
      status: "pending",
      imageUrl: "",
      createdAt: new Date().toISOString().slice(0, 10),
    });
  }, [initialData, reset, setValue]);

  const onSubmit = (data: any) => {
    onSave({ ...data, rating: parseInt(data.rating), createdAt: data.createdAt ? new Date(data.createdAt) : new Date() });
  };

  async function handleFileChange(e: any) {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.secure_url) {
      setValue("imageUrl", data.secure_url);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Customer Name</label>
        <Input {...register("customerName", { required: true })} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Rating</label>
        <Select value={String(watch("rating"))} onValueChange={val => setValue("rating", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select rating" />
          </SelectTrigger>
          <SelectContent>
            {[1,2,3,4,5].map(r => (
              <SelectItem key={r} value={String(r)}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Comment</label>
        <Textarea {...register("comment", { required: true })} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Status</label>
        <Select value={watch("status")} onValueChange={val => setValue("status", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Testimonial Date</label>
        <Input type="date" {...register("createdAt", { required: true })} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Image Upload</label>
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
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