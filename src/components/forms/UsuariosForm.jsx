import EntitySection from '../EntitySection'

const config = {
  label: 'Usuarios',
  pk: 'id_usuario',
  fields: [
    { name: 'id_usuario', label: 'id_usuario',  type: 'text',  required: true },
    { name: 'rol',        label: 'rol',          type: 'enum',  required: true,
      options: ['alumno', 'profesor', 'administrador'] },
    { name: 'id_aula',    label: 'id_aula (FK)', type: 'text',  required: false },
  ],
}

export default function UsuariosForm() {
  return <EntitySection entityKey="usuarios" config={config} />
}
