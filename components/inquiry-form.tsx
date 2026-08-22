import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function InquiryForm({ initialData, kittens, onSave, onClose }: any) {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: initialData || {
      customerName: "",
      email: "",
      phone: "",
      state: "",
      city: "",
      breedingIntentions: "",
      hasPets: "",
      purchaseTimeline: "",
      message: "",
      kittenId: "",
      status: "new",
    },
  });

  useEffect(() => {
    reset(initialData || {
      customerName: "",
      email: "",
      phone: "",
      state: "",
      city: "",
      breedingIntentions: "",
      hasPets: "",
      purchaseTimeline: "",
      message: "",
      kittenId: "",
      status: "new",
    });
  }, [initialData, reset]);

  const onSubmit = (data: any) => {
    const kittenId = data.kittenId && data.kittenId !== "none" ? parseInt(data.kittenId) : null;
    onSave({ ...data, kittenId });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Customer Name</label>
        <Input {...register("customerName", { required: true })} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <Input type="email" {...register("email", { required: true })} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Phone</label>
        <Input {...register("phone")} />
      </div>

      {/* Location Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">State</label>
          <Input {...register("state")} placeholder="Enter your state" />
        </div>
        <div>
          <label className="block mb-1 font-medium">City</label>
          <Input {...register("city")} placeholder="Enter your city" />
        </div>
      </div>

      {/* Breeding Intentions */}
      <div>
        <label className="block mb-1 font-medium">Do you have intentions of breeding?</label>
        <Select value={watch("breedingIntentions")} onValueChange={val => setValue("breedingIntentions", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select breeding intentions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
            <SelectItem value="maybe">Maybe/Undecided</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Pets */}
      <div>
        <label className="block mb-1 font-medium">Do you have any pets?</label>
        <Select value={watch("hasPets")} onValueChange={val => setValue("hasPets", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select pet status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Purchase Timeline */}
      <div>
        <label className="block mb-1 font-medium">How soon are you ready to purchase?</label>
        <Select value={watch("purchaseTimeline")} onValueChange={val => setValue("purchaseTimeline", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select purchase timeline" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="immediately">Immediately</SelectItem>
            <SelectItem value="within_week">Within a week</SelectItem>
            <SelectItem value="within_month">Within a month</SelectItem>
            <SelectItem value="within_3_months">Within 3 months</SelectItem>
            <SelectItem value="more_than_3_months">More than 3 months</SelectItem>
            <SelectItem value="just_browsing">Just browsing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Message</label>
        <Textarea {...register("message", { required: true })} />
      </div>
      <div>
        <label className="block mb-1 font-medium">Kitten</label>
        <Select value={watch("kittenId") || "none"} onValueChange={val => setValue("kittenId", val === "none" ? "" : val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select kitten" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            {kittens?.map((kitten: any) => (
              <SelectItem key={kitten.id} value={kitten.id.toString()}>{kitten.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Status</label>
        <Select value={watch("status")} onValueChange={val => setValue("status", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="responded">Responded</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
} 