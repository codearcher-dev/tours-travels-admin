import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Trash2, X, Upload, IndianRupee, Clock, MapPin, List, Info, Utensils, Activity, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PackageForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '', description: '', 
    location: { name: '', url: '' },
    duration: { days: 1, nights: 1 },
    price: { currency: 'INR', actual: 0, discounted: 0 },
    destinations: [''], inclusions: [''], exclusions: [''],
    itinerary: [], isActive: true,
    images: [] // mock for files
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleNestedChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  const handleArrayChange = (category, index, value) => {
    const newArray = [...formData[category]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [category]: newArray }));
  };

  const addArrayItem = (category) => {
    setFormData(prev => ({ ...prev, [category]: [...prev[category], ''] }));
  };

  const removeArrayItem = (category, index) => {
    const newArray = formData[category].filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [category]: newArray }));
  };

  const addDayPlan = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { 
        dayNumber: prev.itinerary.length + 1, 
        title: '', description: '', 
        activities: [], 
        mealsIncluded: { breakfast: false, lunch: false, dinner: false } 
      }]
    }));
  };

  const updateDayPlan = (index, field, value) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[index][field] = value;
    setFormData(prev => ({ ...prev, itinerary: newItinerary }));
  };
  
  const updateMeal = (dayIndex, mealType, value) => {
     const newItinerary = [...formData.itinerary];
     newItinerary[dayIndex].mealsIncluded[mealType] = value;
     setFormData(prev => ({ ...prev, itinerary: newItinerary }));
  };

  const addActivity = (dayIndex) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[dayIndex].activities.push({ name: '', notes: '', isExtraCharge: false, extraChargeAmount: 0 });
    setFormData(prev => ({ ...prev, itinerary: newItinerary }));
  };

  const updateActivity = (dayIndex, actIndex, field, value) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[dayIndex].activities[actIndex][field] = value;
    setFormData(prev => ({ ...prev, itinerary: newItinerary }));
  };

  const removeActivity = (dayIndex, actIndex) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[dayIndex].activities = newItinerary[dayIndex].activities.filter((_, i) => i !== actIndex);
    setFormData(prev => ({ ...prev, itinerary: newItinerary }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(isEdit ? 'Package updated!' : 'Package created!');
    navigate('/packages');
  };

  const inputClass = "mt-2 block w-full rounded-lg border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition-all duration-200 ease-in-out hover:ring-gray-400";
  const labelClass = "block text-sm font-semibold leading-6 text-gray-900";

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold tracking-tight text-gray-900">{isEdit ? 'Edit Package' : 'Create New Package'}</h1>
           <p className="mt-2 text-sm text-gray-500">Fill in the details to {isEdit ? 'update the' : 'publish a new'} tour package.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* 1. Basic Info Section */}
        <div className="bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-900/5 rounded-xl">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
             <Info className="w-5 h-5 text-primary-600" />
             <h2 className="text-lg font-semibold leading-7 text-gray-900">Basic Information</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass}>Package Name</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Ultimate Goa Holiday" className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea name="description" rows={4} value={formData.description} onChange={handleChange} placeholder="Describe the experience..." className={inputClass} />
            </div>
            
            <div className="sm:col-span-2 flex items-center gap-2 mt-2">
               <input id="isActive" type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600 cursor-pointer" />
               <label htmlFor="isActive" className="text-sm font-medium text-gray-700 cursor-pointer">Package is active and visible to customers</label>
            </div>
          </div>
        </div>

        {/* 2. Location, Duration & Pricing */}
        <div className="bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-900/5 rounded-xl">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
             <MapPin className="w-5 h-5 text-primary-600" />
             <h2 className="text-lg font-semibold leading-7 text-gray-900">Logistics & Pricing</h2>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
            
            <div className="sm:col-span-12">
              <label className={labelClass}>Main Location</label>
              <input required type="text" value={formData.location.name} onChange={(e) => handleNestedChange('location', 'name', e.target.value)} placeholder="e.g., Goa, India" className={inputClass} />
            </div>

            <div className="sm:col-span-6 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
               <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-700">Duration</h3>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Days</label>
                    <input required type="number" min="1" value={formData.duration.days} onChange={(e) => handleNestedChange('duration', 'days', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Nights</label>
                    <input required type="number" min="1" value={formData.duration.nights} onChange={(e) => handleNestedChange('duration', 'nights', e.target.value)} className={inputClass} />
                  </div>
               </div>
            </div>

            <div className="sm:col-span-6 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
               <div className="flex items-center gap-2 mb-4">
                  <IndianRupee className="w-4 h-4 text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-700">Pricing (INR)</h3>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Actual Price</label>
                    <input required type="number" min="0" value={formData.price.actual} onChange={(e) => handleNestedChange('price', 'actual', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500">Discounted Price</label>
                    <input required type="number" min="0" value={formData.price.discounted} onChange={(e) => handleNestedChange('price', 'discounted', e.target.value)} className={inputClass} />
                  </div>
               </div>
            </div>

          </div>
        </div>

        {/* 3. Arrays (Destinations, Inclusions, Exclusions) */}
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl overflow-hidden">
           <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                 <List className="w-5 h-5 text-primary-600" />
                 <h2 className="text-lg font-semibold leading-7 text-gray-900">Additional Details</h2>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {['destinations', 'inclusions', 'exclusions'].map((category) => (
                  <div key={category} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-bold leading-6 text-gray-800 capitalize">{category}</label>
                      <button type="button" onClick={() => addArrayItem(category)} className="text-xs text-primary-600 hover:text-primary-800 font-semibold flex items-center bg-primary-50 px-2 py-1 rounded-full"><Plus className="w-3 h-3 mr-1"/> Add</button>
                    </div>
                    <div className="space-y-3">
                      {formData[category].map((item, index) => (
                        <div key={index} className="flex gap-2 group">
                          <input type="text" placeholder={`Add ${category.slice(0, -1)}`} value={item} onChange={(e) => handleArrayChange(category, index, e.target.value)} className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6 transition-all" />
                          <button type="button" onClick={() => removeArrayItem(category, index)} className="text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                      {formData[category].length === 0 && <p className="text-xs text-gray-400 italic text-center py-2">No items added.</p>}
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>

        {/* 4. Itinerary */}
        <div className="bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-900/5 rounded-xl">
          <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
               <MapPin className="w-5 h-5 text-primary-600" />
               <h2 className="text-lg font-semibold leading-7 text-gray-900">Day-wise Itinerary</h2>
            </div>
            <button type="button" onClick={addDayPlan} className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-500 shadow-sm flex items-center transition-colors"><Plus className="w-4 h-4 mr-1.5"/> Add Day</button>
          </div>
          
          <div className="space-y-8">
            {formData.itinerary.map((day, dIdx) => (
              <div key={dIdx} className="bg-gray-50/50 p-6 rounded-xl border border-gray-200 relative group transition-all hover:border-primary-200 hover:shadow-sm">
                
                <button type="button" onClick={() => {
                     setFormData(prev => ({...prev, itinerary: prev.itinerary.filter((_, i) => i !== dIdx)}));
                }} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors"><Trash2 className="w-5 h-5" /></button>
                
                <div className="pr-12">
                   <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-4">
                      <div className="sm:col-span-3">
                        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide">Day No.</label>
                        <input type="number" min="1" value={day.dayNumber} onChange={(e) => updateDayPlan(dIdx, 'dayNumber', e.target.value)} className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm" />
                      </div>
                      <div className="sm:col-span-9">
                        <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide">Title</label>
                        <input type="text" placeholder="e.g., Arrival and Leisure" value={day.title} onChange={(e) => updateDayPlan(dIdx, 'title', e.target.value)} className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm" />
                      </div>
                   </div>

                   <div className="mb-5">
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide">Description</label>
                      <textarea value={day.description} placeholder="What happens on this day..." onChange={(e) => updateDayPlan(dIdx, 'description', e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm" />
                   </div>
                   
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Meals */}
                      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                         <div className="flex items-center gap-2 mb-3">
                            <Utensils className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-semibold text-gray-800">Included Meals</span>
                         </div>
                         <div className="flex flex-wrap gap-4">
                           {['breakfast', 'lunch', 'dinner'].map(meal => (
                              <label key={meal} className="flex items-center gap-2 text-sm text-gray-600 capitalize cursor-pointer hover:text-gray-900">
                                <input type="checkbox" checked={day.mealsIncluded[meal]} onChange={(e) => updateMeal(dIdx, meal, e.target.checked)} className="rounded border-gray-300 text-primary-600 focus:ring-primary-600 w-4 h-4" />
                                {meal}
                              </label>
                           ))}
                         </div>
                      </div>

                      {/* Activities */}
                      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                             <Activity className="w-4 h-4 text-gray-400" />
                             <span className="text-sm font-semibold text-gray-800">Activities</span>
                          </div>
                          <button type="button" onClick={() => addActivity(dIdx)} className="text-xs text-primary-600 hover:text-primary-700 font-bold flex items-center bg-primary-50 px-2 py-1 rounded-md"><Plus className="w-3 h-3 mr-1"/> Add</button>
                        </div>
                        <div className="space-y-3">
                          {day.activities.map((act, aIdx) => (
                            <div key={aIdx} className="group relative flex flex-col gap-2 bg-gray-50 p-3 rounded border border-gray-100">
                               <button type="button" onClick={() => removeActivity(dIdx, aIdx)} className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-4 h-4" /></button>
                               <input type="text" placeholder="Activity Name" value={act.name} onChange={(e) => updateActivity(dIdx, aIdx, 'name', e.target.value)} className="block w-full rounded border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 text-sm focus:ring-2 focus:ring-primary-500" />
                               <input type="text" placeholder="Notes (optional)" value={act.notes} onChange={(e) => updateActivity(dIdx, aIdx, 'notes', e.target.value)} className="block w-full rounded border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 text-sm focus:ring-2 focus:ring-primary-500" />
                               
                               <div className="flex items-center justify-between mt-1 pt-2 border-t border-gray-100">
                                  <label className="flex items-center gap-2 text-xs font-medium text-gray-600 cursor-pointer">
                                    <input type="checkbox" checked={act.isExtraCharge} onChange={(e) => updateActivity(dIdx, aIdx, 'isExtraCharge', e.target.checked)} className="rounded border-gray-300 text-primary-600 focus:ring-primary-600" />
                                    Extra Charge?
                                  </label>
                                  {act.isExtraCharge && (
                                    <div className="flex items-center gap-1">
                                       <span className="text-xs text-gray-500">₹</span>
                                       <input type="number" min="0" placeholder="Amount" value={act.extraChargeAmount} onChange={(e) => updateActivity(dIdx, aIdx, 'extraChargeAmount', e.target.value)} className="w-24 rounded border-0 py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 text-xs focus:ring-2 focus:ring-primary-500" />
                                    </div>
                                  )}
                               </div>
                            </div>
                          ))}
                          {day.activities.length === 0 && <p className="text-xs text-gray-400 italic text-center py-2">No activities added.</p>}
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
                 <button type="button" onClick={addDayPlan} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 shadow-sm transition-colors">Add First Day</button>
               </div>
            )}
          </div>
        </div>
        
        {/* 5. Images Upload */}
        <div className="bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-900/5 rounded-xl">
           <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
             <ImageIcon className="w-5 h-5 text-primary-600" />
             <h2 className="text-lg font-semibold leading-7 text-gray-900">Media</h2>
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

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-x-4 pt-4">
           <button type="button" onClick={() => navigate('/packages')} className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors">
             Cancel
           </button>
           <button type="submit" className="rounded-lg bg-primary-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all hover:shadow-md">
             {isEdit ? 'Save Changes' : 'Create Package'}
           </button>
        </div>
      </form>
    </div>
  );
}
