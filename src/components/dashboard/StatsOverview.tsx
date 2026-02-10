"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Flame, Target, CheckCircle2, TrendingUp } from 'lucide-react';

interface StatsOverviewProps {
  stats: any;
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const bestOverallStreak = Math.max(0, ...stats.habitStats.map((s: any) => s.bestStreak));

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-none shadow-sm bg-primary text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium opacity-80">Overall Completion</p>
            <Target className="h-4 w-4 opacity-80" />
          </div>
          <div className="text-2xl font-bold">{stats.overallCompletionRate}%</div>
          <Progress value={stats.overallCompletionRate} className="h-1 bg-white/20 mt-3" />
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm bg-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-muted-foreground">Active Habits</p>
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl font-bold">{stats.activeHabits} / {stats.totalHabits}</div>
          <p className="text-xs text-muted-foreground mt-2">Currently being tracked</p>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm bg-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-muted-foreground">Best Streak</p>
            <Flame className="h-4 w-4 text-orange-500" />
          </div>
          <div className="text-2xl font-bold">{bestOverallStreak} Days</div>
          <p className="text-xs text-muted-foreground mt-2">Your all-time record</p>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm bg-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-muted-foreground">Consistency</p>
            <TrendingUp className="h-4 w-4 text-chart-2" />
          </div>
          <div className="text-2xl font-bold">Stable</div>
          <p className="text-xs text-muted-foreground mt-2">You are staying on track!</p>
        </CardContent>
      </Card>
    </div>
  );
}