export default function EntityTable({ config, records, onEdit, onDelete }) {
  if (!records.length) {
    return <p>Sin registros.</p>
  }

  return (
    <table border="1">
      <thead>
        <tr>
          {config.fields.map(f => (
            <th key={f.name}>{f.label}</th>
          ))}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {records.map(record => (
          <tr key={record[config.pk]}>
            {config.fields.map(f => (
              <td key={f.name}>{record[f.name] ?? ''}</td>
            ))}
            <td>
              <button onClick={() => onEdit(record)}>Editar</button>{' '}
              <button onClick={() => onDelete(record[config.pk])}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
