import { useEffect, useState } from "react";
import { X, Search, Package as PackageIcon, Calendar, User, Mail, Phone, Users, MessageSquare, CheckCircle2, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import { deleteEnquiry, getEnquiries, updateEnquiryStatus } from "../../services/enquiry.services";
import { Link } from "react-router-dom";
import whatsapp from "../../assets/whatsapp.png";
import phone from "../../assets/phone.png";

export default function EnquiriesList() {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [page, setPage] = useState(0);
    const [status, setStatus] = useState("");
    const [allLoaded, setAllLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    useEffect(() => {
        const fetchEnquiries = async () => {
            setLoading(true);
            try {
                const data = await getEnquiries(0, status, debouncedSearch);
                setEnquiries(data.enquiries);
                setPage(1);
                setAllLoaded(data.enquiries.length < 20);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchEnquiries();
    }, [status, debouncedSearch]);

    const handleComplete = async (id) => {
        try {
            await updateEnquiryStatus(id);
            setEnquiries((prev) => prev.map((e) => (e._id === id ? { ...e, status: "completed" } : e)));
            setSelectedEnquiry((prev) => ({ ...prev, status: "completed" }));
            toast.success("Enquiry marked as served!");
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to serve");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteEnquiry(id);
            setEnquiries((prev) => prev.filter((e) => e._id !== id));
            setSelectedEnquiry(null);
            toast.success("Enquiry Deleted Successfully");
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to serve");
        }
    };

    const handleLoadMore = async () => {
        console.log("Laod more triggered", page);
        try {
            const data = await getEnquiries(page, status, debouncedSearch);
            setEnquiries((prev) => [...prev, ...data.enquiries]);
            setPage((prev) => prev + 1);
            setAllLoaded(data.enquiries.length < 20);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Enquiries</h1>
                    <p className="mt-2 text-sm text-gray-500">Manage all customer enquiries received from your website.</p>
                </div>
            </div>

            {/* Filters/Search Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm ring-1 ring-gray-900/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto flex-1">
                    <div className="relative w-full max-w-md">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search enquiries by name or package..."
                            className="block w-full rounded-lg border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition-all"
                        />
                    </div>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="block w-full max-w-[150px] rounded-lg border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6">
                        <option value="">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 whitespace-nowrap">
                    Total Enquiries: <span className="text-gray-900 font-bold">{enquiries.length}</span>
                </div>
            </div>

            <div className="mt-6 overflow-hidden shadow-sm ring-1 ring-gray-900/5 rounded-xl bg-white">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50/50">
                        <tr>
                            <th className="py-4 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider sm:pl-6">Name</th>
                            <th className="px-3 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Package</th>
                            <th className="px-3 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {enquiries.length === 0 && (
                            <tr>
                                <td colSpan="3" className="py-12 text-center text-md font-semibold text-gray-500">
                                    No enquiries yet
                                </td>
                            </tr>
                        )}
                        {!loading &&
                            enquiries.map((enq) => (
                                <tr
                                    key={enq._id}
                                    onClick={() => setSelectedEnquiry(enq)}
                                    className={`cursor-pointer ${enq.status === "pending" ? "bg-orange-50 text-orange-700 hover:bg-orange-100" : ""} transition-colors group`}>
                                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-6">
                                        <div className="flex items-center">
                                            <div>
                                                <div className="font-semibold">{enq.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm font-medium">
                                        <div className="flex gap-1.5 text-wrap">
                                            {/* <PackageIcon className="w-4 h-4 text-primary-500" /> */}
                                            <span>{enq.package}</span>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-5 text-sm">
                                        <span
                                            className={`bg-blue-200 inline-flex items-center gap-1 rounded-full px-1.5 py-1 text-xs font-semibold ring-1 ring-inset ${enq.status === "completed" ? "bg-green-50 text-green-700 ring-green-600/20" : "bg-orange-50 text-orange-700 ring-orange-600/20"}`}>
                                            {enq.status === "completed" ? (
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                            ) : (
                                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                                            )}
                                            {enq.status === "completed" ? "Served" : "Pending"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        {enquiries.length !== 0 && (
                            <tr>
                                <td colSpan="3" className="py-4 text-center text-md border-t border-primary-200">
                                    {!allLoaded ? (
                                        <button
                                            onClick={handleLoadMore}
                                            className="text-primary-600 font-semibold hover:text-primary-500 transition-colors cursor-pointer">
                                            Load more
                                        </button>
                                    ) : (
                                        <span className="text-gray-500 font-semibold transition-colors">No more Enquiries</span>
                                    )}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedEnquiry && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-2 text-center sm:items-center sm:p-0">
                        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={() => setSelectedEnquiry(null)} />

                        <div className="relative w-full transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-xl animate-in fade-in zoom-in-95 duration-200">
                            <div className="absolute right-0 top-0 pr-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setSelectedEnquiry(null)}
                                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 hover:bg-gray-100 p-1 transition-colors">
                                    <span className="sr-only">Close</span>
                                    <X className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>

                            <div className="px-6 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="h-14 w-14 flex-shrink-0 rounded-full bg-primary-100 flex items-center justify-center border border-primary-200 text-primary-700 font-bold text-2xl">
                                        {selectedEnquiry.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 leading-none">{selectedEnquiry.name}</h3>
                                        <span className="inline-flex gap-1 mt-2 text-xs font-semibold text-primary-700 bg-primary-50 px-2.5 py-1 rounded-xl border border-primary-100">
                                            <PackageIcon className="w-3.5 h-3.5" />
                                            <span>{selectedEnquiry.package}</span>
                                        </span>
                                    </div>
                                </div>

                                <span
                                    className={`inline-flex items-center gap-1 rounded-full px-1.5 py-1 text-xs font-semibold ring-1 ring-inset ${selectedEnquiry.status === "completed" ? "bg-green-50 text-green-700 ring-green-600/20" : "bg-orange-50 text-orange-700 ring-orange-600/20"}`}>
                                    {selectedEnquiry.status === "completed" ? (
                                        <CheckCircle2 className="w-4 h-4" />
                                    ) : (
                                        <span className="relative flex h-2 w-2 mr-1">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                        </span>
                                    )}
                                    {selectedEnquiry.status === "completed" ? "Served" : "Pending"}
                                </span>
                            </div>

                            <div className="px-6 py-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 sm:col-span-2">
                                        <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                                                Enquiry Date & Time
                                            </span>
                                            <span className="block text-sm font-medium text-gray-900">
                                                {selectedEnquiry.createdAt
                                                    ? new Date(selectedEnquiry.createdAt).toLocaleString("en-US", {
                                                          day: "numeric",
                                                          month: "short",
                                                          year: "numeric",
                                                          hour: "numeric",
                                                          minute: "2-digit",
                                                          hour12: true,
                                                      })
                                                    : "Not available"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1"></span>
                                            <span className="block text-sm font-medium text-gray-900">{selectedEnquiry.email || "Not provided"}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Phone Number</span>
                                            <span className="flex items-center gap-2 text-sm font-medium text-gray-900">
                                                <span>{selectedEnquiry.phone || "Not provided"}</span>
                                                <a
                                                    href={`tel:${selectedEnquiry.phone}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700  hover:bg-gray-200 py-2 px-3 rounded-full transition-colors">
                                                    <img src={phone} alt="" className="w-4 h-4" /> Call
                                                </a>
                                            </span>
                                            {selectedEnquiry.phone && (
                                                <a
                                                    href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, "")}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-green-800 bg-green-100 hover:bg-green-200 px-3 py-1.5 rounded-lg transition-colors">
                                                    <img src={whatsapp} alt="" className="w-5 h-5" /> Message on WhatsApp
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 sm:col-span-2">
                                        <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div className="flex gap-8">
                                            <div>
                                                <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Adults</span>
                                                <span className="block text-lg font-bold text-gray-900">{selectedEnquiry.adults}</span>
                                            </div>
                                            <div>
                                                <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Kids</span>
                                                <span className="block text-lg font-bold text-gray-900">{selectedEnquiry.kids || 0}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {selectedEnquiry.message && (
                                        <div className="sm:col-span-2 relative mt-2">
                                            <div className="flex items-start gap-2 mb-2">
                                                <MessageSquare className="w-4 h-4 text-primary-500" />
                                                <span className="block text-xs font-bold text-gray-900 uppercase tracking-wide">
                                                    Customer Message
                                                </span>
                                            </div>
                                            <div className="bg-primary-50/50 p-4 rounded-xl border border-primary-100 text-sm text-gray-800 leading-relaxed italic">
                                                "{selectedEnquiry.message}"
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-gray-50 px-6 py-4 flex items-center justify-end border-t border-gray-100 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setSelectedEnquiry(null)}
                                    className="inline-flex justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 transition-colors">
                                    Close
                                </button>
                                {selectedEnquiry.status === "pending" && (
                                    <button
                                        type="button"
                                        onClick={() => handleComplete(selectedEnquiry._id)}
                                        className="inline-flex items-center gap-1.5 justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 transition-colors">
                                        <CheckCircle2 className="w-4 h-4" /> Mark as Served
                                    </button>
                                )}
                                {selectedEnquiry.status === "completed" && (
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(selectedEnquiry._id)}
                                        className="inline-flex items-center gap-1.5 justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 transition-colors">
                                        <CheckCircle2 className="w-4 h-4" /> Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
