
"use client";

import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, Timestamp, query, where } from 'firebase/firestore';
import { useFirestore, useUser, addDocumentNonBlocking, updateDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase';

export interface Habit {
  id: string;
  userId: string;
  title: string;
  description: string;
  frequency: 'daily' | 'weekly';
  createdAt: any;
  isActive: boolean;
}

export interface HabitLog {
  id: string;
  habitId: string;
  userId: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
}

export function useHabits() {
  const { user } = useUser();
  const db = useFirestore();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [logs, setLogs] = useState<HabitLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !db) return;

    // Listen to habits
    const habitsCollection = collection(db, 'users', user.uid, 'habits');
    const unsubscribeHabits = onSnapshot(habitsCollection, (snapshot) => {
      const habitsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Habit));
      setHabits(habitsData);
      setLoading(false);
    });

    // Listen to logs
    const logsCollection = collection(db, 'users', user.uid, 'habitLogs');
    const unsubscribeLogs = onSnapshot(logsCollection, (snapshot) => {
      const logsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HabitLog));
      setLogs(logsData);
    });

    return () => {
      unsubscribeHabits();
      unsubscribeLogs();
    };
  }, [user, db]);

  const addHabit = async (habitData: Partial<Habit>) => {
    if (!user || !db) return;
    const habitsRef = collection(db, 'users', user.uid, 'habits');
    addDocumentNonBlocking(habitsRef, {
      ...habitData,
      userId: user.uid,
      isActive: true,
      createdAt: Timestamp.now(),
    });
  };

  const updateHabit = async (habitId: string, habitData: Partial<Habit>) => {
    if (!user || !db) return;
    const habitRef = doc(db, 'users', user.uid, 'habits', habitId);
    updateDocumentNonBlocking(habitRef, habitData);
  };

  const deleteHabit = async (habitId: string) => {
    if (!user || !db) return;
    const habitRef = doc(db, 'users', user.uid, 'habits', habitId);
    deleteDocumentNonBlocking(habitRef);
  };

  const toggleLog = (habitId: string, date: string) => {
    if (!user || !db) return;
    
    const existingLog = logs.find(l => l.habitId === habitId && l.date === date);
    
    if (existingLog) {
      const logRef = doc(db, 'users', user.uid, 'habitLogs', existingLog.id);
      deleteDocumentNonBlocking(logRef);
    } else {
      const logsCollection = collection(db, 'users', user.uid, 'habitLogs');
      addDocumentNonBlocking(logsCollection, {
        habitId,
        userId: user.uid,
        date,
        completed: true
      });
    }
  };

  return { habits, logs, loading, addHabit, updateHabit, deleteHabit, toggleLog };
}
