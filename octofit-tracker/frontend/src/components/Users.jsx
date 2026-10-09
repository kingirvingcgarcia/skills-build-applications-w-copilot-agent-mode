import ResourcePage from './ResourcePage.jsx'
import { useApiResource } from '../hooks/useApiResource.js'

const columns = [
  { label: 'Member', field: 'name' },
  { label: 'Email', field: 'email' },
  { label: 'Team', field: 'team.name' },
  { label: 'Joined', field: 'createdAt', date: true },
]

export default function Users() {
  const resource = useApiResource('/api/users/', fetch)
  return (
    <ResourcePage title="Members" category="PEOPLE" description="The people behind every personal best." columns={columns} emptyMessage="No members have joined yet." resource={resource} />
  )
}