import React, { useState, useEffect } from 'react';
import { WorkoutDay, ExerciseLog, Version, Exercise } from '../types';
import { WORKOUTS, SUBSTITUTION_MATRIX } from '../constants';
import { CheckCircle2, Circle, Clock, Info, Save, ChevronLeft, RefreshCw, X, Check, Dumbbell, Zap, Anchor, Home, Star } from 'lucide-react';
import { saveLog, getLastLogForExercise } from '../services/storageService';
import { analyzeSession } from '../services/geminiService';

interface WorkoutSessionProps {
  day: WorkoutDay;
  version: Version;
  date: Date;
  onFinish: () => void;
  onBack: () => void;
}

export const WorkoutSession: React.FC<WorkoutSessionProps> = ({ day, version, date, onFinish, onBack }) => {
  const [activeExercises, setActiveExercises] = useState<Exercise[]>(day.exercises);
  const [logs, setLogs] = useState<ExerciseLog[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  
  // Swap Modal State
  const [swapIndex, setSwapIndex] = useState<number | null>(null);

  useEffect(() => {
    // Initialize logs with data from the previous session if available
    const initialLogs: ExerciseLog[] = activeExercises
      .filter(e => !e.isRest)
      .map(e => {
        const lastLog = getLastLogForExercise(e.id);
        return {
          exerciseId: e.id,
          setLogs: Array(e.sets).fill(null).map((_, i) => ({
            // Pre-fill with last session's data, or empty string
            weight: lastLog?.setLogs[i]?.weight || '',
            reps: lastLog?.setLogs[i]?.reps || '',
            completed: false
          }))
        };
      });
    setLogs(initialLogs);
  }, [activeExercises]);

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

  const getBiasInfo = (exercise: Exercise) => {
    if (exercise.id.includes('_V1')) return { label: 'V1 Original', color: 'text-indigo-400 bg-indigo-900/30 border-indigo-500/30', icon: <Star size={12} /> };
    if (exercise.id.includes('_V2')) return { label: 'V2 Limited', color: 'text-yellow-400 bg-yellow-900/30 border-yellow-500/30', icon: <Home size={12} /> };
    
    const notes = exercise.notes;
    if (notes.includes('Load Bias')) return { label: 'Strength', color: 'text-purple-400 bg-purple-900/30 border-purple-500/30', icon: <Dumbbell size={12} /> };
    if (notes.includes('Stability Bias')) return { label: 'Stability', color: 'text-blue-400 bg-blue-900/30 border-blue-500/30', icon: <Anchor size={12} /> };
    if (notes.includes('Velocity Bias')) return { label: 'Speed', color: 'text-orange-400 bg-orange-900/30 border-orange-500/30', icon: <Zap size={12} /> };
    if (notes.includes('Limited Equip')) return { label: 'Limited', color: 'text-yellow-400 bg-yellow-900/30 border-yellow-500/30', icon: <Home size={12} /> };
    return { label: 'Alternative', color: 'text-slate-400 bg-slate-800 border-slate-700', icon: <RefreshCw size={12} /> };
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
        if (!alternates.some(e => e.id === alt.id)) {
          alternates.push(alt);
        }
      });
    }
    
    if (alternates.length <= 1) return null;
    return alternates;
  };

  const confirmSwap = (newExercise: Exercise) => {
    if (swapIndex === null) return;
    const exerciseIndex = swapIndex;
    const currentEx = activeExercises[exerciseIndex];
    if (currentEx.id === newExercise.id) {
        setSwapIndex(null);
        return;
    }
    const newExercises = [...activeExercises];
    newExercises[exerciseIndex] = newExercise;
    setActiveExercises(newExercises);
    setSwapIndex(null);
  };

  const handleBack = () => {
    const hasData = logs.some(l => l.setLogs.some(s => s.completed));
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
        <p className="text-slate-400 mb-6">Great session. Here is your AI Coach feedback:</p>
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
    <div className="space-y-6 relative">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <button onClick={handleBack} className="p-2 -ml-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <ChevronLeft size={28} />
          </button>
          <h1 className="text-2xl font-bold text-white leading-none">{day.title}</h1>
        </div>
        <div className="flex items-center justify-between pl-1">
          <p className="text-yellow-400 font-medium">{day.focus}</p>
          <div className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-400 border border-slate-700">
            {activeExercises.filter(e => !e.isRest).length} Moves
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {activeExercises.map((exercise, idx) => {
          if (exercise.isRest) {
            return (
              <div key={`rest-${idx}`} className="flex items-center justify-center gap-2 py-3 bg-slate-800/50 rounded-lg border border-dashed border-slate-700 text-slate-400 text-sm">
                <Clock size={16} />
                <span>Rest: {exercise.notes}</span>
              </div>
            );
          }

          const log = logs.find(l => l.exerciseId === exercise.id);
          const alternates = getAlternates(exercise);
          const biasInfo = getBiasInfo(exercise);

          return (
            <div key={exercise.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700/50 shadow-sm animate-fade-in">
              <div className="p-4 bg-slate-800 border-b border-slate-700/50 flex justify-between items-start">
                <div className="flex-1 mr-2">
                   <div className="flex items-center gap-2 mb-1">
                      <button 
                        onClick={() => alternates && setSwapIndex(idx)}
                        disabled={!alternates}
                        className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg border transition-all ${
                          alternates 
                            ? 'bg-blue-950/40 border-blue-500/50 text-blue-400 hover:bg-blue-900/60 hover:border-blue-400 cursor-pointer' 
                            : 'border-transparent text-blue-400 font-bold text-lg p-0'
                        }`}
                      >
                         <span className={alternates ? "font-bold" : "font-bold text-lg"}>{exercise.order}</span>
                         {alternates && <RefreshCw size={12} />}
                      </button>

                      <h3 className="font-semibold text-slate-100 text-lg leading-tight">{exercise.name}</h3>
                   </div>
                   
                   {alternates && (
                     <button 
                        onClick={() => setSwapIndex(idx)}
                        className="text-xs flex items-center gap-1.5 text-slate-400 hover:text-blue-300 transition-colors mb-2 ml-1"
                     >
                       <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border ${biasInfo.color} text-[10px]`}>
                          {biasInfo.icon}
                          {biasInfo.label}
                       </span>
                       <span className="underline decoration-slate-600 underline-offset-2 hover:decoration-blue-400">Change Variation</span>
                     </button>
                   )}

                   <div className="flex gap-3 text-xs text-slate-400 mt-1">
                      <span className="bg-slate-900 px-2 py-0.5 rounded">Tempo: {exercise.tempo}</span>
                      <span className="bg-slate-900 px-2 py-0.5 rounded">Target: {exercise.reps}</span>
                   </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs text-slate-500 block">Guide</span>
                  <span className="text-sm font-medium text-slate-300">{exercise.weightGuide}</span>
                </div>
              </div>
              
              <div className="p-2 space-y-1">
                <div className="grid grid-cols-10 gap-2 px-2 text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">
                  <div className="col-span-1 text-center">Set</div>
                  <div className="col-span-3 text-center">Weight</div>
                  <div className="col-span-3 text-center">Reps</div>
                  <div className="col-span-3 text-center">Done</div>
                </div>
                {log?.setLogs.map((set, setIdx) => (
                  <div key={setIdx} className={`grid grid-cols-10 gap-2 items-center p-2 rounded-lg transition-colors ${set.completed ? 'bg-blue-900/20' : 'bg-slate-900/50'}`}>
                    <div className="col-span-1 text-center text-slate-400 font-mono text-sm">{setIdx + 1}</div>
                    <div className="col-span-3">
                      <input 
                        type="text"
                        inputMode="decimal"
                        placeholder="kg"
                        className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-center text-sm text-white focus:border-blue-500 focus:outline-none"
                        value={set.weight}
                        onChange={(e) => updateLog(exercise.id, setIdx, 'weight', e.target.value)}
                      />
                    </div>
                    <div className="col-span-3">
                      <input 
                        type="text"
                        inputMode="numeric"
                        placeholder={exercise.reps.split(' ')[0]} 
                        className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-center text-sm text-white focus:border-blue-500 focus:outline-none"
                        value={set.reps}
                        onChange={(e) => updateLog(exercise.id, setIdx, 'reps', e.target.value)}
                      />
                    </div>
                    <div className="col-span-3 flex justify-center">
                      <button 
                        onClick={() => toggleComplete(exercise.id, setIdx)}
                        className={`p-1.5 rounded-full transition-all ${set.completed ? 'text-blue-400 bg-blue-950 hover:bg-blue-900' : 'text-slate-600 hover:text-slate-400'}`}
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
           className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
         >
           {isSubmitting ? <span className="animate-pulse">Analyzing Session...</span> : <><Save size={20} /> Finish & Analyze</>}
         </button>
      </div>

      {swapIndex !== null && activeExercises[swapIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 w-full max-w-sm rounded-2xl border border-slate-700 shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
             <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800">
               <div>
                  <h3 className="text-white font-bold text-lg">Substitutions</h3>
                  <p className="text-slate-400 text-xs flex items-center gap-1">
                    Slot <span className="text-blue-400 font-bold">{activeExercises[swapIndex].order}</span>
                    <span className="text-slate-600">•</span>
                    Select variation
                  </p>
               </div>
               <button onClick={() => setSwapIndex(null)} className="p-2 text-slate-400 hover:text-white"><X size={20} /></button>
             </div>
             
             <div className="overflow-y-auto p-3 space-y-3 bg-slate-950/50 flex-1">
                {getAlternates(activeExercises[swapIndex])?.map((alt) => {
                  const isCurrent = alt.id === activeExercises[swapIndex].id;
                  const biasInfo = getBiasInfo(alt);
                  
                  return (
                    <button 
                      key={alt.id}
                      onClick={() => confirmSwap(alt)}
                      className={`w-full text-left p-3 rounded-xl border flex gap-3 transition-all relative overflow-hidden ${
                        isCurrent 
                        ? 'bg-slate-800 border-blue-500 ring-1 ring-blue-500/50' 
                        : 'bg-slate-800 border-slate-700 hover:border-slate-500 hover:bg-slate-700'
                      }`}
                    >
                       {isCurrent && (
                         <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-bl-lg font-bold">
                           ACTIVE
                         </div>
                       )}

                       <div className={`mt-0.5 w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${
                          isCurrent ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-slate-700 border-slate-600 text-slate-500'
                       }`}>
                          {isCurrent ? <Check size={16} strokeWidth={3} /> : <div className="w-2 h-2 rounded-full bg-slate-600" />}
                       </div>
                       
                       <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${biasInfo.color}`}>
                              {biasInfo.icon}
                              {biasInfo.label}
                            </span>
                          </div>
                          <div className={`font-bold text-sm truncate ${isCurrent ? 'text-white' : 'text-slate-200'}`}>{alt.name}</div>
                          <div className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{alt.notes}</div>
                          
                          <div className="flex gap-2 mt-2 pt-2 border-t border-slate-700/50">
                             <span className="text-[10px] text-slate-500 flex items-center gap-1">
                               <Dumbbell size={10} /> {alt.weightGuide}
                             </span>
                             <span className="text-[10px] text-slate-500 flex items-center gap-1">
                               <Clock size={10} /> {alt.tempo}
                             </span>
                          </div>
                       </div>
                    </button>
                  );
                })}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};