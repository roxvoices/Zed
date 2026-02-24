import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  FileText, 
  Plus, 
  LogOut, 
  RefreshCw, 
  Trash2, 
  X,
  Loader2,
  Image as ImageIcon,
  Megaphone,
  Edit2,
  Save
} from 'lucide-react';
import { Quote, Order, Stats, GalleryItem, Announcement } from '../types';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'quotes' | 'gallery' | 'announcements'>('overview');
  const [orders, setOrders] = useState<Order[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Modals & Forms
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  
  const [newOrder, setNewOrder] = useState({
    name: '', email: '', phone: '', pickup: '', delivery: '', weight: '', description: ''
  });
  
  const [newGalleryItem, setNewGalleryItem] = useState({ image_data: '', caption: '' });
  const [newAnnouncement, setNewAnnouncement] = useState({ message: '', type: 'info' as any, id: null as number | null });

  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('zedcart_admin');
    if (!isAdmin) {
      navigate('/admin');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, quotesRes, statsRes, galleryRes, announcementsRes] = await Promise.all([
        fetch('/api/admin/orders'),
        fetch('/api/admin/quotes'),
        fetch('/api/admin/stats'),
        fetch('/api/gallery'),
        fetch('/api/admin/announcements')
      ]);
      
      const ordersData = await ordersRes.json();
      const quotesData = await quotesRes.json();
      const statsData = await statsRes.json();
      const galleryData = await galleryRes.json();
      const announcementsData = await announcementsRes.json();

      setOrders(ordersData);
      setQuotes(quotesData);
      setStats(statsData);
      setGallery(galleryData);
      setAnnouncements(announcementsData);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('zedcart_admin');
    navigate('/admin');
  };

  const updateOrderStatus = async (id: number, status: string) => {
    try {
      await fetch(`/api/admin/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchData();
    } catch (error) {
      console.error('Failed to update status');
    }
  };

  const deleteOrder = async (id: number) => {
    console.log('Deleting order:', id);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        alert('Order deleted successfully');
        await fetchData();
      } else {
        const err = await res.json().catch(() => ({ error: 'Unknown error' }));
        alert(`Failed to delete order: ${err.error}`);
      }
    } catch (error) {
      console.error('Delete order error:', error);
      alert('Network error while deleting order');
    }
  };

  const deleteQuote = async (id: number) => {
    console.log('Deleting quote:', id);
    try {
      const res = await fetch(`/api/admin/quotes/${id}`, { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        alert('Quote deleted successfully');
        await fetchData();
      } else {
        const err = await res.json().catch(() => ({ error: 'Unknown error' }));
        alert(`Failed to delete quote: ${err.error}`);
      }
    } catch (error) {
      console.error('Delete quote error:', error);
      alert('Network error while deleting quote');
    }
  };

  const createOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
      if (res.ok) {
        setShowOrderModal(false);
        setNewOrder({ name: '', email: '', phone: '', pickup: '', delivery: '', weight: '', description: '' });
        fetchData();
      }
    } catch (error) {
      console.error('Failed to create order');
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewGalleryItem({ ...newGalleryItem, image_data: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const saveGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGalleryItem)
      });
      if (res.ok) {
        setShowGalleryModal(false);
        setNewGalleryItem({ image_data: '', caption: '' });
        fetchData();
      }
    } catch (error) {
      console.error('Failed to save gallery item');
    }
  };

  const deleteGalleryItem = async (id: number) => {
    console.log('Deleting gallery item:', id);
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        alert('Photo deleted successfully');
        await fetchData();
      } else {
        const err = await res.json().catch(() => ({ error: 'Unknown error' }));
        alert(`Failed to delete photo: ${err.error}`);
      }
    } catch (error) {
      console.error('Delete gallery error:', error);
      alert('Network error while deleting photo');
    }
  };

  const saveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = newAnnouncement.id ? 'PATCH' : 'POST';
    const url = newAnnouncement.id ? `/api/admin/announcements/${newAnnouncement.id}` : '/api/admin/announcements';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newAnnouncement, active: 1 })
      });
      if (res.ok) {
        setShowAnnouncementModal(false);
        setNewAnnouncement({ message: '', type: 'info', id: null });
        fetchData();
      }
    } catch (error) {
      console.error('Failed to save announcement');
    }
  };

  const deleteAnnouncement = async (id: number) => {
    console.log('Deleting announcement:', id);
    try {
      const res = await fetch(`/api/admin/announcements/${id}`, { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        alert('Announcement deleted successfully');
        await fetchData();
      } else {
        const err = await res.json().catch(() => ({ error: 'Unknown error' }));
        alert(`Failed to delete announcement: ${err.error}`);
      }
    } catch (error) {
      console.error('Delete announcement error:', error);
      alert('Network error while deleting announcement');
    }
  };

  const convertQuoteToOrder = (quote: Quote) => {
    setNewOrder({
      name: quote.name,
      email: quote.email,
      phone: quote.phone,
      pickup: quote.pickup,
      delivery: quote.delivery,
      weight: quote.weight,
      description: quote.description
    });
    setShowOrderModal(true);
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zed-dark">
        <Loader2 className="animate-spin text-zed-red" size={48} />
      </div>
    );
  }

  return (
    <div className="bg-zed-dark min-h-screen pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div>
            <h1 className="text-4xl font-display font-bold text-white mb-2">Command Center</h1>
            <p className="text-slate-500 font-medium">Global Logistics Management System</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button onClick={fetchData} className="glass-card p-3 text-white hover:text-zed-red transition-colors">
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            </button>
            <button 
              onClick={() => setShowOrderModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} /> New Order
            </button>
            <button 
              onClick={() => setShowGalleryModal(true)}
              className="btn-outline flex items-center gap-2"
            >
              <ImageIcon size={20} /> Add Photo
            </button>
            <button 
              onClick={() => setShowAnnouncementModal(true)}
              className="btn-outline flex items-center gap-2"
            >
              <Megaphone size={20} /> New Alert
            </button>
            <button 
              onClick={handleLogout}
              className="btn-outline flex items-center gap-2 border-red-500/20 text-red-400"
            >
              <LogOut size={18} /> Secure Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { label: 'Total Shipments', value: stats?.totalOrders || 0, icon: <Package />, color: 'text-zed-red' },
            { label: 'Active Transit', value: stats?.pendingOrders || 0, icon: <Truck />, color: 'text-zed-gold' },
            { label: 'Delivered', value: stats?.deliveredOrders || 0, icon: <CheckCircle2 />, color: 'text-zed-green' },
            { label: 'Quote Requests', value: stats?.totalQuotes || 0, icon: <FileText />, color: 'text-white' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 flex items-center gap-6"
            >
              <div className={`p-4 bg-white/5 rounded-2xl ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-display font-bold text-white">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {['overview', 'orders', 'quotes', 'gallery', 'announcements'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-8 py-3 rounded-xl font-bold transition-all capitalize ${
                activeTab === tab ? 'bg-zed-red text-white shadow-[0_0_20px_rgba(239,35,60,0.3)]' : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card overflow-hidden"
        >
          {activeTab === 'overview' && stats && (
            <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-display font-bold text-white mb-8 flex items-center gap-3">
                  <Truck size={20} className="text-zed-red" /> Recent Shipments
                </h3>
                <div className="space-y-4">
                  {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
                      <div>
                        <p className="font-bold text-white">{order.tracking_id}</p>
                        <p className="text-xs text-slate-500">{order.name}</p>
                      </div>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase outline-none border-none cursor-pointer transition-colors ${
                          order.status === 'Delivered' || order.status === 'Arrived' ? 'bg-zed-green/10 text-zed-green' : 
                          order.status === 'Cancelled' ? 'bg-red-500/10 text-red-500' : 
                          'bg-zed-gold/10 text-zed-gold'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Arrived">Arrived (to Owner)</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-white mb-8 flex items-center gap-3">
                  <FileText size={20} className="text-zed-red" /> Recent Quotes
                </h3>
                <div className="space-y-4">
                  {quotes.slice(0, 5).map(quote => (
                    <div key={quote.id} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
                      <div>
                        <p className="font-bold text-white">{quote.name}</p>
                        <p className="text-xs text-slate-500">{quote.email}</p>
                      </div>
                      <button 
                        onClick={() => convertQuoteToOrder(quote)}
                        className="text-zed-red text-xs font-bold hover:underline"
                      >
                        Convert to Order
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5">
                    <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Tracking ID</th>
                    <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Customer</th>
                    <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Route</th>
                    <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                    <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-6 font-mono font-bold text-zed-red">{order.tracking_id}</td>
                      <td className="p-6">
                        <p className="text-white font-bold">{order.name}</p>
                        <p className="text-slate-500 text-xs">{order.email}</p>
                      </td>
                      <td className="p-6">
                        <p className="text-slate-300 text-xs font-medium">UK: {order.pickup}</p>
                        <p className="text-slate-300 text-xs font-medium">ZM: {order.delivery}</p>
                      </td>
                      <td className="p-6">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="bg-white/5 border border-white/10 text-xs font-bold text-white rounded-lg px-3 py-2 outline-none focus:border-zed-red"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Arrived in Zambia">Arrived in Zambia</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Arrived">Arrived (to Owner)</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-6 text-right">
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="p-2 text-slate-500 hover:text-zed-red transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'quotes' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5">
                    <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Customer</th>
                    <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Details</th>
                    <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Route</th>
                    <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {quotes.map(quote => (
                    <tr key={quote.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-6">
                        <p className="text-white font-bold">{quote.name}</p>
                        <p className="text-slate-500 text-xs">{quote.email}</p>
                      </td>
                      <td className="p-6">
                        <p className="text-zed-red text-xs font-bold mb-1">{quote.weight}</p>
                        <p className="text-slate-500 text-xs truncate max-w-xs">{quote.description}</p>
                      </td>
                      <td className="p-6">
                        <p className="text-slate-300 text-xs font-medium">UK: {quote.pickup}</p>
                        <p className="text-slate-300 text-xs font-medium">ZM: {quote.delivery}</p>
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex justify-end gap-4">
                          <button
                            onClick={() => convertQuoteToOrder(quote)}
                            className="text-zed-green hover:underline text-xs font-bold"
                          >
                            Create Order
                          </button>
                          <button
                            onClick={() => deleteQuote(quote.id)}
                            className="text-slate-500 hover:text-zed-red transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="p-10">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {gallery.map(item => (
                  <div key={item.id} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                    <img src={item.image_data} alt={item.caption} className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                      <p className="text-white text-xs font-bold mb-4 line-clamp-2">{item.caption}</p>
                      <button 
                        onClick={() => {
                          console.log('Delete button clicked for gallery item:', item.id);
                          deleteGalleryItem(item.id);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-bold text-xs shadow-lg"
                      >
                        <Trash2 size={14} /> Delete Photo
                      </button>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => setShowGalleryModal(true)}
                  className="aspect-square rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 text-slate-500 hover:border-zed-red hover:text-zed-red transition-all"
                >
                  <Plus size={32} />
                  <span className="text-xs font-bold uppercase tracking-widest">Add Photo</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'announcements' && (
            <div className="p-10 space-y-6">
              {announcements.map(ann => (
                <div key={ann.id} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-6">
                    <div className={`p-3 rounded-xl ${
                      ann.type === 'warning' ? 'bg-zed-gold/10 text-zed-gold' : 
                      ann.type === 'success' ? 'bg-zed-green/10 text-zed-green' : 'bg-zed-red/10 text-zed-red'
                    }`}>
                      <Megaphone size={20} />
                    </div>
                    <div>
                      <p className="text-white font-medium">{ann.message}</p>
                      <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Type: {ann.type} | Active: {ann.active ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => {
                        setNewAnnouncement({ message: ann.message, type: ann.type, id: ann.id });
                        setShowAnnouncementModal(true);
                      }}
                      className="p-2 text-slate-400 hover:text-white transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => {
                        console.log('Delete button clicked for announcement:', ann.id);
                        deleteAnnouncement(ann.id);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-xl transition-all font-bold text-xs shadow-lg"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))}
              {announcements.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-500">No announcements yet.</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* New Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-zed-dark/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
              <h3 className="text-2xl font-display font-bold text-white">Initialize Shipment</h3>
              <button onClick={() => setShowOrderModal(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={createOrder} className="p-10 space-y-8 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Customer Name</label>
                  <input
                    required
                    type="text"
                    value={newOrder.name}
                    onChange={(e) => setNewOrder({ ...newOrder, name: e.target.value })}
                    className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-zed-red transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                  <input
                    required
                    type="email"
                    value={newOrder.email}
                    onChange={(e) => setNewOrder({ ...newOrder, email: e.target.value })}
                    className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-zed-red transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Secure Phone</label>
                  <input
                    required
                    type="text"
                    value={newOrder.phone}
                    onChange={(e) => setNewOrder({ ...newOrder, phone: e.target.value })}
                    className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-zed-red transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Est. Mass</label>
                  <input
                    required
                    type="text"
                    value={newOrder.weight}
                    onChange={(e) => setNewOrder({ ...newOrder, weight: e.target.value })}
                    className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-zed-red transition-all"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pickup Address (UK)</label>
                <input
                  required
                  type="text"
                  value={newOrder.pickup}
                  onChange={(e) => setNewOrder({ ...newOrder, pickup: e.target.value })}
                  className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-zed-red transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Delivery Address (ZM)</label>
                <input
                  required
                  type="text"
                  value={newOrder.delivery}
                  onChange={(e) => setNewOrder({ ...newOrder, delivery: e.target.value })}
                  className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-zed-red transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cargo Description</label>
                <textarea
                  value={newOrder.description}
                  onChange={(e) => setNewOrder({ ...newOrder, description: e.target.value })}
                  className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-zed-red resize-none transition-all"
                  rows={3}
                ></textarea>
              </div>
              <button type="submit" className="w-full btn-primary py-5 text-lg">
                Initialize & Generate Tracking
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Gallery Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-zed-dark/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-md overflow-hidden"
          >
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
              <h3 className="text-2xl font-display font-bold text-white">Add to Gallery</h3>
              <button onClick={() => setShowGalleryModal(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={saveGalleryItem} className="p-8 space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Photo</label>
                <input
                  required
                  type="file"
                  accept="image/*"
                  onChange={handleGalleryUpload}
                  className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-zed-red file:text-white hover:file:bg-zed-red/80"
                />
                {newGalleryItem.image_data && (
                  <div className="mt-4 aspect-video rounded-xl overflow-hidden border border-white/10">
                    <img src={newGalleryItem.image_data} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Caption</label>
                <input
                  required
                  type="text"
                  value={newGalleryItem.caption}
                  onChange={(e) => setNewGalleryItem({ ...newGalleryItem, caption: e.target.value })}
                  placeholder="e.g. Bulk shipment to Lusaka"
                  className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-zed-red transition-all"
                />
              </div>
              <button type="submit" className="w-full btn-primary py-4">
                Upload to Website
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Announcement Modal */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-zed-dark/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-md overflow-hidden"
          >
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
              <h3 className="text-2xl font-display font-bold text-white">{newAnnouncement.id ? 'Edit Alert' : 'New Alert'}</h3>
              <button onClick={() => setShowAnnouncementModal(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={saveAnnouncement} className="p-8 space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Message</label>
                <textarea
                  required
                  value={newAnnouncement.message}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
                  placeholder="What's happening?"
                  className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-zed-red resize-none transition-all"
                  rows={4}
                ></textarea>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Alert Type</label>
                <select
                  value={newAnnouncement.type}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, type: e.target.value as any })}
                  className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-zed-red transition-all"
                >
                  <option value="info">Information (Red)</option>
                  <option value="warning">Warning (Gold)</option>
                  <option value="success">Success (Green)</option>
                </select>
              </div>
              <button type="submit" className="w-full btn-primary py-4 flex items-center justify-center gap-2">
                <Save size={18} /> {newAnnouncement.id ? 'Update Alert' : 'Broadcast Alert'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
