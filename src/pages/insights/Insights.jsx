import { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Users, Eye, MousePointerClick, Clock } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { getDailyInsights, getGlobalInsights } from "../../services/insight.services";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const fetchInsightsData = async (range, customStart, customEnd) => {
    try {
        // Fetch daily insights based on range
        let start, end;
        const now = new Date();
        if (range === 'custom') {
            if (customStart && customEnd) {
                const startDate = new Date(customStart);
                startDate.setHours(0, 0, 0, 0);
                start = startDate.toISOString();
                
                const endDate = new Date(customEnd);
                endDate.setHours(23, 59, 59, 999);
                end = endDate.toISOString();
            } else {
                return null;
            }
        } else if (range === '7days') {
            const startDate = new Date();
            startDate.setDate(now.getDate() - 7);
            start = startDate.toISOString();
            end = now.toISOString();
        } else if (range === '30days') {
            const startDate = new Date();
            startDate.setDate(now.getDate() - 30);
            start = startDate.toISOString();
            end = now.toISOString();
        } else if (range === 'thisMonth') {
            const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            start = startDate.toISOString();
            end = now.toISOString();
        } else if (range === 'lastMonth') {
            const startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const endDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
            start = startDate.toISOString();
            end = endDate.toISOString();
        }

        const rawDailyData = await getDailyInsights(start, end);
        let dataArray = [];
        
        if (Array.isArray(rawDailyData)) {
            dataArray = rawDailyData;
        } else if (rawDailyData?.data && Array.isArray(rawDailyData.data)) {
            dataArray = rawDailyData.data;
        } else if (rawDailyData?.insights && Array.isArray(rawDailyData.insights)) {
            dataArray = rawDailyData.insights;
        } else if (rawDailyData?.insight && Array.isArray(rawDailyData.insight)) {
            dataArray = rawDailyData.insight;
        } else if (typeof rawDailyData === 'object' && rawDailyData !== null) {
            // Find the first array property in the object
            const arrayVal = Object.values(rawDailyData).find(val => Array.isArray(val));
            if (arrayVal) {
                dataArray = arrayVal;
            }
        }
        
        let totalVisitors = 0;
        let totalPageViews = 0;
        let totalEnquiries = 0;
        let formClicks = 0;
        let whatsappClicks = 0;

        const formattedDailyData = dataArray.map(item => {
            const dateStr = item.createdAt?.$date || item.createdAt || new Date();
            const date = new Date(dateStr);
            const name = !isNaN(date) ? date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : "Unknown";
            
            const enquiriesCount = (item.enquiryClicks?.form || 0) + (item.enquiryClicks?.whatsapp || 0);
            
            totalVisitors += (item.visitors || 0);
            totalPageViews += (item.pageViews || 0);
            totalEnquiries += enquiriesCount;
            formClicks += (item.enquiryClicks?.form || 0);
            whatsappClicks += (item.enquiryClicks?.whatsapp || 0);

            return {
                name,
                pageViews: item.pageViews || 0,
                visitors: item.visitors || 0,
                enquiries: enquiriesCount,
                rawDate: dateStr
            };
        }).sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate)); // Sort oldest to newest (left to right)

        return {
            dailyActivityData: formattedDailyData,
            trafficSourceData: [
                { name: "Form Enquiries", value: formClicks },
                { name: "WhatsApp Enquiries", value: whatsappClicks }
            ],
            stats: [
                { name: "Visitors", value: totalVisitors, change: "", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
                { name: "Page Views", value: totalPageViews, change: "", icon: Eye, color: "text-green-600", bg: "bg-green-100" },
                { name: "Total Enquiries", value: totalEnquiries, change: "", icon: MousePointerClick, color: "text-yellow-600", bg: "bg-yellow-100" },
                { name: "WhatsApp Enquiries", value: whatsappClicks, change: "", icon: MousePointerClick, color: "text-purple-600", bg: "bg-purple-100" },
            ],
            chartTitle: "Activity Overview",
            barTitle: "Enquiries",
        };
    } catch (error) {
        console.error("Error fetching insights data:", error);
        return {
            dailyActivityData: [],
            trafficSourceData: [],
            stats: [
                { name: "Visitors", value: 0, change: "", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
                { name: "Page Views", value: 0, change: "", icon: Eye, color: "text-green-600", bg: "bg-green-100" },
                { name: "Enquiries", value: 0, change: "", icon: MousePointerClick, color: "text-yellow-600", bg: "bg-yellow-100" },
                { name: "WhatsApp Enquiries", value: 0, change: "", icon: MousePointerClick, color: "text-purple-600", bg: "bg-purple-100" },
            ],
            chartTitle: "Activity Overview (Error)",
            barTitle: "Enquiries (Error)",
        };
    }
};

export default function Insights() {
    const [timeRange, setTimeRange] = useState("7days");
    const [customStart, setCustomStart] = useState("");
    const [customEnd, setCustomEnd] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (timeRange === "custom" && (!customStart || !customEnd)) {
            return;
        }
        let isMounted = true;
        setLoading(true);
        fetchInsightsData(timeRange, customStart, customEnd).then((fetchedData) => {
            if (isMounted && fetchedData) {
                setData(fetchedData);
                setLoading(false);
            }
        });
        return () => {
            isMounted = false;
        };
    }, [timeRange, customStart, customEnd]);

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
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm">
                        <option value="7days">Last 7 Days</option>
                        <option value="30days">Last 30 Days</option>
                        <option value="thisMonth">This Month</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="allTime">All Time</option>
                        <option value="custom">Custom Range</option>
                    </select>
                    {timeRange === 'custom' && (
                        <div className="flex items-center gap-2">
                            <input 
                                type="date" 
                                value={customStart}
                                onChange={(e) => setCustomStart(e.target.value)}
                                className="block rounded-md border border-gray-300 py-1.5 px-3 text-sm focus:border-primary-500 focus:ring-primary-500" 
                            />
                            <span className="text-gray-500 text-sm font-medium">to</span>
                            <input 
                                type="date" 
                                value={customEnd}
                                onChange={(e) => setCustomEnd(e.target.value)}
                                className="block rounded-md border border-gray-300 py-1.5 px-3 text-sm focus:border-primary-500 focus:ring-primary-500" 
                            />
                        </div>
                    )}
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
