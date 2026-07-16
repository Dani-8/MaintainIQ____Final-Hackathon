import React from 'react';
import { Sparkles, Wrench } from 'lucide-react';
import { formatDateTime } from '../../../utils/formatDate.js';

export function SafeInspectionsList({ issue, onCheckToggle }) {
    const completedList = issue.completedChecks || [];

    return (
        <div className="space-y-6">
            {/* AI suggested initial safe checks checklist */}
            {issue.aiSuggested?.checks && issue.aiSuggested.checks.length > 0 && (
                <div className="bg-indigo-950 text-indigo-100 rounded-2xl p-6 shadow-md relative overflow-hidden">
                    <div className="relative z-10 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
                                <span className="font-display font-bold text-white text-sm">Initial Safe Inspections</span>
                            </div>
                            <span className="text-[10px] font-mono bg-indigo-900/60 text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-800">
                                {completedList.length}/{issue.aiSuggested.checks.length} Done
                            </span>
                        </div>
                        <p className="text-xs text-indigo-200 leading-normal">
                            Our system generated safety instructions based on the complaint. Please follow them precisely.
                        </p>

                        <div className="space-y-2.5 pt-1">
                            {issue.aiSuggested.checks.map((check, idx) => {
                                const isChecked = completedList.includes(check);
                                return (
                                    <label
                                        key={idx}
                                        className={`flex items-start gap-2.5 text-xs p-2 rounded-lg cursor-pointer transition-all ${isChecked ? 'bg-emerald-950/45 border border-emerald-800/40 text-emerald-300' : 'hover:bg-indigo-900/40 text-indigo-100'
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => onCheckToggle && onCheckToggle(check)}
                                            className="h-4 w-4 text-indigo-600 border-indigo-400 bg-indigo-900 focus:ring-indigo-500 rounded mt-0.5 cursor-pointer"
                                        />
                                        <span className={`transition-all leading-snug ${isChecked ? 'line-through text-emerald-400 opacity-80' : ''}`}>
                                            {check}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    <div className="absolute right-[-10px] top-[-10px] opacity-10">
                        <Wrench className="w-32 h-32 text-indigo-500" />
                    </div>
                </div>
            )}


            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-display font-bold text-slate-800 text-md mb-2">Target Asset Log Details</h3>

                <div className="space-y-3.5 text-xs text-slate-600 font-medium">
                    <div>
                        <span className="text-slate-400 font-normal block">Condition:</span>
                        <span className="font-bold text-slate-700">{issue.asset?.condition}</span>
                    </div>

                    <div>
                        <span className="text-slate-400 font-normal block">Last Service:</span>
                        <span className="font-bold text-slate-700">{formatDateTime(issue.asset?.lastServiceDate)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
