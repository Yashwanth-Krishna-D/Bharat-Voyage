import React from 'react';
import { Plane } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
    children?: React.ReactNode;
    showLogo?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ children, showLogo = true }) => {
    const navigate = useNavigate();

    return (
        <nav className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-[6px] shadow-[0_4px_12px_rgba(0,0,0,0.06)] h-[72px] flex items-center transition-all duration-300">
            <div className="max-w-[1400px] w-full mx-auto px-6 py-3 flex items-center justify-between h-full">
                <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
                    {showLogo && (
                        <>
                            <Plane className="w-8 h-8 text-orange-600" />
                            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                                Bharat Voyage
                            </span>
                        </>
                    )}
                </div>

                <div className="flex gap-[18px] items-center">
                    {children}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
