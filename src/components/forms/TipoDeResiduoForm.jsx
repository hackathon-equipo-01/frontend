import EntitySection from './EntitySection'

const config = {
  label: 'Tipo de Residuo',
  pk: 'id_categoria',
  fields: [
    { name: 'id_categoria', label: 'id_categoria', type: 'text', required: true },
    { name: 'name',         label: 'name',          type: 'text', required: true },
  ],
}

export default function TipoDeResiduoForm() {
  return <EntitySection entityKey="tipo_de_residuo" config={config} />
}
