import ResourcePage from './ResourcePage.jsx'
import { useApiResource } from '../hooks/useApiResource.js'

const columns = [
  { label: 'Workout', field: 'name' },
  { label: 'Category', field: 'category' },
  { label: 'Duration', render: (item) => item.durationMinutes ? `${item.durationMinutes} min` : '—' },
  { label: 'Difficulty', field: 'difficulty' },
  { label: 'Details', field: 'description' },
]

export default function Workouts() {
  const resource = useApiResource('/api/workouts/', fetch)
  return (
    <ResourcePage title="Workout library" category="PLANS" description="Choose a session that fits your pace and your goals." columns={columns} emptyMessage="No workouts are available yet." resource={resource} />
  )
}