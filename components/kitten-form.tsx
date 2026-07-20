import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function KittenForm({ initialData, breeds, onSave, onClose }: any) {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: initialData || {
      name: "",
      breedId: "",
      gender: "Female",
      ageWeeks: "",
      color: "",
      price: "",
      description: "",
      status: "available",
      featured: false,
      images: "",
    },
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    reset(initialData || {
      name: "",
      breedId: "",
      gender: "Female",
      ageWeeks: "",
      color: "",
      price: "",
      description: "",
      status: "available",
      featured: false,
      images: "",
    });
  }, [initialData, reset, setValue]);

  function onSubmit(data: any) {
    // Handle images - could be string or array
    let images = [];
    if (typeof data.images === "string" && data.images.trim()) {
      images = data.images.split(",").map((s: any) => s.trim()).filter(Boolean);
    } else if (Array.isArray(data.images)) {
      images = data.images;
    }
    
    onSave({ 
      ...data, 
      breedId: parseInt(data.breedId), 
      ageWeeks: parseInt(data.ageWeeks), 
      price: parseFloat(data.price), 
      images 
    });
  };

  async function handleFileChange(e: any) {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.secure_url) {
      setValue("images", data.secure_url);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <Input {...register("name", { required: true })} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Breed</label>
        <Select value={watch("breedId")} onValueChange={val => setValue("breedId", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select breed" />
          </SelectTrigger>
          <SelectContent>
            {breeds?.map((breed: any) => (
              <SelectItem key={breed.id} value={breed.id.toString()}>{breed.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Gender</label>
        <Select value={watch("gender")} onValueChange={val => setValue("gender", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Female">Female</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Age (weeks)</label>
        <Input type="number" {...register("ageWeeks", { min: 0 })} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Color</label>
        <Input {...register("color")} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Price</label>
        <Input type="number" step="0.01" {...register("price", { min: 0 })} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <Textarea {...register("description")} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Status</label>
        <Select value={watch("status")} onValueChange={val => setValue("status", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="reserved">Reserved</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Featured</label>
        <input type="checkbox" {...register("featured")} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Image Upload</label>
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
        {(() => {
          const images = watch("images");
          let imageUrl = "";
          
          if (typeof images === "string" && images.trim()) {
            imageUrl = images.split(",")[0];
          } else if (Array.isArray(images) && images.length > 0) {
            imageUrl = images[0];
          }
          
          return imageUrl && (
            <img src={imageUrl} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
          );
        })()}
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
} 