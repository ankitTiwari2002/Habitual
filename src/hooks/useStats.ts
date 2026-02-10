"use client";

import { useMemo } from 'react';
import { Habit, HabitLog } from './useHabits';
import { format, subDays, differenceInDays, parseISO, isSameDay } from 'date-fns';

export function useStats(habits: Habit[], logs: HabitLog[]) {
  const stats = useMemo(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    
    const habitStats = habits.map(habit => {
      const habitLogs = logs
        .filter(l => l.habitId === habit.id)
        .sort((a, b) => b.date.localeCompare(a.date));

      let currentStreak = 0;
      let lastDate = new Date();
      
      // Calculate current streak
      const sortedDates = habitLogs.map(l => l.date);
      
      let checkDate = new Date();
      while (true) {
        const dateStr = format(checkDate, 'yyyy-MM-dd');
        if (sortedDates.includes(dateStr)) {
          currentStreak++;
          checkDate = subDays(checkDate, 1);
        } else {
          // If today isn't logged, we still might have a streak from yesterday
          if (dateStr === today && currentStreak === 0) {
            checkDate = subDays(checkDate, 1);
            continue;
          }
          break;
        }
      }

      // Calculate best streak
      let bestStreak = 0;
      let tempStreak = 0;
      const allDatesSorted = [...sortedDates].sort((a, b) => a.localeCompare(b));
      
      for (let i = 0; i < allDatesSorted.length; i++) {
        if (i === 0) {
          tempStreak = 1;
        } else {
          const d1 = parseISO(allDatesSorted[i-1]);
          const d2 = parseISO(allDatesSorted[i]);
          if (differenceInDays(d2, d1) === 1) {
            tempStreak++;
          } else {
            tempStreak = 1;
          }
        }
        bestStreak = Math.max(bestStreak, tempStreak);
      }

      const totalCompleted = habitLogs.length;
      const daysSinceCreated = differenceInDays(new Date(), habit.createdAt.toDate()) + 1;
      const completionRate = Math.round((totalCompleted / Math.max(daysSinceCreated, 1)) * 100);

      return {
        habitId: habit.id,
        currentStreak,
        bestStreak,
        totalCompleted,
        completionRate
      };
    });

    const overallCompletionRate = habitStats.length > 0 
      ? Math.round(habitStats.reduce((acc, s) => acc + s.completionRate, 0) / habitStats.length)
      : 0;

    return {
      habitStats,
      overallCompletionRate,
      totalHabits: habits.length,
      activeHabits: habits.filter(h => h.isActive).length
    };
  }, [habits, logs]);

  return stats;
}