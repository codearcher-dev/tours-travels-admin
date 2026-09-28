import { useEffect, useState } from "react";
import {
    Plus,
    Trash2,
    Copy,
    Check,
    MessageSquareHeart,
    Link as LinkIcon,
    Package,
    Sparkles,
    ChevronDown,
    ChevronUp,
    History,
    ExternalLink,
    Trash,
} from "lucide-react";
import toast from "react-hot-toast";
import { useData } from "../../context/PackageContext";
import { createFeedbackLink, deleteFeedbackLink, getFeedbackLinks } from "../../services/feedback.services";
import ConfirmDialog from "../../components/ConfirmDialog";
import Spinner from "../../components/ui/Spinner";

// Frequently used questions that admins can add with one click
const PRESET_QUESTIONS = [
    "How was the overall experience of the tour?",
    "How was the transportation provided during the trip?",
    "How would you rate the accommodation / hotel?",
    "How was the quality and variety of meals included?",
    "How would you rate your tour guide's knowledge and behaviour?",
    "Was the itinerary well-organised and followed as planned?",
    "How was the value for money of this package?",
    "Would you recommend Prime Traveller to your friends and family?",
    "How was the communication from our team before and during the trip?",
    "Is there anything we could improve for future trips?",
];

export default function FeedbackLinkForm() {
    const { packages, loading: packagesLoading } = useData();
    const [selectedPackageId, setSelectedPackageId] = useState("");
    const [questions, setQuestions] = useState(["How was the transportation?"]);
    const [generatedLink, setGeneratedLink] = useState("");
    const [feedbackLinks, setFeedbackLinks] = useState([]); // history list
    const [copied, setCopied] = useState(false);
    const [copiedId, setCopiedId] = useState(null); // track which history row was copied
    const [showPresets, setShowPresets] = useState(false);
    const [deleteClicked, setDeleteClicked] = useState(false);
    const [generating, setGenerating] = useState(false);

    const selectedPackage = packages?.find((p) => p._id === selectedPackageId);
    const addQuestion = () => setQuestions([...questions, ""]);

    const addPresetQuestion = (preset) => {
        if (questions.includes(preset)) {
            toast.error("This question is already added.");
            return;
        }
        setQuestions([...questions, preset]);
        toast.success("Question added!");
    };

    const updateQuestion = (index, value) => {
        const newQs = [...questions];
        newQs[index] = value;
        setQuestions(newQs);
    };

    const removeQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleGenerate = async (e) => {
        e.preventDefault();
        setGenerating(true);
        if (!selectedPackageId) {
            toast.error("Please select a package first.");
            return;
        }
        try {
            const payload = {
                package: selectedPackage.name,
                questions,
            };
            const data = await createFeedbackLink(payload);
            const url = data.link.url;
            setGeneratedLink(url);
            setFeedbackLinks((prev) => [data.link, ...prev]);
            toast.success("Feedback link generated!");
            setSelectedPackageId("");
            setQuestions(["How was the transportation?"]);
            setCopied(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to generate link");
        }
        setGenerating(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    const handleHistoryCopy = (id, url) => {
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleDeleteFeedbackLink = async (id) => {
        try {
            await deleteFeedbackLink(id);
            setFeedbackLinks((prev) => prev.filter((link) => link._id !== id));
            toast.success("Feedback link deleted!");
            setDeleteClicked(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete link");
        }
    };

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const data = await getFeedbackLinks();
                setFeedbackLinks(data.links);
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch feedback links");
            }
        };
        fetchLinks();
    }, []);

    const inputClass =
        "block w-full rounded-lg border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition-all duration-200 ease-in-out hover:ring-gray-400";

    return (
        <div className="space-y-8 max-w-3xl mx-auto pb-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Custom Feedback Link</h1>
                    <p className="mt-2 text-sm text-gray-500">Create a unique feedback form with custom questions for a customer.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <form onSubmit={handleGenerate} className="bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-900/5 rounded-xl space-y-8" noValidate>
                    {/* ── Package Selector ── */}
                    <div>
                        <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-4">
                            <Package className="w-5 h-5 text-primary-600" />
                            <h2 className="text-lg font-semibold leading-7 text-gray-900">Select Package</h2>
                        </div>
                        <div>
                            <label htmlFor="package-select" className="block text-sm font-medium text-gray-700 mb-1.5">
                                Package <span className="text-red-500">*</span>
                            </label>
                            {packagesLoading ? (
                                <div className="text-sm text-gray-400 py-2">Loading packages…</div>
                            ) : (
                                <select
                                    id="package-select"
                                    value={selectedPackageId}
                                    onChange={(e) => setSelectedPackageId(e.target.value)}
                                    required
                                    className="block w-full rounded-lg border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition-all duration-200 ease-in-out hover:ring-gray-400 bg-white">
                                    <option value="">— Select a package —</option>
                                    {(packages || []).map((pkg) => (
                                        <option key={pkg._id} value={pkg._id}>
                                            {pkg.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                            {selectedPackage && (
                                <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                                    <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
                                    {selectedPackage.name} selected
                                </p>
                            )}
                        </div>
                    </div>

                    {/* ── Survey Questions ── */}
                    <div>
                        <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-4">
                            <MessageSquareHeart className="w-5 h-5 text-primary-600" />
                            <h2 className="text-lg font-semibold leading-7 text-gray-900">Survey Questions</h2>
                        </div>

                        {/* Pre-added / suggested questions */}
                        <div className="mb-5 rounded-lg border border-dashed border-primary-200 bg-primary-50/50">
                            <button
                                type="button"
                                onClick={() => setShowPresets((v) => !v)}
                                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-primary-700 hover:text-primary-900 transition-colors">
                                <span className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    Suggested Questions (click to add)
                                </span>
                                {showPresets ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>

                            {showPresets && (
                                <ul className="px-4 pb-4 space-y-2">
                                    {PRESET_QUESTIONS.map((preset) => {
                                        const alreadyAdded = questions.includes(preset);
                                        return (
                                            <li key={preset}>
                                                <button
                                                    type="button"
                                                    disabled={alreadyAdded}
                                                    onClick={() => addPresetQuestion(preset)}
                                                    className={`w-full text-left text-sm px-3 py-2 rounded-lg border flex items-center justify-between gap-2 transition-all
                                                        ${
                                                            alreadyAdded
                                                                ? "border-green-200 bg-green-50 text-green-700 cursor-default"
                                                                : "border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
                                                        }`}>
                                                    <span>{preset}</span>
                                                    {alreadyAdded ? (
                                                        <Check className="w-4 h-4 flex-shrink-0 text-green-500" />
                                                    ) : (
                                                        <Plus className="w-4 h-4 flex-shrink-0 text-gray-400" />
                                                    )}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>

                        {/* Question list */}
                        <div className="space-y-4">
                            {questions.map((q, idx) => (
                                <div key={idx} className="flex gap-3 items-start group">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-500 mt-1">
                                        {idx + 1}
                                    </div>
                                    <input
                                        required
                                        type="text"
                                        value={q}
                                        onChange={(e) => updateQuestion(idx, e.target.value)}
                                        placeholder="e.g., How was the hotel?"
                                        className={inputClass}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeQuestion(idx)}
                                        className="mt-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                            {questions.length === 0 && (
                                <div className="text-center py-8 bg-gray-50 border border-dashed border-gray-200 rounded-lg">
                                    <p className="text-sm text-gray-500">No questions added yet. Use suggested questions or add your own below.</p>
                                </div>
                            )}
                        </div>

                        {/* Add Question button — below the list */}
                        <button
                            type="button"
                            onClick={addQuestion}
                            className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 py-2.5 text-sm font-medium text-gray-500 hover:border-primary-400 hover:text-primary-700 hover:bg-primary-50 transition-all duration-200">
                            <Plus className="w-4 h-4" />
                            Add Custom Question
                        </button>
                    </div>

                    {/* ── Generate button ── */}
                    <div className="pt-2 border-t border-gray-100">
                        <button
                            type="submit"
                            className="w-full flex justify-center items-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all hover:shadow-md">
                            <LinkIcon className="w-4 h-4" />
                            {generating ? (
                                <>
                                    Generating
                                    <Spinner size="sm" />
                                </>
                            ) : (
                                "Generate Shareable Link"
                            )}
                        </button>
                    </div>
                </form>

                {generatedLink && (
                    <div className="bg-green-50 p-6 sm:p-8 rounded-xl border border-green-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="text-center space-y-4">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-2">
                                <Check className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-green-900">Link Generated Successfully!</h3>
                            <p className="text-sm text-green-700">Share this link with your customer to collect their feedback.</p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                                <input
                                    type="text"
                                    readOnly
                                    value={generatedLink}
                                    className="block w-full max-w-md rounded-lg border border-green-300 py-2.5 px-4 text-green-900 shadow-sm bg-white font-medium focus:outline-none"
                                />
                                <button
                                    onClick={handleCopy}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 transition-colors">
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {copied ? "Copied" : "Copy Link"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Generated Links History ── */}
                {feedbackLinks.length > 0 && (
                    <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl overflow-hidden">
                        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
                            <History className="w-5 h-5 text-primary-600" />
                            <h2 className="text-lg font-semibold text-gray-900">Generated Links</h2>
                            <span className="ml-auto text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                {feedbackLinks.length} {feedbackLinks.length === 1 ? "link" : "links"}
                            </span>
                        </div>

                        <ul className="divide-y divide-gray-100">
                            {feedbackLinks.map((item) => (
                                <li
                                    key={item._id}
                                    className="flex flex-col sm:flex-row sm:items-center gap-3 px-6 py-4 hover:bg-gray-50 transition-colors">
                                    {/* Left — meta info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-semibold text-gray-800 truncate">{item.package}</span>
                                            <span className="flex-shrink-0 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                                {item.questions.length} {item.questions.length === 1 ? "question" : "questions"}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400 truncate">
                                            {new Date(item.createdAt).toLocaleString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                        <p className="mt-1 text-xs text-primary-600 font-medium truncate">{item.url}</p>
                                    </div>

                                    {/* Right — actions */}
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            Open
                                        </a>
                                        <button
                                            type="button"
                                            onClick={() => handleHistoryCopy(item._id, item.url)}
                                            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-100 transition-colors">
                                            {copiedId === item._id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                            {copiedId === item._id ? "Copied" : "Copy"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setDeleteClicked(true)}
                                            className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 transition-colors">
                                            <Trash className="w-3.5 h-3.5" /> Delete
                                        </button>
                                        {deleteClicked && (
                                            <ConfirmDialog
                                                title={"Confirm"}
                                                message={"Are you sure you want to delete this feedback link? This action cannot be undone."}
                                                confirmed={!deleteClicked}
                                                isOpen={deleteClicked}
                                                onConfirm={() => handleDeleteFeedbackLink(item._id)}
                                                onCancel={() => setDeleteClicked(false)}
                                            />
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
