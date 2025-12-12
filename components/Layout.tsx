import React from 'react';
import { Trophy, Activity, History, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <header className="bg-slate-950 border-b border-blue-900/30 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">TourSpec<span className="text-yellow-400">Golf</span></span>
          </div>
          <button 
             onClick={() => onTabChange('settings')}
             className={`p-2 rounded-full hover:bg-slate-800 transition ${activeTab === 'settings' ? 'text-blue-400' : 'text-slate-400'}`}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full p-4 pb-24">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-950 border-t border-blue-900/30 pb-safe">
        <div className="max-w-md mx-auto flex justify-around p-2">
          <NavButton 
            icon={<Activity />} 
            label="Workout" 
            isActive={activeTab === 'workout'} 
            onClick={() => onTabChange('workout')} 
          />
          <NavButton 
            icon={<History />} 
            label="History" 
            isActive={activeTab === 'history'} 
            onClick={() => onTabChange('history')} 
          />
        </div>
      </nav>
    </div>
  );
};

const NavButton = ({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 p-2 w-full rounded-xl transition-all duration-200 ${isActive ? 'text-blue-400 bg-blue-950/30' : 'text-slate-500 hover:text-slate-300'}`}
  >
    {React.cloneElement(icon as React.ReactElement<any>, { size: 20 })}
    <span className="text-xs font-medium">{label}</span>
  </button>
);