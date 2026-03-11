'use client';

import React from 'react';
import {
  GitBranch,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight,
  Activity,
  Zap,
  Server,
  Filter,
  Download,
  MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { RevenueChart } from '@/components/common/RevenueChart';
import { CompanyRevenueChart } from '@/components/common/CompanyRevenueChart';
import { CLIENT_MOCK_DATA, ClientCompany, SoftwareLicense } from '@/lib/utils/mockData';

export default function DashboardPage() {
  // Calculate aggregate metrics from mock data
  const totalRevenue = CLIENT_MOCK_DATA.reduce((acc: number, curr: ClientCompany) => acc + curr.todayTotalRevenue, 0);
  const totalEmployees = CLIENT_MOCK_DATA.reduce((acc: number, curr: ClientCompany) => acc + curr.employeesPresent, 0);
  const totalItemsSold = CLIENT_MOCK_DATA.reduce((acc: number, curr: ClientCompany) =>
    acc + curr.bestSellingLicenses.reduce((sum: number, item: SoftwareLicense) => sum + item.quantity, 0), 0
  );

  const stats = [

    {
      label: 'Network Revenue',
      value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      trend: '+12.5%',
      icon: Zap,
      color: 'text-primary'
    },
    {
      label: 'Staff Active',
      value: totalEmployees.toString(),
      trend: 'Optimal',
      icon: Server,
      color: 'text-foreground'
    },
    {
      label: 'Total Units Sold',
      value: totalItemsSold.toLocaleString(),
      trend: '+8.2%',
      icon: Activity,
      color: 'text-primary'
    },
  ];

  const [timeframe, setTimeframe] = React.useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [chartType, setChartType] = React.useState<'area' | 'candlestick'>('area');

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Global Monitor</h1>
          <p className="text-sm text-muted-foreground mt-1">Real-time infrastructure health and client distribution.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest border border-border rounded-md hover:bg-secondary transition-colors">
            <Filter className="h-3 w-3" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest bg-foreground text-background rounded-md hover:opacity-90 transition-opacity">
            <Download className="h-3 w-3" />
            Report
          </button>
        </div>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all hover:border-border/80 hover:shadow-2xl hover:shadow-primary/5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg bg-secondary", stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ring-1 ring-inset",
                stat.color === 'text-destructive' ? "bg-destructive/10 text-destructive ring-destructive/20" : "bg-primary/10 text-primary ring-primary/20"
              )}>
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              <h2 className="text-4xl font-bold mt-1 tracking-tighter">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Middle: Large Chart Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Analysis Area */}
        <div className="rounded-xl border border-border bg-card/30 backdrop-blur-md overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Activity className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold uppercase tracking-widest">Traffic Analysis</h3>
            </div>
            <div className="flex items-center gap-4">
              {/* Chart Type Toggle */}
              <div className="flex items-center bg-secondary/50 rounded-lg p-1">
                <button
                  onClick={() => setChartType('area')}
                  className={cn(
                    "px-2 py-1 text-[9px] font-bold uppercase rounded transition-all",
                    chartType === 'area' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Area
                </button>
                <button
                  onClick={() => setChartType('candlestick')}
                  className={cn(
                    "px-2 py-1 text-[9px] font-bold uppercase rounded transition-all",
                    chartType === 'candlestick' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Candle
                </button>
              </div>
              {/* Timeframe Selector */}
              <div className="flex items-center gap-1">
                {['1h', '24h', '7d', '30d'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeframe(t as '1h' | '24h' | '7d' | '30d')}
                    className={cn(
                      "px-2 py-1 text-[10px] font-bold uppercase rounded transition-colors",
                      t === timeframe ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                    )}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full relative">
            <RevenueChart timeframe={timeframe} type={chartType} />
          </div>
        </div>


        {/* Revenue Comparison Area */}
        <div className="rounded-xl border border-border bg-card/30 backdrop-blur-md overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold uppercase tracking-widest">Revenue Comparison</h3>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Today</span>
          </div>
          <div className="h-[300px] w-full relative">
            <CompanyRevenueChart />
          </div>
        </div>
      </div>



      {/* Bottom: Table Area */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">Top Performing Software Licenses</h3>
          <button className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Cumulative Data</button>
        </div>
        <div className="rounded-xl border border-border bg-card/30 backdrop-blur-sm shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse min-w-[600px] md:min-w-0">
              <thead>
                <tr className="bg-secondary/50 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border">
                  <th className="px-6 py-4 font-bold">License Name</th>
                  <th className="px-6 py-4 font-bold">Client Company</th>
                  <th className="px-6 py-4 font-bold text-right">Quantity Sold</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {CLIENT_MOCK_DATA.flatMap((client: ClientCompany) =>
                  client.bestSellingLicenses.map((license: SoftwareLicense) => ({
                    ...license,
                    clientName: client.name
                  }))
                )
                  .sort((a, b) => b.quantity - a.quantity) // Sort by quantity sold
                  .map((row, index) => (
                    <tr key={`${row.clientName}-${row.id}`} className="group hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Zap className={cn("h-3 w-3", index < 3 ? "text-primary" : "text-muted-foreground")} />
                          <span className="font-bold tracking-tight text-foreground">{row.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-secondary border border-border/50">
                          {row.clientName}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-mono text-xs font-bold text-foreground bg-secondary/30 px-2 py-1 rounded">
                          {row.quantity.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
