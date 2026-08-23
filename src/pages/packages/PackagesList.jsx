import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Search, X, IndianRupee, Clock, Info, CheckCircle2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const mockPackages = [
  { id: '1', name: 'Goa Holiday', slug: 'goa-holiday', duration: { days: 3, nights: 2 }, price: { actual: 15000, discounted: 12000 }, isActive: true, description: 'Experience the beautiful beaches and vibrant nightlife of Goa.' },
  { id: '2', name: 'Kashmir Paradise', slug: 'kashmir-paradise', duration: { days: 5, nights: 4 }, price: { actual: 25000, discounted: 22000 }, isActive: true, description: 'Explore the heaven on earth with our Kashmir Paradise package.' },
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
      
      {/* Filters/Search Bar */}
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

      {/* Package Details Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={() => setSelectedPackage(null)} />
            
            <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg animate-in fade-in zoom-in-95 duration-200">
              
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button type="button" onClick={() => setSelectedPackage(null)} className="rounded-md bg-white text-gray-400 hover:text-gray-500 hover:bg-gray-100 p-1 transition-colors">
                  <span className="sr-only">Close</span>
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="px-6 py-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
                 <div>
                   <h3 className="text-2xl font-bold text-gray-900 leading-none">{selectedPackage.name}</h3>
                   <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-gray-500">
                      <span className="flex items-center gap-1">/{selectedPackage.slug}</span>
                   </div>
                 </div>
              </div>

              <div className="px-6 py-6">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                       <Clock className="w-5 h-5 text-primary-500 mt-0.5" />
                       <div>
                         <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Duration</span>
                         <span className="block text-sm font-medium text-gray-900">{selectedPackage.duration.days} Days, {selectedPackage.duration.nights} Nights</span>
                       </div>
                    </div>
                    
                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                       <IndianRupee className="w-5 h-5 text-primary-500 mt-0.5" />
                       <div>
                         <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Pricing</span>
                         <span className="block text-sm font-bold text-gray-900">₹{selectedPackage.price.discounted.toLocaleString('en-IN')}</span>
                         <span className="block text-xs font-medium text-gray-400 line-through">₹{selectedPackage.price.actual.toLocaleString('en-IN')}</span>
                       </div>
                    </div>

                    <div className="sm:col-span-2 flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                       <Info className="w-5 h-5 text-gray-400 mt-0.5" />
                       <div>
                         <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Description</span>
                         <span className="block text-sm font-medium text-gray-900 leading-relaxed">{selectedPackage.description || 'No description provided.'}</span>
                       </div>
                    </div>
                 </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${selectedPackage.isActive ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-red-50 text-red-700 ring-red-600/20'}`}>
                  {selectedPackage.isActive ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  {selectedPackage.isActive ? 'Active' : 'Inactive'}
                </span>
                
                <div className="flex items-center gap-3">
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
        </div>
      )}
    </div>
  );
}
