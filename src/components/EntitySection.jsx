import { useState, useEffect, useCallback } from 'react'
import EntityForm from './EntityForm'
import EntityTable from './EntityTable'
import { getAll, create, update, remove } from '../api'

export default function EntitySection({ entityKey, config }) {
  const [records, setRecords]     = useState([])
  const [editing, setEditing]     = useState(null)  
  const [error, setError]         = useState('')

  const load = useCallback(async () => {
    try {
      const data = await getAll(entityKey)
      setRecords(data)
    } catch (e) {
      setError(`Error al cargar: ${e.message}`)
    }
  }, [entityKey])

  useEffect(() => { load() }, [load])


  async function handleSave(formData) {
    setError('')
    try {
      if (editing) {
        await update(entityKey, config.pk, editing[config.pk], formData)
      } else {
        
        if (records.find(r => r[config.pk] === formData[config.pk])) {
          setError(`Ya existe un registro con ${config.pk} = "${formData[config.pk]}"`)
          return
        }
        await create(entityKey, formData)
      }
      setEditing(null)
      load()
    } catch (e) {
      setError(`Error al guardar: ${e.message}`)
    }
  }

  async function handleDelete(pkValue) {
    if (!confirm(`¿Eliminar el registro con ID "${pkValue}"?`)) return
    setError('')
    try {
      await remove(entityKey, config.pk, pkValue)
      if (editing?.[config.pk] === pkValue) setEditing(null)
      load()
    } catch (e) {
      setError(`Error al eliminar: ${e.message}`)
    }
  }

  return (
    <section id={`section-${entityKey}`}>
      <h2>{config.label}</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>{editing ? `Editando: ${editing[config.pk]}` : 'Nuevo registro'}</h3>
      <EntityForm
        config={config}
        editingRecord={editing}
        onSave={handleSave}
        onCancel={() => setEditing(null)}
      />

      <h3>Registros</h3>
      <EntityTable
        config={config}
        records={records}
        onEdit={setEditing}
        onDelete={handleDelete}
      />
    </section>
  )
}
