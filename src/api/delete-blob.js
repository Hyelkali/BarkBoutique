import { del } from "@vercel/blob"

export default async function handler(request, response) {
  if (request.method !== "DELETE") {
    return response.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { url } = request.body

    if (!url) {
      return response.status(400).json({ error: "URL is required" })
    }

    await del(url)

    return response.status(200).json({ success: true })
  } catch (error) {
    console.error("Error in delete handler:", error)
    return response.status(500).json({ error: error.message })
  }
}
