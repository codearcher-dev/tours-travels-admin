import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Mail, Package, MapPin, TrendingUp } from "lucide-react";
import { useData } from "../context/PackageContext";
import { useEffect, useState } from "react";
import CountUp from "../components/ui/CountUp";
import { useNavigate } from "react-router-dom";

const barData = [
    { name: "Jan", enquiries: 40 },
    { name: "Feb", enquiries: 30 },
    { name: "Mar", enquiries: 20 },
    { name: "Apr", enquiries: 27 },
    { name: "May", enquiries: 18 },
    { name: "Jun", enquiries: 23 },
    { name: "Jul", enquiries: 34 },
];

export default function Home() {
    const data = useData();
    const navigate = useNavigate();

    const [stats, setStats] = useState([]);

    useEffect(
        () =>
            setStats([
                { id: 1, name: "Total Packages", stat: data?.packages.length, icon: Package, bgColor: "bg-blue-500/20", trend: "+2 this month" },
                { id: 2, name: "Total Destinations", stat: data?.destinations.length, icon: MapPin, bgColor: "bg-purple-500/20", trend: "Stable" },
                { id: 3, name: "Unique Visitors", stat: "542", icon: Users, bgColor: "bg-green-500/20", trend: "+12%" },
                { id: 4, name: "New Enquiries", stat: data.pendingCount, icon: Mail, bgColor: "bg-orange-500/20", trend: "Attention" },
            ]),
        [data],
    );

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-12">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard Overview</h1>
                <p className="mt-2 text-sm text-gray-500">Monitor your business metrics, enquiries, and package performance.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => item.id === 4 && navigate("/enquiries")}
                        className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-900/5 transition-all hover:shadow-md hover:-translate-y-1">
                        <div className="flex items-center justify-between xl:relative">
                            <div className="flex items-center gap-4">
                                <div className={`inline-flex rounded-xl p-3 ${item.bgColor}`}>
                                    <item.icon className={`h-6 w-6 ${item.bgColor.replace("bg-", "text-").replace("/20", "")}`} aria-hidden="true" />
                                </div>
                                <div className="flex flex-col">
                                    <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
                                    <dd className="flex items-baseline">
                                        <div className="text-2xl font-extrabold text-gray-900 tracking-tight">
                                            <CountUp
                                                from={0}
                                                to={item.stat}
                                                separator=","
                                                direction="up"
                                                duration={1}
                                                className={`count-up-text text-slate-500`}
                                                delay={0}
                                            />
                                        </div>
                                    </dd>
                                </div>
                            </div>
                            <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full xl:absolute right-0 bottom-0">
                                {item.trend}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-900/5 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary-600" />
                        <h2 className="text-lg font-semibold leading-7 text-gray-900">Enquiries Trend</h2>
                    </div>
                    <select className="text-sm border-0 bg-gray-50 rounded-lg py-1.5 pl-3 pr-8 text-gray-600 focus:ring-0 cursor-pointer">
                        <option>Last 7 Months</option>
                        <option>This Year</option>
                    </select>
                </div>

                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                            <Tooltip
                                cursor={{ fill: "#f3f4f6" }}
                                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                            />
                            <Bar dataKey="enquiries" fill="#0ea5e9" radius={[6, 6, 0, 0]} maxBarSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
