import ResourcePage from './ResourcePage.jsx'
import { useApiResource } from '../hooks/useApiResource.js'

const columns = [
  { label: 'Athlete', field: 'user.name' },
  { label: 'Activity', field: 'type' },
  { label: 'Duration', render: (item) => item.durationMinutes ? `${item.durationMinutes} min` : '—' },
  { label: 'Distance', render: (item) => item.distanceKm ? `${item.distanceKm} km` : '—' },
  { label: 'Calories', field: 'caloriesBurned' },
  { label: 'Completed', field: 'completedAt', date: true },
]

export default function Activities() {
  const resource = useApiResource('/api/activities/', fetch)
  return (
    <ResourcePage title="Activity log" category="TRAINING" description="A clear record of the work your team puts in." columns={columns} emptyMessage="No activities have been recorded yet." resource={resource} />
  )
}