import React, { useState } from 'react'
import { metadataItems } from '../const/metadataItemList'



export const MetadataProposal = () => {
  const [expandedItem, setExpandedItem] = useState(null)

  return (
    <div className="mt-8">
      <div className="flex items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-900">Metadata Schema ({metadataItems.length} fields)</h3>
      </div>
      <div className="bg-white dark:bg-white dark:text-gray-900 rounded-lg border border-gray-200 dark:border-gray-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Metadata Field
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Logic on Inclusion
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Processing Method
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {metadataItems.map((item) => (
                <tr 
                  key={item.id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200 cursor-pointer ${
                    expandedItem === item.id ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                  }`}
                  onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                >
                  <td className="px-3 py-2 text-left">
                    <span className="font-medium text-sm text-gray-900 dark:text-gray-900">
                      {item.proposedMetadata}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-left">
                    <div className="text-sm text-gray-600 dark:text-gray-700">
                      {expandedItem === item.id ? (
                        <p className="whitespace-normal">{item.logic}</p>
                      ) : (
                        <p className="line-clamp-2">{item.logic}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-left">
                    <div className="text-sm text-gray-600 dark:text-gray-700">
                      {expandedItem === item.id ? (
                        <p className="whitespace-normal">{item.processingMethod || 'TBD'}</p>
                      ) : (
                        <p className="line-clamp-2">{item.processingMethod || 'TBD'}</p>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  )
} 