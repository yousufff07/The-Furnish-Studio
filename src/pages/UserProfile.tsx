import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User as UserIcon, MapPin, Plus, Trash2, CheckCircle2, ShieldAlert, Package, LogOut, Edit3, Save } from 'lucide-react';

export const UserProfile: React.FC = () => {
  const { user, updateProfile, addAddress, deleteAddress, setDefaultAddress, logout, navigate, showToast } = useApp();

  if (!user) {
    navigate('auth');
    return null;
  }

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone
  });

  // New address inline form
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    label: 'Office Sanctuary',
    fullName: user.name,
    street: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '',
    phone: user.phone
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm.name, profileForm.email, profileForm.phone);
    setIsEditingProfile(false);
  };

  const handleAddAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.street.trim() || !newAddr.pincode.trim()) {
      showToast('Please provide street address and postal code.', 'warning');
      return;
    }
    addAddress(newAddr);
    setShowAddAddress(false);
    setNewAddr({ label: 'Studio Apartment', fullName: user.name, street: '', city: 'Mumbai', state: 'Maharashtra', pincode: '', phone: user.phone });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300">
      
      {/* Top Profile Header Card */}
      <div className="bg-[#F3E5D8] rounded-3xl p-6 sm:p-10 border border-[#EBD8C6] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-[#CCA37E] shadow-lg"
          />
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#964627] bg-[#EBD8C6] px-2.5 py-0.5 rounded-full">
                {user.role === 'admin' ? 'Studio Curator (Admin)' : 'Verified Studio Patron'}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1A17]">{user.name}</h1>
            <p className="text-sm text-[#8D9399] font-sans">{user.email} &middot; {user.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
          {user.role === 'admin' && (
            <button
              onClick={() => navigate('admin')}
              className="px-5 py-2.5 bg-[#964627] hover:bg-[#1E1A17] text-[#F8ECE1] font-serif font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5"
            >
              <ShieldAlert className="w-4 h-4" /> Admin Portal
            </button>
          )}
          <button
            onClick={logout}
            className="px-5 py-2.5 bg-[#F8ECE1] hover:bg-red-600 text-[#1E1A17] hover:text-white font-semibold text-xs rounded-xl shadow-md transition-colors border border-[#EBD8C6] flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left: Profile Info / Edit (Col 5) */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-[#F3E5D8]/60 p-6 sm:p-8 rounded-3xl border border-[#EBD8C6] shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#EBD8C6]">
              <h3 className="font-serif font-bold text-lg text-[#1E1A17] flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-[#964627]" />
                <span>Patron Details</span>
              </h3>
              {!isEditingProfile && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="text-xs font-semibold text-[#964627] hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
              )}
            </div>

            {isEditingProfile ? (
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#8D9399] block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full bg-[#F8ECE1] border border-[#CCA37E] rounded-xl p-2.5 text-sm text-[#1E1A17]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#8D9399] block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full bg-[#F8ECE1] border border-[#CCA37E] rounded-xl p-2.5 text-sm text-[#1E1A17]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#8D9399] block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full bg-[#F8ECE1] border border-[#CCA37E] rounded-xl p-2.5 text-sm text-[#1E1A17]"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#1E1A17] hover:bg-[#CCA37E] text-[#F8ECE1] hover:text-[#1E1A17] font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2.5 bg-[#F8ECE1] text-[#1E1A17] font-semibold text-xs rounded-xl border border-[#EBD8C6]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-sm font-sans">
                <div>
                  <span className="text-xs text-[#8D9399] uppercase font-semibold block">Full Name</span>
                  <p className="font-semibold text-[#1E1A17] mt-0.5">{user.name}</p>
                </div>
                <div>
                  <span className="text-xs text-[#8D9399] uppercase font-semibold block">Email Address</span>
                  <p className="font-semibold text-[#1E1A17] mt-0.5">{user.email}</p>
                </div>
                <div>
                  <span className="text-xs text-[#8D9399] uppercase font-semibold block">Phone Number</span>
                  <p className="font-mono font-semibold text-[#1E1A17] mt-0.5">{user.phone}</p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => navigate('order-history')}
                    className="w-full py-3 bg-[#F8ECE1] hover:bg-[#EBD8C6] text-[#1E1A17] font-serif font-bold text-xs rounded-xl transition-colors border border-[#EBD8C6] flex items-center justify-center gap-2"
                  >
                    <Package className="w-4 h-4 text-[#964627]" /> View Past Order Logistics
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Saved Addresses (Col 7) */}
        <div className="md:col-span-7 space-y-6">
          <div className="bg-[#F3E5D8]/60 p-6 sm:p-8 rounded-3xl border border-[#EBD8C6] shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#EBD8C6]">
              <h3 className="font-serif font-bold text-lg text-[#1E1A17] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#964627]" />
                <span>Saved Architectural Addresses ({user.addresses.length})</span>
              </h3>
              <button
                onClick={() => setShowAddAddress(!showAddAddress)}
                className="px-3.5 py-1.5 bg-[#1E1A17] text-[#F8ECE1] rounded-xl text-xs font-semibold flex items-center gap-1 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> Add Address
              </button>
            </div>

            {/* Add Address Form Modal / Box */}
            {showAddAddress && (
              <form onSubmit={handleAddAddressSubmit} className="bg-[#F8ECE1] p-6 rounded-2xl border-2 border-[#964627] space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-[#EBD8C6]">
                  <h4 className="font-serif font-bold text-sm text-[#1E1A17]">New Sanctuary Location</h4>
                  <button type="button" onClick={() => setShowAddAddress(false)} className="text-xs text-[#8D9399]">Close</button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#8D9399] block mb-1">Label</label>
                    <input
                      type="text"
                      value={newAddr.label}
                      onChange={(e) => setNewAddr({ ...newAddr, label: e.target.value })}
                      placeholder="e.g. Penthouse"
                      className="w-full bg-[#F3E5D8] border border-[#EBD8C6] rounded-xl p-2 text-xs text-[#1E1A17]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#8D9399] block mb-1">Recipient Name</label>
                    <input
                      type="text"
                      value={newAddr.fullName}
                      onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                      className="w-full bg-[#F3E5D8] border border-[#EBD8C6] rounded-xl p-2 text-xs text-[#1E1A17]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#8D9399] block mb-1">Street Address</label>
                  <input
                    type="text"
                    value={newAddr.street}
                    onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                    placeholder="e.g. 402, Palm Grove Heights, Linking Road, Bandra West"
                    className="w-full bg-[#F3E5D8] border border-[#EBD8C6] rounded-xl p-2 text-xs text-[#1E1A17]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#8D9399] block mb-1">City</label>
                    <input
                      type="text"
                      value={newAddr.city}
                      onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                      className="w-full bg-[#F3E5D8] border border-[#EBD8C6] rounded-xl p-2 text-xs text-[#1E1A17]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#8D9399] block mb-1">State</label>
                    <input
                      type="text"
                      value={newAddr.state}
                      onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                      className="w-full bg-[#F3E5D8] border border-[#EBD8C6] rounded-xl p-2 text-xs text-[#1E1A17]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#8D9399] block mb-1">Pincode *</label>
                    <input
                      type="text"
                      value={newAddr.pincode}
                      onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                      placeholder="400050"
                      className="w-full bg-[#F3E5D8] border border-[#EBD8C6] rounded-xl p-2 text-xs text-[#1E1A17] font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#964627] hover:bg-[#1E1A17] text-[#F8ECE1] font-bold text-xs rounded-xl transition-colors shadow-sm"
                >
                  Save Shipping Address
                </button>
              </form>
            )}

            {/* Addresses List */}
            <div className="space-y-4">
              {user.addresses.map(addr => (
                <div key={addr.id} className="bg-[#F8ECE1] p-5 rounded-2xl border border-[#EBD8C6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EBD8C6] text-[#964627] px-2 py-0.5 rounded">
                        {addr.label}
                      </span>
                      {addr.isDefault && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#1E1A17] text-[#F8ECE1] px-2 py-0.5 rounded flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Default Sanctuary
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif font-bold text-sm text-[#1E1A17]">{addr.fullName}</h4>
                    <p className="text-xs text-[#1E1A17]/80">{addr.street}</p>
                    <p className="text-xs text-[#8D9399]">{addr.city}, {addr.state} - {addr.pincode}</p>
                    <p className="text-xs font-mono text-[#1E1A17]/70">{addr.phone}</p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {!addr.isDefault && (
                      <button
                        onClick={() => setDefaultAddress(addr.id)}
                        className="px-3 py-1.5 bg-[#F3E5D8] hover:bg-[#CCA37E] text-[#1E1A17] text-xs font-semibold rounded-lg transition-colors"
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this address?')) deleteAddress(addr.id);
                      }}
                      className="p-2 text-[#8D9399] hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                      title="Delete address"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
