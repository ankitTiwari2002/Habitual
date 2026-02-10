"use client";

import { useUser } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Your Profile</h1>
        <p className="text-muted-foreground">Manage your account and preferences.</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader className="flex flex-row items-center gap-6 pb-8">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.photoURL || undefined} />
            <AvatarFallback className="text-2xl bg-primary/10 text-primary font-bold">
              {user.displayName?.charAt(0) || user.email?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-headline">{user.displayName || 'User'}</CardTitle>
            <CardDescription>Member since 2024</CardDescription>
            <Button variant="outline" size="sm" className="mt-2">Edit Avatar</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Email Address</label>
              <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">{user.email}</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Display Name</label>
              <div className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg">
                <User className="h-4 w-4 text-primary" />
                <span className="text-sm">{user.displayName || 'Not set'}</span>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="text-sm font-semibold mb-3">Account Security</h3>
            <Button variant="secondary" size="sm">Change Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
