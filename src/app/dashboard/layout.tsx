"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, LayoutDashboard, User, LogOut, Settings, BarChart } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-secondary/20">
      {/* Mobile Top Nav */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-card border-b px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg font-headline">Habitual</span>
        </div>
      </div>

      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 bg-card border-r">
        <div className="p-6 flex items-center gap-2">
          <CheckCircle2 className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl font-headline">Habitual</span>
        </div>
        <nav className="flex-1 px-4 space-y-2 py-4">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg bg-primary/10 text-primary">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/dashboard/stats" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors">
            <BarChart className="h-5 w-5" />
            Statistics
          </Link>
          <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors">
            <User className="h-5 w-5" />
            Profile
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors">
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 px-3 py-4">
             <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
               {user.displayName?.charAt(0) || user.email?.charAt(0)}
             </div>
             <div className="flex-1 overflow-hidden">
               <p className="text-sm font-medium truncate">{user.displayName || 'User'}</p>
               <p className="text-xs text-muted-foreground truncate">{user.email}</p>
             </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => logout()}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:pl-64 pt-16 md:pt-0">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}