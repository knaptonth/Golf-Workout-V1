import React from 'react';
import { getLogs } from '../services/storageService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar } from 'lucide-react';

export const History: React.FC = () => {
  // Get logs and sort by date descending (newest first)
  const logs = getLogs().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Simple aggregation for the chart: Number of sets completed per workout
  // Take last 7 workouts (which are now first 7 in the sorted array) and reverse for chronological left-to-right chart
  const chartData = logs.slice(0, 7).map(log => {
    const totalSets = log.exercises.reduce((acc, ex) => acc + ex.setLogs.filter(s => s.completed).length, 0);
    return {
      date: new Date(log.date).toLocaleDateString(undefined, { weekday: 'short' }),
      sets: totalSets,
      timestamp: new Date(log.date).getTime() // helper for sorting if needed
    };
  }).reverse();

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-4">Performance History</h2>
      
      <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-lg">
        <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Volume (Sets/Session)</h3>
        <div className="h-48 w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  cursor={{ fill: '#334155' }}
                />
                <Bar dataKey="sets" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500 text-sm">
              No workout data yet.
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Recent Logs</h3>
        {logs.length === 0 && <p className="text-slate-500 text-center py-8">Start your first workout to see history.</p>}
        {logs.map(log => (
          <div key={log.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <Calendar size={16} />
                <span className="font-medium text-sm">
                  {new Date(log.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                </span>
              </div>
              <span className="text-xs bg-slate-900 px-2 py-1 rounded text-slate-400 border border-slate-700">{log.version}</span>
            </div>
            <div className="text-slate-300 text-sm mb-2">
               Completed <span className="text-white font-bold">{log.exercises.reduce((acc, ex) => acc + ex.setLogs.filter(s => s.completed).length, 0)}</span> sets.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};