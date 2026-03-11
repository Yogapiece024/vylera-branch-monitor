export interface BranchRecord {
    id: string;
    branchName: string;
    location: string;
    managerName: string;
    status: 'Active' | 'Maintenance';
    todayRevenue: number;
}

export const BRANCH_RECORDS: BranchRecord[] = [
    {
        id: 'b-001',
        branchName: 'Nexus Core',
        location: 'San Francisco, CA',
        managerName: 'Sarah Chen',
        status: 'Active',
        todayRevenue: 48500.25
    },
    {
        id: 'b-002',
        branchName: 'Horizon Hub',
        location: 'Austin, TX',
        managerName: 'Marcus Thorne',
        status: 'Active',
        todayRevenue: 32100.50
    },
    {
        id: 'b-003',
        branchName: 'Vertex Point',
        location: 'Seattle, WA',
        managerName: 'Elena Rodriguez',
        status: 'Maintenance',
        todayRevenue: 12400.00
    },
    {
        id: 'b-004',
        branchName: 'Stellar Station',
        location: 'Denver, CO',
        managerName: 'Jameson Wu',
        status: 'Active',
        todayRevenue: 28900.75
    },
    {
        id: 'b-005',
        branchName: 'Prime Node',
        location: 'Chicago, IL',
        managerName: 'Amara Okafor',
        status: 'Active',
        todayRevenue: 41200.80
    }
];
