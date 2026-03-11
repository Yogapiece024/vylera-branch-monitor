'use client';

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { CLIENT_MOCK_DATA } from '@/lib/utils/mockData';

export function CompanyRevenueChart() {
    const data = CLIENT_MOCK_DATA.map(client => ({
        name: client.name,
        revenue: client.todayTotalRevenue,
    }));

    // Colors mapping for the companies: electric blue, gray, light blue (more visible)
    const COLORS = ['#0070f3', '#888888', '#bae6fd'];

    return (
        <div className="h-[300px] w-full p-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="rgba(255,255,255,0.05)"
                    />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#888888', fontSize: 10, fontWeight: 700 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#888888', fontSize: 10, fontWeight: 700 }}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        contentStyle={{
                            backgroundColor: '#111111',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: '700'
                        }}
                        itemStyle={{ color: '#ffffff' }}
                        formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Revenue']} // eslint-disable-line @typescript-eslint/no-explicit-any
                    />
                    <Bar
                        dataKey="revenue"
                        radius={[4, 4, 0, 0]}
                        barSize={60}
                        animationDuration={1500}
                        stroke="rgba(0,0,0,0.1)"
                        strokeWidth={1}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
