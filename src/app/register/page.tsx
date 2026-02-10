"use client";

import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useAuth, useFirestore } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, User, Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const db = useFirestore();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const getFriendlyErrorMessage = (error: any) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return "This email is already registered. Try logging in instead.";
      case 'auth/invalid-email':
        return "Please enter a valid email address.";
      case 'auth/weak-password':
        return "Password is too weak. Please use at least 6 characters.";
      case 'auth/network-request-failed':
        return "Network error. Please check your connection.";
      default:
        return "Could not create account. Please try again.";
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your full name.",
        variant: "destructive"
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address (e.g., name@example.com).",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await updateProfile(user, { displayName: name });
      
      // Create the user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        name,
        email,
        createdAt: new Date().toISOString()
      });

      toast({
        title: "Success! ✅",
        description: "Your account has been successfully created. Welcome aboard!",
      });

      router.push('/dashboard');
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: getFriendlyErrorMessage(error),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold font-headline">Habitual</span>
          </div>
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your details below to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  className="pl-10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <p className="text-[10px] text-muted-foreground">Minimum 6 characters</p>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account? <Link href="/login" className="text-primary hover:underline font-medium">Log in</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
