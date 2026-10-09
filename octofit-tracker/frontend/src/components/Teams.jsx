import ResourcePage from './ResourcePage.jsx'
import { useApiResource } from '../hooks/useApiResource.js'

const columns = [
  { label: 'Team', field: 'name' },
  { label: 'About', field: 'description' },
  { label: 'Members', render: (item) => Array.isArray(item.members) ? item.members.length : '—' },
  { label: 'Created', field: 'createdAt', date: true },
]

export default function Teams() {
  const resource = useApiResource('/api/teams/', fetch)
  return (
    <ResourcePage title="Teams" category="COMMUNITY" description="Find your people and keep the momentum together." columns={columns} emptyMessage="No teams have been created yet." resource={resource} />
  )
}