/**
 * Generates an avatar URL based on the user's name
 * @param {object} user - The user object containing displayName and photoURL
 * @param {string} backgroundColor - Optional background color
 * @returns {string} - The avatar URL
 */
export const getBestAvatar = (user, backgroundColor = "") => {
    if (user?.photoURL) {
      return user.photoURL
    }
  
    if (!user?.displayName && !user?.email) return null
  
    const name = user.displayName || user.email
  
    // Get initials from name
    const initials = name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2)
  
    // Generate a random background color if none provided
    const bgColor = backgroundColor || getRandomColor(name)
  
    // Create URL for UI Avatars service
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${bgColor.replace("#", "")}&color=fff&size=256&bold=true`
  }
  
  /**
   * Generates a consistent color based on a string
   * @param {string} str - The string to generate a color from
   * @returns {string} - A hex color code
   */
  const getRandomColor = (str) => {
    // Generate a hash from the string
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
  
    // Convert hash to hex color
    let color = "#"
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff
      color += ("00" + value.toString(16)).substr(-2)
    }
  
    return color
  }
  