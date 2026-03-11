'use client';

import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Activity, RefreshCw } from 'lucide-react';
import { ACTIVITY_LOGS } from '@/lib/utils/activityData';
import { cn } from '@/lib/utils';

export default function ActivityPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [severityFilter, setSeverityFilter] = useState('All');

    const filteredLogs = ACTIVITY_LOGS.filter(log => {
        const matchesSearch = log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.target.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSeverity = severityFilter === 'All' || log.severity === severityFilter;
        return matchesSearch && matchesSeverity;
    });

    return (
        <div className="space-y-8 max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Page Header */}
            <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-3 text-primary mb-1">
                    <Activity className="h-5 w-5" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Audit & Compliance</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">System Activity Log</h1>
                <p className="text-sm text-muted-foreground max-w-2xl">
                    Monitor real-time system synchronization, user actions, and security triggers across your entire branch network.
                </p>
            </div>

            {/* Control Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card/30 backdrop-blur-md shadow-sm">
                <div className="relative w-full sm:max-w-md group">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by actor, action, or target..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-border/50 bg-secondary/20 px-9 py-2.5 text-sm outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                    />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-48 group">
                        <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                        <select
                            value={severityFilter}
                            onChange={(e) => setSeverityFilter(e.target.value)}
                            className="w-full appearance-none rounded-lg border border-border/50 bg-secondary/20 pl-9 pr-10 py-2.5 text-sm outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30 cursor-pointer"
                        >
                            <option value="All">All Severities</option>
                            <option value="success">Success</option>
                            <option value="info">Info</option>
                            <option value="warning">Warning</option>
                            <option value="critical">Critical</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    </div>

                    <button className="p-2.5 rounded-lg border border-border/50 bg-secondary/20 hover:bg-secondary/40 transition-colors text-muted-foreground hover:text-foreground">
                        <RefreshCw className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Timeline Container */}
            <div className="relative rounded-xl border border-border bg-card/30 backdrop-blur-sm shadow-xl overflow-hidden min-h-[600px] animate-in fade-in zoom-in-95 duration-700">
                {/* Vertical Timeline Accent line */}
                <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-border to-transparent hidden sm:block" />

                <div className="p-6 sm:p-10 space-y-16">
                    {filteredLogs.length > 0 ? (
                        filteredLogs.map((log) => (
                            <div key={log.id} className="relative pl-12 sm:pl-16 group">
                                {/* Dot on Timeline */}
                                <div className={cn(
                                    "absolute left-[29px] top-6 h-2.5 w-2.5 rounded-full z-10 ring-[6px] ring-card transition-all duration-300 group-hover:scale-125",
                                    log.severity === 'success' && "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
                                    log.severity === 'warning' && "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]",
                                    log.severity === 'critical' && "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]",
                                    log.severity === 'info' && "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                                )} />

                                {/* Content Stack */}
                                <div className="flex flex-col gap-1.5 transition-all duration-300 group-hover:translate-x-1">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                                        {log.timestamp}
                                    </span>

                                    <div className="flex flex-wrap items-baseline gap-x-2">
                                        <span className="text-sm font-bold text-foreground tracking-tight">
                                            {log.actor}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {log.action}
                                        </span>
                                        <span className="text-sm font-bold text-primary">
                                            @{log.target}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-40 text-center opacity-40">
                            <RefreshCw className="h-10 w-10 mb-4 animate-spin-slow" />
                            <p className="text-xs font-bold uppercase tracking-widest text-foreground">No matching logs found</p>
                        </div>
                    )}

                    {filteredLogs.length > 0 && (
                        <div className="pt-8 pb-4 flex justify-center">
                            <button className="w-full py-3 rounded-lg border border-border bg-transparent text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:bg-white/5 hover:text-foreground hover:border-white/20 transition-all duration-300">
                                Load More Activities
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
