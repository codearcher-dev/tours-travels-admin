import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Trash2, Upload, MapPin, Map, Image as ImageIcon, Info } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DestinationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    places: [''],
    images: []
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceChange = (index, value) => {
    const newPlaces = [...formData.places];
    newPlaces[index] = value;
    setFormData(prev => ({ ...prev, places: newPlaces }));
  };

  const addPlace = () => {
    setFormData(prev => ({ ...prev, places: [...prev.places, ''] }));
  };

  const removePlace = (index) => {
    const newPlaces = formData.places.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, places: newPlaces }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(isEdit ? 'Destination updated!' : 'Destination created!');
    navigate('/destinations');
  };

  const inputClass = "mt-2 block w-full rounded-lg border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition-all duration-200 ease-in-out hover:ring-gray-400";
  const labelClass = "block text-sm font-semibold leading-6 text-gray-900";

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-12">
      <div className="flex items-center justify-between">
         <div>
           <h1 className="text-2xl font-bold tracking-tight text-gray-900">{isEdit ? 'Edit Destination' : 'Add New Destination'}</h1>
           <p className="mt-2 text-sm text-gray-500">Provide details for a travel destination and its key places.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Info */}
        <div className="bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-900/5 rounded-xl">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
             <Info className="w-5 h-5 text-primary-600" />
             <h2 className="text-lg font-semibold leading-7 text-gray-900">General Details</h2>
          </div>
          <div>
            <label className={labelClass}>Destination Name</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Kerala" className={inputClass} />
          </div>
        </div>

        {/* Places to Visit */}
        <div className="bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-900/5 rounded-xl">
          <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
               <MapPin className="w-5 h-5 text-primary-600" />
               <h2 className="text-lg font-semibold leading-7 text-gray-900">Key Places</h2>
            </div>
            <button type="button" onClick={addPlace} className="text-sm text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg hover:bg-primary-100 font-semibold flex items-center transition-colors"><Plus className="w-4 h-4 mr-1"/> Add Place</button>
          </div>
          
          <div className="space-y-3">
            {formData.places.map((place, index) => (
              <div key={index} className="flex gap-3 group items-center">
                <Map className="w-5 h-5 text-gray-400 shrink-0" />
                <input type="text" required placeholder="e.g., Munnar" value={place} onChange={(e) => handlePlaceChange(index, e.target.value)} className={inputClass.replace('mt-2', '')} />
                <button type="button" onClick={() => removePlace(index)} className="text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100 p-2"><Trash2 className="w-5 h-5" /></button>
              </div>
            ))}
            {formData.places.length === 0 && (
               <div className="text-center py-6 bg-gray-50 border border-dashed border-gray-200 rounded-lg">
                 <p className="text-sm text-gray-500">No places added yet.</p>
               </div>
            )}
          </div>
        </div>
        
        {/* Images Upload */}
        <div className="bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-900/5 rounded-xl">
           <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
             <ImageIcon className="w-5 h-5 text-primary-600" />
             <h2 className="text-lg font-semibold leading-7 text-gray-900">Destination Gallery</h2>
           </div>
           <div className="mt-2 flex justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 py-12 hover:border-primary-400 hover:bg-primary-50/50 transition-all cursor-pointer group">
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm ring-1 ring-gray-900/5 group-hover:scale-110 transition-transform">
                  <Upload className="h-6 w-6 text-primary-500" aria-hidden="true" />
                </div>
                <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500">
                    <span>Click to upload images</span>
                    <input id="file-upload" name="file-upload" type="file" multiple className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-500 mt-2">PNG, JPG, WEBP up to 10MB (Multiple allowed)</p>
              </div>
           </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-x-4 pt-4">
           <button type="button" onClick={() => navigate('/destinations')} className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors">
             Cancel
           </button>
           <button type="submit" className="rounded-lg bg-primary-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all hover:shadow-md">
             {isEdit ? 'Save Changes' : 'Create Destination'}
           </button>
        </div>
      </form>
    </div>
  );
}
