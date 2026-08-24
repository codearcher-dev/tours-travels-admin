import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

export default function ImageUploader({ images, onImagesChange }) {
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

  const handleFiles = (files) => {
    const newImages = Array.from(files).map(file => ({
      file,
      name: file.name,
      preview: URL.createObjectURL(file)
    }));
    onImagesChange([...images, ...newImages]);
    
    // Clear input so selecting the same file again works
    if (inputRef.current) inputRef.current.value = '';
  };

  const removeImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    onImagesChange(newImages);
  };

  return (
    <div className="bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-900/5 rounded-xl">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
        <ImageIcon className="w-5 h-5 text-primary-600" />
        <h2 className="text-lg font-semibold leading-7 text-gray-900">Gallery Images</h2>
      </div>

      <div 
        className={`mt-2 flex justify-center rounded-xl border-2 border-dashed px-6 py-12 transition-all cursor-pointer group ${dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400 hover:bg-primary-50/50'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <div className="text-center pointer-events-none">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm ring-1 ring-gray-900/5 transition-transform ${dragActive ? 'bg-primary-100 scale-110' : 'bg-white group-hover:scale-110'}`}>
            <Upload className={`h-6 w-6 ${dragActive ? 'text-primary-600' : 'text-primary-500'}`} aria-hidden="true" />
          </div>
          <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
            <span className="relative rounded-md font-semibold text-primary-600 hover:text-primary-500">
              Click to upload images
            </span>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-500 mt-2">PNG, JPG, WEBP up to 10MB (Multiple allowed)</p>
        </div>
        <input 
          ref={inputRef}
          type="file" 
          multiple 
          accept="image/*"
          className="hidden" 
          onChange={handleChange}
        />
      </div>

      {images.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {images.map((img, index) => (
            <div key={index} className="relative group rounded-lg overflow-hidden ring-1 ring-gray-900/10 aspect-[4/3] bg-gray-100">
              <img src={img.preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  type="button" 
                  onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                  className="bg-white text-red-600 p-2 rounded-full hover:bg-red-50 hover:scale-110 transition-all shadow-sm"
                  title="Remove image"
                >
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
