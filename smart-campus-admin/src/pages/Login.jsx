import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, User, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import useAuth from '../hooks/useAuth';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const success = await login(username, password);
            if (success) {
                navigate('/');
            } else {
                setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
            }
        } catch (err) {
            setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-[120px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-600/10 rounded-full blur-[150px]"></div>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

            {/* Floating Particles */}
            <div className="absolute top-20 left-20 w-3 h-3 bg-emerald-400/60 rounded-full animate-float"></div>
            <div className="absolute top-40 right-32 w-2 h-2 bg-teal-300/50 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-32 left-40 w-4 h-4 bg-green-400/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-20 right-20 w-2 h-2 bg-emerald-300/60 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/3 left-16 w-2 h-2 bg-teal-400/50 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>

            {/* Login Card */}
            <div className="relative w-full max-w-md animate-slide-up">
                <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-9 border border-white/20 shadow-2xl">
                    {/* Logo */}
                    <div className="text-center mb-9">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 mb-5 shadow-xl shadow-emerald-500/30 animate-pulse-glow">
                            <GraduationCap className="w-11 h-11 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Smart Campus</h1>
                        <p className="text-emerald-400 font-medium flex items-center justify-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            RMUTT Admin Console
                            <Sparkles className="w-4 h-4" />
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm animate-scale-in">
                                {error}
                            </div>
                        )}

                        {/* Username */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-emerald-100">
                                ชื่อผู้ใช้
                            </label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-300/50 group-focus-within:text-emerald-400 transition-colors" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border-2 border-white/10 
                           text-white placeholder-emerald-200/40 focus:border-emerald-400/50 focus:ring-4 
                           focus:ring-emerald-400/20 outline-none transition-all duration-300"
                                    placeholder="username"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-emerald-100">
                                รหัสผ่าน
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-300/50 group-focus-within:text-emerald-400 transition-colors" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-14 py-4 rounded-xl bg-white/10 border-2 border-white/10 
                           text-white placeholder-emerald-200/40 focus:border-emerald-400/50 focus:ring-4 
                           focus:ring-emerald-400/20 outline-none transition-all duration-300"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-300/50 hover:text-emerald-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-600 
                       text-white font-bold text-lg shadow-xl shadow-emerald-500/30
                       hover:shadow-emerald-500/50 hover:scale-[1.02]
                       transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                       relative overflow-hidden btn-shine mt-8"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    กำลังเข้าสู่ระบบ...
                                </span>
                            ) : 'เข้าสู่ระบบ'}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-emerald-200/60">
                            Demo: <span className="text-emerald-400 font-medium">admin</span> / <span className="text-emerald-400 font-medium">admin</span>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-emerald-200/40 text-sm mt-6">
                    © 2026 Smart Campus - RMUTT
                </p>
            </div>
        </div>
    );
}

