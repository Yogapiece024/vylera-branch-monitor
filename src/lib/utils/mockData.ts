export interface SoftwareLicense {
    id: string;
    name: string;
    quantity: number;
    revenue: number;
}

export interface ClientCompany {
    id: string;
    name: string;
    todayTotalRevenue: number;
    employeesPresent: number;
    bestSellingLicenses: SoftwareLicense[];
}

export const CLIENT_MOCK_DATA: ClientCompany[] = [
    {
        id: 'acme-corp',
        name: 'Acme Corp',
        todayTotalRevenue: 45200.00,
        employeesPresent: 124,
        bestSellingLicenses: [
            { id: '1', name: 'Vylera Cloud Enterprise', quantity: 15, revenue: 15000.00 },
            { id: '2', name: 'Sentinel Security Suite', quantity: 28, revenue: 8400.00 },
            { id: '3', name: 'Nexus Data Connector', quantity: 42, revenue: 6300.00 },
            { id: '4', name: 'Omni Analytics Pro', quantity: 12, revenue: 9600.00 },
            { id: '5', name: 'Core API Access', quantity: 55, revenue: 5900.00 }
        ]
    },
    {
        id: 'technova',
        name: 'TechNova',
        todayTotalRevenue: 32150.75,
        employeesPresent: 86,
        bestSellingLicenses: [
            { id: '1', name: 'Vylera Pro Suite', quantity: 22, revenue: 11000.00 },
            { id: '2', name: 'Edge Gateway License', quantity: 35, revenue: 7000.00 },
            { id: '3', name: 'Compute Flex Pack', quantity: 18, revenue: 5400.00 },
            { id: '4', name: 'Storage Vault Plus', quantity: 10, revenue: 4750.75 },
            { id: '5', name: 'Developer Toolset', quantity: 40, revenue: 4000.00 }
        ]
    },
    {
        id: 'global-industries',
        name: 'Global Industries',
        todayTotalRevenue: 68900.50,
        employeesPresent: 210,
        bestSellingLicenses: [
            { id: '1', name: 'Enterprise Proxy Elite', quantity: 8, revenue: 24000.00 },
            { id: '2', name: 'Vylera Pro License', quantity: 45, revenue: 22500.00 },
            { id: '3', name: 'Global CDN Access', quantity: 12, revenue: 12000.00 },
            { id: '4', name: 'AI Optimization Module', quantity: 5, revenue: 7500.50 },
            { id: '5', name: 'Quantum Encryption', quantity: 2, revenue: 2900.00 }
        ]
    }
];

export interface TrafficDataPoint {
    time: string;
    value: number;
    open?: number;
    close?: number;
    high?: number;
    low?: number;
}

export const TRAFFIC_MOCK_DATA: Record<string, TrafficDataPoint[]> = {
    '1h': [
        { time: '00:00', value: 450, open: 420, close: 450, high: 460, low: 410 },
        { time: '00:10', value: 520, open: 450, close: 520, high: 540, low: 440 },
        { time: '00:20', value: 480, open: 520, close: 480, high: 530, low: 470 },
        { time: '00:30', value: 610, open: 480, close: 610, high: 620, low: 470 },
        { time: '00:40', value: 590, open: 610, close: 590, high: 630, low: 580 },
        { time: '00:50', value: 720, open: 590, close: 720, high: 740, low: 570 },
        { time: '01:00', value: 850, open: 720, close: 850, high: 870, low: 710 }
    ],
    '24h': [
        { time: '00:00', value: 2100, open: 1900, close: 2100, high: 2200, low: 1800 },
        { time: '04:00', value: 1800, open: 2100, close: 1800, high: 2300, low: 1700 },
        { time: '08:00', value: 3500, open: 1800, close: 3500, high: 3600, low: 1600 },
        { time: '12:00', value: 4200, open: 3500, close: 4200, high: 4400, low: 3400 },
        { time: '16:00', value: 3800, open: 4200, close: 3800, high: 4300, low: 3700 },
        { time: '20:00', value: 5100, open: 3800, close: 5100, high: 5200, low: 3600 },
        { time: '24:00', value: 6400, open: 5100, close: 6400, high: 6600, low: 5000 }
    ],
    '7d': [
        { time: 'Mon', value: 12000, open: 10000, close: 12000, high: 13000, low: 9000 },
        { time: 'Tue', value: 15000, open: 12000, close: 15000, high: 16000, low: 11000 },
        { time: 'Wed', value: 14000, open: 15000, close: 14000, high: 17000, low: 13000 },
        { time: 'Thu', value: 18000, open: 14000, close: 18000, high: 19000, low: 12000 },
        { time: 'Fri', value: 22000, open: 18000, close: 22000, high: 23000, low: 17000 },
        { time: 'Sat', value: 26000, open: 22000, close: 26000, high: 27000, low: 21000 },
        { time: 'Sun', value: 31000, open: 26000, close: 31000, high: 33000, low: 25000 }
    ],
    '30d': [
        { time: 'Week 1', value: 85000, open: 70000, close: 85000, high: 90000, low: 65000 },
        { time: 'Week 2', value: 92000, open: 85000, close: 92000, high: 98000, low: 80000 },
        { time: 'Week 3', value: 110000, open: 92000, close: 110000, high: 115000, low: 90000 },
        { time: 'Week 4', value: 145000, open: 110000, close: 145000, high: 155000, low: 105000 }
    ]
};


