import { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Users, Eye, MousePointerClick, Clock } from "lucide-react";
import { ClipLoader } from "react-spinners";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Mock function to simulate fetching data from the database
const fetchInsightsData = async (range) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (range === "allTime") {
        return {
            dailyActivityData: [
                { name: "2020", pageViews: 40000, visitors: 24000, enquiries: 240 },
                { name: "2021", pageViews: 60000, visitors: 35000, enquiries: 380 },
                { name: "2022", pageViews: 85000, visitors: 48000, enquiries: 550 },
                { name: "2023", pageViews: 120000, visitors: 78000, enquiries: 890 },
                { name: "2024", pageViews: 150000, visitors: 95000, enquiries: 1100 },
                { name: "2025", pageViews: 180000, visitors: 115000, enquiries: 1350 },
                { name: "2026", pageViews: 210000, visitors: 145000, enquiries: 1600 },
            ],
            trafficSourceData: [
                { name: "Organic Search", value: 4500 },
                { name: "Direct", value: 3100 },
                { name: "Social Media", value: 2800 },
                { name: "Referral", value: 1600 },
            ],
            stats: [
                { name: "Total Visitors (All Time)", value: "540K", change: "+150%", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
                { name: "Total Page Views", value: "845K", change: "+180%", icon: Eye, color: "text-green-600", bg: "bg-green-100" },
                { name: "Avg. Click Rate", value: "16.5%", change: "+5.2%", icon: MousePointerClick, color: "text-yellow-600", bg: "bg-yellow-100" },
                { name: "Avg. Session", value: "4m 15s", change: "+30s", icon: Clock, color: "text-purple-600", bg: "bg-purple-100" },
            ],
            chartTitle: "Historical Activity Overview (Yearly)",
            barTitle: "Total enquiries (Yearly)",
        };
    }

    // Default to 7 days or other mock data
    return {
        dailyActivityData: [
            { name: "Mon", pageViews: 4000, visitors: 2400, enquiries: 24 },
            { name: "Tue", pageViews: 3000, visitors: 1398, enquiries: 18 },
            { name: "Wed", pageViews: 2000, visitors: 9800, enquiries: 45 },
            { name: "Thu", pageViews: 2780, visitors: 3908, enquiries: 30 },
            { name: "Fri", pageViews: 1890, visitors: 4800, enquiries: 38 },
            { name: "Sat", pageViews: 2390, visitors: 3800, enquiries: 50 },
            { name: "Sun", pageViews: 3490, visitors: 4300, enquiries: 42 },
        ],
        trafficSourceData: [
            { name: "Organic Search", value: 400 },
            { name: "Direct", value: 300 },
            { name: "Social Media", value: 300 },
            { name: "Referral", value: 200 },
        ],
        stats: [
            { name: "Total Visitors", value: "45.2K", change: "+12%", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
            { name: "Page Views", value: "128.4K", change: "+8%", icon: Eye, color: "text-green-600", bg: "bg-green-100" },
            { name: "Click Rate", value: "14.2%", change: "+2.4%", icon: MousePointerClick, color: "text-yellow-600", bg: "bg-yellow-100" },
            { name: "Avg. Session", value: "3m 45s", change: "-10s", icon: Clock, color: "text-purple-600", bg: "bg-purple-100" },
        ],
        chartTitle: "Daily Activity Overview",
        barTitle: "enquiries (Last 7 Days)",
    };
};

export default function Insights() {
    const [timeRange, setTimeRange] = useState("7days");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        fetchInsightsData(timeRange).then((fetchedData) => {
            if (isMounted) {
                setData(fetchedData);
                setLoading(false);
            }
        });
        return () => {
            isMounted = false;
        };
    }, [timeRange]);

    if (loading || !data) {
        return (
            <div className="flex h-screen items-center justify-center">
                {/* <div className="text-gray-500">Loading insights data...</div> */}
                <ClipLoader size={160} className="-mt-40" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Insights & Analytics</h1>
                    <p className="mt-1 text-sm text-gray-500">Track your website's activity, visitor statistics, and daily performance.</p>
                </div>
                <div className="flex items-center gap-2">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm">
                        <option value="7days">Last 7 Days</option>
                        <option value="30days">Last 30 Days</option>
                        <option value="thisMonth">This Month</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="allTime">All Time</option>
                    </select>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {data.stats.map((stat) => (
                    <div key={stat.name} className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                        <dt>
                            <div className={`absolute rounded-md p-3 ${stat.bg}`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} aria-hidden="true" />
                            </div>
                            <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
                        </dt>
                        <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                            <p
                                className={`ml-2 flex items-baseline text-sm font-semibold ${
                                    stat.change.startsWith("+") ? "text-green-600" : "text-red-600"
                                }`}>
                                {stat.change}
                            </p>
                        </dd>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Daily/Yearly Activity Chart */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">{data.chartTitle}</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.dailyActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pageViews" name="Page Views" stroke="#0088FE" strokeWidth={2} activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="visitors" name="Unique Visitors" stroke="#00C49F" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Traffic Sources Chart */}
                <div className="rounded-lg bg-white p-6 shadow">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Traffic Sources</h2>
                    <div className="h-80 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.trafficSourceData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                    {data.trafficSourceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* enquiries Bar Chart */}
                <div className="rounded-lg bg-white p-6 shadow lg:col-span-2">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">{data.barTitle}</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.dailyActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="enquiries" name="New enquiries" fill="#FFBB28" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
