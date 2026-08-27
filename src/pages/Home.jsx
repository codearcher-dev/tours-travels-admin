import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Mail, Package, MapPin, TrendingUp } from "lucide-react";

const data = [
    { name: "Jan", enquiries: 40 },
    { name: "Feb", enquiries: 30 },
    { name: "Mar", enquiries: 20 },
    { name: "Apr", enquiries: 27 },
    { name: "May", enquiries: 18 },
    { name: "Jun", enquiries: 23 },
    { name: "Jul", enquiries: 34 },
];

const stats = [
    { name: "Total Packages", stat: "12", icon: Package, bgColor: "bg-blue-500", trend: "+2 this month" },
    { name: "Total Destinations", stat: "8", icon: MapPin, bgColor: "bg-purple-500", trend: "Stable" },
    { name: "Unique Visitors", stat: "2,400", icon: Users, bgColor: "bg-green-500", trend: "+12% vs last month" },
    { name: "New Enquiries", stat: "24", icon: Mail, bgColor: "bg-orange-500", trend: "Needs attention" },
];

export default function Home() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-12">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard Overview</h1>
                <p className="mt-2 text-sm text-gray-500">Monitor your business metrics, enquiries, and package performance.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <div
                        key={item.name}
                        className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 transition-all hover:shadow-md hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div className={`inline-flex rounded-xl p-3 ${item.bgColor} bg-opacity-10`}>
                                <item.icon className={`h-6 w-6 ${item.bgColor.replace("bg-", "text-")}`} aria-hidden="true" />
                            </div>
                            <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{item.trend}</span>
                        </div>
                        <div className="mt-4">
                            <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
                            <dd className="mt-1 flex items-baseline">
                                <div className="text-3xl font-extrabold text-gray-900 tracking-tight">{item.stat}</div>
                            </dd>
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
                        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
