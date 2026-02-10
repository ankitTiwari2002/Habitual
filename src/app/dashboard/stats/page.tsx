"use client";

import { useHabits } from '@/hooks/useHabits';
import { useStats } from '@/hooks/useStats';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ActivityChart } from '@/components/dashboard/ActivityChart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Flame, Target, CheckCircle2, TrendingUp, Calendar } from 'lucide-react';

export default function StatsPage() {
  const { habits, logs, loading } = useHabits();
  const stats = useStats(habits, logs);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 w-48 bg-muted rounded-md" />
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-card rounded-xl border" />)}
        </div>
        <div className="h-96 bg-card rounded-xl border" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Statistics</h1>
        <p className="text-muted-foreground">Detailed insights into your habit consistency and streaks.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm bg-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium opacity-80">Completion Rate</p>
              <Target className="h-4 w-4 opacity-80" />
            </div>
            <div className="text-2xl font-bold">{stats.overallCompletionRate}%</div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Total Logs</p>
              <CheckCircle2 className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold">{logs.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Check-ins recorded</p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Active Habits</p>
              <TrendingUp className="h-4 w-4 text-chart-3" />
            </div>
            <div className="text-2xl font-bold">{stats.activeHabits}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently tracking</p>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Streaks</p>
              <Flame className="h-4 w-4 text-orange-500" />
            </div>
            <div className="text-2xl font-bold">
              {Math.max(0, ...stats.habitStats.map(s => s.currentStreak))} Days
            </div>
            <p className="text-xs text-muted-foreground mt-1">Current longest streak</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Activity Heatmap</CardTitle>
            <CardDescription>Visual representation of your progress over the last week.</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ActivityChart logs={logs} habits={habits} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Top Performer</CardTitle>
            <CardDescription>Habit with the highest completion rate.</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.habitStats.length > 0 ? (
              <div className="space-y-4">
                {stats.habitStats
                  .sort((a, b) => b.completionRate - a.completionRate)
                  .slice(0, 3)
                  .map((s, idx) => {
                    const habit = habits.find(h => h.id === s.habitId);
                    return (
                      <div key={s.habitId} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{habit?.title}</p>
                          <p className="text-xs text-muted-foreground">{s.totalCompleted} completions</p>
                        </div>
                        <Badge variant={idx === 0 ? "default" : "secondary"}>
                          {s.completionRate}%
                        </Badge>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">No data available yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Individual Habit Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Habit</TableHead>
                <TableHead>Current Streak</TableHead>
                <TableHead>Best Streak</TableHead>
                <TableHead>Total Done</TableHead>
                <TableHead className="text-right">Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.habitStats.map((s) => {
                const habit = habits.find(h => h.id === s.habitId);
                return (
                  <TableRow key={s.habitId}>
                    <TableCell className="font-medium">{habit?.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Flame className="h-3 w-3 text-orange-500 fill-orange-500" />
                        {s.currentStreak}
                      </div>
                    </TableCell>
                    <TableCell>{s.bestStreak}</TableCell>
                    <TableCell>{s.totalCompleted}</TableCell>
                    <TableCell className="text-right font-mono">{s.completionRate}%</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
