import ResourcePage from './ResourcePage.jsx'
import { useApiResource } from '../hooks/useApiResource.js'

const columns = [
  { label: 'Rank', render: (item) => item.rank ? `#${item.rank}` : '—' },
  { label: 'Athlete', field: 'user.name' },
  { label: 'Team', field: 'team.name' },
  { label: 'Points', field: 'points' },
  { label: 'Period', field: 'period' },
]

export default function Leaderboard() {
  const resource = useApiResource('/api/leaderboard/', fetch)
  return (
    <ResourcePage title="Leaderboard" category="STANDINGS" description="Progress, consistency, and a little friendly competition." columns={columns} emptyMessage="Standings will appear here as activity is logged." resource={resource} />
  )
}