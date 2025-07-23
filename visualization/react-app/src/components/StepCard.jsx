import React from 'react'

export const StepCard = ({ 
  number, 
  title, 
  description, 
  color = "blue", 
  className = ""
}) => {
  const colorClasses = {
    blue: {
      circle: "bg-blue-100 dark:bg-blue-600",
      text: "text-blue-600 dark:text-white"
    },
    green: {
      circle: "bg-green-100 dark:bg-green-600", 
      text: "text-green-600 dark:text-white"
    },
    purple: {
      circle: "bg-purple-100 dark:bg-purple-600",
      text: "text-purple-600 dark:text-white"
    }
  }

  const colors = colorClasses[color] || colorClasses.blue

  return (
    <div className={`
      flex items-start space-x-4 p-4 
      bg-gray-50 dark:bg-white dark:bg-opacity-90 
      rounded-lg border border-gray-200 dark:border-gray-300 
      hover:bg-gray-100 dark:hover:bg-white dark:hover:bg-opacity-95 
      transition-all duration-200 backdrop-blur-sm
      ${className}
    `}>
      <div className={`flex-shrink-0 w-10 h-10 ${colors.circle} rounded-full flex items-center justify-center`}>
        <span className={`${colors.text} text-lg font-bold`}>{number}</span>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-900 mb-1">
          {title}
        </h3>
        <p className="text-gray-700 dark:text-gray-700">
          {description}
        </p>
      </div>
    </div>
  )
} 