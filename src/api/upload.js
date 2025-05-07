// File upload API route for Vercel Blob storage
export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" })
    }

    // Check if BLOB_READ_WRITE_TOKEN is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return res.status(500).json({
        error: "Vercel Blob storage is not configured. Please add the BLOB_READ_WRITE_TOKEN environment variable.",
      })
    }

    // Get the file from the request
    const file = req.body.get("file")

    if (!file) {
      return res.status(400).json({ error: "No file provided" })
    }

    // Create a unique filename
    const filename = `${Date.now()}-${file.name}`

    // Upload to Vercel Blob
    const response = await fetch(`https://blob.vercel-storage.com/${process.env.BLOB_READ_WRITE_TOKEN}`, {
      method: "POST",
      headers: {
        "content-type": file.type,
        "x-vercel-filename": filename,
      },
      body: file,
    })

    if (!response.ok) {
      throw new Error(`Failed to upload to Vercel Blob: ${response.statusText}`)
    }

    const result = await response.json()

    return res.status(200).json({
      url: result.url,
      success: true,
    })
  } catch (error) {
    console.error("Error in upload handler:", error)
    return res.status(500).json({ error: error.message })
  }
}
