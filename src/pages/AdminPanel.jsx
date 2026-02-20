import React from 'react'
import { ENTITIES } from '../entities'
import EntitySection from '../components/EntitySection'

export default function AdminPanel() {
  const entityKeys = Object.keys(ENTITIES)

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-black text-gray-800 mb-6">Panel de Administración</h1>

      <nav className="flex gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        {entityKeys.map((key, i) => (
          <React.Fragment key={key}>
            <a 
                href={`#section-${key}`} 
                className="text-green-600 font-bold hover:text-green-800 transition-colors"
            >
                {ENTITIES[key].label}
            </a>
            {i < entityKeys.length - 1 && <span className="text-gray-300">|</span>}
          </React.Fragment>
        ))}
      </nav>

      <div className="space-y-12">
        {entityKeys.map(key => (
          <div key={key} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <EntitySection entityKey={key} config={ENTITIES[key]} />
          </div>
        ))}
      </div>
    </div>
  )
}