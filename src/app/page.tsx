"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, CheckCircle2, Flame, BarChart3, ArrowRight } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-card">
        <Link className="flex items-center justify-center gap-2" href="/">
          <CheckCircle2 className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold">Habitual</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {user ? (
            <Button asChild variant="default">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild variant="default">
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-headline">
                  Master Your Days, <span className="text-primary">Transform Your Life</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Habitual helps you build lasting routines with AI-powered suggestions, streak tracking, and beautiful analytics.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" className="rounded-full px-8" asChild>
                  <Link href={user ? "/dashboard" : "/register"}>
                    Start Tracking Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className="p-4 rounded-2xl bg-primary/10">
                  <Flame className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Streak Tracking</h3>
                <p className="text-muted-foreground">Stay motivated with daily streaks and achievement milestones.</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className="p-4 rounded-2xl bg-chart-3/10">
                  <BarChart3 className="h-8 w-8 text-chart-3" />
                </div>
                <h3 className="text-xl font-bold">Smart Analytics</h3>
                <p className="text-muted-foreground">Visualize your progress with beautiful charts and insights.</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className="p-4 rounded-2xl bg-chart-4/10">
                  <Sparkles className="h-8 w-8 text-chart-4" />
                </div>
                <h3 className="text-xl font-bold">AI Suggestions</h3>
                <p className="text-muted-foreground">Get personalized habit recommendations tailored to your goals.</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className="p-4 rounded-2xl bg-chart-2/10">
                  <CheckCircle2 className="h-8 w-8 text-chart-2" />
                </div>
                <h3 className="text-xl font-bold">Simple Tracking</h3>
                <p className="text-muted-foreground">One-tap completion logging designed for your busy life.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-card">
        <p className="text-xs text-muted-foreground">© 2024 Habitual. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">Terms of Service</Link>
          <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">Privacy</Link>
        </nav>
      </footer>
    </div>
  );
}