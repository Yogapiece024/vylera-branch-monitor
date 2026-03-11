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
                <div className="p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm group hover:border-rose-500/40 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 rounded-lg bg-rose-500/5 text-rose-500">
                            <Siren className="h-5 w-5 animate-pulse" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-rose-500">Urgent</span>
                    </div>
                    <h2 className="text-4xl font-bold text-foreground mb-1 font-mono tracking-tighter">{openCount}</h2>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Open Anomalies</p>
                </div>

                {/* Investigating Card */}
                <div className="p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm group hover:border-primary/40 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 rounded-lg bg-primary/5 text-primary">
                            <Search className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">In Progress</span>
                    </div>
                    <h2 className="text-4xl font-bold text-foreground mb-1 font-mono tracking-tighter">{activeCount}</h2>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Active</p>
                </div>

                {/* Resolved Card */}
                <div className="p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm group hover:border-emerald-500/40 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 rounded-lg bg-emerald-500/5 text-emerald-500">
                            <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Stable</span>
                    </div>
                    <h2 className="text-4xl font-bold text-foreground mb-1 font-mono tracking-tighter">{resolvedCount}</h2>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Resolved Today</p>
                </div>
            </div>

            {/* Control Bar */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card/30 dark:bg-zinc-900/30 backdrop-blur-md shadow-sm">
                <div className="relative w-full lg:max-w-md group">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by anomaly or trace ID (e.g. INC-001)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-border/50 dark:border-zinc-800 bg-secondary/20 dark:bg-zinc-950/40 px-9 py-2.5 text-sm outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
                    />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                    <div className="relative w-full sm:w-44 group">
                        <ShieldAlert className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                        <select
                            value={severityFilter}
                            onChange={(e) => setSeverityFilter(e.target.value)}
                            className="w-full appearance-none rounded-lg border border-border/50 dark:border-zinc-800 bg-secondary/20 dark:bg-zinc-950/40 pl-9 pr-10 py-2.5 text-sm outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30 cursor-pointer text-foreground"
                        >
                            <option value="All" className="dark:bg-zinc-950">All Impact Levels</option>
                            <option value="Critical" className="dark:bg-zinc-950">Critical</option>
                            <option value="High" className="dark:bg-zinc-950">High</option>
                            <option value="Medium" className="dark:bg-zinc-950">Medium</option>
                            <option value="Low" className="dark:bg-zinc-950">Low</option>
                        </select>
                        <AlertCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none opacity-50" />
                    </div>

                    <div className="relative w-full sm:w-44 group">
                        <CheckCircle2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full appearance-none rounded-lg border border-border/50 dark:border-zinc-800 bg-secondary/20 dark:bg-zinc-950/40 pl-9 pr-10 py-2.5 text-sm outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30 cursor-pointer text-foreground"
                        >
                            <option value="All" className="dark:bg-zinc-950">All Resolution States</option>
                            <option value="Open" className="dark:bg-zinc-950">Open</option>
                            <option value="Active" className="dark:bg-zinc-950">Active</option>
                            <option value="Resolved" className="dark:bg-zinc-950">Resolved</option>
                        </select>
                        <AlertCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none opacity-50" />
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="rounded-xl border border-border dark:border-zinc-800 bg-card/30 dark:bg-zinc-950/20 backdrop-blur-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-700 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Trace ID</th>
                                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Anomaly</th>
                                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Impact Level</th>
                                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Resolution State</th>
                                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Lead Engineer</th>
                                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Timestamp</th>
                                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border dark:divide-zinc-800">
                            {INCIDENT_RECORDS
                                .filter(incident => {
                                    const matchesSearch = incident.traceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        incident.anomaly.toLowerCase().includes(searchQuery.toLowerCase());
                                    const matchesSeverity = severityFilter === 'All' || incident.impactLevel === severityFilter;
                                    const matchesStatus = statusFilter === 'All' || incident.resolutionState === statusFilter;
                                    return matchesSearch && matchesSeverity && matchesStatus;
                                })
                                .map((incident) => (
                                    <tr key={incident.traceId} className="group hover:bg-secondary/50 dark:hover:bg-zinc-900/40 transition-all duration-200 cursor-default">
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-xs font-bold text-muted-foreground tracking-tight">#{incident.traceId}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">{incident.anomaly}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {incident.impactLevel === 'Critical' && (
                                                    <>
                                                        <AlertOctagon className="h-3.5 w-3.5 text-rose-500" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-rose-500">Critical</span>
                                                    </>
                                                )}
                                                {incident.impactLevel === 'High' && (
                                                    <>
                                                        <ArrowUp className="h-3.5 w-3.5 text-orange-500" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500">High</span>
                                                    </>
                                                )}
                                                {incident.impactLevel === 'Medium' && (
                                                    <>
                                                        <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">Medium</span>
                                                    </>
                                                )}
                                                {incident.impactLevel === 'Low' && (
                                                    <>
                                                        <Info className="h-3.5 w-3.5 text-indigo-500" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">Low</span>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "font-mono text-[10px] font-bold uppercase tracking-widest",
                                                incident.resolutionState === 'Open' && "text-rose-500 font-extrabold",
                                                incident.resolutionState === 'Active' && "text-primary",
                                                incident.resolutionState === 'Resolved' && "text-emerald-500"
                                            )}>
                                                [ {incident.resolutionState.toUpperCase()} ]
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[9px] font-bold text-muted-foreground uppercase tracking-tighter shadow-inner">
                                                    {incident.leadEngineer.split(' ').map(word => word[0]).join('').substring(0, 2)}
                                                </div>
                                                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-tight font-mono text-[11px]">{incident.leadEngineer}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{incident.timestamp}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="px-3 py-1.5 rounded-md border border-border dark:border-zinc-700 bg-card dark:bg-zinc-900 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:bg-secondary dark:hover:bg-zinc-800 hover:text-foreground transition-all active:scale-95 shadow-sm">
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
