import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Shield, 
  Clock, 
  Globe, 
  Star, 
  CheckCircle2, 
  Package, 
  Zap, 
  ArrowUpRight,
  Megaphone,
  X,
  Quote as QuoteIcon,
  Camera
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GalleryItem, Announcement, Review } from '../types';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

  useEffect(() => {
    fetch('/api/announcements').then(res => res.json()).then(setAnnouncements);
    fetch('/api/gallery').then(res => res.json()).then(setGallery);
    fetch('/api/reviews').then(res => res.json()).then(setReviews);
  }, []);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });
      if (res.ok) {
        setShowReviewForm(false);
        setNewReview({ name: '', rating: 5, comment: '' });
        const updated = await fetch('/api/reviews').then(r => r.json());
        setReviews(updated);
      }
    } catch (error) {
      console.error('Failed to submit review');
    }
  };

  return (
    <div className="flex flex-col relative">
      {/* Announcements Banner */}
      <AnimatePresence>
        {announcements.length > 0 && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[60] overflow-hidden"
          >
            {announcements.map((ann, idx) => (
              <div 
                key={ann.id} 
                className={`py-3 px-6 flex items-center justify-between gap-4 ${
                  ann.type === 'warning' ? 'bg-zed-gold text-zed-dark' : 
                  ann.type === 'success' ? 'bg-zed-green text-zed-dark' : 'bg-zed-red text-white'
                }`}
              >
                <div className="flex items-center gap-3 max-w-7xl mx-auto w-full">
                  <Megaphone size={18} className="shrink-0" />
                  <p className="text-sm font-bold tracking-wide truncate">{ann.message}</p>
                </div>
                <button 
                  onClick={() => setAnnouncements(prev => prev.filter(a => a.id !== ann.id))}
                  className="hover:opacity-70 transition-opacity"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Glow */}
      <div className="fixed inset-0 glow-mesh pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <motion.div 
          style={{ opacity, scale }}
          className="max-w-7xl mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/5 border border-white/10 text-zed-green text-xs font-bold uppercase tracking-widest mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zed-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-zed-green"></span>
                </span>
                UK to Zambia Logistics
              </span>
              <h1 className="text-6xl md:text-8xl font-display font-extrabold text-white leading-[0.9] mb-8 text-gradient">
                Precision <br />
                <span className="text-zed-red">Logistics.</span> <br />
                Global Reach.
              </h1>
              <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-xl">
                Experience the next generation of UK to Zambia shipping. Secure, lightning-fast, and fully transparent door-to-door delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/quote" className="btn-primary flex items-center justify-center gap-3 group">
                  Start Shipment <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/track" className="btn-outline flex items-center justify-center gap-3">
                  Track Parcel <Package size={20} />
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 animate-float">
              <div className="glass-card p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-zed-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src="https://picsum.photos/seed/cargo/800/1000"
                  alt="High-end Logistics"
                  className="rounded-2xl w-full h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-12 left-12 right-12 glass-card p-6 border-white/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-zed-red uppercase tracking-widest mb-1">Active Shipments</p>
                      <p className="text-2xl font-display font-bold text-white">1,240+</p>
                    </div>
                    <div className="h-12 w-12 bg-zed-green/20 rounded-xl flex items-center justify-center">
                      <Zap className="text-zed-green" size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-zed-red/10 blur-[120px] rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-zed-green/10 blur-[120px] rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Bento Services Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                Redefining <span className="text-zed-red">Delivery.</span>
              </h2>
              <p className="text-slate-400 text-lg">
                We've optimized every mile of the journey to ensure your cargo arrives with surgical precision.
              </p>
            </div>
            <Link to="/services" className="text-zed-red font-bold flex items-center gap-2 group">
              View All Services <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

          <div className="bento-grid">
            {/* Main Feature */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-8 glass-card p-10 relative overflow-hidden group"
            >
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-zed-red/20 rounded-2xl flex items-center justify-center mb-8">
                    <Globe className="text-zed-red" size={28} />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mb-4">Door-to-Door Excellence</h3>
                  <p className="text-slate-400 text-lg max-w-md">
                    The ultimate convenience. From your UK doorstep to any destination in Zambia, we handle everything.
                  </p>
                </div>
                <div className="mt-12 flex gap-4">
                  <span className="px-4 py-2 rounded-full bg-white/5 text-xs font-bold text-white border border-white/10">Full Tracking</span>
                  <span className="px-4 py-2 rounded-full bg-white/5 text-xs font-bold text-white border border-white/10">Customs Cleared</span>
                </div>
              </div>
              <img 
                src="https://picsum.photos/seed/door/600/400" 
                className="absolute right-0 bottom-0 w-1/2 h-full object-cover opacity-20 grayscale group-hover:opacity-40 group-hover:grayscale-0 transition-all duration-700 mask-fade-bottom"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Side Feature 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-4 glass-card p-10 flex flex-col justify-between bg-gradient-to-br from-zed-blue to-zed-dark"
            >
              <div>
                <div className="w-14 h-14 bg-zed-green/20 rounded-2xl flex items-center justify-center mb-8">
                  <Zap className="text-zed-green" size={28} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">Express Air</h3>
                <p className="text-slate-400">
                  When time is the only variable that matters. 5-7 day delivery.
                </p>
              </div>
              <Link to="/services" className="mt-8 text-white font-bold flex items-center gap-2 group">
                Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Side Feature 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-4 glass-card p-10 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-zed-gold/20 rounded-2xl flex items-center justify-center mb-8">
                  <Shield className="text-zed-gold" size={28} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">Secure Sea</h3>
                <p className="text-slate-400">
                  Economical solutions for heavy cargo and household goods.
                </p>
              </div>
              <Link to="/services" className="mt-8 text-white font-bold flex items-center gap-2 group">
                Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Stats Feature */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-8 glass-card p-10 grid grid-cols-2 md:grid-cols-4 gap-8 items-center"
            >
              {[
                { label: 'Success Rate', value: '99.9%' },
                { label: 'Countries', value: '2' },
                { label: 'Annual Parcels', value: '50k+' },
                { label: 'Happy Clients', value: '15k+' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-display font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Us - Parallax-ish Section */}
      <section className="py-32 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
                  Why the world <br /> trusts <span className="text-zed-red">Zed Cart.</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  We don't just move boxes; we move possibilities. Our infrastructure is built on trust, technology, and a deep understanding of the UK-Zambia corridor.
                </p>
              </motion.div>

              <div className="space-y-6">
                {[
                  { title: 'Real-time Intelligence', desc: 'Every parcel is tracked with granular precision.', icon: <Package size={20} /> },
                  { title: 'Customs Mastery', desc: 'We navigate complex regulations so you don\'t have to.', icon: <Shield size={20} /> },
                  { title: 'Unrivaled Support', desc: 'Direct access to logistics experts 24/7.', icon: <Clock size={20} /> },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-6 p-6 rounded-3xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                  >
                    <div className="w-12 h-12 bg-zed-red/10 rounded-xl flex items-center justify-center shrink-0 text-zed-red">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-slate-500">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <img 
                  src="https://picsum.photos/seed/delivery-van/800/800" 
                  className="rounded-[40px] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -top-10 -left-10 glass-card p-8 border-zed-red/30">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-zed-dark overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?img=${i+10}`} />
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-white font-bold">Trusted by 15k+</p>
                      <div className="flex text-zed-gold">
                        {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-zed-red/5 blur-[100px] -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {gallery.length > 0 && (
        <section className="py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <span className="text-zed-red font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Visual Proof</span>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                  Recent <span className="text-zed-red">Shipments.</span>
                </h2>
                <p className="text-slate-400 text-lg">
                  Take a look at some of the cargo we've successfully delivered across the UK-Zambia corridor.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                  <Camera className="text-zed-red" size={24} />
                  <span className="text-white font-bold">{gallery.length} Photos</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {gallery.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative aspect-[4/5] rounded-3xl overflow-hidden glass-card"
                >
                  <img 
                    src={item.image_data} 
                    alt={item.caption} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <p className="text-white font-bold text-lg">{item.caption}</p>
                    <p className="text-zed-red text-xs font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                      <CheckCircle2 size={14} /> Delivered Successfully
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      <section className="py-32 bg-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-zed-red font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Testimonials</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
              What Our <span className="text-zed-red">Clients Say.</span>
            </h2>
            <button 
              onClick={() => setShowReviewForm(true)}
              className="btn-outline inline-flex items-center gap-2"
            >
              <Star size={18} className="text-zed-gold" /> Write a Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.length > 0 ? (
              reviews.map((review, idx) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card p-10 relative"
                >
                  <QuoteIcon className="absolute top-8 right-8 text-white/5" size={64} />
                  <div className="flex text-zed-gold mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <p className="text-slate-300 text-lg italic leading-relaxed mb-8">
                    "{review.comment}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-zed-red/20 flex items-center justify-center text-zed-red font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-bold">{review.name}</p>
                      <p className="text-slate-500 text-xs uppercase tracking-widest">Verified Client</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-20 bg-white/5 rounded-[40px] border border-dashed border-white/10">
                <p className="text-slate-500">No reviews yet. Be the first to share your experience!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showReviewForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-zed-dark/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card w-full max-w-md overflow-hidden"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
                <h3 className="text-2xl font-display font-bold text-white">Share Your Experience</h3>
                <button onClick={() => setShowReviewForm(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={submitReview} className="p-8 space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Your Name</label>
                  <input
                    required
                    type="text"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-zed-red transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className={`p-2 transition-colors ${star <= newReview.rating ? 'text-zed-gold' : 'text-slate-600'}`}
                      >
                        <Star size={24} fill={star <= newReview.rating ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Your Feedback</label>
                  <textarea
                    required
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-zed-red resize-none transition-all"
                    rows={4}
                  ></textarea>
                </div>
                <button type="submit" className="w-full btn-primary py-4">
                  Submit Review
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Advanced CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="glass-card p-16 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zed-red to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">
                Ready to bridge <br /> the <span className="text-zed-red">distance?</span>
              </h2>
              <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto">
                Join thousands of businesses and individuals who trust Zed Cart for their UK to Zambia logistics.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link to="/quote" className="btn-primary">Get Your Quote</Link>
                <Link to="/contact" className="btn-outline">Speak to an Expert</Link>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-zed-red/5 blur-[150px] -z-10" />
      </section>
    </div>
  );
};

export default Home;
