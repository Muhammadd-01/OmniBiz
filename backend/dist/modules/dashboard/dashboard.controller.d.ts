export declare class DashboardController {
    getMetrics(tenantId: string): Promise<{
        data: {
            totalRevenue: number;
            activeCustomers: number;
            pendingOrders: number;
            staffCount: number;
            recentActivity: ({
                type: string;
                amount: number;
                time: string;
                name?: undefined;
            } | {
                type: string;
                name: string;
                time: string;
                amount?: undefined;
            })[];
        };
    }>;
}
