import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Search, X, IndianRupee, Clock, Info, CheckCircle2, XCircle, MapPin, List, XOctagon, Map, Utensils, Activity, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const mockPackages = [
  { 
    id: '1', name: 'Goa Holiday', slug: 'goa-holiday', 
    duration: { days: 3, nights: 2 }, 
    price: { actual: 15000, discounted: 12000 }, 
    isActive: true, 
    description: 'Experience the beautiful beaches and vibrant nightlife of Goa.',
    location: { name: 'Goa, India', url: 'https://maps.google.com' },
    destinations: ['Baga Beach', 'Fort Aguada'],
    inclusions: ['Breakfast', 'Hotel Stay', 'Airport Transfer'],
    exclusions: ['Flights', 'Personal Expenses'],
    itinerary: [
      { dayNumber: 1, title: 'Arrival & Leisure', description: 'Arrive in Goa and relax at the resort.', activities: [], mealsIncluded: { breakfast: false, lunch: false, dinner: true } },
      { dayNumber: 2, title: 'North Goa Tour', description: 'Visit famous beaches and forts.', activities: [{name: 'Water Sports', isExtraCharge: true, extraChargeAmount: 1500}], mealsIncluded: { breakfast: true, lunch: false, dinner: true } }
    ],
    images: []
  },
  { 
    id: '2', name: 'Kashmir Paradise', slug: 'kashmir-paradise', 
    duration: { days: 5, nights: 4 }, 
    price: { actual: 25000, discounted: 22000 }, 
    isActive: true, 
    description: 'Explore the heaven on earth with our Kashmir Paradise package.',
    // Missing some data to test "Not provided" state
    location: null,
    destinations: [],
    inclusions: ['Shikara Ride', 'Houseboat Stay'],
    exclusions: [],
    itinerary: [],
    images: []
  },
];

export default function PackagesList() {
  const [packages, setPackages] = useState(mockPackages);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      setPackages(packages.filter(p => p.id !== id));
      toast.success('Package deleted successfully');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 relative">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Packages</h1>
          <p className="mt-2 text-sm text-gray-500">Manage all your tour packages, pricing, and availability.</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            to="/packages/new"
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all hover:shadow-md"
          >
            <Plus className="h-4 w-4" />
            Add New Package
          </Link>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-xl shadow-sm ring-1 ring-gray-900/5 flex items-center justify-between">
         <div className="relative w-full max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
               <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input type="text" placeholder="Search packages..." className="block w-full rounded-lg border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition-all" />
         </div>
      </div>

      <div className="mt-6 overflow-hidden shadow-sm ring-1 ring-gray-900/5 rounded-xl bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="py-4 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider sm:pl-6">Package Info</th>
              <th className="px-3 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {packages.map((pkg) => (
              <tr key={pkg.id} onClick={() => setSelectedPackage(pkg)} className="hover:bg-gray-50/80 transition-colors group cursor-pointer">
                <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-6">
                  <div className="flex items-center">
                    <div>
                      <div className="font-semibold text-gray-900">{pkg.name}</div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-5 text-sm">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${pkg.isActive ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-red-50 text-red-700 ring-red-600/20'}`}>
                    {pkg.isActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {pkg.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
            {packages.length === 0 && (
               <tr>
                  <td colSpan="2" className="py-12 text-center text-sm text-gray-500">
                     No packages found. <Link to="/packages/new" className="text-primary-600 hover:underline">Create one</Link>.
                  </td>
               </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedPackage && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-2 text-center sm:items-center sm:p-0">
            <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={() => setSelectedPackage(null)} />
            
            <div className="relative w-full transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
              
              <div className="absolute right-0 top-0 pr-4 pt-4 z-10">
                <button type="button" onClick={() => setSelectedPackage(null)} className="rounded-md bg-white text-gray-400 hover:text-gray-500 hover:bg-gray-100 p-1 transition-colors">
                  <span className="sr-only">Close</span>
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="px-6 py-6 border-b border-gray-100 bg-gray-50/50 flex-shrink-0">
                 <h3 className="text-2xl font-bold text-gray-900 leading-none pr-8">{selectedPackage.name}</h3>
                 <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-gray-500">
                    <span className="flex items-center gap-1">/{selectedPackage.slug}</span>
                 </div>
              </div>

              <div className="px-6 py-6 overflow-y-auto">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                       <Clock className="w-5 h-5 text-primary-500 mt-0.5" />
                       <div>
                         <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Duration</span>
                         {selectedPackage.duration?.days ? (
                           <span className="block text-sm font-medium text-gray-900">{selectedPackage.duration.days} Days, {selectedPackage.duration.nights} Nights</span>
                         ) : (
                           <span className="block text-sm italic text-gray-400">Not provided</span>
                         )}
                       </div>
                    </div>
                    
                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                       <IndianRupee className="w-5 h-5 text-primary-500 mt-0.5" />
                       <div>
                         <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Pricing</span>
                         {selectedPackage.price?.actual ? (
                           <>
                             <span className="block text-sm font-bold text-gray-900">₹{selectedPackage.price.discounted.toLocaleString('en-IN')}</span>
                             <span className="block text-xs font-medium text-gray-400 line-through">₹{selectedPackage.price.actual.toLocaleString('en-IN')}</span>
                           </>
                         ) : (
                           <span className="block text-sm italic text-gray-400">Not provided</span>
                         )}
                       </div>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div>
                       <div className="flex items-center gap-2 mb-2">
                         <Info className="w-4 h-4 text-gray-400" />
                         <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Description</h4>
                       </div>
                       <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100 leading-relaxed">
                         {selectedPackage.description || <span className="italic text-gray-400">Not provided</span>}
                       </p>
                    </div>

                    <div>
                       <div className="flex items-center gap-2 mb-2">
                         <MapPin className="w-4 h-4 text-gray-400" />
                         <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Location & Destinations</h4>
                       </div>
                       <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                         {selectedPackage.location?.name ? (
                           <p className="text-sm text-gray-900 mb-3 font-medium">Base Location: <a href={selectedPackage.location.url} target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">{selectedPackage.location.name}</a></p>
                         ) : (
                           <p className="text-sm italic text-gray-400 mb-3">Base Location: Not provided</p>
                         )}
                         
                         {selectedPackage.destinations?.length > 0 ? (
                           <div className="flex flex-wrap gap-2">
                             {selectedPackage.destinations.map((dest, i) => (
                               <span key={i} className="inline-flex items-center rounded-md bg-white px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-200">{dest}</span>
                             ))}
                           </div>
                         ) : (
                           <span className="text-sm italic text-gray-400">Destinations: Not provided</span>
                         )}
                       </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div>
                         <div className="flex items-center gap-2 mb-2">
                           <List className="w-4 h-4 text-green-500" />
                           <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Inclusions</h4>
                         </div>
                         <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 min-h-[100px]">
                           {selectedPackage.inclusions?.length > 0 ? (
                             <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1">
                               {selectedPackage.inclusions.map((inc, i) => <li key={i}>{inc}</li>)}
                             </ul>
                           ) : (
                             <span className="text-sm italic text-gray-400">Not provided</span>
                           )}
                         </div>
                       </div>
                       
                       <div>
                         <div className="flex items-center gap-2 mb-2">
                           <XOctagon className="w-4 h-4 text-red-500" />
                           <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Exclusions</h4>
                         </div>
                         <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 min-h-[100px]">
                           {selectedPackage.exclusions?.length > 0 ? (
                             <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1">
                               {selectedPackage.exclusions.map((exc, i) => <li key={i}>{exc}</li>)}
                             </ul>
                           ) : (
                             <span className="text-sm italic text-gray-400">Not provided</span>
                           )}
                         </div>
                       </div>
                    </div>

                    <div>
                       <div className="flex items-center gap-2 mb-3">
                         <Map className="w-4 h-4 text-blue-500" />
                         <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Itinerary ({selectedPackage.itinerary?.length || 0} Days)</h4>
                       </div>
                       {selectedPackage.itinerary?.length > 0 ? (
                         <div className="space-y-4">
                           {selectedPackage.itinerary.map((day, i) => (
                             <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                <h5 className="font-bold text-gray-900 text-sm mb-1">Day {day.dayNumber}: {day.title || 'Untitled'}</h5>
                                <p className="text-sm text-gray-600 mb-3">{day.description || <span className="italic text-gray-400">No description provided</span>}</p>
                                
                                <div className="flex flex-col sm:flex-row gap-4 mt-3 pt-3 border-t border-gray-100">
                                   <div className="flex-1">
                                     <div className="flex items-center gap-1.5 mb-1.5">
                                        <Utensils className="w-3.5 h-3.5 text-orange-400" />
                                        <span className="text-xs font-bold text-gray-700">Meals</span>
                                     </div>
                                     <div className="flex gap-2">
                                        <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md ${day.mealsIncluded?.breakfast ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-400 line-through'}`}>B</span>
                                        <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md ${day.mealsIncluded?.lunch ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-400 line-through'}`}>L</span>
                                        <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md ${day.mealsIncluded?.dinner ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-400 line-through'}`}>D</span>
                                     </div>
                                   </div>
                                   
                                   <div className="flex-1">
                                     <div className="flex items-center gap-1.5 mb-1.5">
                                        <Activity className="w-3.5 h-3.5 text-blue-400" />
                                        <span className="text-xs font-bold text-gray-700">Activities</span>
                                     </div>
                                     {day.activities?.length > 0 ? (
                                        <ul className="text-xs text-gray-600 list-disc pl-4 space-y-1">
                                          {day.activities.map((act, j) => (
                                             <li key={j}>
                                               {act.name} 
                                               {act.isExtraCharge && <span className="ml-1 text-red-500 font-medium">(+₹{act.extraChargeAmount})</span>}
                                             </li>
                                          ))}
                                        </ul>
                                     ) : (
                                        <span className="text-xs italic text-gray-400">None</span>
                                     )}
                                   </div>
                                </div>
                             </div>
                           ))}
                         </div>
                       ) : (
                         <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                           <span className="text-sm italic text-gray-400">No itinerary provided for this package.</span>
                         </div>
                       )}
                    </div>
                    
                    {/* Gallery Info */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                         <ImageIcon className="w-5 h-5 text-blue-500" />
                         <span className="block text-sm font-bold text-gray-900 uppercase tracking-wide mt-0.5">Gallery Images ({selectedPackage.images?.length || 0})</span>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm text-gray-800">
                         {selectedPackage.images?.length > 0 ? (
                            <div className="flex items-center gap-3">
                              <div className="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center border border-gray-300 shadow-sm">
                                 <ImageIcon className="w-6 h-6 text-gray-400" />
                              </div>
                              <div>
                                <span className="font-semibold text-gray-700 block">{selectedPackage.images.length} Image(s) uploaded</span>
                                <span className="text-xs text-gray-500">Media attached to this package.</span>
                              </div>
                            </div>
                         ) : (
                            <span className="italic text-gray-400 block p-2">Not provided</span>
                         )}
                      </div>
                    </div>
                 </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100 flex-shrink-0">
                 <button type="button" onClick={() => { handleDelete(selectedPackage.id); setSelectedPackage(null); }} className="inline-flex items-center gap-1.5 justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-50 transition-colors">
                   <Trash2 className="w-4 h-4" /> Delete
                 </button>
                 <Link to={`/packages/${selectedPackage.id}`} className="inline-flex items-center gap-1.5 justify-center rounded-lg bg-primary-50 text-primary-700 px-4 py-2 text-sm font-semibold hover:bg-primary-100 transition-colors">
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

