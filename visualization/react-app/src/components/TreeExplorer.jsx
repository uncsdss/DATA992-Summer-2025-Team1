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
          <div className="flex justify-end items-center">
            <Link to="/" 
                  className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
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