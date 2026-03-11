'use client';

import React, { useState } from 'react';
import {
    User,
    Shield,
    Bell,
    Database,
    Key,
    Box,
    Monitor,
    Globe,
    ChevronRight,
    Save
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SETTINGS_SECTIONS = [
    {
        title: 'Organization',
        items: [
            { id: 'general', label: 'General', icon: Box },
            { id: 'members', label: 'Members & Roles', icon: Shield },
            { id: 'integrations', label: 'Data Integrations', icon: Database },
        ]
    },
    {
        title: 'Personal',
        items: [
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'security', label: 'Security', icon: Key },
            { id: 'notifications', label: 'Notifications', icon: Bell },
        ]
    }
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general');

    const activeItem = SETTINGS_SECTIONS.flatMap(s => s.items).find(c => c.id === activeTab);

    return (
        <div className="flex flex-col lg:flex-row gap-8 max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Left Column: Navigation */}
            <aside className="w-full lg:w-[280px] shrink-0 space-y-6">
                <div className="px-2 mb-2">
                    <h1 className="text-xl font-bold tracking-tight text-foreground">Workspace Settings</h1>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mt-1">Global Configuration</p>
                </div>

                <nav className="flex flex-col space-y-6">
                    {SETTINGS_SECTIONS.map((section) => (
                        <div key={section.title} className="space-y-1">
                            <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">{section.title}</p>
                            {section.items.map((category) => {
                                const isActive = activeTab === category.id;
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveTab(category.id)}
                                        className={cn(
                                            "w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-300 group",
                                            isActive
                                                ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                                                : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground border border-transparent"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "p-1.5 rounded-lg transition-colors",
                                                isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground group-hover:bg-muted/80"
                                            )}>
                                                <category.icon className="h-3.5 w-3.5" />
                                            </div>
                                            <span className="text-sm font-medium tracking-tight">{category.label}</span>
                                        </div>
                                        {isActive && <ChevronRight className="h-4 w-4" />}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </nav>

                {/* Footer status in sidebar */}
                <div className="p-4 rounded-2xl bg-secondary/30 border border-border mt-8">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">Sync Status: Stable</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground/80 leading-relaxed font-mono">
                        v2.4.0-release.12
                    </p>
                </div>
            </aside>

            {/* Right Column: Content Area */}
            <main className="flex-1 min-w-0">
                <div className="rounded-3xl border border-border bg-card/30 backdrop-blur-xl overflow-hidden shadow-sm">
                    {/* Content Header */}
                    <div className="px-8 py-6 border-b border-border bg-gradient-to-r from-secondary/20 to-transparent">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                                    {activeTab === 'general' ? 'General Settings' : activeItem?.label}
                                </h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {activeTab === 'general'
                                        ? 'Manage your company workspace details and preferences.'
                                        : `Modify the platform ${activeItem?.label.toLowerCase()} parameters.`}
                                </p>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg font-bold text-xs uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98]">
                                <Save className="h-4 w-4" />
                                Save Changes
                            </button>
                        </div>
                    </div>

                    {/* Main Content Render */}
                    <div className="p-8">
                        {activeTab === 'general' && (
                            <div className="space-y-8">
                                {/* Workspace Details Form Card */}
                                <div className="p-8 rounded-2xl border border-zinc-200/50 bg-white/40 shadow-sm space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <div className="space-y-1">
                                        <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">Workspace Details</h3>
                                        <p className="text-xs text-zinc-500">Basic identification and contact information for this organization.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                        <div className="space-y-6">
                                            <div className="space-y-2 group">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1 transition-colors group-focus-within:text-primary">Company Name</label>
                                                <input
                                                    type="text"
                                                    defaultValue="Acme Corp"
                                                    placeholder="Enter legal company name..."
                                                    className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm"
                                                />
                                            </div>

                                            <div className="space-y-2 group">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1 transition-colors group-focus-within:text-primary">Support Email</label>
                                                <input
                                                    type="email"
                                                    defaultValue="support@acmecorp.com"
                                                    placeholder="e.g. support@company.com"
                                                    className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-2 group">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1 transition-colors group-focus-within:text-primary">Default Timezone</label>
                                                <div className="relative">
                                                    <select
                                                        className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm appearance-none cursor-pointer"
                                                        defaultValue="utc"
                                                    >
                                                        <option value="pst">Pacific Standard Time (PT)</option>
                                                        <option value="est">Eastern Standard Time (ET)</option>
                                                        <option value="utc">Universal Coordinated Time (UTC)</option>
                                                        <option value="cet">Central European Time (CET)</option>
                                                        <option value="jst">Japan Standard Time (JST)</option>
                                                    </select>
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                                                        <ChevronRight className="h-4 w-4 rotate-90" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2 group">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Workspace ID</label>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    value="VYLERA-X-00129"
                                                    className="w-full bg-zinc-50/50 border border-zinc-200 rounded-xl px-4 py-3 text-sm font-mono text-zinc-400 cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Separation Line */}
                                    <div className="h-px bg-zinc-100 w-full" />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Workspace Logo</label>
                                            <div className="flex items-center gap-6">
                                                <div className="h-20 w-20 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white ring-8 ring-white shadow-xl overflow-hidden group">
                                                    <Box className="h-10 w-10 transition-transform group-hover:scale-110" />
                                                </div>
                                                <div className="space-y-2">
                                                    <button className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-all active:scale-95 shadow-sm">
                                                        Upload New
                                                    </button>
                                                    <p className="text-[10px] text-zinc-400">PNG or SVG. Max size 2MB.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-zinc-100 flex items-center justify-between">
                                        <div className="space-y-1 text-left">
                                            <p className="text-sm font-bold text-zinc-900">Delete Workspace</p>
                                            <p className="text-xs text-zinc-500">This action is permanent and cannot be undone.</p>
                                        </div>
                                        <button className="px-6 py-2.5 text-xs font-bold border border-rose-200 text-rose-600 bg-rose-50/50 rounded-xl hover:bg-rose-100 transition-all active:scale-95">
                                            Delete Workspace
                                        </button>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="pt-8 flex justify-end items-center gap-3 border-t border-zinc-100/50">
                                        <button
                                            disabled
                                            className="px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 cursor-not-allowed opacity-50"
                                        >
                                            Cancel
                                        </button>
                                        <button className="px-8 py-2.5 bg-primary text-primary-foreground rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
                                            <Save className="h-3.5 w-3.5" />
                                            Save Changes
                                        </button>
                                    </div>
                                </div>

                                {/* Data Integrations Section */}
                                <div className="p-8 rounded-2xl border border-zinc-200/50 bg-white/40 shadow-sm space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <div className="inline-flex items-center px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[8px] font-bold uppercase tracking-[0.2em] mb-1 ring-1 ring-blue-200/50">Enterprise</div>
                                            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">Data Integrations</h3>
                                            <p className="text-xs text-zinc-500">Connect external data sources to enable single-source intelligence.</p>
                                        </div>
                                        <div className="p-2 rounded-xl bg-zinc-50 border border-zinc-100">
                                            <Database className="h-5 w-5 text-zinc-400" />
                                        </div>
                                    </div>

                                    {/* Integration Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {/* Legacy Database */}
                                        <div className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-all group">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-primary transition-colors">
                                                    <Database className="h-5 w-5" />
                                                </div>
                                                <div className="h-2 w-2 rounded-full bg-zinc-200" />
                                            </div>
                                            <h4 className="text-sm font-bold text-zinc-900 mb-1">Legacy Database</h4>
                                            <p className="text-[11px] text-zinc-500 leading-relaxed mb-6">Synchronize legacy SQL records with real-time stream processing.</p>
                                            <button className="w-full py-2 text-[10px] font-bold uppercase tracking-widest border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-all active:scale-[0.98]">
                                                Connect
                                            </button>
                                        </div>

                                        {/* POS System */}
                                        <div className="p-6 rounded-2xl border border-primary/20 bg-primary/[0.02] shadow-sm hover:shadow-md transition-all group ring-1 ring-primary/10">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary transition-colors">
                                                    <Monitor className="h-5 w-5" />
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-[8px] font-bold text-emerald-600 uppercase tracking-widest">Connected</span>
                                                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                                </div>
                                            </div>
                                            <h4 className="text-sm font-bold text-zinc-900 mb-1">POS System</h4>
                                            <p className="text-[11px] text-zinc-500 leading-relaxed mb-6">Real-time terminal inventory and transaction monitoring.</p>
                                            <button className="w-full py-2 text-[10px] font-bold uppercase tracking-widest bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-all active:scale-[0.98] shadow-lg shadow-zinc-200">
                                                Manage
                                            </button>
                                        </div>

                                        {/* Cloud Storage */}
                                        <div className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-all group">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-primary transition-colors">
                                                    <Box className="h-5 w-5" />
                                                </div>
                                                <div className="h-2 w-2 rounded-full bg-zinc-200" />
                                            </div>
                                            <h4 className="text-sm font-bold text-zinc-900 mb-1">Cloud Storage</h4>
                                            <p className="text-[11px] text-zinc-500 leading-relaxed mb-6">Backup orchestration across distributed S3-compatible nodes.</p>
                                            <button className="w-full py-2 text-[10px] font-bold uppercase tracking-widest border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-all active:scale-[0.98]">
                                                Connect
                                            </button>
                                        </div>

                                        {/* Add Integration Placeholder */}
                                        <button className="p-6 rounded-2xl border border-dashed border-zinc-200 flex flex-col items-center justify-center text-center group hover:border-primary/50 hover:bg-primary/5 transition-all text-zinc-400 hover:text-primary min-h-[160px]">
                                            <div className="h-10 w-10 rounded-full bg-zinc-50 group-hover:bg-primary/10 flex items-center justify-center mb-3 transition-colors">
                                                <Globe className="h-5 w-5" />
                                            </div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest">Add New Node</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab !== 'general' && activeItem && (
                            <div className="mt-12 p-24 rounded-3xl border border-dashed border-zinc-200 flex flex-col items-center justify-center text-center opacity-70">
                                {React.createElement(activeItem.icon, { className: "h-12 w-12 text-zinc-300 mb-6" })}
                                <h3 className="text-lg font-bold text-zinc-900 tracking-tight">Configuration Under Review</h3>
                                <p className="text-sm text-zinc-500 max-w-[320px] mt-2 leading-relaxed">
                                    The settings for <strong>{activeItem.label}</strong> are currently being optimized for your workspace region.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
