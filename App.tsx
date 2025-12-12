import React, { useState, useMemo } from 'react';
import { Layout } from './components/Layout';
import { WorkoutSession } from './components/WorkoutSession';
import { History } from './components/History';
import { WORKOUTS, SCHEDULE } from './constants';
import { getPreferredVersion, setPreferredVersion } from './services/storageService';
import { Version } from './types';
import { Dumbbell, Play, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('workout');
  const [version, setVersion] = useState<Version>(getPreferredVersion());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSessionActive, setIsSessionActive] = useState(false);

  // Determine workout based on selectedDate
  const todayWorkout = useMemo(() => {
    const dayIndex = selectedDate.getDay(); // 0-6
    const dayKey = SCHEDULE[dayIndex];
    if (dayKey && WORKOUTS[version][dayKey]) {
      return WORKOUTS[version][dayKey];
    }
    return null; // Rest day or undefined
  }, [version, selectedDate]);

  const handleVersionChange = (newVersion: Version) => {
    setVersion(newVersion);
    setPreferredVersion(newVersion);
  };

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const [year, month, day] = e.target.value.split('-').map(Number);
    // Create date in local time
    setSelectedDate(new Date(year, month - 1, day));
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
                className={`w-full text-left p-4 rounded-xl border transition-all ${version === 'V1' ? 'bg-emerald-900/20 border-emerald-500 text-emerald-400' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
              >
                <div className="font-bold">Version 1: Full Gym</div>
                <div className="text-xs mt-1 opacity-80">Commercial gym access (Smith machine, cables, heavy DBs)</div>
              </button>
              <button 
                onClick={() => handleVersionChange('V2')}
                className={`w-full text-left p-4 rounded-xl border transition-all ${version === 'V2' ? 'bg-emerald-900/20 border-emerald-500 text-emerald-400' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
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
          onFinish={() => setIsSessionActive(false)}
          onBack={() => setIsSessionActive(false)}
        />
      );
    }

    // Format date string YYYY-MM-DD for input value
    const dateInputValue = selectedDate.toLocaleDateString('en-CA'); 

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
                  <Calendar size={16} className="text-emerald-500" />
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
            <h2 className="text-slate-400 text-sm uppercase tracking-widest">Workout Protocol</h2>
            {todayWorkout ? (
              <>
                <h1 className="text-3xl font-bold text-white">{todayWorkout.title}</h1>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-900/30 text-emerald-400 text-sm font-medium border border-emerald-900/50">
                  {todayWorkout.focus}
                </div>
              </>
            ) : (
              <h1 className="text-3xl font-bold text-white">Rest & Recovery</h1>
            )}
          </div>
        </div>

        {todayWorkout ? (
          <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900 p-8 rounded-3xl border border-emerald-900/30 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>
            
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="bg-emerald-500 p-4 rounded-full shadow-lg shadow-emerald-500/20">
                <Dumbbell className="w-8 h-8 text-white" />
              </div>
              
              <div className="text-center space-y-1">
                 <p className="text-slate-300">Duration: <span className="text-white font-bold">45 Mins</span></p>
                 <p className="text-slate-300">Structure: <span className="text-white font-bold">Contrast Supersets</span></p>
              </div>

              <button 
                onClick={() => setIsSessionActive(true)}
                className="w-full bg-white hover:bg-slate-100 text-emerald-900 font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Play fill="currentColor" size={20} />
                Start Workout
              </button>
            </div>
          </div>
        ) : (
           <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 text-center">
             <p className="text-slate-300 mb-4">Take a break. Active recovery like walking or light stretching is recommended.</p>
             <button 
               onClick={() => { /* logic to force a specific workout could go here */ }}
               className="text-emerald-500 text-sm hover:underline"
             >
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
              <div className="text-xl font-bold text-emerald-400">{selectedDate.toLocaleDateString(undefined, { weekday: 'long' })}</div>
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