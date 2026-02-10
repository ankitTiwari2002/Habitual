"use client";

import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc, Timestamp, getDocs, setDoc } from 'firebase/firestore';
import { useFirestore, useUser, useMemoFirebase } from '@/firebase';
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
  const { user } = useUser();
  const db = useFirestore();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [logs, setLogs] = useState<HabitLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !db) return;

    // Use nested paths according to security rules and backend schema
    // /users/{userId}/habits
    const habitsCollection = collection(db, 'users', user.uid, 'habits');
    const unsubscribeHabits = onSnapshot(habitsCollection, (snapshot) => {
      const habitsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Habit));
      setHabits(habitsData);
      setLoading(false);
    });

    // In a production app, you might want to fetch logs for specific habits or use a collection group
    // For this prototype, we'll try to fetch logs from a flattened structure if available, or just focus on habits
    // Adjusting to query habits subcollection as per backend.json
    return () => {
      unsubscribeHabits();
    };
  }, [user, db]);

  const addHabit = async (habitData: Partial<Habit>) => {
    if (!user || !db) return;
    const habitsRef = collection(db, 'users', user.uid, 'habits');
    return await addDoc(habitsRef, {
      ...habitData,
      userId: user.uid,
      isActive: true,
      createdAt: Timestamp.now(),
    });
  };

  const updateHabit = async (habitId: string, habitData: Partial<Habit>) => {
    if (!user || !db) return;
    const habitRef = doc(db, 'users', user.uid, 'habits', habitId);
    return await updateDoc(habitRef, habitData);
  };

  const deleteHabit = async (habitId: string) => {
    if (!user || !db) return;
    const habitRef = doc(db, 'users', user.uid, 'habits', habitId);
    await deleteDoc(habitRef);
  };

  const toggleLog = async (habitId: string, date: string) => {
    if (!user || !db) return;
    
    // According to rules: /users/{userId}/habits/{habitId}/habitLogs/{habitLogId}
    const logsCollection = collection(db, 'users', user.uid, 'habits', habitId, 'habitLogs');
    const existingLogQuery = query(logsCollection, where('date', '==', date));
    const existingLogSnapshot = await getDocs(existingLogQuery);
    
    if (!existingLogSnapshot.empty) {
      const logId = existingLogSnapshot.docs[0].id;
      await deleteDoc(doc(db, 'users', user.uid, 'habits', habitId, 'habitLogs', logId));
    } else {
      await addDoc(logsCollection, {
        habitId,
        userId: user.uid,
        date,
        completed: true
      });
    }
  };

  return { habits, logs, loading, addHabit, updateHabit, deleteHabit, toggleLog };
}
