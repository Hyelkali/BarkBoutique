export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full px-4 py-8 text-gray-600 transition-colors duration-300 bg-gray-100 dark:bg-dark-900 dark:text-gray-400">
      <div className="container grid grid-cols-1 gap-8 mx-auto md:grid-cols-4">
        <div>
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">BarkBoutique</h3>
          <p className="text-sm">Premium products for your furry friends, designed with love and care.</p>
        </div>
        <div>
          <h4 className="mb-4 font-bold text-gray-900 dark:text-white">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/shop" className="transition-colors hover:dark:text-white hover:text-gray-900">
                All Products
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:dark:text-white hover:text-gray-900">
                New Arrivals
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:dark:text-white hover:text-gray-900">
                Best Sellers
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:dark:text-white hover:text-gray-900">
                Sale
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-bold text-gray-900 dark:text-white">Information</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="transition-colors hover:dark:text-white hover:text-gray-900">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:dark:text-white hover:text-gray-900">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:dark:text-white hover:text-gray-900">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:dark:text-white hover:text-gray-900">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-bold text-gray-900 dark:text-white">Connect</h4>
          <div className="flex space-x-4">
            <a href="#" className="transition-colors hover:dark:text-white hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="transition-colors hover:dark:text-white hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="transition-colors hover:dark:text-white hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="pt-8 mt-8 text-sm text-center border-t border-gray-200 dark:border-dark-600">
        <p>&copy; {currentYear} BarkBoutique. All rights reserved.</p>
      </div>
    </footer>
  )
}
