import { useState } from 'react';
import { X, Search, Package as PackageIcon, Calendar, User, Mail, Phone, Users, MessageSquare, CheckCircle2, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const mockEnquiries = [
  { id: '1', name: 'Alice Walker', email: 'alice@example.com', phone: '+91 9876543210', package: 'Goa Holiday', adults: 2, kids: 1, message: 'Looking for a sea-facing hotel.', date: '2023-10-10', status: 'pending' },
  { id: '2', name: 'Bob Marley', email: 'bob@example.com', phone: '+91 8765432109', package: 'Kashmir Paradise', adults: 4, kids: 0, message: '', date: '2023-10-11', status: 'completed' },
];

export default function EnquiriesList() {
  const [enquiries, setEnquiries] = useState(mockEnquiries);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const handleComplete = (id) => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: 'completed' } : e));
    setSelectedEnquiry(prev => ({ ...prev, status: 'completed' }));
    toast.success("Enquiry marked as served!");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Enquiries</h1>
          <p className="mt-2 text-sm text-gray-500">Manage all customer enquiries received from your website.</p>
        </div>
      </div>
      
      {/* Filters/Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm ring-1 ring-gray-900/5 flex items-center justify-between">
         <div className="relative w-full max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
               <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input type="text" placeholder="Search enquiries by name or package..." className="block w-full rounded-lg border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition-all" />
         </div>
      </div>

      <div className="mt-6 overflow-hidden shadow-sm ring-1 ring-gray-900/5 rounded-xl bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="py-4 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider sm:pl-6">Customer Details</th>
              <th className="px-3 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Interested Package</th>
              <th className="px-3 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {enquiries.map((enq) => (
              <tr key={enq.id} onClick={() => setSelectedEnquiry(enq)} className="cursor-pointer hover:bg-gray-50/80 transition-colors group">
                <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-6">
                  <div className="flex items-center">
                    <div>
                      <div className="font-semibold text-gray-900">{enq.name}</div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-600 font-medium">
                  <div className="flex items-center gap-1.5">
                     <PackageIcon className="w-4 h-4 text-primary-500" /> {enq.package}
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-5 text-sm">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${enq.status === 'completed' ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-orange-50 text-orange-700 ring-orange-600/20'}`}>
                    {enq.status === 'completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>}
                    {enq.status === 'completed' ? 'Served' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-2 text-center sm:items-center sm:p-0">
            <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={() => setSelectedEnquiry(null)} />
            
            <div className="relative w-full transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-xl animate-in fade-in zoom-in-95 duration-200">
              
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button type="button" onClick={() => setSelectedEnquiry(null)} className="rounded-md bg-white text-gray-400 hover:text-gray-500 hover:bg-gray-100 p-1 transition-colors">
                  <span className="sr-only">Close</span>
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="px-6 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                 <div className="flex items-center gap-3">
                   <div className="h-14 w-14 flex-shrink-0 rounded-full bg-primary-100 flex items-center justify-center border border-primary-200 text-primary-700 font-bold text-2xl">
                     {selectedEnquiry.name.charAt(0)}
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-gray-900 leading-none">{selectedEnquiry.name}</h3>
                     <span className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-primary-700 bg-primary-50 px-2.5 py-1 rounded-full border border-primary-100">
                        <PackageIcon className="w-3.5 h-3.5" /> Interested in {selectedEnquiry.package}
                     </span>
                   </div>
                 </div>
                 
                 <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${selectedEnquiry.status === 'completed' ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-orange-50 text-orange-700 ring-orange-600/20'}`}>
                    {selectedEnquiry.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <span className="relative flex h-2 w-2 mr-1"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span></span>}
                    {selectedEnquiry.status === 'completed' ? 'Served' : 'Pending'}
                 </span>
              </div>

              <div className="px-6 py-6">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                       <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                       <div>
                         <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Email Address</span>
                         <span className="block text-sm font-medium text-gray-900">{selectedEnquiry.email || 'Not provided'}</span>
                       </div>
                    </div>
                    
                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                       <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                       <div>
                         <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Phone Number</span>
                         <span className="block text-sm font-medium text-gray-900">{selectedEnquiry.phone || 'Not provided'}</span>
                         {selectedEnquiry.phone && (
                           <a 
                             href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}`} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-100 hover:bg-green-200 px-3 py-1.5 rounded-lg transition-colors"
                           >
                             <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Message
                           </a>
                         )}
                       </div>
                    </div>

                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 sm:col-span-2">
                       <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                       <div className="flex gap-8">
                         <div>
                           <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Adults</span>
                           <span className="block text-lg font-bold text-gray-900">{selectedEnquiry.adults}</span>
                         </div>
                         <div>
                           <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Kids</span>
                           <span className="block text-lg font-bold text-gray-900">{selectedEnquiry.kids || 0}</span>
                         </div>
                       </div>
                    </div>

                    {selectedEnquiry.message && (
                      <div className="sm:col-span-2 relative mt-2">
                        <div className="flex items-start gap-2 mb-2">
                           <MessageSquare className="w-4 h-4 text-primary-500" />
                           <span className="block text-xs font-bold text-gray-900 uppercase tracking-wide">Customer Message</span>
                        </div>
                        <div className="bg-primary-50/50 p-4 rounded-xl border border-primary-100 text-sm text-gray-800 leading-relaxed italic">
                           "{selectedEnquiry.message}"
                        </div>
                      </div>
                    )}
                 </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-end border-t border-gray-100 gap-3">
                <button type="button" onClick={() => setSelectedEnquiry(null)} className="inline-flex justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 transition-colors">
                  Close
                </button>
                {selectedEnquiry.status === 'pending' && (
                  <button type="button" onClick={() => handleComplete(selectedEnquiry.id)} className="inline-flex items-center gap-1.5 justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 transition-colors">
                    <CheckCircle2 className="w-4 h-4" /> Mark as Served
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
