import MonitoringChart from "../components/Dashboard/MonitoringChart"
import { withAuth } from "../hocs"

function Dashboard(): JSX.Element {
    return <MonitoringChart />
}

export default withAuth(Dashboard)
