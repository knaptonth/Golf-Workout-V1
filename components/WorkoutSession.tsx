import React, { useState, useEffect } from 'react';
import { WorkoutDay, ExerciseLog, Version, Exercise } from '../types';
import { WORKOUTS, SUBSTITUTION_MATRIX } from '../constants';
import { CheckCircle2, Circle, Clock, Info, Save, ChevronLeft, RefreshCw, X, Check, Dumbbell, Zap, Anchor, Home, Star, Plus, Minus, Gauge, ChevronDown } from 'lucide-react';
import { saveLog, getLastLogForExercise } from '../services/storageService';
import { analyzeSession } from '../services/geminiService';

interface WorkoutSessionProps {
  day: WorkoutDay;
  version: Version;
  date: Date;
  onFinish: () => void;
  onBack: () => void;
}

const EFFORT_LEVELS = [
  { level: 1, label: 'L1: Easy', desc: 'Warm-up / Technical focus', color: 'bg-green-500', bg: 'bg-green-500/10', border: 'border-green-500/50', text: 'text-green-500' },
  { level: 2, label: 'L2: Moderate', desc: 'RPE 6-7, sustainable pace', color: 'bg-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/50', text: 'text-yellow-500' },
  { level: 3, label: 'L3: Hard', desc: 'RPE 8-9, high intensity', color: 'bg-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/50', text: 'text-orange-500' },
  { level: 4, label: 'L4: Max', desc: 'RPE 10, failure or near failure', color: 'bg-red-500', bg: 'bg-red-500/10', border: 'border-red-500/50', text: 'text-red-500' },
];

export const WorkoutSession: React.FC<WorkoutSessionProps> = ({ day, version, date, onFinish, onBack }) => {
  const [activeExercises, setActiveExercises] = useState<Exercise[]>(day.exercises);
  const [logs, setLogs] = useState<ExerciseLog[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  
  const [swapIndex, setSwapIndex] = useState<number | null>(null);
  const [effortPicker, setEffortPicker] = useState<{ exerciseId: string, setIndex: number } | null>(null);

  useEffect(() => {
    const initialLogs: ExerciseLog[] = activeExercises
      .filter(e => !e.isRest)
      .map(e => {
        const lastLog = getLastLogForExercise(e.id);
        const setLogsCount = e.sets || 1;
        
        return {
          exerciseId: e.id,
          setLogs: Array(setLogsCount).fill(null).map((_, i) => ({
            weight: lastLog?.setLogs[i]?.weight || lastLog?.setLogs[0]?.weight || '',
            reps: lastLog?.setLogs[i]?.reps || lastLog?.setLogs[0]?.reps || '',
            effort: lastLog?.setLogs[i]?.effort || 2,
            completed: false
          }))
        };
      });
    setLogs(initialLogs);
  }, [activeExercises]);

  const updateLog = (exerciseId: string, setIndex: number, field: keyof ExerciseLog['setLogs'][0], value: any) => {
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

  const addSet = (exerciseId: string) => {
    setLogs(prev => prev.map(log => {
      if (log.exerciseId !== exerciseId) return log;
      const lastSet = log.setLogs[log.setLogs.length - 1];
      const newSet = {
        weight: lastSet?.weight || '',
        reps: lastSet?.reps || '',
        effort: lastSet?.effort || 2,
        completed: false
      };
      return { ...log, setLogs: [...log.setLogs, newSet] };
    }));
  };

  const removeSet = (exerciseId: string) => {
    setLogs(prev => prev.map(log => {
      if (log.exerciseId !== exerciseId) return log;
      if (log.setLogs.length <= 1) return log;
      return { ...log, setLogs: log.setLogs.slice(0, -1) };
    }));
  };

  const getAlternates = (currentEx: Exercise): Exercise[] | null => {
    if (currentEx.isRest) return null;
    const alternates: Exercise[] = [];
    const v1Day = WORKOUTS['V1'][day.id];
    const v1Ex = v1Day?.exercises.find(e => e.order === currentEx.order);
    if (v1Ex) alternates.push(v1Ex);
    const v2Day = WORKOUTS['V2'][day.id];
    const v2Ex = v2Day?.exercises.find(e => e.order === currentEx.order);
    if (v2Ex && v2Ex.id !== v1Ex?.id) alternates.push(v2Ex);
    const dayMatrix = SUBSTITUTION_MATRIX[day.id];
    if (dayMatrix && dayMatrix[currentEx.order]) {
      dayMatrix[currentEx.order].forEach(alt => {
        if (!alternates.some(e => e.id === alt.id)) alternates.push(alt);
      });
    }
    return alternates.length <= 1 ? null : alternates;
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    const sessionLog = {
      id: Date.now().toString(),
      date: date.toISOString(),
      version,
      dayId: day.id,
      exercises: logs
    };
    saveLog(sessionLog);
    const aiFeedback = await analyzeSession(sessionLog);
    setFeedback(aiFeedback);
    setShowFeedback(true);
    setIsSubmitting(false);
  };

  if (showFeedback) {
    return (
      <div className="flex flex-col h-full justify-center items-center p-6 text-center animate-fade-in">
        <div className="bg-blue-500/10 p-4 rounded-full mb-6 ring-1 ring-blue-500/50">
           <CheckCircle2 className="w-16 h-16 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Workout Complete!</h2>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 w-full text-left mb-8 shadow-xl">
          <div className="flex items-center gap-2 mb-3 text-yellow-400 font-semibold">
             <Info size={18} />
             <span>Coach's Notes</span>
          </div>
          <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{feedback}</p>
        </div>
        <button onClick={onFinish} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition shadow-lg">
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative pb-10">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <button onClick={() => onBack()} className="p-2 -ml-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <ChevronLeft size={28} />
          </button>
          <h1 className="text-2xl font-bold text-white leading-none">{day.title}</h1>
        </div>
        <p className="text-yellow-400 font-medium pl-1 text-sm">{day.focus}</p>
      </div>

      <div className="space-y-4">
        {activeExercises.map((exercise, idx) => {
          if (exercise.isRest) {
            return (
              <div key={`rest-${idx}`} className="flex items-center justify-center gap-2 py-3 bg-slate-800/50 rounded-lg border border-dashed border-slate-700 text-slate-400 text-xs">
                <Clock size={14} />
                <span>Rest: {exercise.notes}</span>
              </div>
            );
          }

          const log = logs.find(l => l.exerciseId === exercise.id);
          const alternates = getAlternates(exercise);

          return (
            <div key={exercise.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-sm animate-fade-in">
              <div className="p-3 bg-slate-800 border-b border-slate-700/50 flex justify-between items-start">
                <div className="flex-1 mr-2">
                   <div className="flex items-center gap-2 mb-1">
                      <button 
                        onClick={() => alternates && setSwapIndex(idx)}
                        className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg border transition-all ${
                          alternates 
                            ? 'bg-blue-950/40 border-blue-500/50 text-blue-400' 
                            : 'border-transparent text-blue-400 font-bold text-lg p-0'
                        }`}
                      >
                         <span className="font-bold text-sm">{exercise.order}</span>
                         {alternates && <RefreshCw size={10} />}
                      </button>
                      <h3 className="font-bold text-slate-100 text-base leading-tight">{exercise.name}</h3>
                   </div>
                   <div className="flex gap-2 text-[10px] text-slate-500">
                      <span>Tempo: {exercise.tempo}</span>
                      <span>•</span>
                      <span>Target: {exercise.reps}</span>
                   </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold">Goal</span>
                  <span className="text-xs font-semibold text-slate-300">{exercise.weightGuide}</span>
                </div>
              </div>
              
              <div className="p-2 space-y-1">
                <div className="grid grid-cols-12 gap-1 px-1 text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">
                  <div className="col-span-1 text-center">Set</div>
                  <div className="col-span-3 text-center">Weight</div>
                  <div className="col-span-3 text-center">Reps</div>
                  <div className="col-span-3 text-center">Effort</div>
                  <div className="col-span-2 text-center">Done</div>
                </div>
                {log?.setLogs.map((set, setIdx) => (
                  <div key={setIdx} className={`grid grid-cols-12 gap-1 items-center p-1.5 rounded-lg transition-colors ${set.completed ? 'bg-blue-900/30' : 'bg-slate-900/40'}`}>
                    <div className="col-span-1 text-center text-slate-500 font-mono text-[11px]">{setIdx + 1}</div>
                    <div className="col-span-3">
                      <input 
                        type="text"
                        inputMode="decimal"
                        className="w-full bg-slate-950 border border-slate-700 rounded-md p-1.5 text-center text-xs text-white focus:border-blue-500 focus:outline-none transition-all"
                        value={set.weight}
                        placeholder="--"
                        onChange={(e) => updateLog(exercise.id, setIdx, 'weight', e.target.value)}
                      />
                    </div>
                    <div className="col-span-3">
                      <input 
                        type="text"
                        inputMode="numeric"
                        className="w-full bg-slate-950 border border-slate-700 rounded-md p-1.5 text-center text-xs text-white focus:border-blue-500 focus:outline-none transition-all"
                        value={set.reps}
                        placeholder="--"
                        onChange={(e) => updateLog(exercise.id, setIdx, 'reps', e.target.value)}
                      />
                    </div>
                    <div className="col-span-3 flex justify-center px-0.5">
                      <button 
                        onClick={() => setEffortPicker({ exerciseId: exercise.id, setIndex: setIdx })}
                        className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md border text-[10px] font-bold transition-all active:scale-95 ${
                          EFFORT_LEVELS[set.effort - 1].bg
                        } ${EFFORT_LEVELS[set.effort - 1].border} ${EFFORT_LEVELS[set.effort - 1].text}`}
                      >
                        <span>L{set.effort}</span>
                        <ChevronDown size={10} className="opacity-60" />
                      </button>
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <button 
                        onClick={() => toggleComplete(exercise.id, setIdx)}
                        className={`p-1 transition-all ${set.completed ? 'text-blue-400 scale-110' : 'text-slate-600 hover:text-slate-500'}`}
                      >
                        {set.completed ? <CheckCircle2 size={22} strokeWidth={2.5} /> : <Circle size={22} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-3 pb-3 flex justify-between items-center border-t border-slate-700/30 pt-2 bg-slate-800/50">
                <div className="flex gap-2">
                  <button onClick={() => removeSet(exercise.id)} className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-900/50 text-slate-500 hover:text-red-400 border border-slate-700 transition-colors text-[10px] font-bold">
                    <Minus size={12} /> REMOVE
                  </button>
                  <button onClick={() => addSet(exercise.id)} className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-900/50 text-slate-500 hover:text-blue-400 border border-slate-700 transition-colors text-[10px] font-bold">
                    <Plus size={12} /> ADD SET
                  </button>
                </div>
                <div className="text-[10px] text-slate-500 italic">
                   Notes in info below
                </div>
              </div>
              
              <div className="bg-slate-900/30 p-2 text-[10px] text-slate-400 flex gap-2 border-t border-slate-700/20">
                 <Info size={12} className="shrink-0 mt-0.5 text-blue-500/50" />
                 <p className="leading-relaxed">{exercise.notes}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-6 sticky bottom-4 z-10">
         <button 
           onClick={handleFinish}
           disabled={isSubmitting}
           className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
         >
           {isSubmitting ? <span className="animate-pulse">Analyzing...</span> : <><Save size={18} /> Finish & Sync Session</>}
         </button>
      </div>

      {/* --- EFFORT PICKER SHEET --- */}
      {effortPicker && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/60 backdrop-blur-sm animate-fade-in" onClick={() => setEffortPicker(null)}>
          <div className="bg-slate-900 w-full max-w-md rounded-t-3xl border-t border-slate-700 shadow-2xl p-6 space-y-4 animate-slide-up" onClick={e => e.stopPropagation()}>
             <div className="flex justify-between items-center mb-2">
               <div>
                 <h3 className="text-white font-bold text-lg flex items-center gap-2">
                   <Gauge className="text-blue-500" size={20} />
                   Rate Effort
                 </h3>
                 <p className="text-slate-400 text-xs mt-1">Select perceived intensity for Set {effortPicker.setIndex + 1}</p>
               </div>
               <button onClick={() => setEffortPicker(null)} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
                 <X size={20} />
               </button>
             </div>
             
             <div className="grid grid-cols-1 gap-3">
               {EFFORT_LEVELS.map((level) => {
                 const currentLog = logs.find(l => l.exerciseId === effortPicker.exerciseId);
                 const currentSet = currentLog?.setLogs[effortPicker.setIndex];
                 const isSelected = currentSet?.effort === level.level;
                 
                 return (
                   <button
                     key={level.level}
                     onClick={() => {
                        updateLog(effortPicker.exerciseId, effortPicker.setIndex, 'effort', level.level);
                        setEffortPicker(null);
                     }}
                     className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-4 group ${
                       isSelected 
                       ? `${level.bg} ${level.border} ring-2 ring-white/5` 
                       : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                     }`}
                   >
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm ${level.color} text-slate-900`}>
                       {level.level}
                     </div>
                     <div className="flex-1">
                        <div className={`font-bold ${isSelected ? 'text-white' : 'text-slate-200'} group-hover:text-white`}>
                          {level.label}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 leading-tight">
                          {level.desc}
                        </div>
                     </div>
                     {isSelected && (
                       <div className="bg-white rounded-full p-1 shadow-sm">
                         <Check size={14} className="text-slate-900" strokeWidth={3} />
                       </div>
                     )}
                   </button>
                 )
               })}
             </div>
             
             <button 
               onClick={() => setEffortPicker(null)}
               className="w-full bg-slate-800 py-3 rounded-xl text-slate-300 font-bold text-sm hover:bg-slate-700 transition-colors mt-2"
             >
               Close
             </button>
          </div>
        </div>
      )}

      {/* --- SWAP EXERCISE MODAL --- */}
      {swapIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in" onClick={() => setSwapIndex(null)}>
          <div className="bg-slate-900 w-full max-w-sm rounded-2xl border border-slate-700 shadow-2xl overflow-hidden max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
             <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800">
               <div className="flex items-center gap-2">
                 <RefreshCw size={16} className="text-blue-500" />
                 <h3 className="text-white font-bold">Swap Variation</h3>
               </div>
               <button onClick={() => setSwapIndex(null)} className="p-2 text-slate-400 hover:text-white"><X size={20} /></button>
             </div>
             <div className="overflow-y-auto p-3 space-y-3 bg-slate-950/50 flex-1">
                {getAlternates(activeExercises[swapIndex])?.map((alt) => {
                  const isCurrent = alt.id === activeExercises[swapIndex!].id;
                  return (
                    <button 
                      key={alt.id}
                      onClick={() => {
                        const newEx = [...activeExercises];
                        newEx[swapIndex!] = alt;
                        setActiveExercises(newEx);
                        setSwapIndex(null);
                      }}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        isCurrent 
                        ? 'bg-blue-900/30 border-blue-500 ring-2 ring-blue-500/10' 
                        : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-blue-400 bg-blue-900/50 px-2 py-0.5 rounded uppercase tracking-wider">
                           {alt.weightGuide}
                        </span>
                        {isCurrent && <Check size={14} className="text-blue-500" strokeWidth={3} />}
                      </div>
                      <div className="font-bold text-sm text-white">{alt.name}</div>
                      <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{alt.notes}</div>
                    </button>
                  );
                })}
             </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};