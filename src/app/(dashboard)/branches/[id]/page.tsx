'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { BRANCH_RECORDS } from '@/lib/utils/branchData';
import {
    ArrowLeft,
    TrendingUp,
    Calendar,
    AlertCircle,
    Users,
    CreditCard,
    DollarSign
} from 'lucide-react';
import {
    LineChart,
    Line as ChartLine,
    XAxis as ChartXAxis,
    YAxis as ChartYAxis,
    CartesianGrid as ChartGrid,
    Tooltip as ChartTooltip,
    ResponsiveContainer as ChartContainer
} from 'recharts';

export default function BranchDetailPage() {
    const params = useParams();
    const router = useRouter();
    const branchId = params.id;

    const branch = BRANCH_RECORDS.find(b => b.id === branchId);

    if (!branch) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                <h2 className="text-2xl font-bold">Branch Not Found</h2>
                <p className="text-muted-foreground mt-2">The branch ID {branchId} could not be located in our systems.</p>
                <button
                    onClick={() => router.push('/branches')}
                    className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
                >
                    Back to Directory
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Navigation & Header */}
            <div className="flex flex-col gap-4">
                <Link
                    href="/branch-list-error"
                    className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors w-fit"
                >
                    <ArrowLeft className="h-3 w-3" />
                    Back to Directory
                </Link>

                <div>
                    <h1 className="text-4xl font-bold tracking-tighter text-foreground">{branch.branchName}</h1>
                    <p className="text-sm text-muted-foreground mt-1 font-medium">{branch.managerName}</p>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <p className="text-[10px] font-bold uppercase tracking-widest">Active Staff</p>
                    </div>
                    <h2 className="text-4xl font-bold text-foreground">12</h2>
                    <p className="text-[10px] text-emerald-500 mt-2 uppercase font-bold tracking-widest">Full Capacity</p>
                </div>

                <div className="p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4 text-muted-foreground">
                        <CreditCard className="h-4 w-4" />
                        <p className="text-[10px] font-bold uppercase tracking-widest">Total Transactions</p>
                    </div>
                    <h2 className="text-4xl font-bold text-foreground">1,284</h2>
                    <p className="text-[10px] text-muted-foreground mt-2 uppercase font-bold tracking-widest">Past 24 Hours</p>
                </div>

                <div className="p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4 text-muted-foreground">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <p className="text-[10px] font-bold uppercase tracking-widest">Today&apos;s Revenue</p>
                    </div>
                    <h2 className="text-4xl font-bold text-foreground">
                        ${branch.todayRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </h2>
                    <p className="text-[10px] text-emerald-500 mt-2 uppercase font-bold tracking-widest">+8.2% vs Yesterday</p>
                </div>
            </div>

            {/* Main Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-xl border border-border bg-card/30 backdrop-blur-sm p-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2 text-foreground">
                            <TrendingUp className="h-4 w-4 text-primary" /> Hourly Sales Performance
                        </h3>
                        <div className="h-[300px] w-full">
                            <ChartContainer width="100%" height="100%">
                                <LineChart
                                    data={[
                                        { time: '08 AM', sales: 120 },
                                        { time: '09 AM', sales: 250 },
                                        { time: '10 AM', sales: 450 },
                                        { time: '11 AM', sales: 700 },
                                        { time: '12 PM', sales: 950 },
                                        { time: '01 PM', sales: 800 },
                                        { time: '02 PM', sales: 650 },
                                        { time: '03 PM', sales: 500 },
                                        { time: '04 PM', sales: 350 },
                                        { time: '05 PM', sales: 200 },
                                    ]}
                                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                >
                                    <ChartGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <ChartXAxis
                                        dataKey="time"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#888888', fontSize: 10, fontWeight: 700 }}
                                        dy={10}
                                    />
                                    <ChartYAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#888888', fontSize: 10, fontWeight: 700 }}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <ChartTooltip
                                        contentStyle={{
                                            backgroundColor: '#111111',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '8px',
                                            fontSize: '10px',
                                            fontWeight: '700'
                                        }}
                                        itemStyle={{ color: '#0070f3' }}
                                        formatter={(value) => [`$${value}`, 'Sales']}
                                    />
                                    <ChartLine
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="#0070f3"
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: '#0070f3', strokeWidth: 2, stroke: '#111111' }}
                                        activeDot={{ r: 6, fill: '#0070f3', strokeWidth: 0 }}
                                    />
                                </LineChart>
                            </ChartContainer>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-xl border border-border bg-card/30 backdrop-blur-sm p-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" /> Upcoming Events
                        </h3>
                        <div className="space-y-4">
                            {[
                                { event: 'Inventory Audit', date: 'Oct 24, 2026', time: '09:00 AM' },
                                { event: 'POS Hardware Upgrade', date: 'Oct 28, 2026', time: '11:30 PM' },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-3 rounded-lg bg-secondary/30 border border-border/50">
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-foreground">{item.event}</p>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-bold">{item.date} • {item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
