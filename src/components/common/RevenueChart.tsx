'use client';

import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ComposedChart,
    Bar,
    Cell
} from 'recharts';
import { TRAFFIC_MOCK_DATA, TrafficDataPoint } from '@/lib/utils/mockData';

interface RevenueChartProps {
    timeframe?: '1h' | '24h' | '7d' | '30d';
    type?: 'area' | 'candlestick';
}

const CandlestickShape = (props: any) => {
    const { x, y, width, height, open, close, high, low, fill } = props;
    const isUp = close > open;
    const color = isUp ? '#10b981' : '#ef4444'; // Green for up, Red for down
    const wickColor = isUp ? '#10b981' : '#ef4444';

    // Calculate wick positions
    // We need to map the values to pixel coordinates. Recharts handles this via the YAxis.
    // However, custom shapes in Bar get the 'y' and 'height' of the bar itself.
    // For candlestick, the bar represents [min(open,close), max(open,close)].

    // Since we are using a custom shape on a Bar, Recharts provides coordinates.
    // But we need the High/Low coordinates too. 
    // A better approach is to use multiple bars or a more complex custom shape if we can get those values.

    // In Recharts custom shape, we can access the full payload.
    const { payload } = props;
    const { high: highVal, low: lowVal, open: openVal, close: closeVal } = payload;

    // Helper to get Y coordinate for a value
    // This is tricky because we don't have direct access to the scale function here easily.
    // But Recharts passes 'y' which corresponds to the top of the bar.

    return (
        <g>
            {/* Wick */}
            <line
                x1={x + width / 2}
                y1={y - (height * (highVal - Math.max(openVal, closeVal)) / Math.abs(openVal - closeVal))}
                x2={x + width / 2}
                y2={y + height + (height * (Math.min(openVal, closeVal) - lowVal) / Math.abs(openVal - closeVal))}
                stroke={wickColor}
                strokeWidth={2}
            />
            {/* Body */}
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={color}
                rx={2}
            />
        </g>
    );
};

export function RevenueChart({ timeframe = '24h', type = 'area' }: RevenueChartProps) {
    const data = TRAFFIC_MOCK_DATA[timeframe] || TRAFFIC_MOCK_DATA['24h'];

    if (type === 'candlestick') {
        return (
            <div className="h-[300px] w-full p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="rgba(255,255,255,0.05)"
                        />
                        <XAxis
                            dataKey="time"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#888888', fontSize: 10, fontWeight: 700 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#888888', fontSize: 10, fontWeight: 700 }}
                            tickFormatter={(value) => value > 1000 ? `${(value / 1000).toFixed(1)}k` : value}
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
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const d = payload[0].payload;
                                    return (
                                        <div className="bg-[#111111] border border-white/10 p-3 rounded-lg shadow-xl">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase mb-2">{d.time}</p>
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                                <p className="text-[10px] text-muted-foreground uppercase">Open</p>
                                                <p className="text-xs font-bold text-white text-right">{d.open?.toLocaleString()}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase">High</p>
                                                <p className="text-xs font-bold text-emerald-400 text-right">{d.high?.toLocaleString()}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase">Low</p>
                                                <p className="text-xs font-bold text-red-400 text-right">{d.low?.toLocaleString()}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase">Close</p>
                                                <p className="text-xs font-bold text-white text-right">{d.close?.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar
                            dataKey={(d: TrafficDataPoint) => [Math.min(d.open || 0, d.close || 0), Math.max(d.open || 0, d.close || 0)]}
                            shape={<CandlestickShape />}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        );
    }

    return (
        <div className="h-[300px] w-full p-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <defs>
                        <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0070f3" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#0070f3" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="rgba(255,255,255,0.05)"
                    />
                    <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#888888', fontSize: 10, fontWeight: 700 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#888888', fontSize: 10, fontWeight: 700 }}
                        tickFormatter={(value) => value > 1000 ? `${(value / 1000).toFixed(1)}k` : value}
                    />
                    <Tooltip
                        cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                        contentStyle={{
                            backgroundColor: '#111111',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: '700'
                        }}
                        itemStyle={{ color: '#ffffff' }}
                        formatter={(value: any) => [`${Number(value || 0).toLocaleString()}`, 'Traffic']} // eslint-disable-line @typescript-eslint/no-explicit-any
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#0070f3"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorTraffic)"
                        animationDuration={2000}
                        animationBegin={300}
                        animationEasing="ease-in-out"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}


