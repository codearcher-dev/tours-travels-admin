import { useEffect, useState } from "react";
import ImageUploader from "../../components/ImageUploader";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, Trash2, X, Upload, IndianRupee, Clock, MapPin, List, Info, Utensils, Activity, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useData } from "../../context/PackageContext";
import { createPackage, updatePackage } from "../../services/packages.services";
import { ClipLoader } from "react-spinners";

export default function PackageForm() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(slug);

    const data = useData();
    const [packages, setPackages] = useState(data.packages || []);
    const [loading, setLoading] = useState(false);
    const pkg = packages.find((p) => p.slug === slug);
    const [removedImagePublicIds, setRemovedImagePublicIds] = useState([]);

    const [formData, setFormData] = useState(
        pkg || {
            name: "",
            description: "",
            location: { name: "", url: "" },
            duration: { days: null, nights: null },
            price: { currency: "INR", actual: null, discounted: null },
            destinations: [],
            inclusions: [],
            exclusions: [],
            itinerary: [],
            isActive: true,
            img: null,
            images: [], // mock for files
        },
    );

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
        console.log(formData);
    };

    const handleNestedChange = (category, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [category]: { ...prev[category], [field]: value },
        }));
    };

    const handleArrayChange = (category, index, value) => {
        const newArray = [...formData[category]];
        newArray[index] = value;
        setFormData((prev) => ({ ...prev, [category]: newArray }));
    };

    const addArrayItem = (category) => {
        setFormData((prev) => ({ ...prev, [category]: [...prev[category], ""] }));
    };

    const removeArrayItem = (category, index) => {
        const newArray = formData[category].filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, [category]: newArray }));
    };

    const addDayPlan = () => {
        setFormData((prev) => ({
            ...prev,
            itinerary: [
                ...prev.itinerary,
                {
                    dayNumber: prev.itinerary.length + 1,
                    title: "",
                    description: "",
                    activities: [],
                    mealsIncluded: { breakfast: false, lunch: false, dinner: false },
                },
            ],
        }));
    };

    const updateDayPlan = (index, field, value) => {
        const newItinerary = [...formData.itinerary];
        newItinerary[index][field] = value;
        setFormData((prev) => ({ ...prev, itinerary: newItinerary }));
    };

    const updateMeal = (dayIndex, mealType, value) => {
        const newItinerary = [...formData.itinerary];
        newItinerary[dayIndex].mealsIncluded[mealType] = value;
        setFormData((prev) => ({ ...prev, itinerary: newItinerary }));
    };

    const addActivity = (dayIndex) => {
        const newItinerary = [...formData.itinerary];
        newItinerary[dayIndex].activities.push({ name: "", notes: "", isExtraCharge: false, extraChargeAmount: 0 });
        setFormData((prev) => ({ ...prev, itinerary: newItinerary }));
    };

    const updateActivity = (dayIndex, actIndex, field, value) => {
        const newItinerary = [...formData.itinerary];
        newItinerary[dayIndex].activities[actIndex][field] = value;
        setFormData((prev) => ({ ...prev, itinerary: newItinerary }));
    };

    const removeActivity = (dayIndex, actIndex) => {
        const newItinerary = [...formData.itinerary];
        newItinerary[dayIndex].activities = newItinerary[dayIndex].activities.filter((_, i) => i !== actIndex);
        setFormData((prev) => ({ ...prev, itinerary: newItinerary }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        for (let i = 0; i < formData.images.length; i++) {
            data.append("images", formData.images[i]);
        }
        if (formData.img && formData.img !== null) {
            data.append("thumbnail", formData.img);
        }
        data.append("data", JSON.stringify(formData));
        data.append("public_id", removedImagePublicIds);
        try {
            const res = isEdit ? await updatePackage(pkg._id, data) : await createPackage(data);
            console.log(res);
            setPackages((prev) => [res.package, ...prev.filter((p) => p._id !== pkg?._id)]);
            toast.success(isEdit ? "Package updated!" : "Package created!");
            navigate("/packages");
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "mt-2 block w-full rounded-lg border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition-all duration-200 ease-in-out hover:ring-gray-400";
    const labelClass = "block text-sm font-semibold leading-6 text-gray-900";

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">{isEdit ? "Edit Package" : "Create New Package"}</h1>
                    <p className="mt-2 text-sm text-gray-500">Fill in the details to {isEdit ? "update the" : "publish a new"} tour package.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Basic Info Section */}
                <div className="bg-white p-4 sm:p-6 md:p-8 shadow-sm ring-1 ring-gray-900/5 rounded-xl">
                    <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                        <Info className="w-5 h-5 text-primary-600" />
                        <h2 className="text-lg font-semibold leading-7 text-gray-900">Basic Information</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label className={labelClass}>Package Name</label>
                            <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g., Ultimate Goa Holiday"
                                className={inputClass}
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className={labelClass}>Description</label>
                            <textarea
                                name="description"
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the experience..."
                                className={inputClass}
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className={labelClass}>Thumbnail Image</label>
                            <div className="mt-2 flex items-center gap-x-3">
                                {formData.img ? (
                                    <div className="relative group rounded-xl overflow-hidden ring-1 ring-gray-900/10 h-32 w-48 bg-gray-100 flex-shrink-0 shadow-sm">
                                        <img
                                            src={formData.img.url || URL.createObjectURL(formData.img)}
                                            alt="Thumbnail Preview"
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => (
                                                    setFormData((prev) => ({ ...prev, img: null })),
                                                    setRemovedImagePublicIds((prev) => [...prev, formData.img.publicId])
                                                )}
                                                className="bg-white/20 hover:bg-red-500 text-white p-2 rounded-full transition-all shadow-sm backdrop-blur-sm"
                                                title="Remove image">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <label className="relative cursor-pointer rounded-xl border-2 border-dashed border-gray-300 hover:border-primary-400 hover:bg-primary-50/50 transition-all flex flex-col items-center justify-center h-32 w-48 bg-gray-50/50 text-gray-500 group shadow-sm">
                                        <ImageIcon className="h-8 w-8 mb-2 text-gray-400 group-hover:text-primary-500 transition-colors" />
                                        <span className="text-sm font-semibold text-primary-600 group-hover:text-primary-500">Upload Thumbnail</span>
                                        <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setFormData((prev) => ({ ...prev, img: e.target.files[0] }));
                                                }
                                            }}
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="sm:col-span-2 flex items-center gap-2 mt-2">
                            <input
                                id="isActive"
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleChange}
                                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600 cursor-pointer"
                            />
                            <label htmlFor="isActive" className="text-sm font-medium text-gray-700 cursor-pointer">
                                Package is active and visible to customers
                            </label>
                        </div>
                    </div>
                </div>

                {/* 2. Location, Duration & Pricing */}
                <div className="bg-white p-4 sm:p-6 md:p-8 shadow-sm ring-1 ring-gray-900/5 rounded-xl">
                    <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                        <MapPin className="w-5 h-5 text-primary-600" />
                        <h2 className="text-lg font-semibold leading-7 text-gray-900">Logistics & Pricing</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                        <div className="sm:col-span-12">
                            <label className={labelClass}>Main Location</label>
                            <input
                                required
                                type="text"
                                value={formData.location.name}
                                onChange={(e) => handleNestedChange("location", "name", e.target.value)}
                                placeholder="e.g., Goa, India"
                                className={inputClass}
                            />
                        </div>

                        <div className="sm:col-span-6 bg-gray-50/50 p-3 sm:p-4 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-2 mb-4">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <h3 className="text-sm font-semibold text-gray-700">Duration</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 whitespace-nowrap truncate">Nights</label>
                                    <input
                                        required
                                        type="number"
                                        min="1"
                                        value={formData.duration.nights}
                                        onChange={(e) => handleNestedChange("duration", "nights", e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 whitespace-nowrap truncate">Days</label>
                                    <input
                                        required
                                        type="number"
                                        min="1"
                                        value={formData.duration.days}
                                        onChange={(e) => handleNestedChange("duration", "days", e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-6 bg-gray-50/50 p-3 sm:p-4 rounded-lg border border-gray-100">
                            <div className="flex items-center gap-2 mb-4">
                                <IndianRupee className="w-4 h-4 text-gray-500" />
                                <h3 className="text-sm font-semibold text-gray-700">Pricing (INR)</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 whitespace-nowrap truncate">Actual Price</label>
                                    <input
                                        required
                                        type="number"
                                        min="0"
                                        value={formData.price.actual}
                                        onChange={(e) => handleNestedChange("price", "actual", e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 whitespace-nowrap truncate">Discounted Price</label>
                                    <input
                                        required
                                        type="number"
                                        min="0"
                                        value={formData.price.discounted}
                                        onChange={(e) => handleNestedChange("price", "discounted", e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Arrays (Destinations, Inclusions, Exclusions) */}
                <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl overflow-hidden">
                    <div className="p-4 sm:p-6 md:p-8">
                        <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                            <List className="w-5 h-5 text-primary-600" />
                            <h2 className="text-lg font-semibold leading-7 text-gray-900">Additional Details</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {["destinations", "inclusions", "exclusions"].map((category) => (
                                <div key={category} className="bg-gray-50 rounded-xl p-3 border border-gray-100 h-full flex flex-col">
                                    <div className="flex items-center justify-between mb-4">
                                        <label className="block text-sm font-bold leading-6 text-gray-800 capitalize">{category}</label>
                                    </div>
                                    <div className="space-y-3 flex-1">
                                        {formData[category].map((item, index) => (
                                            <div key={index} className="relative flex items-center">
                                                <input
                                                    type="text"
                                                    placeholder={`Add ${category.slice(0, -1)}`}
                                                    value={item}
                                                    onChange={(e) => handleArrayChange(category, index, e.target.value)}
                                                    className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6 transition-all"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeArrayItem(category, index)}
                                                    className="absolute right-2 text-gray-400 hover:text-red-600 transition-colors p-1">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                        {formData[category].length === 0 && (
                                            <p className="text-xs text-gray-400 italic text-center py-2">No items added.</p>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => addArrayItem(category)}
                                            className="mt-2 w-full text-xs text-primary-600 hover:text-primary-800 font-semibold flex items-center justify-center bg-primary-50 px-2 py-2 rounded-md transition-colors">
                                            <Plus className="w-4 h-4 mr-1" /> Add {category.slice(0, -1)}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. Itinerary */}
                <div className="bg-white p-4 sm:p-6 md:p-8 shadow-sm ring-1 ring-gray-900/5 rounded-xl">
                    <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary-600" />
                            <h2 className="text-lg font-semibold leading-7 text-gray-900">Day-wise Itinerary</h2>
                        </div>
                    </div>

                    <div className="space-y-4 md:space-y-8">
                        {formData.itinerary.map((day, dIdx) => (
                            <div
                                key={dIdx}
                                className="bg-gray-50/50 p-3 md:p-6 rounded-xl border border-gray-200 relative group transition-all hover:border-primary-200 hover:shadow-sm flex flex-col sm:block">
                                <div className="flex justify-between items-center mb-2 sm:mb-0">
                                    <h3 className="text-lg text-primary-600">Day {day.dayNumber}</h3>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData((prev) => ({ ...prev, itinerary: prev.itinerary.filter((_, i) => i !== dIdx) }));
                                        }}
                                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="">
                                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-4">
                                        <div className="sm:col-span-3">
                                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide">Day No.</label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={day.dayNumber}
                                                onChange={(e) => updateDayPlan(dIdx, "dayNumber", e.target.value)}
                                                className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm"
                                            />
                                        </div>
                                        <div className="sm:col-span-9">
                                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide">Title</label>
                                            <input
                                                type="text"
                                                placeholder="e.g., Arrival and Leisure"
                                                value={day.title}
                                                onChange={(e) => updateDayPlan(dIdx, "title", e.target.value)}
                                                className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-5">
                                        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide">Description</label>
                                        <textarea
                                            value={day.description}
                                            placeholder="What happens on this day..."
                                            onChange={(e) => updateDayPlan(dIdx, "description", e.target.value)}
                                            rows={3}
                                            className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {/* Meals */}
                                        <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-100 shadow-sm">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Utensils className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm font-semibold text-gray-800">Included Meals</span>
                                            </div>
                                            <div className="flex flex-wrap gap-4">
                                                {["breakfast", "lunch", "dinner"].map((meal) => (
                                                    <label
                                                        key={meal}
                                                        className="flex items-center gap-2 text-sm text-gray-600 capitalize cursor-pointer hover:text-gray-900">
                                                        <input
                                                            type="checkbox"
                                                            checked={day.mealsIncluded[meal]}
                                                            onChange={(e) => updateMeal(dIdx, meal, e.target.checked)}
                                                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-600 w-4 h-4"
                                                        />
                                                        {meal}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Activities */}
                                        <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-100 shadow-sm">
                                            <div className="flex justify-between items-center mb-3">
                                                <div className="flex items-center gap-2">
                                                    <Activity className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm font-semibold text-gray-800">Activities</span>
                                                </div>
                                            </div>
                                            <div className="space-y-3 flex-1">
                                                {day.activities.map((act, aIdx) => (
                                                    <div
                                                        key={aIdx}
                                                        className="group relative flex flex-col gap-2 bg-gray-50 p-4 rounded border border-gray-100">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeActivity(dIdx, aIdx)}
                                                            className="absolute top-0.5 right-0.5 text-gray-400 hover:text-red-500  transition-colors">
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                        <input
                                                            type="text"
                                                            placeholder="Activity Name"
                                                            value={act.name}
                                                            onChange={(e) => updateActivity(dIdx, aIdx, "name", e.target.value)}
                                                            className="block w-full rounded border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 text-sm focus:ring-2 focus:ring-primary-500"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Notes (optional)"
                                                            value={act.notes}
                                                            onChange={(e) => updateActivity(dIdx, aIdx, "notes", e.target.value)}
                                                            className="block w-full rounded border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 text-sm focus:ring-2 focus:ring-primary-500"
                                                        />

                                                        <div className="flex items-center justify-between mt-1 pt-2 border-t border-gray-100">
                                                            <label className="flex items-center gap-2 text-xs font-medium text-gray-600 cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={act.isExtraCharge}
                                                                    onChange={(e) => updateActivity(dIdx, aIdx, "isExtraCharge", e.target.checked)}
                                                                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                                                                />
                                                                Extra Charge?
                                                            </label>
                                                            {act.isExtraCharge && (
                                                                <div className="flex items-center gap-1">
                                                                    <span className="text-xs text-gray-500">₹</span>
                                                                    <input
                                                                        type="number"
                                                                        min="0"
                                                                        placeholder="Amount"
                                                                        value={act.extraChargeAmount}
                                                                        onChange={(e) =>
                                                                            updateActivity(dIdx, aIdx, "extraChargeAmount", e.target.value)
                                                                        }
                                                                        className="w-24 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 text-xs focus:ring-2 focus:ring-primary-500"
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                                {day.activities.length === 0 && (
                                                    <p className="text-xs text-gray-400 italic text-center py-2">No activities added.</p>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => addActivity(dIdx)}
                                                    className="w-full mt-2 text-xs text-primary-600 hover:text-primary-700 font-bold flex items-center justify-center bg-primary-50 px-2 py-2 rounded-md transition-colors">
                                                    <Plus className="w-4 h-4 mr-1" /> Add Activity
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {formData.itinerary.length === 0 && (
                            <div className="text-center py-12 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl">
                                <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                                <h3 className="text-sm font-semibold text-gray-900">No itinerary days added</h3>
                                <p className="mt-1 text-sm text-gray-500 mb-4">Start building your tour plan day by day.</p>
                                <button
                                    type="button"
                                    onClick={addDayPlan}
                                    className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 shadow-sm transition-colors">
                                    Add First Day
                                </button>
                            </div>
                        )}
                        {formData.itinerary.length > 0 && (
                            <div className="flex justify-center mt-6">
                                <button
                                    type="button"
                                    onClick={addDayPlan}
                                    className="bg-primary-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-500 shadow-sm flex items-center transition-colors">
                                    <Plus className="w-4 h-4 mr-1.5" /> Add Another Day
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <ImageUploader
                    setRemovedImagePublicIds={setRemovedImagePublicIds}
                    images={formData.images}
                    onImagesChange={(images) => setFormData((prev) => ({ ...prev, images }))}
                />

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-x-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate("/packages")}
                        className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-lg bg-primary-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all hover:shadow-md">
                        {isEdit ? (
                            loading ? (
                                <div className="flex items-center gap-2">
                                    <span>Updating Package</span>{" "}
                                    <ClipLoader size={16} color="white" aria-label="Loading Spinner" data-testid="loader" />{" "}
                                </div>
                            ) : (
                                "Save Changes"
                            )
                        ) : loading ? (
                            <div className="flex items-center gap-2">
                                <span>Creating Package</span>{" "}
                                <ClipLoader size={16} color="white" aria-label="Loading Spinner" data-testid="loader" />{" "}
                            </div>
                        ) : (
                            "Create Package"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
