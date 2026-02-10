"use client";

import { Habit } from '@/hooks/useHabits';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, Check, MoreVertical, Trash2, Edit2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface HabitCardProps {
  habit: Habit;
  stat?: any;
  isCompleted: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (data: Partial<Habit>) => void;
}

export function HabitCard({ habit, stat, isCompleted, onToggle, onDelete, onEdit }: HabitCardProps) {
  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-300 hover:shadow-md",
      isCompleted ? "bg-primary/5 border-primary/20" : "bg-card"
    )}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className={cn(
              "font-bold text-lg font-headline transition-all",
              isCompleted && "line-through text-muted-foreground"
            )}>{habit.title}</h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{habit.description || 'No description'}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit({ isActive: !habit.isActive })}>
                <Edit2 className="mr-2 h-4 w-4" /> {habit.isActive ? 'Deactivate' : 'Activate'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-orange-500 font-bold">
              <Flame className={cn("h-5 w-5", stat?.currentStreak > 0 ? "fill-orange-500" : "")} />
              <span className="text-sm">{stat?.currentStreak || 0}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {stat?.completionRate || 0}% Completion
            </div>
          </div>
          
          <Button 
            onClick={onToggle}
            size="icon"
            className={cn(
              "h-12 w-12 rounded-full transition-all duration-500",
              isCompleted 
                ? "bg-primary hover:bg-primary shadow-lg shadow-primary/20" 
                : "bg-secondary text-secondary-foreground hover:bg-primary/20"
            )}
          >
            <Check className={cn("h-6 w-6 transition-transform duration-500", isCompleted ? "scale-110" : "scale-100")} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}