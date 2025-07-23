import { useEffect, useRef } from "react"
import { Link } from 'react-router-dom'

export const TreeExplorer = () => {
    const iframeRef = useRef(null)
  
    useEffect(() => {
      if (iframeRef.current) {
        iframeRef.current.src = 'http://localhost:8000/explorer/explorer.html'
      }
    }, [])
  
    return (
      <div className="fixed inset-0 flex flex-col bg-white dark:bg-black dark:space-bg">
        <div className="bg-white dark:bg-black dark:space-bg border-b border-gray-200 dark:border-gray-800 shadow-sm p-4 flex-shrink-0 z-10">
          <div className="flex justify-between items-center">
            <div className="flex justify-end space-x-4 w-full">
              <Link to="/org-chart" 
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Org Chart
              </Link>
              <Link to="/eda" 
                    className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                EDA
              </Link>
              <Link to="/" 
                    className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
            </div>
            
          </div>
        </div>
        
        <div className="flex-1 w-full">
          <iframe 
            ref={iframeRef}
            className="w-full h-full border-0 block"
            title="Repository Explorer"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    )
  }