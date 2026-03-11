export interface Incident {
    traceId: string;
    anomaly: string;
    impactLevel: 'Critical' | 'High' | 'Medium' | 'Low';
    resolutionState: 'Open' | 'Active' | 'Resolved';
    timestamp: string;
    leadEngineer: string;
}

export const INCIDENT_RECORDS: Incident[] = [
    {
        traceId: 'INC-001',
        anomaly: 'Database Sync Failure in Branch Nexus',
        impactLevel: 'Critical',
        resolutionState: 'Open',
        timestamp: 'Mar 11, 09:12 AM',
        leadEngineer: 'Cloud Infrastructure Team'
    },
    {
        traceId: 'INC-002',
        anomaly: 'LTE Failover Engaged in Horizon Hub',
        impactLevel: 'High',
        resolutionState: 'Active',
        timestamp: 'Mar 11, 10:45 AM',
        leadEngineer: 'Network Ops'
    },
    {
        traceId: 'INC-003',
        anomaly: 'POS Terminal 4 Kernel Panic',
        impactLevel: 'Medium',
        resolutionState: 'Open',
        timestamp: 'Mar 11, 11:30 AM',
        leadEngineer: 'Andi - Onsite Tech'
    },
    {
        traceId: 'INC-004',
        anomaly: 'NFC Reader Latency Spike',
        impactLevel: 'Low',
        resolutionState: 'Resolved',
        timestamp: 'Mar 11, 01:15 PM',
        leadEngineer: 'Hardware Support'
    },
    {
        traceId: 'INC-005',
        anomaly: 'Unusual Login Pattern Detected',
        impactLevel: 'High',
        resolutionState: 'Active',
        timestamp: 'Mar 11, 02:20 PM',
        leadEngineer: 'Cyber Security'
    },
    {
        traceId: 'INC-006',
        anomaly: 'Inventory Service Memory Leak',
        impactLevel: 'Medium',
        resolutionState: 'Open',
        timestamp: 'Mar 11, 03:45 PM',
        leadEngineer: 'Backend Development'
    }
];
