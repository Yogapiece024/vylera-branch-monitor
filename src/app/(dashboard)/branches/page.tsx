'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Plus } from 'lucide-react';
import { BRANCH_RECORDS } from '@/lib/utils/branchData';
import { cn } from '@/lib/utils';

export default function BranchesPage() {
    return (
        <div className="space-y-8 max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header Section */}
            <div className="flex flex-col space-y-4">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Branch Directory</h1>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative w-full sm:max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search branches by name, location, or manager..."
                            className="w-full rounded-lg border border-border bg-card/10 px-9 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>

                    <button className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-95">
                        <Plus className="h-4 w-4" />
                        Add New Branch
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="rounded-xl border border-border bg-card/30 backdrop-blur-sm overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-secondary/50 text-[11px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border">
                                <th className="px-6 py-4">Branch Name</th>
                                <th className="px-6 py-4">Location</th>
                                <th className="px-6 py-4">Manager</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right pr-8">Revenue</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {BRANCH_RECORDS.map((branch) => (
                                <tr
                                    key={branch.id}
                                    className="group hover:bg-secondary/40 transition-colors cursor-default"
                                >
                                    <td className="px-6 py-4">
                                        <Link
                                            href={`/branches/${branch.id}`}
                                            className="font-bold text-foreground tracking-tight hover:text-primary transition-colors underline-offset-4 hover:underline"
                                        >
                                            {branch.branchName}
                                        </Link>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-tighter opacity-70 group-hover:opacity-100 transition-opacity">ID: {branch.id}</p>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground font-medium">{branch.location}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold">
                                                {branch.managerName.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="font-medium text-foreground">{branch.managerName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                            branch.status === 'Active'
                                                ? "bg-emerald-500/10 text-emerald-500 ring-1 ring-inset ring-emerald-500/20"
                                                : "bg-amber-500/10 text-amber-500 ring-1 ring-inset ring-amber-500/20"
                                        )}>
                                            {branch.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right pr-8 font-mono font-bold text-foreground">
                                        ${branch.todayRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
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
