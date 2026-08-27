import { useState, useRef, useEffect } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

export default function ImageUploader({ images, onImagesChange, setRemovedImagePublicIds }) {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
    };

    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        const newPreviews = images.map((img) => {
            if (img instanceof File) {
                return URL.createObjectURL(img);
            } else if (img && img.url) {
                return img.url;
            } else if (typeof img === "string") {
                return img;
            }
            return null;
        });
        setPreviews(newPreviews);
        return () => {
            newPreviews.forEach((url) => {
                if (url && url.startsWith("blob:")) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [images]);

    const handleFiles = (files) => {
        const newFiles = Array.from(files);
        onImagesChange([...images, ...newFiles]);
        console.log(typeof newFiles[0]);
        // Clear input so selecting the same file again works
        if (inputRef.current) inputRef.current.value = "";
    };

    const removeImage = (index) => {
        const newImages = [...images];
        setRemovedImagePublicIds((prev) => (images[index]?.publicId ? [...prev, images[index].publicId] : prev));
        newImages.splice(index, 1);
        onImagesChange(newImages);
    };

    return (
        <div className="bg-white p-4 sm:p-6 md:p-8 shadow-sm ring-1 ring-gray-900/5 rounded-xl">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <ImageIcon className="w-5 h-5 text-primary-600" />
                <h2 className="text-lg font-semibold leading-7 text-gray-900">Gallery Images</h2>
            </div>

            <div
                className={`mt-2 flex justify-center rounded-xl border-2 border-dashed px-6 py-12 transition-all cursor-pointer group ${dragActive ? "border-primary-500 bg-primary-50" : "border-gray-300 hover:border-primary-400 hover:bg-primary-50/50"}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}>
                <div className="text-center pointer-events-none">
                    <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm ring-1 ring-gray-900/5 transition-transform ${dragActive ? "bg-primary-100 scale-110" : "bg-white group-hover:scale-110"}`}>
                        <Upload className={`h-6 w-6 ${dragActive ? "text-primary-600" : "text-primary-500"}`} aria-hidden="true" />
                    </div>
                    <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                        <span className="relative rounded-md font-semibold text-primary-600 hover:text-primary-500">Click to upload images</span>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-500 mt-2">PNG, JPG, WEBP up to 10MB (Multiple allowed)</p>
                </div>
                <input ref={inputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleChange} />
            </div>

            {images.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {images.map((img, index) => (
                        <div key={index} className="relative group rounded-lg overflow-hidden ring-1 ring-gray-900/10 aspect-[4/3] bg-gray-100">
                            <img src={previews[index]} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 transition-colors flex items-start justify-end">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeImage(index);
                                    }}
                                    className="bg-white text-black p-1.5 rounded-full hover:bg-red-50 transition-all"
                                    title="Remove image">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
