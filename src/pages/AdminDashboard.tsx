import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, OrderStatus, CategoryName, ToneColor } from '../types';
import { 
  BarChart3, Package, ShoppingBag, Users, Plus, Edit3, Trash2, 
  CheckCircle2, AlertCircle, TrendingUp, DollarSign, Filter, X, Save 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { products, orders, user, categories, addProduct, updateProduct, deleteProduct, updateOrderStatus, navigate, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');

  // Product modal state
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [prodForm, setProdForm] = useState<Partial<Product>>({
    name: '',
    category: 'Living Room',
    price: 45000,
    originalPrice: 55000,
    rating: 4.8,
    reviewCount: 12,
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    description: 'Handcrafted architectural piece designed for serene residential sanctuaries.',
    material: 'Wood',
    dimensions: '84"W x 38"D x 32"H',
    weight: '40 kg',
    color: 'rust',
    stock: 10,
    isBestSeller: false
  });

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-red-100 text-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#1E1A17] mb-2">Curator Access Required</h1>
        <p className="text-sm text-[#8D9399] mb-6">
          This administrative dashboard is restricted to authorized Studio Curators and logistics administrators.
        </p>
        <div className="flex justify-center gap-4">
          <button onClick={() => navigate('home')} className="px-6 py-2.5 bg-[#1E1A17] text-[#F8ECE1] rounded-xl text-xs font-semibold">
            Return Home
          </button>
          <button onClick={() => navigate('auth')} className="px-6 py-2.5 bg-[#CCA37E] text-[#1E1A17] rounded-xl text-xs font-semibold">
            Sign In as Admin
          </button>
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const lowStockCount = products.filter(p => p.stock < 5).length;

  // Chart data: Revenue by Category
  const categoryRevenueMap: Record<string, number> = {
    'Living Room': 450000,
    'Dining Room': 320000,
    'Bedroom': 280000,
    'Office Furniture': 190000,
    'Outdoor Furniture': 95000,
    'Storage Furniture': 65000,
    'Decor & Accessories': 85000,
    'Lighting & Sculptures': 120000,
    'Rugs & Textiles': 145000,
    'Bar & Entertainment': 110000,
    'Bathroom & Spa': 75000,
    'Kids & Nursery': 90000,
    'Kitchen & Dining Island': 380000,
    'Lounge & Lobby': 410000,
    'Acoustic & Studio': 290000,
    'Wellness & Sanctuary': 350000,
    'Library & Study': 275000
  };

  orders.forEach(ord => {
    ord.items.forEach(item => {
      const p = products.find(prod => prod.id === item.productId);
      if (p) {
        categoryRevenueMap[p.category] = (categoryRevenueMap[p.category] || 0) + (item.price * item.quantity);
      }
    });
  });

  const chartData = Object.keys(categoryRevenueMap).map(cat => ({
    category: cat.replace(' Furniture', '').replace(' Room', ''),
    revenue: categoryRevenueMap[cat]
  }));

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setProdForm({
      name: '',
      category: 'Living Room',
      price: 45000,
      originalPrice: 55000,
      rating: 4.8,
      reviewCount: 12,
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      description: 'Handcrafted architectural piece designed for serene residential sanctuaries.',
      material: 'Wood',
      dimensions: '84"W x 38"D x 32"H',
      weight: '40 kg',
      color: 'rust',
      stock: 10,
      isBestSeller: false
    });
    setShowProductModal(true);
  };

  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
    setProdForm(p);
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.name || !prodForm.price) {
      showToast('Please provide a piece title and pricing.', 'warning');
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, prodForm as Partial<Product>);
    } else {
      addProduct({
        name: prodForm.name!,
        category: (prodForm.category as CategoryName) || 'Living Room',
        price: Number(prodForm.price),
        originalPrice: prodForm.originalPrice ? Number(prodForm.originalPrice) : undefined,
        rating: Number(prodForm.rating) || 4.8,
        reviewCount: Number(prodForm.reviewCount) || 12,
        imageUrl: prodForm.imageUrl || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
        description: prodForm.description || '',
        material: prodForm.material || 'Wood',
        dimensions: prodForm.dimensions || '84"W x 38"D x 32"H',
        weight: prodForm.weight || '40 kg',
        color: (prodForm.color as ToneColor) || 'rust',
        stock: Number(prodForm.stock) || 10,
        isBestSeller: Boolean(prodForm.isBestSeller)
      });
    }
    setShowProductModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#EBD8C6]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBD8C6] text-[#964627] text-[10px] font-bold uppercase tracking-wider mb-2">
            <TrendingUp className="w-3.5 h-3.5" /> Curator & Logistics Control
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1A17]">Studio Admin Portal</h1>
        </div>

        {/* Tab navigation */}
        <div className="flex bg-[#F3E5D8] p-1 rounded-2xl border border-[#EBD8C6]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-xs font-serif font-bold rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'overview' ? 'bg-[#1E1A17] text-[#F8ECE1] shadow-md' : 'text-[#1E1A17]/70 hover:text-[#1E1A17]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" /> Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 text-xs font-serif font-bold rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'products' ? 'bg-[#1E1A17] text-[#F8ECE1] shadow-md' : 'text-[#1E1A17]/70 hover:text-[#1E1A17]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Catalog ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 text-xs font-serif font-bold rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'orders' ? 'bg-[#1E1A17] text-[#F8ECE1] shadow-md' : 'text-[#1E1A17]/70 hover:text-[#1E1A17]'
            }`}
          >
            <Package className="w-3.5 h-3.5" /> Orders ({orders.length})
          </button>
        </div>
      </div>

      {/* 1. Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-10 animate-in fade-in duration-300">
          
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#F3E5D8]/70 p-6 rounded-3xl border border-[#EBD8C6] shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8D9399] block mb-1">Gross Revenue</span>
                <h3 className="font-serif font-bold text-2xl text-[#1E1A17] font-mono">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </h3>
                <span className="text-[10px] text-green-700 font-bold flex items-center gap-0.5 mt-1">
                  &uarr; +14.2% vs last month
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#964627] text-[#F8ECE1] flex items-center justify-center shadow-md">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-[#F3E5D8]/70 p-6 rounded-3xl border border-[#EBD8C6] shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8D9399] block mb-1">Total Orders</span>
                <h3 className="font-serif font-bold text-2xl text-[#1E1A17]">{totalOrders} Dispatches</h3>
                <span className="text-[10px] text-[#8D9399] mt-1 block">100% White-Glove fulfilled</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#CCA37E] text-[#1E1A17] flex items-center justify-center shadow-md">
                <Package className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-[#F3E5D8]/70 p-6 rounded-3xl border border-[#EBD8C6] shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8D9399] block mb-1">Active Catalog</span>
                <h3 className="font-serif font-bold text-2xl text-[#1E1A17]">{totalProducts} Pieces</h3>
                <span className="text-[10px] text-[#964627] font-semibold mt-1 block">Across {categories.length} Studio Divisions</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#1E1A17] text-[#F8ECE1] flex items-center justify-center shadow-md">
                <ShoppingBag className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-[#F3E5D8]/70 p-6 rounded-3xl border border-[#EBD8C6] shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8D9399] block mb-1">Inventory Status</span>
                <h3 className="font-serif font-bold text-2xl text-[#1E1A17]">{lowStockCount} Low Stock</h3>
                <span className="text-[10px] text-amber-700 font-bold mt-1 block">&lt; 5 units remaining</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md">
                <AlertCircle className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Revenue Chart Section */}
          <div className="bg-[#F3E5D8]/50 p-6 sm:p-8 rounded-3xl border border-[#EBD8C6] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#1E1A17]">Studio Revenue by Category</h3>
                <p className="text-xs text-[#8D9399] mt-0.5">Aggregated sales volume across living, dining, and workspace collections</p>
              </div>
              <span className="text-xs font-mono font-bold bg-[#EBD8C6] text-[#964627] px-3 py-1 rounded">2026 Fiscal Q3</span>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                  <XAxis dataKey="category" stroke="#8D9399" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#8D9399" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                  <Tooltip 
                    formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Revenue']}
                    contentStyle={{ backgroundColor: '#1E1A17', color: '#F8ECE1', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                  />
                  <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#964627' : '#CCA37E'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Recent Orders */}
          <div className="bg-[#F3E5D8]/50 p-6 sm:p-8 rounded-3xl border border-[#EBD8C6] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-xl text-[#1E1A17]">Recent Dispatch Activity</h3>
              <button onClick={() => setActiveTab('orders')} className="text-xs font-semibold text-[#964627] hover:underline">
                View All Orders &rarr;
              </button>
            </div>

            <div className="space-y-3">
              {orders.slice(0, 3).map(ord => (
                <div key={ord.id} className="bg-[#F8ECE1] p-4 rounded-2xl border border-[#EBD8C6] flex items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="font-mono font-bold text-[#1E1A17]">#{ord.orderNumber}</span>
                    <span className="text-[#8D9399]"> &middot; {ord.shippingAddress.fullName}</span>
                    <p className="text-[11px] text-[#8D9399] mt-0.5">{ord.items.length} pieces scheduled for {ord.shippingAddress.city}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-serif font-bold text-sm text-[#1E1A17]">₹{ord.totalPrice.toLocaleString('en-IN')}</span>
                    <span className="bg-[#EBD8C6] text-[#964627] font-bold px-2.5 py-1 rounded-full text-[10px]">
                      {ord.orderStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 2. Catalog Management Tab */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-2xl text-[#1E1A17]">Catalog Inventory</h3>
              <p className="text-xs text-[#8D9399]">Manage prices, stock levels, and finish variants</p>
            </div>
            <button
              onClick={handleOpenAddModal}
              className="px-5 py-2.5 bg-[#1E1A17] hover:bg-[#964627] text-[#F8ECE1] font-serif font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Studio Piece
            </button>
          </div>

          <div className="bg-[#F3E5D8]/50 rounded-3xl border border-[#EBD8C6] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#EBD8C6]/50 text-[10px] font-bold uppercase tracking-wider text-[#8D9399] border-b border-[#EBD8C6]">
                    <th className="p-4">Piece</th>
                    <th className="p-4">Division</th>
                    <th className="p-4">Price (INR)</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Tone</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBD8C6]/60 text-xs font-sans">
                  {products.map(prod => (
                    <tr key={prod.id} className="hover:bg-[#F3E5D8]/80 transition-colors">
                      <td className="p-4 flex items-center gap-3 min-w-[200px]">
                        <img src={prod.imageUrl} alt="" className="w-12 h-12 rounded-xl object-cover shadow-sm flex-shrink-0" />
                        <div>
                          <p className="font-serif font-bold text-sm text-[#1E1A17]">{prod.name}</p>
                          <p className="text-[10px] text-[#8D9399] truncate max-w-[150px]">Primary Material: {prod.material} &middot; {prod.dimensions}</p>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-[#1E1A17]">
                        <div className="flex items-center gap-2">
                          {(() => {
                            const catImg = categories.find(c => c.name === prod.category)?.image;
                            return catImg ? (
                              <img src={catImg} alt={prod.category} className="w-6 h-6 rounded-md object-cover flex-shrink-0 border border-black/10 shadow-sm" />
                            ) : null;
                          })()}
                          <span>{prod.category}</span>
                        </div>
                      </td>
                      <td className="p-4 font-mono font-bold text-sm text-[#1E1A17]">₹{prod.price.toLocaleString('en-IN')}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full font-bold font-mono ${
                          prod.stock < 5 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {prod.stock} units
                        </span>
                      </td>
                      <td className="p-4 capitalize font-semibold text-[#1E1A17]">{prod.color} Tone</td>
                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => handleOpenEditModal(prod)}
                          className="p-2 text-[#8D9399] hover:text-[#1E1A17] rounded-lg hover:bg-[#EBD8C6] transition-colors"
                          title="Edit piece"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${prod.name}" from catalog?`)) deleteProduct(prod.id);
                          }}
                          className="p-2 text-[#8D9399] hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete piece"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. Orders Management Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <h3 className="font-serif font-bold text-2xl text-[#1E1A17]">Logistics & Order Status Control</h3>
            <p className="text-xs text-[#8D9399]">Update shipping pipelines and verify patron receipts</p>
          </div>

          <div className="bg-[#F3E5D8]/50 rounded-3xl border border-[#EBD8C6] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#EBD8C6]/50 text-[10px] font-bold uppercase tracking-wider text-[#8D9399] border-b border-[#EBD8C6]">
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Patron Recipient</th>
                    <th className="p-4">Items Qty</th>
                    <th className="p-4">Invoice Total</th>
                    <th className="p-4">Current Logistics Status</th>
                    <th className="p-4">Update Pipeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBD8C6]/60 text-xs font-sans">
                  {orders.map(ord => (
                    <tr key={ord.id} className="hover:bg-[#F3E5D8]/80 transition-colors">
                      <td className="p-4 font-mono font-bold text-[#1E1A17]">#{ord.orderNumber}</td>
                      <td className="p-4">
                        <p className="font-serif font-bold text-[#1E1A17]">{ord.shippingAddress.fullName}</p>
                        <p className="text-[10px] text-[#8D9399]">{ord.shippingAddress.city}, {ord.shippingAddress.state}</p>
                      </td>
                      <td className="p-4 font-mono font-semibold">{ord.items.reduce((a, b) => a + b.quantity, 0)} pcs</td>
                      <td className="p-4 font-mono font-bold text-sm text-[#1E1A17]">₹{ord.totalPrice.toLocaleString('en-IN')}</td>
                      <td className="p-4">
                        <span className="bg-[#EBD8C6] text-[#964627] font-bold px-2.5 py-1 rounded-full text-[10px]">
                          {ord.orderStatus}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="bg-[#F8ECE1] border border-[#CCA37E] rounded-xl px-2.5 py-1.5 text-xs font-semibold text-[#1E1A17] focus:outline-none cursor-pointer"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Returned">Returned</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#F8ECE1] rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#CCA37E] shadow-2xl animate-in zoom-in-95 duration-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#EBD8C6]">
              <h3 className="font-serif font-bold text-xl text-[#1E1A17]">
                {editingProduct ? 'Edit Catalog Piece' : 'Add New Studio Piece'}
              </h3>
              <button onClick={() => setShowProductModal(false)} className="text-[#8D9399] hover:text-[#1E1A17]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold uppercase tracking-wider text-[#8D9399] block mb-1">Piece Title *</label>
                  <input
                    type="text"
                    value={prodForm.name || ''}
                    onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                    placeholder="e.g. Kyoto Walnut Sideboard"
                    className="w-full bg-[#F3E5D8] border border-[#EBD8C6] rounded-xl p-2.5 text-sm text-[#1E1A17]"
                  />
                </div>

                <div>
                  <label className="font-semibold uppercase tracking-wider text-[#8D9399] block mb-1">Division Category *</label>
                  <select
                    value={prodForm.category || 'Living Room'}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value as CategoryName })}
                    className="w-full bg-[#F3E5D8] border border-[#EBD8C6] rounded-xl p-2.5 text-sm font-semibold text-[#1E1A17]"
                  >
                    {categories.map((cat) => (
                      <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold uppercase tracking-wider text-[#8D9399] block mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    value={prodForm.price || ''}
                    onChange={(e) => setProdForm({ ...prodForm, price: Number(e.target.value) })}
                    className="w-full bg-[#F3E5D8] border border-[#EBD8C6] rounded-xl p-2.5 text-sm font-mono text-[#1E1A17]"
                  />
                </div>
                <div>
                  <label className="font-semibold uppercase tracking-wider text-[#8D9399] block mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={prodForm.originalPrice || ''}
                    onChange={(e) => setProdForm({ ...prodForm, originalPrice: Number(e.target.value) })}
                    className="w-full bg-[#F3E5D8] border border-[#EBD8C6] rounded-xl p-2.5 text-sm font-mono text-[#1E1A17]"
                  />
                </div>
                <div>
                  <label className="font-semibold uppercase tracking-wider text-[#8D9399] block mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    value={prodForm.stock || 0}
                    onChange={(e) => setProdForm({ ...prodForm, stock: Number(e.target.value) })}
                    className="w-full bg-[#F3E5D8] border border-[#EBD8C6] rounded-xl p-2.5 text-sm font-mono text-[#1E1A17]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold uppercase tracking-wider text-[#8D9399] block mb-1">Primary Material</label>
                  <input
                    type="text"
                    value={prodForm.material || ''}
                    onChange={(e) => setProdForm({ ...prodForm, material: e.target.value })}
                    placeholder="e.g. Solid Oak & Brass"
                    className="w-full bg-[#F3E5D8] border border-[#EBD8C6] rounded-xl p-2.5 text-sm text-[#1E1A17]"
                  />
                </div>
                <div>
                  <label className="font-semibold uppercase tracking-wider text-[#8D9399] block mb-1">Tone</label>
                  <select
                    value={prodForm.color || 'rust'}
                    onChange={(e) => setProdForm({ ...prodForm, color: e.target.value as ToneColor })}
                    className="w-full bg-[#F3E5D8] border border-[#EBD8C6] rounded-xl p-2.5 text-sm font-semibold text-[#1E1A17]"
                  >
                    <option value="rust">Rust</option>
                    <option value="slate">Slate</option>
                    <option value="greige">Greige</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold uppercase tracking-wider text-[#8D9399] block mb-1">Image URL</label>
                <input
                  type="text"
                  value={prodForm.imageUrl || ''}
                  onChange={(e) => setProdForm({ ...prodForm, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#F3E5D8] border border-[#EBD8C6] rounded-xl p-2.5 text-sm font-mono text-[#1E1A17]"
                />
              </div>

              <div>
                <label className="font-semibold uppercase tracking-wider text-[#8D9399] block mb-1">Architectural Description</label>
                <textarea
                  rows={3}
                  value={prodForm.description || ''}
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                  className="w-full bg-[#F3E5D8] border border-[#EBD8C6] rounded-xl p-2.5 text-sm text-[#1E1A17]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="bestseller-check"
                  checked={Boolean(prodForm.isBestSeller)}
                  onChange={(e) => setProdForm({ ...prodForm, isBestSeller: e.target.checked })}
                  className="w-4 h-4 text-[#964627] rounded border-[#CCA37E]"
                />
                <label htmlFor="bestseller-check" className="font-bold text-[#1E1A17]">Mark as Studio Best Seller</label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[#EBD8C6]">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#1E1A17] hover:bg-[#964627] text-[#F8ECE1] font-serif font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProduct ? 'Save Piece Updates' : 'Add to Catalog'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-6 py-3 bg-[#F3E5D8] text-[#1E1A17] font-semibold text-sm rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
