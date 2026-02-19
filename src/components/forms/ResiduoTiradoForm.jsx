import EntitySection from './EntitySection'

const config = {
  label: 'Residuo Tirado',
  pk: 'id_accion',
  fields: [
    { name: 'id_accion',     label: 'id_accion',          type: 'text',           required: true },
    { name: 'id_aula',       label: 'id_aula (FK)',        type: 'text',           required: true },
    { name: 'id_residuo',    label: 'id_residuo (FK)',     type: 'text',           required: true },
    { name: 'id_contenedor', label: 'id_contenedor (FK)',  type: 'text',           required: true },
    { name: 'fecha',         label: 'fecha',               type: 'datetime-local', required: true },
  ],
}

export default function ResiduoTiradoForm() {
  return <EntitySection entityKey="residuo_tirado" config={config} />
}
