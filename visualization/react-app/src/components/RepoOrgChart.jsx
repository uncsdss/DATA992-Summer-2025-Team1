import { useEffect, useRef } from "react"
import { Link } from 'react-router-dom'

export const RepoOrgChart = () => {
    const iframeRef = useRef(null)
  
    useEffect(() => {
      if (iframeRef.current) {
        iframeRef.current.src = 'http://localhost:8000/org-chart/org-chart.html'
      }
    }, [])
  
    return (
      <div className="fixed inset-0 flex flex-col bg-white dark:bg-black dark:space-bg">
        <div className="bg-white dark:bg-black dark:space-bg border-b border-gray-200 dark:border-gray-800 shadow-sm p-4 flex-shrink-0 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Repo Organization Chart</h1>
            </div>
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
            title="Organization Chart"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    )
  }