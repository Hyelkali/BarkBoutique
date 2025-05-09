import { put } from "@vercel/blob"
import { nanoid } from "nanoid"

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(request, response) {
  const contentType = request.headers.get("content-type")

  if (!contentType || !contentType.includes("multipart/form-data")) {
    return response.status(400).json({ error: "Content type must be multipart/form-data" })
  }

  try {
    const filename = request.query.filename || `${nanoid()}.jpg`

    const formData = await request.formData()
    const file = formData.get("file")

    if (!file) {
      return response.status(400).json({ error: "No file found in request" })
    }

    // Convert File to Blob
    const blob = new Blob([await file.arrayBuffer()], { type: file.type })

    // Upload to Vercel Blob
    const { url } = await put(filename, blob, {
      access: "public",
      contentType: file.type,
    })

    return response.status(200).json({ url })
  } catch (error) {
    console.error("Error in upload handler:", error)
    return response.status(500).json({ error: error.message })
  }
}
