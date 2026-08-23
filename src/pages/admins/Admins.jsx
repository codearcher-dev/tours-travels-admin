import { useState } from 'react';
import { Shield, User, Mail, Lock, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Admins() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }
    // Mock save
    toast.success('New admin registered successfully!');
    setFormData({ name: '', email: '', password: '' });
  };

  const inputClass = "block w-full rounded-lg border-0 py-2.5 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition-all";

  return (
    <div className="space-y-8 max-w-2xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Admin Management</h1>
        <p className="mt-2 text-sm text-gray-500">Register a new administrator with full access to the Prime Traveller dashboard.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-900/5 rounded-xl space-y-6">
        <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
           <Shield className="w-5 h-5 text-primary-600" />
           <h2 className="text-lg font-semibold leading-7 text-gray-900">New Admin Details</h2>
        </div>

        <div className="space-y-5">
          <div className="relative">
            <label className="block text-sm font-semibold leading-6 text-gray-900 mb-1.5">Full Name</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Sarah Jenkins" className={inputClass} />
            </div>
          </div>
          
          <div className="relative">
            <label className="block text-sm font-semibold leading-6 text-gray-900 mb-1.5">Email Address</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="sarah@primetraveller.com" className={inputClass} />
            </div>
          </div>
          
          <div className="relative">
            <label className="block text-sm font-semibold leading-6 text-gray-900 mb-1.5">Temporary Password</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input required type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className={inputClass} />
            </div>
            <p className="mt-1.5 text-xs text-gray-500">They can change this password later.</p>
          </div>
        </div>
        
        <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
           <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all hover:shadow-md">
             <UserPlus className="w-4 h-4" />
             Register Admin
           </button>
        </div>
      </form>
    </div>
  );
}
