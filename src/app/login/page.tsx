'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GitBranch, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Dummy authentication logic
        setTimeout(() => {
            setIsLoading(false);
            router.push('/');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center p-4 selection:bg-primary selection:text-white">
            {/* Background patterns */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-[400px] z-10">
                <div className="flex flex-col items-center mb-10">
                    <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-transform hover:scale-105">
                        <GitBranch className="h-7 w-7 text-black" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Vylera Monitor</h1>
                    <p className="text-muted-foreground text-sm">Enterprise branch monitoring system</p>
                </div>

                <div className="bg-[#111111] border border-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className="w-full bg-black border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                    Password
                                </label>
                                <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:opacity-80">
                                    Forgot?
                                </a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                                <input
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-black border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                                />
                            </div>
                        </div>

                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg py-3 text-sm font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 group"
                        >
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            New to Vylera? <a href="#" className="text-white hover:text-primary transition-colors">Request Access</a>
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-6">
                    <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-colors">Terms</a>
                    <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-colors">Status</a>
                </div>
            </div>
        </div>
    );
}
