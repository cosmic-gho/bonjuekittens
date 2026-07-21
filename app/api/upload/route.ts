import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;
    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const b64 = buffer.toString("base64");
    const mimeType = file.type || "image/jpeg";
    const dataURI = `data:${mimeType};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "bonjuekittens",
    });

    return Response.json(result);
  } catch (error: any) {
    console.error("Upload route error:", error);
    return Response.json({ error: error.message || "Failed to upload" }, { status: 500 });
  }
} 