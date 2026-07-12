import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';

const MainLayout = () => (
  <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.15),_transparent_35%),linear-gradient(135deg,_#081120_0%,_#0f172a_55%,_#111827_100%)] text-slate-100">
    <Navbar />
    <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  </div>
);

export default MainLayout;
