import { Link } from 'react-router-dom'

export const Header = () => {
    return (
      <header className="bg-white dark:bg-black dark:space-bg border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
  
                        <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-8">
                <Link to="/" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Home
                </Link>
                <Link to="/org-chart" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Repo Org Chart
                 </Link>
                <Link to="/eda" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200">
                  EDA
                </Link>
                <Link to="/explorer" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Repo Tree Explorer
                </Link>
              </nav>
              
            </div>
          </div>
        </div>
      </header>
    )
  }