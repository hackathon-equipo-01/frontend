import EntitySection from './EntitySection'

const config = {
  label: 'Aulas',
  pk: 'id_aula',
  fields: [
    { name: 'id_aula',     label: 'id_aula',     type: 'text',   required: true },
    { name: 'id_profesor', label: 'id_profesor',  type: 'text',   required: false },
    { name: 'name',        label: 'name (curso)', type: 'text',   required: true },
    { name: 'points',      label: 'points',       type: 'number', required: false },
  ],
}

export default function AulasForm() {
  return <EntitySection entityKey="aulas" config={config} />
}
