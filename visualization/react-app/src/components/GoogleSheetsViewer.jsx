import React from 'react'

export const GoogleSheetsViewer = ({ sheetUrl, title = "Data Sheet", height = "600px", showHeader = true }) => {
  // Example URL format: https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/pubhtml?widget=true&headers=false
  // You'll need to replace YOUR_SHEET_ID with your actual Google Sheet ID
  
  return (
    <div className={showHeader ? "bg-white dark:bg-white dark:text-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-300 p-6 dark:bg-opacity-95 backdrop-blur-sm space-card glow-border" : ""}>
      {showHeader && (
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-600 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-green-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-900">{title}</h2>
        </div>
      )}
      
      <div className="relative w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-300">
        {sheetUrl ? (
          <iframe
            src={sheetUrl}
            width="100%"
            height={height}
            frameBorder="0"
            title={title}
            className="bg-white"
          />
        ) : (
          <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg font-medium mb-2">No Google Sheet URL provided</p>
              <p className="text-sm">Please add your Google Sheet URL to display the data</p>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg text-sm">
                <p className="font-medium mb-1">To get your sheet URL:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Open your Google Sheet</li>
                  <li>Go to File → Share → Publish to web</li>
                  <li>Choose "Entire Document" and "Web page"</li>
                  <li>Copy the generated URL</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 