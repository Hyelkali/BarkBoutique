import { handleUpload } from "@vercel/blob/client"

export default async function handler(request, response) {
  try {
    const jsonResponse = await handleUpload({
      request,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })
    return response.status(200).json(jsonResponse)
  } catch (error) {
    console.error("Error in upload handler:", error)
    return response.status(500).json({ error: error.message })
  }
}
