'use client';

import React, { useState } from 'react';
import { ShieldAlert, AlertCircle, Search, CheckCircle2, Siren, AlertOctagon, ArrowUp, AlertTriangle, Info } from 'lucide-react';
import { INCIDENT_RECORDS } from '@/lib/utils/incidentData';
import { cn } from '@/lib/utils';

export default function IncidentsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [severityFilter, setSeverityFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    const openCount = INCIDENT_RECORDS.filter(i => i.resolutionState === 'Open').length;
    const activeCount = INCIDENT_RECORDS.filter(i => i.resolutionState === 'Active').length;
    const resolvedCount = INCIDENT_RECORDS.filter(i => i.resolutionState === 'Resolved').length;

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Page Header */}
            <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-3 text-primary mb-1">
                    <ShieldAlert className="h-5 w-5" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Platform Integrity</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Incident Management</h1>
                <p className="text-sm text-muted-foreground max-w-2xl">
                    Track, triage, and orchestrate responses to active system alerts and hardware malfunctions across the branch network.
                </p>
            </div>

            {/* Summary Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Open Anomalies Card */}
                <div className="p-6 rounded-xl border border-zinc-800 bg-transparent group hover:border-rose-500/40 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 rounded-lg bg-rose-500/5 text-rose-500">
                            <Siren className="h-5 w-5 animate-pulse" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-rose-500">Urgent</span>
                    </div>
                    <h2 className="text-4xl font-bold text-foreground mb-1 font-mono tracking-tighter">{openCount}</h2>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Open Anomalies</p>
                </div>

                {/* Investigating Card */}
                <div className="p-6 rounded-xl border border-zinc-800 bg-transparent group hover:border-primary/40 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 rounded-lg bg-primary/5 text-primary">
                            <Search className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">In Progress</span>
                    </div>
                    <h2 className="text-4xl font-bold text-foreground mb-1 font-mono tracking-tighter">{activeCount}</h2>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Active</p>
                </div>

                {/* Resolved Card */}
                <div className="p-6 rounded-xl border border-zinc-800 bg-transparent group hover:border-emerald-500/40 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 rounded-lg bg-emerald-500/5 text-emerald-500">
                            <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Stable</span>
                    </div>
                    <h2 className="text-4xl font-bold text-foreground mb-1 font-mono tracking-tighter">{resolvedCount}</h2>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Resolved Today</p>
                </div>
            </div>

            {/* Control Bar */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/50 backdrop-blur-md shadow-sm">
                <div className="relative w-full lg:max-w-md group">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by anomaly or trace ID (e.g. INC-001)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-slate-100/50 px-9 py-2.5 text-sm outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30 text-slate-900 placeholder:text-slate-400"
                    />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                    <div className="relative w-full sm:w-44 group">
                        <ShieldAlert className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                        <select
                            value={severityFilter}
                            onChange={(e) => setSeverityFilter(e.target.value)}
                            className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-100/50 pl-9 pr-10 py-2.5 text-sm outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30 cursor-pointer text-slate-900"
                        >
                            <option value="All">All Impact Levels</option>
                            <option value="Critical">Critical</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        <AlertCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none opacity-50" />
                    </div>

                    <div className="relative w-full sm:w-44 group">
                        <CheckCircle2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-100/50 pl-9 pr-10 py-2.5 text-sm outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30 cursor-pointer text-slate-900"
                        >
                            <option value="All">All Resolution States</option>
                            <option value="Open">Open</option>
                            <option value="Active">Active</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                        <AlertCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none opacity-50" />
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="rounded-xl border border-zinc-200 bg-slate-50/70 backdrop-blur-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-700 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-200">
                                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Trace ID</th>
                                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Anomaly</th>
                                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Impact Level</th>
                                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Resolution State</th>
                                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Lead Engineer</th>
                                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Timestamp</th>
                                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200">
                            {INCIDENT_RECORDS
                                .filter(incident => {
                                    const matchesSearch = incident.traceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        incident.anomaly.toLowerCase().includes(searchQuery.toLowerCase());
                                    const matchesSeverity = severityFilter === 'All' || incident.impactLevel === severityFilter;
                                    const matchesStatus = statusFilter === 'All' || incident.resolutionState === statusFilter;
                                    return matchesSearch && matchesSeverity && matchesStatus;
                                })
                                .map((incident) => (
                                    <tr key={incident.traceId} className="group hover:bg-zinc-100 transition-all duration-200 cursor-default">
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-xs font-bold text-zinc-500 tracking-tight">#{incident.traceId}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-zinc-900 group-hover:text-primary transition-colors line-clamp-1">{incident.anomaly}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {incident.impactLevel === 'Critical' && (
                                                    <>
                                                        <AlertOctagon className="h-3.5 w-3.5 text-rose-600" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-rose-600">Critical</span>
                                                    </>
                                                )}
                                                {incident.impactLevel === 'High' && (
                                                    <>
                                                        <ArrowUp className="h-3.5 w-3.5 text-orange-600" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600">High</span>
                                                    </>
                                                )}
                                                {incident.impactLevel === 'Medium' && (
                                                    <>
                                                        <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">Medium</span>
                                                    </>
                                                )}
                                                {incident.impactLevel === 'Low' && (
                                                    <>
                                                        <Info className="h-3.5 w-3.5 text-indigo-600" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">Low</span>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "font-mono text-[10px] font-bold uppercase tracking-widest",
                                                incident.resolutionState === 'Open' && "text-zinc-900 font-extrabold",
                                                incident.resolutionState === 'Active' && "text-zinc-600",
                                                incident.resolutionState === 'Resolved' && "text-emerald-700"
                                            )}>
                                                [ {incident.resolutionState.toUpperCase()} ]
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-6 w-6 rounded-full bg-zinc-200 flex items-center justify-center text-[9px] font-bold text-zinc-700 uppercase tracking-tighter shadow-inner">
                                                    {incident.leadEngineer.split(' ').map(word => word[0]).join('').substring(0, 2)}
                                                </div>
                                                <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors uppercase tracking-tight font-mono text-[11px]">{incident.leadEngineer}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-500">{incident.timestamp}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="px-3 py-1.5 rounded-md border border-zinc-200 bg-white text-[10px] font-bold uppercase tracking-widest text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 hover:border-zinc-300 transition-all active:scale-95 shadow-sm">
                                                Update Status
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
