import { useState } from "react";
import ImageUploader from "../../components/ImageUploader";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, Trash2, Upload, MapPin, Map, Image as ImageIcon, Info } from "lucide-react";
import toast from "react-hot-toast";
import { usePackages } from "../../context/PackageContext";

export default function DestinationForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);
    const { destinations } = usePackages();

    const destination = destinations.find((d) => d._id === id);

    const [formData, setFormData] = useState(
        destination || {
            name: "",
            places: [""],
            images: [],
        },
    );

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handlePlaceChange = (index, value) => {
        const newPlaces = [...formData.places];
        newPlaces[index] = value;
        setFormData((prev) => ({ ...prev, places: newPlaces }));
    };

    const addPlace = () => {
        setFormData((prev) => ({ ...prev, places: [...prev.places, ""] }));
    };

    const removePlace = (index) => {
        const newPlaces = formData.places.filter((_, i) => i !== index);
        setFormData((prev) => ({ ...prev, places: newPlaces }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success(isEdit ? "Destination updated!" : "Destination created!");
        navigate("/destinations");
    };

    const inputClass =
        "mt-2 block w-full rounded-lg border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition-all duration-200 ease-in-out hover:ring-gray-400";
    const labelClass = "block text-sm font-semibold leading-6 text-gray-900";

    return (
        <div className="space-y-8 max-w-3xl mx-auto pb-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">{isEdit ? "Edit Destination" : "Add New Destination"}</h1>
                    <p className="mt-2 text-sm text-gray-500">Provide details for a travel destination and its key places.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                {/* Basic Info */}
                <div className="bg-white p-4 sm:p-6 md:p-8 shadow-sm ring-1 ring-gray-900/5 rounded-xl">
                    <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                        <Info className="w-5 h-5 text-primary-600" />
                        <h2 className="text-lg font-semibold leading-7 text-gray-900">General Details</h2>
                    </div>
                    <div>
                        <label className={labelClass}>Destination Name</label>
                        <input
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., Kerala"
                            className={inputClass}
                        />
                    </div>
                </div>

                {/* Places to Visit */}
                <div className="bg-white p-4 sm:p-6 md:p-8 shadow-sm ring-1 ring-gray-900/5 rounded-xl">
                    <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary-600" />
                            <h2 className="text-lg font-semibold leading-7 text-gray-900">Key Places</h2>
                        </div>
                        <button
                            type="button"
                            onClick={addPlace}
                            className="text-sm text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg hover:bg-primary-100 font-semibold flex items-center transition-colors">
                            <Plus className="w-4 h-4 mr-1" /> Add Place
                        </button>
                    </div>

                    <div className="space-y-3">
                        {formData.places.map((place, index) => (
                            <div key={index} className="relative flex items-center">
                                <Map className="w-5 h-5 text-gray-400 shrink-0 absolute left-3" />
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., Munnar"
                                    value={place}
                                    onChange={(e) => handlePlaceChange(index, e.target.value)}
                                    className={`${inputClass.replace("mt-2", "")} pl-10 pr-10`}
                                />
                                <button
                                    type="button"
                                    onClick={() => removePlace(index)}
                                    className="absolute right-2 text-gray-400 hover:text-red-600 transition-colors p-1">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        {formData.places.length === 0 && (
                            <div className="text-center py-6 bg-gray-50 border border-dashed border-gray-200 rounded-lg">
                                <p className="text-sm text-gray-500">No places added yet.</p>
                            </div>
                        )}
                    </div>
                </div>

                <ImageUploader images={formData.images} onImagesChange={(images) => setFormData((prev) => ({ ...prev, images }))} />

                {/* Actions */}
                <div className="flex items-center justify-end gap-x-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate("/destinations")}
                        className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-lg bg-primary-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all hover:shadow-md">
                        {isEdit ? "Save Changes" : "Create Destination"}
                    </button>
                </div>
            </form>
        </div>
    );
}
