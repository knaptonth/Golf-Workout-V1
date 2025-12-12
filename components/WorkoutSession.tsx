import React, { useState, useEffect } from 'react';
import { WorkoutDay, ExerciseLog, Version } from '../types';
import { CheckCircle2, Circle, Clock, Info, Save, ChevronLeft } from 'lucide-react';
import { saveLog } from '../services/storageService';
import { analyzeSession } from '../services/geminiService';

interface WorkoutSessionProps {
  day: WorkoutDay;
  version: Version;
  date: Date;
  onFinish: () => void;
  onBack: () => void;
}

export const WorkoutSession: React.FC<WorkoutSessionProps> = ({ day, version, date, onFinish, onBack }) => {
  const [logs, setLogs] = useState<ExerciseLog[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Initialize logs based on day.exercises
  useEffect(() => {
    const initialLogs: ExerciseLog[] = day.exercises
      .filter(e => !e.isRest)
      .map(e => ({
        exerciseId: e.id,
        setLogs: Array(e.sets).fill({ weight: '', reps: '', completed: false })
      }));
    setLogs(initialLogs);
  }, [day]);

  const updateLog = (exerciseId: string, setIndex: number, field: keyof typeof logs[0]['setLogs'][0], value: any) => {
    setLogs(prev => prev.map(log => {
      if (log.exerciseId !== exerciseId) return log;
      const newSets = [...log.setLogs];
      newSets[setIndex] = { ...newSets[setIndex], [field]: value };
      return { ...log, setLogs: newSets };
    }));
  };

  const toggleComplete = (exerciseId: string, setIndex: number) => {
    setLogs(prev => prev.map(log => {
      if (log.exerciseId !== exerciseId) return log;
      const newSets = [...log.setLogs];
      newSets[setIndex] = { ...newSets[setIndex], completed: !newSets[setIndex].completed };
      return { ...log, setLogs: newSets };
    }));
  };

  const handleBack = () => {
    // Check if user has entered any data to prevent accidental loss
    const hasData = logs.some(l => l.setLogs.some(s => s.weight || s.reps || s.completed));
    if (hasData) {
      if (window.confirm("Exit workout? Current progress will be lost.")) {
        onBack();
      }
    } else {
      onBack();
    }
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    const sessionLog = {
      id: Date.now().toString(),
      date: date.toISOString(), // Use the selected date
      version,
      dayId: day.id,
      exercises: logs
    };
    
    saveLog(sessionLog);

    // Call Gemini
    const aiFeedback = await analyzeSession(sessionLog);
    
    setFeedback(aiFeedback);
    setShowFeedback(true);
    setIsSubmitting(false);
  };

  if (showFeedback) {
    return (
      <div className="flex flex-col h-full justify-center items-center p-6 text-center animate-fade-in">
        <div className="bg-emerald-500/10 p-4 rounded-full mb-6 ring-1 ring-emerald-500/50">
           <CheckCircle2 className="w-16 h-16 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Workout Complete!</h2>
        <p className="text-slate-400 mb-6">Great session. Here is your AI Coach feedback:</p>
        
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 w-full text-left mb-8 shadow-xl">
          <div className="flex items-center gap-2 mb-3 text-emerald-400 font-semibold">
             <Info size={18} />
             <span>Coach's Notes</span>
          </div>
          <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{feedback}</p>
        </div>

        <button 
          onClick={onFinish}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-emerald-900/20"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <button 
            onClick={handleBack}
            className="p-2 -ml-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft size={28} />
          </button>
          <h1 className="text-2xl font-bold text-white leading-none">{day.title}</h1>
        </div>
        
        <div className="flex items-center justify-between pl-1">
          <p className="text-emerald-500 font-medium">{day.focus}</p>
          <div className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-400 border border-slate-700">
            {day.exercises.filter(e => !e.isRest).length} Moves
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {day.exercises.map((exercise, idx) => {
          if (exercise.isRest) {
            return (
              <div key={`rest-${idx}`} className="flex items-center justify-center gap-2 py-3 bg-slate-800/50 rounded-lg border border-dashed border-slate-700 text-slate-400 text-sm">
                <Clock size={16} />
                <span>Rest: {exercise.notes}</span>
              </div>
            );
          }

          const log = logs.find(l => l.exerciseId === exercise.id);

          return (
            <div key={exercise.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700/50 shadow-sm">
              <div className="p-4 bg-slate-800 border-b border-slate-700/50 flex justify-between items-start">
                <div>
                   <div className="flex items-center gap-2 mb-1">
                      <span className="text-emerald-400 font-bold text-lg">{exercise.order}</span>
                      <h3 className="font-semibold text-slate-100">{exercise.name}</h3>
                   </div>
                   <div className="flex gap-3 text-xs text-slate-400">
                      <span className="bg-slate-900 px-2 py-0.5 rounded">Tempo: {exercise.tempo}</span>
                      <span className="bg-slate-900 px-2 py-0.5 rounded">Target: {exercise.reps}</span>
                   </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Guide</span>
                  <span className="text-sm font-medium text-slate-300">{exercise.weightGuide}</span>
                </div>
              </div>
              
              {/* Sets */}
              <div className="p-2 space-y-1">
                <div className="grid grid-cols-10 gap-2 px-2 text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">
                  <div className="col-span-1 text-center">Set</div>
                  <div className="col-span-3 text-center">Weight</div>
                  <div className="col-span-3 text-center">Reps</div>
                  <div className="col-span-3 text-center">Done</div>
                </div>
                {log?.setLogs.map((set, setIdx) => (
                  <div key={setIdx} className={`grid grid-cols-10 gap-2 items-center p-2 rounded-lg transition-colors ${set.completed ? 'bg-emerald-900/20' : 'bg-slate-900/50'}`}>
                    <div className="col-span-1 text-center text-slate-400 font-mono text-sm">{setIdx + 1}</div>
                    <div className="col-span-3">
                      <input 
                        type="text" 
                        placeholder="kg"
                        className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-center text-sm text-white focus:border-emerald-500 focus:outline-none"
                        value={set.weight}
                        onChange={(e) => updateLog(exercise.id, setIdx, 'weight', e.target.value)}
                      />
                    </div>
                    <div className="col-span-3">
                      <input 
                        type="text" 
                        placeholder={exercise.reps.split(' ')[0]} // Hint with target reps
                        className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-center text-sm text-white focus:border-emerald-500 focus:outline-none"
                        value={set.reps}
                        onChange={(e) => updateLog(exercise.id, setIdx, 'reps', e.target.value)}
                      />
                    </div>
                    <div className="col-span-3 flex justify-center">
                      <button 
                        onClick={() => toggleComplete(exercise.id, setIdx)}
                        className={`p-1.5 rounded-full transition-all ${set.completed ? 'text-emerald-400 bg-emerald-950 hover:bg-emerald-900' : 'text-slate-600 hover:text-slate-400'}`}
                      >
                        {set.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-slate-900/50 p-3 text-xs text-slate-400 border-t border-slate-700/50 flex gap-2">
                 <Info size={14} className="shrink-0 mt-0.5" />
                 <p>{exercise.notes}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 sticky bottom-4 z-10">
         <button 
           onClick={handleFinish}
           disabled={isSubmitting}
           className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
         >
           {isSubmitting ? (
             <>Processing AI Analysis...</>
           ) : (
             <>
               <Save size={20} />
               Finish & Analyze
             </>
           )}
         </button>
      </div>
    </div>
  );
};