import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, User, LogIn, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('zedcart_admin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="bg-zed-cream min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-zed-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-zed-blue">Admin Login</h1>
          <p className="text-slate-500 mt-2">Access the management dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zed-blue">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-zed-red focus:ring-2 focus:ring-zed-red/20 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zed-blue">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-zed-red focus:ring-2 focus:ring-zed-red/20 outline-none transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-zed-red bg-red-50 p-4 rounded-xl">
              <AlertCircle size={20} />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full btn-secondary flex items-center justify-center gap-2 py-4 text-lg"
          >
            Login <LogIn size={20} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
