import dynamic from 'next/dynamic';

// Dynamically import the AdminDashboard component with SSR disabled
const AdminDashboard = dynamic(() => import('../components/AdminDashboard'), { 
  ssr: false 
});

export default function AdminPage() {
  return <AdminDashboard />;
}
