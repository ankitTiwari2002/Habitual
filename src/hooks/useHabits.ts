"use client";

import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc, Timestamp, getDocs, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';

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
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [logs, setLogs] = useState<HabitLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const habitsQuery = query(collection(db, 'habits'), where('userId', '==', user.uid));
    const unsubscribeHabits = onSnapshot(habitsQuery, (snapshot) => {
      const habitsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Habit));
      setHabits(habitsData);
      setLoading(false);
    });

    const logsQuery = query(collection(db, 'habitLogs'), where('userId', '==', user.uid));
    const unsubscribeLogs = onSnapshot(logsQuery, (snapshot) => {
      const logsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HabitLog));
      setLogs(logsData);
    });

    return () => {
      unsubscribeHabits();
      unsubscribeLogs();
    };
  }, [user]);

  const addHabit = async (habitData: Partial<Habit>) => {
    if (!user) return;
    return await addDoc(collection(db, 'habits'), {
      ...habitData,
      userId: user.uid,
      isActive: true,
      createdAt: Timestamp.now(),
    });
  };

  const updateHabit = async (habitId: string, habitData: Partial<Habit>) => {
    const habitRef = doc(db, 'habits', habitId);
    return await updateDoc(habitRef, habitData);
  };

  const deleteHabit = async (habitId: string) => {
    await deleteDoc(doc(db, 'habits', habitId));
    // Also cleanup logs for this habit
    const logsQuery = query(collection(db, 'habitLogs'), where('habitId', '==', habitId));
    const logsSnapshot = await getDocs(logsQuery);
    logsSnapshot.forEach(async (logDoc) => {
      await deleteDoc(doc(db, 'habitLogs', logDoc.id));
    });
  };

  const toggleLog = async (habitId: string, date: string) => {
    if (!user) return;
    
    const existingLog = logs.find(log => log.habitId === habitId && log.date === date);
    
    if (existingLog) {
      await deleteDoc(doc(db, 'habitLogs', existingLog.id));
    } else {
      await addDoc(collection(db, 'habitLogs'), {
        habitId,
        userId: user.uid,
        date,
        completed: true
      });
    }
  };

  return { habits, logs, loading, addHabit, updateHabit, deleteHabit, toggleLog };
}