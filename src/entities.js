// Configuración de cada entidad: PK, campos y tipo de cada campo.
// Modifica aquí si cambia el esquema.

export const ENTITIES = {
  usuarios: {
    label: 'Usuarios',
    pk: 'id_usuario',
    fields: [
      { name: 'id_usuario',  label: 'id_usuario',       type: 'text',   required: true },
      { name: 'rol',         label: 'rol',               type: 'enum',   required: true,
        options: ['alumno', 'profesor', 'administrador'] },
      { name: 'id_aula',     label: 'id_aula (FK)',      type: 'text',   required: false },
    ],
  },

  aulas: {
    label: 'Aulas',
    pk: 'id_aula',
    fields: [
      { name: 'id_aula',      label: 'id_aula',          type: 'text',   required: true },
      { name: 'id_profesor',  label: 'id_profesor',      type: 'text',   required: false },
      { name: 'name',         label: 'name (curso)',      type: 'text',   required: true },
      { name: 'points',       label: 'points',            type: 'number', required: false },
    ],
  },

  tipo_de_residuo: {
    label: 'Tipo de Residuo',
    pk: 'id_categoria',
    fields: [
      { name: 'id_categoria', label: 'id_categoria',     type: 'text',   required: true },
      { name: 'name',         label: 'name',              type: 'text',   required: true },
    ],
  },

  residuos_list: {
    label: 'Residuos List',
    pk: 'id_residuo',
    fields: [
      { name: 'id_residuo',    label: 'id_residuo',           type: 'text',   required: true },
      { name: 'name',          label: 'name',                 type: 'text',   required: true },
      { name: 'id_categoria',  label: 'id_categoria (FK)',    type: 'text',   required: false },
      { name: 'tamano_objeto', label: 'tamaño objeto (int)',  type: 'number', required: false },
    ],
  },

  contenedor: {
    label: 'Contenedores',
    pk: 'id_contenedor',
    fields: [
      { name: 'id_contenedor',           label: 'id_contenedor',                    type: 'text', required: true },
      { name: 'id_categoria_contenedor', label: 'id_categoria_contenedor (FK)',     type: 'text', required: false },
      { name: 'estado',                  label: 'estado',                           type: 'enum', required: true,
        options: ['disponible', 'lleno', 'mantenimiento'] },
    ],
  },

  residuo_tirado: {
    label: 'Residuo Tirado',
    pk: 'id_accion',
    fields: [
      { name: 'id_accion',     label: 'id_accion',               type: 'text',           required: true },
      { name: 'id_aula',       label: 'id_aula (FK)',             type: 'text',           required: true },
      { name: 'id_residuo',    label: 'id_residuo (FK)',          type: 'text',           required: true },
      { name: 'id_contenedor', label: 'id_contenedor (FK)',       type: 'text',           required: true },
      { name: 'fecha',         label: 'fecha',                    type: 'datetime-local', required: true },
    ],
  },
}
