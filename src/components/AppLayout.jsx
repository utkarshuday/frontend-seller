import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Toaster } from '@/components/ui/toaster';

export default function AppLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Toaster />
    </div>
  );
}
