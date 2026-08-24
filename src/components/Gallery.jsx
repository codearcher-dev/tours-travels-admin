import { ChevronDown, ChevronUp, ImageIcon } from "lucide-react";
import React, { useState } from "react";

const Gallery = ({ selectedPackage }) => {
    const [showGallery, setShowGallery] = useState(false);

    return (
        <div>
            <div className="flex items-center gap-2 mb-3">
                <ImageIcon className="w-5 h-5 text-blue-500" />
                <span className="block text-sm font-bold text-gray-900 uppercase tracking-wide mt-0.5">
                    Gallery Images ({selectedPackage.images?.length || 0})
                </span>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm text-gray-800">
                {selectedPackage.images?.length > 0 ? (
                    <div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center border border-gray-300 shadow-sm">
                                    <ImageIcon className="w-5 h-5 text-gray-400" />
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700 block">{selectedPackage.images.length} Image(s) uploaded</span>
                                    <span className="text-xs text-gray-500">Media attached to this package.</span>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowGallery(!showGallery)}
                                className="flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg transition-colors">
                                {showGallery ? (
                                    <>
                                        Hide <ChevronUp className="w-4 h-4" />
                                    </>
                                ) : (
                                    <>
                                        View <ChevronDown className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>

                        {showGallery && (
                            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {selectedPackage.images.map((img, idx) => {
                                    return (
                                        <div
                                            key={idx}
                                            className="relative rounded-lg overflow-hidden ring-1 ring-gray-900/10 aspect-[4/3] bg-gray-200">
                                            <img
                                                src={img.url}
                                                alt={`Gallery ${idx}`}
                                                // onError={(img.url = "https://placehold.co/400x300?text=Image")}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ) : (
                    <span className="italic text-gray-400 block p-2">Not provided</span>
                )}
            </div>
        </div>
    );
};

export default Gallery;
