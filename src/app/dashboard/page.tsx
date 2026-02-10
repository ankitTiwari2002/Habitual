"use client";

import { useHabits } from '@/hooks/useHabits';
import { useStats } from '@/hooks/useStats';
import { format } from 'date-fns';
import { HabitCard } from '@/components/habits/HabitCard';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { ActivityChart } from '@/components/dashboard/ActivityChart';
import { AISuggestions } from '@/components/dashboard/AISuggestions';
import { AddHabitDialog } from '@/components/habits/AddHabitDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function DashboardPage() {
  const { habits, logs, loading, toggleLog, addHabit, updateHabit, deleteHabit } = useHabits();
  const stats = useStats(habits, logs);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  if (loading) {
    return (
      <div className="grid gap-6">
        <div className="h-40 rounded-xl bg-card animate-pulse" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 rounded-xl bg-card animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Daily Habits</h1>
          <p className="text-muted-foreground">Stay consistent. Today is {format(new Date(), 'MMMM do, yyyy')}</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="rounded-full shadow-lg hover:shadow-primary/20">
          <Plus className="mr-2 h-5 w-5" /> Add New Habit
        </Button>
      </div>

      <StatsOverview stats={stats} />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-headline">Your Routine</h2>
          </div>
          
          {habits.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-card rounded-2xl border-2 border-dashed">
              <p className="text-muted-foreground mb-4">You haven&apos;t added any habits yet.</p>
              <Button onClick={() => setIsAddDialogOpen(true)}>Create your first habit</Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {habits.map(habit => {
                const habitStat = stats.habitStats.find(s => s.habitId === habit.id);
                return (
                  <HabitCard 
                    key={habit.id} 
                    habit={habit} 
                    stat={habitStat}
                    isCompleted={logs.some(l => l.habitId === habit.id && l.date === today)}
                    onToggle={() => toggleLog(habit.id, today)}
                    onDelete={() => deleteHabit(habit.id)}
                    onEdit={(data) => updateHabit(habit.id, data)}
                  />
                );
              })}
            </div>
          )}

          <div className="bg-card p-6 rounded-2xl border">
            <h3 className="text-lg font-bold mb-4 font-headline">Weekly Activity</h3>
            <ActivityChart logs={logs} habits={habits} />
          </div>
        </div>

        <div className="space-y-8">
           <AISuggestions habits={habits} />
        </div>
      </div>

      <AddHabitDialog 
        isOpen={isAddDialogOpen} 
        onClose={() => setIsAddDialogOpen(false)} 
        onAdd={addHabit}
      />
    </div>
  );
}