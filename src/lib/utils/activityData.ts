export interface ActivityLog {
    id: string;
    timestamp: string;
    actor: string;
    action: string;
    target: string;
    severity: 'success' | 'warning' | 'critical' | 'info';
}

export const ACTIVITY_LOGS: ActivityLog[] = [
    {
        id: 'act-001',
        timestamp: '09:12 AM, Mar 11',
        actor: 'System Auto-Sync',
        action: 'Successfully synchronized daily sales',
        target: 'Nexus Core',
        severity: 'success'
    },
    {
        id: 'act-002',
        timestamp: '10:45 AM, Mar 11',
        actor: 'Sarah Chen',
        action: 'Updated branch operating hours',
        target: 'Nexus Core',
        severity: 'info'
    },
    {
        id: 'act-003',
        timestamp: '11:20 AM, Mar 11',
        actor: 'System Auto-Sync',
        action: 'Failed to sync inventory data',
        target: 'Horizon Hub',
        severity: 'critical'
    },
    {
        id: 'act-004',
        timestamp: '01:30 PM, Mar 11',
        actor: 'Marcus Thorne',
        action: 'Downloaded weekly revenue report',
        target: 'Regional Office',
        severity: 'success'
    },
    {
        id: 'act-005',
        timestamp: '02:15 PM, Mar 11',
        actor: 'System Security',
        action: 'Detected unusual login attempt',
        target: 'Management Portal',
        severity: 'warning'
    },
    {
        id: 'act-006',
        timestamp: '03:40 PM, Mar 11',
        actor: 'Elena Rodriguez',
        action: 'Scheduled maintenance window',
        target: 'Vertex Point',
        severity: 'info'
    },
    {
        id: 'act-007',
        timestamp: '04:55 PM, Mar 11',
        actor: 'System Auto-Sync',
        action: 'Latency spike detected in POS sync',
        target: 'Stellar Station',
        severity: 'warning'
    },
    {
        id: 'act-008',
        timestamp: '05:30 PM, Mar 11',
        actor: 'Jameson Wu',
        action: 'Authorized system-wide software patch',
        target: 'All Nodes',
        severity: 'success'
    }
];
