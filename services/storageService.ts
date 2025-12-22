import { SessionLog, Version, ExerciseLog } from '../types';

const LOGS_KEY = 'golf_tracker_logs';
const VERSION_KEY = 'golf_tracker_version';

export const getLogs = (): SessionLog[] => {
  const stored = localStorage.getItem(LOGS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveLog = (log: SessionLog) => {
  const logs = getLogs();
  logs.unshift(log); // Add to top
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
};

export const getPreferredVersion = (): Version => {
  return (localStorage.getItem(VERSION_KEY) as Version) || 'V1';
};

export const setPreferredVersion = (v: Version) => {
  localStorage.setItem(VERSION_KEY, v);
};

export const getLastLogForExercise = (exerciseId: string): ExerciseLog | null => {
  const logs = getLogs();
  for (const session of logs) {
    const found = session.exercises.find(e => e.exerciseId === exerciseId);
    if (found) return found;
  }
  return null;
};