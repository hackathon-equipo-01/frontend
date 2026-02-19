import { ENTITIES } from './entities'
import EntitySection from './components/EntitySection'

export default function App() {
  const entityKeys = Object.keys(ENTITIES)

  return (
    <div>
      <h1>Panel de Administración</h1>

      <nav>
        {entityKeys.map((key, i) => (
          <span key={key}>
            <a href={`#section-${key}`}>{ENTITIES[key].label}</a>
            {i < entityKeys.length - 1 && ' | '}
          </span>
        ))}
      </nav>

      <hr />

      {entityKeys.map(key => (
        <div key={key}>
          <EntitySection entityKey={key} config={ENTITIES[key]} />
          <hr />
        </div>
      ))}
    </div>
  )
}