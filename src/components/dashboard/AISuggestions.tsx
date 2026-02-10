"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, Plus, Zap } from 'lucide-react';
import { getPersonalizedHabitSuggestions } from '@/ai/flows/personalized-habit-suggestions';
import { Habit } from '@/hooks/useHabits';
import { useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

interface AISuggestionsProps {
  habits: Habit[];
}

export function AISuggestions({ habits }: AISuggestionsProps) {
  const { user } = useUser();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      // Mocking some profile/goal data for the demo as it's not in the DB yet
      const result = await getPersonalizedHabitSuggestions({
        userProfile: { age: 25, interests: ['health', 'productivity', 'mental wellbeing'] },
        existingHabits: habits.map(h => h.title),
        goals: ['improve morning routine', 'get more active', 'read more books']
      });
      setSuggestions(result.suggestions);
    } catch (error) {
      console.error(error);
      toast({
        title: "AI Failed",
        description: "Could not generate suggestions at this time.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-sm bg-gradient-to-br from-primary/10 to-transparent">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="h-5 w-5" />
          <CardTitle className="text-lg font-headline">AI Coach</CardTitle>
        </div>
        <CardDescription>Personalized suggestions based on your profile.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-4 text-center space-y-4">
            <Zap className="h-12 w-12 text-primary/20" />
            <p className="text-sm text-muted-foreground">Get AI-powered recommendations to enhance your routine.</p>
            <Button onClick={fetchSuggestions} disabled={loading} variant="secondary" className="w-full">
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
              Generate Suggestions
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {suggestions.map((s, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-card border group animate-in slide-in-from-right duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
                <span className="text-sm font-medium">{s}</span>
                <Button size="icon" variant="ghost" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            ))}
            <Button onClick={fetchSuggestions} disabled={loading} variant="ghost" size="sm" className="w-full text-xs mt-2">
              Refresh Suggestions
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}