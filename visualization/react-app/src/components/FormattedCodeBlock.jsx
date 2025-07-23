import React from 'react'

export const FormattedCodeBlock = ({ content, className = "" }) => {
  const lines = content.split('\n')
  
  return (
    <div className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="font-mono text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
        {lines.map((line, index) => {
          const isHeader = line.includes('Format:') || line.includes('Where:')
          const isExample = line.includes('Example:') || line.includes('"uuid"')
          const isCodeBlock = line.trim().startsWith('{') || line.trim().startsWith('}')
          const isDefinition = line.includes('=') && !line.includes('Example')
          
          let lineClass = "whitespace-pre-wrap"
          
          if (isHeader) {
            lineClass += " font-semibold text-blue-600 dark:text-blue-400 mb-2"
          } else if (isExample) {
            lineClass += " text-purple-600 dark:text-purple-400"
          } else if (isCodeBlock) {
            lineClass += " text-green-600 dark:text-green-400"
          } else if (isDefinition) {
            lineClass += " text-gray-700 dark:text-gray-300"
          } else if (line.trim() === '') {
            lineClass += " h-2"
          }
          
          return (
            <div key={index} className={lineClass}>
              {line}
            </div>
          )
        })}
      </div>
    </div>
  )
} 