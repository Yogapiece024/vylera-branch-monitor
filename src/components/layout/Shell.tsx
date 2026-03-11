'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    GitBranch,
    History,
    Settings,
    Bell,
    Search,
    User,
    Menu,
    X,
    Building2,
    AlertTriangle,
    CheckCircle2,
    Info,
    Clock
} from 'lucide-react';

interface ShellProps {
    children: React.ReactNode;
}

const NAV_ITEMS = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: Building2, label: 'Branches', href: '/branches' },
    { icon: History, label: 'Recent Activity', href: '/recent-activity' },
    { icon: AlertTriangle, label: 'Incidents', href: '/incidents' },
];

const MOCK_NOTIFICATIONS = [
    { id: 1, title: 'Critical Alert Resolved', description: 'Database Sync Failure in Branch Nexus has been mitigated.', time: '10 min ago', icon: CheckCircle2, iconColor: 'text-emerald-500', bg: 'bg-emerald-500/5' },
    { id: 2, title: 'New Node Online', description: 'Horizon Hub branch successfully established LTE failover.', time: '1 hour ago', icon: GitBranch, iconColor: 'text-blue-500', bg: 'bg-blue-500/5' },
    { id: 3, title: 'Security Event', description: 'Unusual login pattern detected from unauthorized region.', time: '4 hours ago', icon: AlertTriangle, iconColor: 'text-amber-500', bg: 'bg-amber-500/5' },
];

export function Shell({ children }: ShellProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-background font-sans">
            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar (Desktop and Mobile) */}
            <aside className={cn(
                "fixed left-0 top-0 z-50 h-full w-[240px] border-r border-border bg-background transition-transform duration-300 lg:translate-x-0 lg:flex flex-col",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex h-14 items-center justify-between px-6 border-b border-border">
                    <a href="/" className="flex items-center gap-2 group">
                        <div className="h-6 w-6 bg-foreground rounded-sm flex items-center justify-center transition-transform group-hover:scale-105">
                            <GitBranch className="h-4 w-4 text-background" />
                        </div>
                        <span className="font-bold text-sm tracking-tight uppercase">Vylera</span>
                    </a>
                    <button
                        className="lg:hidden p-1 hover:bg-secondary rounded-md"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-3">
                    <nav className="space-y-1">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200',
                                        isActive
                                            ? 'bg-foreground text-background font-medium'
                                            : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <item.icon className={cn("h-4 w-4", isActive && "text-primary")} />
                                    {item.label}
                                </a>
                            );
                        })}
                    </nav>
                </div>

                <div className="px-3 pb-4">
                    <nav className="space-y-1">
                        <a
                            href="/settings"
                            className={cn(
                                'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-200',
                                pathname === '/settings'
                                    ? 'bg-foreground text-background font-medium'
                                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                            )}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <Settings className={cn("h-4 w-4", pathname === '/settings' && "text-primary")} />
                            Settings
                        </a>
                    </nav>
                </div>

                <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-3 rounded-md px-3 py-2 text-xs text-muted-foreground hover:bg-secondary cursor-pointer transition-colors">
                        <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-foreground ring-1 ring-border">
                            <User className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="truncate font-medium text-foreground">admin@vylera.io</p>
                            <p className="truncate opacity-60">Pro Plan</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 lg:pl-[240px] flex flex-col min-w-0">
                {/* Header */}
                <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/70 px-4 backdrop-blur-md lg:px-8">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden p-1.5 hover:bg-secondary rounded-md"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                        <div className="flex items-center gap-4 lg:hidden">
                            <div className="h-6 w-6 bg-foreground rounded-sm flex items-center justify-center text-background">
                                <GitBranch className="h-4 w-4" />
                            </div>
                            <span className="font-bold text-xs uppercase tracking-widest">Vylera</span>
                        </div>
                    </div>

                    <div className="relative hidden md:block w-64 lg:w-72">
                        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-md border border-border bg-secondary/50 pl-9 pr-4 py-1.5 text-xs outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 mr-2">
                            <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Operational</span>
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className={cn(
                                    "relative rounded-md p-1.5 transition-all duration-200 border border-border",
                                    isNotificationsOpen ? "bg-secondary text-foreground shadow-inner" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                )}
                            >
                                <Bell className="h-4 w-4" />
                                <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                            </button>

                            {/* Notifications Dropdown */}
                            {isNotificationsOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsNotificationsOpen(false)}
                                    />
                                    <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl border border-border bg-card/90 backdrop-blur-xl shadow-2xl z-50 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-300 origin-top-right">
                                        <div className="p-4 border-b border-border flex items-center justify-between">
                                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">Alert Center</h3>
                                            <span className="text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">3 New</span>
                                        </div>
                                        <div className="max-h-[400px] overflow-y-auto">
                                            {MOCK_NOTIFICATIONS.map((notif) => (
                                                <div
                                                    key={notif.id}
                                                    style={{ animationDelay: `${notif.id * 100}ms` }}
                                                    className="p-4 border-b border-border/50 hover:bg-secondary/50 transition-colors cursor-pointer group animate-in fade-in slide-in-from-right-4 duration-500 fill-mode-both"
                                                    onClick={() => setIsNotificationsOpen(false)}
                                                >
                                                    <div className="flex gap-4">
                                                        <div className={cn("mt-0.5 p-2 h-9 w-9 rounded-xl flex items-center justify-center shrink-0", notif.bg)}>
                                                            <notif.icon className={cn("h-4.5 w-4.5", notif.iconColor)} />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <div className="flex items-center justify-between gap-2">
                                                                <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{notif.title}</h4>
                                                                <div className="flex items-center gap-1 text-[9px] font-medium text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
                                                                    <Clock className="h-2.5 w-2.5" />
                                                                    {notif.time}
                                                                </div>
                                                            </div>
                                                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{notif.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-3 text-center border-t border-border bg-muted/20">
                                            <button className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                                                View All Intelligence
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="h-7 w-7 rounded-full bg-foreground flex items-center justify-center lg:hidden">
                            <User className="h-3.5 w-3.5 text-background" />
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 p-4 lg:p-10 animate-in fade-in slide-in-from-bottom-2 duration-700 min-w-0">
                    {children}
                </main>
            </div>
        </div>
    );
}
