import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, X, Star, MessageSquareHeart, Calendar, Package as PackageIcon, User } from "lucide-react";
import { getFeedbacks } from "../../services/feedback.services";
import { formatDateAndTime } from "../../utils/date";
import Spinner from "../../components/ui/Spinner";

const mockFeedbacks = [
    {
        id: "1",
        name: "John Doe",
        package: "Goa Holiday",
        overallRating: 5,
        review: "Amazing experience! Highly recommended.",
        createdAt: "2023-10-01",
    },
    {
        id: "2",
        name: "Jane Smith",
        package: "Kashmir Paradise",
        overallRating: 4,
        review: "Great trip, but food could be better.",
        createdAt: "2023-10-05",
    },
];

export default function FeedbacksList() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [loading, setaLoading] = useState(false);
    useEffect(() => {
        const fetchfeedbacks = async () => {
            setaLoading(true);
            try {
                const data = await getFeedbacks();
                setFeedbacks(data.feedbacks);
                console.log(data);
            } catch (error) {
                console.error(error.message);
            }
            setaLoading(false);
        };

        fetchfeedbacks();
    }, []);

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`} />
        ));
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12 relative">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Customer Feedbacks</h1>
                    <p className="mt-2 text-sm text-gray-500">View customer reviews and ratings for your packages.</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Link
                        to="/feedbacks/new"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all hover:shadow-md">
                        <Plus className="h-4 w-4" />
                        Generate Feedback Link
                    </Link>
                </div>
            </div>

            <div className="mt-6 overflow-hidden shadow-sm ring-1 ring-gray-900/5 rounded-xl bg-white">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50/50">
                        <tr>
                            <th className="py-4 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider sm:pl-6">
                                Customer
                            </th>
                            <th className="px-3 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Package</th>
                            <th className="px-3 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {feedbacks.map((fb) => (
                            <tr key={fb._id} onClick={() => setSelectedFeedback(fb)} className="cursor-pointer hover:bg-gray-50/80 transition-colors">
                                <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-6">
                                    <div className="flex items-center">
                                        <div>
                                            <div className="font-semibold text-gray-900">{fb.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-600 font-medium">
                                    <div className="flex items-center gap-1.5 text-wrap">{fb.package || "N/A"}</div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-5 text-sm font-semibold text-gray-700">
                                    <div className="flex items-center gap-1">
                                        {fb.overallRating}
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {feedbacks.length === 0 &&
                            (loading ? (
                                <tr>
                                    <td colSpan="4" className="py-12 text-center text-sm text-gray-500">
                                        <Spinner />
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-12 text-center text-sm text-gray-500">
                                        No feedbacks received yet.
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* Modern Modal */}
            {selectedFeedback && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-2 text-center sm:items-center sm:p-0">
                        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={() => setSelectedFeedback(null)} />

                        <div className="relative w-full transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg animate-in fade-in zoom-in-95 duration-200">
                            <div className="absolute right-0 top-0 pr-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setSelectedFeedback(null)}
                                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 hover:bg-gray-100 p-1 transition-colors">
                                    <span className="sr-only">Close</span>
                                    <X className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>

                            <div className="px-6 py-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
                                <div className="h-12 w-12 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200 text-blue-700 font-bold text-xl">
                                    {selectedFeedback.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 leading-none">{selectedFeedback.name}</h3>
                                    <div className="flex flex-col gap-1.5 mt-2 text-xs text-gray-500 font-medium">
                                        <span className="flex gap-1">
                                            <PackageIcon className="w-4 h-4" />
                                            <span>{selectedFeedback.package.name}</span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" /> {formatDateAndTime(selectedFeedback.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 py-4">
                                <div className="mb-6 flex items-center justify-between bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                                    <span className="text-sm font-bold text-yellow-800">Overall Rating</span>
                                    <div className="flex gap-1">{renderStars(selectedFeedback.overallRating)}</div>
                                </div>
                                <div className="relative">
                                    <MessageSquareHeart className="w-8 h-8 text-gray-200 absolute -top-4 -left-2" />
                                    <div className="relative z-10 pl-6 border-l-2 border-gray-200">
                                        <span className="block text-sm font-bold text-gray-900 mb-2">Customer Review</span>
                                        <p className="text-base text-gray-700 leading-relaxed italic">"{selectedFeedback.review}"</p>
                                    </div>
                                </div>{" "}
                                {selectedFeedback.feedback && selectedFeedback.feedback.length > 0 && (
                                    <div className="mt-4 border-t border-gray-100 pt-4">
                                        <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Feedback</h4>
                                        <div className="space-y-4">
                                            {selectedFeedback.feedback.map((qr, idx) => (
                                                <div key={idx} className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                                                    <p className="text-sm font-semibold text-gray-800 mb-2">{qr.question}</p>
                                                    {qr.rating && <div className="flex items-center gap-1 mb-2">{renderStars(qr.rating)}</div>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="bg-gray-50 px-6 py-4 flex flex-row-reverse border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setSelectedFeedback(null)}
                                    className="inline-flex w-full justify-center rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:w-auto transition-colors">
                                    Close Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
