import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-green-600 to-green-700 text-white shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-green-500">
        <h2 className="text-2xl font-bold tracking-wide">Dashboard</h2>
      </div>

      {/* Menu */}
      <nav className="p-4">
        <ul className="flex flex-col gap-3">
          <li>
            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-500 transition-colors"
            >
              <DashboardIcon fontSize="small" />
              <span className="text-lg">Home</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-500 transition-colors"
            >
              <PeopleIcon fontSize="small" />
              <span className="text-lg">Users</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-500 transition-colors"
            >
              <BarChartIcon fontSize="small" />
              <span className="text-lg">Reports</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
