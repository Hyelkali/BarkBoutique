/**
 * Utility functions for working with Vercel Blob Storage
 */

/**
 * Upload a file to Vercel Blob Storage
 * @param {File} file - The file to upload
 * @param {string} folder - The folder to store the file in (e.g., 'products', 'users')
 * @returns {Promise<string>} - The URL of the uploaded file
 */
export async function uploadToBlob(file, folder = "general") {
    try {
      if (!file) throw new Error("No file provided")
  
      // Create a unique filename with original extension
      const filename = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
      const extension = file.name.split(".").pop()
      const fullFilename = `${filename}.${extension}`
  
      // Create form data
      const formData = new FormData()
      formData.append("file", file)
  
      // Upload to Vercel Blob
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(fullFilename)}`, {
        method: "POST",
        body: formData,
      })
  
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }
  
      const data = await response.json()
      return data.url
    } catch (error) {
      console.error("Error uploading to Blob:", error)
      throw error
    }
  }
  
  /**
   * Delete a file from Vercel Blob Storage
   * @param {string} url - The URL of the file to delete
   * @returns {Promise<boolean>} - Whether the deletion was successful
   */
  export async function deleteFromBlob(url) {
    try {
      if (!url) throw new Error("No URL provided")
  
      const response = await fetch("/api/delete-blob", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })
  
      if (!response.ok) {
        throw new Error(`Deletion failed: ${response.statusText}`)
      }
  
      return true
    } catch (error) {
      console.error("Error deleting from Blob:", error)
      throw error
    }
  }
  