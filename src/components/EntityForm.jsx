import { useState, useEffect } from 'react'

function emptyRecord(fields) {
  return Object.fromEntries(fields.map(f => [f.name, '']))
}

export default function EntityForm({ config, editingRecord, onSave, onCancel }) {
  const [form, setForm] = useState(emptyRecord(config.fields))

  useEffect(() => {
    setForm(editingRecord ? { ...editingRecord } : emptyRecord(config.fields))
  }, [editingRecord, config])

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave(form)
  }

  const isEditing = !!editingRecord

  return (
    <form onSubmit={handleSubmit}>
      {config.fields.map(field => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}:</label>{' '}

          {field.type === 'enum' ? (
            <select
              id={field.name}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              required={field.required}
            >
              <option value="">-- Selecciona --</option>
              {field.options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={form[field.name]}
              onChange={handleChange}
              required={field.required}
          
              readOnly={isEditing && field.name === config.pk}
            />
          )}
          <br />
        </div>
      ))}

      <br />
      <button type="submit">{isEditing ? 'Actualizar' : 'Crear'}</button>
      {isEditing && (
        <button type="button" onClick={onCancel}>Cancelar edición</button>
      )}
    </form>
  )
}
