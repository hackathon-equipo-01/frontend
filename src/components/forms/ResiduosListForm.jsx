import EntitySection from './EntitySection'

const config = {
  label: 'Residuos List',
  pk: 'id_residuo',
  fields: [
    { name: 'id_residuo',    label: 'id_residuo',          type: 'text',   required: true },
    { name: 'name',          label: 'name',                 type: 'text',   required: true },
    { name: 'id_categoria',  label: 'id_categoria (FK)',    type: 'text',   required: false },
    { name: 'tamano_objeto', label: 'tamaño objeto (int)',  type: 'number', required: false },
  ],
}

export default function ResiduosListForm() {
  return <EntitySection entityKey="residuos_list" config={config} />
}
