import EntitySection from './EntitySection'

const config = {
  label: 'Contenedores',
  pk: 'id_contenedor',
  fields: [
    { name: 'id_contenedor',           label: 'id_contenedor',                type: 'text', required: true },
    { name: 'id_categoria_contenedor', label: 'id_categoria_contenedor (FK)', type: 'text', required: false },
    { name: 'estado',                  label: 'estado',                       type: 'enum', required: true,
      options: ['disponible', 'lleno', 'mantenimiento'] },
  ],
}

export default function ContenedorForm() {
  return <EntitySection entityKey="contenedor" config={config} />
}
