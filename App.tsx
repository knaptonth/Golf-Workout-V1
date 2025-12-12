import React, { useState, useMemo } from 'react';
import { Layout } from './components/Layout';
import { WorkoutSession } from './components/WorkoutSession';
import { History } from './components/History';
import { WORKOUTS, SCHEDULE } from './constants';
import { getPreferredVersion, setPreferredVersion } from './services/storageService';
import { Version, WorkoutDay } from './types';
import { Dumbbell, Play, Calendar, ChevronLeft, ChevronRight, List } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('workout');
  const [version, setVersion] = useState<Version>(getPreferredVersion());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [manualWorkout, setManualWorkout] = useState<WorkoutDay | null>(null);
  const [showLibrary, setShowLibrary] = useState(false);

  // Determine workout based on selectedDate
  const todayWorkout = useMemo(() => {
    if (manualWorkout) return manualWorkout;
    
    const dayIndex = selectedDate.getDay(); // 0-6
    const dayKey = SCHEDULE[dayIndex];
    if (dayKey && WORKOUTS[version][dayKey]) {
      return WORKOUTS[version][dayKey];
    }
    return null; // Rest day or undefined
  }, [version, selectedDate, manualWorkout]);

  const handleVersionChange = (newVersion: Version) => {
    setVersion(newVersion);
    setPreferredVersion(newVersion);
    // Reset manual workout on version change to avoid data mismatch
    setManualWorkout(null); 
  };

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
    setManualWorkout(null); // Reset manual override when date changes
  };

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const [year, month, day] = e.target.value.split('-').map(Number);
    // Create date in local time
    setSelectedDate(new Date(year, month - 1, day));
    setManualWorkout(null);
  };

  const selectFromLibrary = (key: string) => {
    setManualWorkout(WORKOUTS[version][key]);
    setShowLibrary(false);
  };

  const renderContent = () => {
    if (activeTab === 'history') {
      return <History />;
    }

    if (activeTab === 'settings') {
      return (
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-medium text-white mb-4">Equipment Profile</h3>
            <div className="space-y-3">
              <button 
                onClick={() => handleVersionChange('V1')}
                className={`w-full text-left p-4 rounded-xl border transition-all ${version === 'V1' ? 'bg-blue-900/20 border-blue-500 text-blue-400' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
              >
                <div className="font-bold">Version 1: Full Gym</div>
                <div className="text-xs mt-1 opacity-80">Commercial gym access (Smith machine, cables, heavy DBs)</div>
              </button>
              <button 
                onClick={() => handleVersionChange('V2')}
                className={`w-full text-left p-4 rounded-xl border transition-all ${version === 'V2' ? 'bg-blue-900/20 border-blue-500 text-blue-400' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
              >
                <div className="font-bold">Version 2: Tour Spec (Limited)</div>
                <div className="text-xs mt-1 opacity-80">Functional Trainer, Multi-Station, Dumbbells</div>
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (isSessionActive && todayWorkout) {
      return (
        <WorkoutSession 
          day={todayWorkout} 
          version={version} 
          date={selectedDate} 
          onFinish={() => {
            setIsSessionActive(false);
            setManualWorkout(null);
          }}
          onBack={() => {
            setIsSessionActive(false);
          }}
        />
      );
    }

    // Format date string YYYY-MM-DD for input value
    const dateInputValue = selectedDate.toLocaleDateString('en-CA'); 

    if (showLibrary) {
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center gap-2">
            <button onClick={() => setShowLibrary(false)} className="p-2 -ml-2 text-slate-400 hover:text-white">
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-2xl font-bold text-white">Workout Library</h2>
          </div>
          <p className="text-slate-400 text-sm">Select a workout to perform today ({version}).</p>
          <div className="space-y-3">
            {Object.keys(WORKOUTS[version]).map(key => {
              const w = WORKOUTS[version][key];
              return (
                <button 
                  key={w.id}
                  onClick={() => selectFromLibrary(key)}
                  className="w-full text-left p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-500 hover:bg-slate-800/80 transition-all group"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-slate-100 group-hover:text-blue-400 transition-colors">{w.title}</div>
                      <div className="text-xs text-slate-400 mt-1">{w.focus}</div>
                    </div>
                    <div className="text-xs font-mono bg-slate-900 px-2 py-1 rounded text-slate-500">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-8 py-4 animate-fade-in">
        <div className="text-center space-y-4">
          
          {/* Date Picker */}
          <div className="flex items-center justify-center gap-4 bg-slate-800 p-2 rounded-2xl border border-slate-700 inline-flex mx-auto shadow-lg">
             <button onClick={() => changeDate(-1)} className="p-2 text-slate-400 hover:text-white transition-colors">
               <ChevronLeft size={20} />
             </button>
             
             <div className="relative group">
                <div className="flex items-center gap-2 px-2 py-1 cursor-pointer">
                  <Calendar size={16} className="text-yellow-400" />
                  <span className="font-semibold text-white min-w-[100px] text-center">
                    {selectedDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <input 
                  type="date" 
                  value={dateInputValue}
                  onChange={handleDateInput}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
             </div>

             <button onClick={() => changeDate(1)} className="p-2 text-slate-400 hover:text-white transition-colors">
               <ChevronRight size={20} />
             </button>
          </div>

          <div className="space-y-2 mt-4">
            <h2 className="text-slate-400 text-sm uppercase tracking-widest">
              {manualWorkout ? 'Manual Selection' : 'Scheduled Protocol'}
            </h2>
            {todayWorkout ? (
              <>
                <h1 className="text-3xl font-bold text-white">{todayWorkout.title}</h1>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium border border-blue-900/50">
                  {todayWorkout.focus}
                </div>
              </>
            ) : (
              <h1 className="text-3xl font-bold text-white">Rest & Recovery</h1>
            )}
          </div>
        </div>

        {todayWorkout ? (
          <div className="bg-gradient-to-br from-blue-900/40 to-slate-900 p-8 rounded-3xl border border-blue-900/30 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
            
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="bg-blue-600 p-4 rounded-full shadow-lg shadow-blue-500/20">
                <Dumbbell className="w-8 h-8 text-white" />
              </div>
              
              <div className="text-center space-y-1">
                 <p className="text-slate-300">Duration: <span className="text-white font-bold">45 Mins</span></p>
                 <p className="text-slate-300">Structure: <span className="text-white font-bold">Contrast Supersets</span></p>
              </div>

              <div className="flex flex-col w-full gap-3">
                <button 
                  onClick={() => setIsSessionActive(true)}
                  className="w-full bg-white hover:bg-slate-100 text-blue-900 font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-blue-900/20"
                >
                  <Play fill="currentColor" size={20} />
                  Start Workout
                </button>
                
                <button 
                  onClick={() => setShowLibrary(true)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                >
                  <List size={18} />
                  Change Workout
                </button>
              </div>
            </div>
          </div>
        ) : (
           <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 text-center shadow-lg">
             <div className="mb-6 flex justify-center opacity-50">
                <div className="bg-slate-700/50 p-4 rounded-full">
                  <Calendar size={32} className="text-slate-400" />
                </div>
             </div>
             <p className="text-slate-300 mb-6">Take a break. Active recovery like walking or light stretching is recommended for today.</p>
             <button 
               onClick={() => setShowLibrary(true)}
               className="w-full bg-blue-900/30 hover:bg-blue-900/50 text-blue-400 font-bold py-3 rounded-xl border border-blue-900/50 transition-colors flex items-center justify-center gap-2"
             >
               <List size={18} />
               Browse Workout Library
             </button>
           </div>
        )}

        {/* Quick Stats Teaser */}
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <div className="text-slate-400 text-xs mb-1">Consistency</div>
              <div className="text-xl font-bold text-white">85%</div>
           </div>
           <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <div className="text-slate-400 text-xs mb-1">Selected Day</div>
              <div className="text-xl font-bold text-yellow-400">{selectedDate.toLocaleDateString(undefined, { weekday: 'long' })}</div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;