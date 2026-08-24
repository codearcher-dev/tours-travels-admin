import { useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, Plus, Search, X, MapPin, ImageIcon, ChevronDown, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";
import { usePackages } from "../../context/PackageContext";
import Gallery from "../../components/Gallery";

export default function DestinationsList() {
    const data = usePackages();
    const [destinations, setDestinations] = useState(data.destinations);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [showGallery, setShowGallery] = useState(false);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this destination?")) {
            setDestinations(destinations.filter((d) => d.id !== id));
            toast.success("Destination deleted successfully");
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12 relative">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Destinations</h1>
                    <p className="mt-2 text-sm text-gray-500">Manage all travel destinations and the key places within them.</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Link
                        to="/destinations/new"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all hover:shadow-md">
                        <Plus className="h-4 w-4" />
                        Add New Destination
                    </Link>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm ring-1 ring-gray-900/5 flex items-center justify-between">
                <div className="relative w-full max-w-md">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search destinations..."
                        className="block w-full rounded-lg border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition-all"
                    />
                </div>
            </div>

            <div className="mt-6 overflow-hidden shadow-sm ring-1 ring-gray-900/5 rounded-xl bg-white">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50/50">
                        <tr>
                            <th className="w-16 py-4 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider sm:pl-6">S.No.</th>
                            <th className="px-3 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                Destination Info
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {destinations.map((dest, i) => (
                            <tr
                                key={dest._id}
                                onClick={() => setSelectedDestination(dest)}
                                className="hover:bg-gray-50/80 transition-colors group cursor-pointer">
                                <td className="w-16 whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-6">
                                    <div className="flex items-center">
                                        <div className="text-gray-500 text-sm font-medium">{i + 1}</div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-5 text-sm">
                                    <div className="flex items-center">
                                        <div>
                                            <div className="font-semibold text-gray-900">{dest.name}</div>
                                            <div className="text-gray-500 text-xs mt-0.5 font-medium">{dest.places?.length || 0} places</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {destinations.length === 0 && (
                            <tr>
                                <td colSpan="2" className="py-12 text-center text-sm text-gray-500">
                                    No destinations found.{" "}
                                    <Link to="/destinations/new" className="text-primary-600 hover:underline">
                                        Create one
                                    </Link>
                                    .
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedDestination && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-2 text-center sm:items-center sm:p-0">
                        <div
                            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
                            onClick={() => setSelectedDestination(null)}
                        />

                        <div className="relative w-full transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                            <div className="absolute right-0 top-0 pr-4 pt-4 z-10">
                                <button
                                    type="button"
                                    onClick={() => setSelectedDestination(null)}
                                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 hover:bg-gray-100 p-1 transition-colors">
                                    <span className="sr-only">Close</span>
                                    <X className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>

                            <div className="px-6 py-6 border-b border-gray-100 bg-gray-50/50 flex-shrink-0">
                                <h3 className="text-2xl font-bold text-gray-900 leading-none pr-8">{selectedDestination.name}</h3>
                                <div className="mt-2 text-xs font-semibold text-gray-500">Destination Overview</div>
                            </div>

                            <div className="px-6 py-6 overflow-y-auto space-y-6">
                                {/* Places to Visit */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <MapPin className="w-5 h-5 text-orange-500" />
                                        <span className="block text-sm font-bold text-gray-900 uppercase tracking-wide mt-0.5">
                                            Key Places to Visit ({selectedDestination.places?.length || 0})
                                        </span>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm text-gray-800">
                                        {selectedDestination.places?.length > 0 ? (
                                            <div className="flex flex-wrap gap-2">
                                                {selectedDestination.places.map((place, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm shadow-sm">
                                                        {place}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="italic text-gray-400 block p-2">Not provided</span>
                                        )}
                                    </div>
                                </div>

                                {/* Gallery Info */}
                                <Gallery images={selectedDestination.images} />
                            </div>

                            <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100 flex-shrink-0">
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleDelete(selectedDestination.id);
                                        setSelectedDestination(null);
                                    }}
                                    className="inline-flex items-center gap-1.5 justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-50 transition-colors">
                                    <Trash2 className="w-4 h-4" /> Delete
                                </button>
                                <Link
                                    to={`/destinations/${selectedDestination._id}`}
                                    className="inline-flex items-center gap-1.5 justify-center rounded-lg bg-primary-50 text-primary-700 px-4 py-2 text-sm font-semibold hover:bg-primary-100 transition-colors">
                                    <Edit className="w-4 h-4" /> Edit
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


