
export type Version = 'V1' | 'V2';

export interface Exercise {
  id: string;
  order: string; // e.g., '1A', '1B'
  name: string;
  sets: number;
  reps: string; // string to handle "6 / side"
  tempo: string;
  notes: string;
  weightGuide: string;
  videoUrl?: string;
  isRest?: boolean;
}

export interface WorkoutDay {
  id: string;
  title: string;
  focus: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  V1: Record<string, WorkoutDay>;
  V2: Record<string, WorkoutDay>;
}

export interface ExerciseLog {
  exerciseId: string;
  setLogs: {
    weight: string;
    reps: string;
    effort: number; // 1-4 level theory
    completed: boolean;
  }[];
}

export interface SessionLog {
  id: string;
  date: string;
  version: Version;
  dayId: string; // e.g., 'monday'
  exercises: ExerciseLog[];
  feedback?: string;
  duration?: number; // minutes
}

export interface WeeklySchedule {
  [key: number]: string; // 0=Sunday, 1=Monday, etc. -> key to WorkoutDay
}

export interface SubstitutionMatrix {
  [dayId: string]: {
    [order: string]: Exercise[];
  };
}