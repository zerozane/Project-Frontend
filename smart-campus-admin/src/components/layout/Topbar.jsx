import { useNavigate } from 'react-router-dom';

export default function Topbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <header className="fixed top-0 left-0 right-0 h-[72px] bg-gradient-to-r from-emerald-500 to-green-600 z-50 shadow-lg shadow-emerald-500/25">
            <div className="h-full px-6 flex items-center gap-4">
                {/* Logo */}
                <div className="w-[52px] h-[52px] rounded-xl bg-white/20 p-1 shadow-md flex items-center justify-center">
                    <img
                        src="/rmutt.png"
                        alt="RMUTT logo"
                        className="w-full h-full object-contain rounded-lg"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<span class="text-white text-2xl">🏛️</span>';
                        }}
                    />
                </div>

                {/* Title */}
                <h1 className="text-white font-bold text-lg leading-tight drop-shadow-sm">
                    ระบบแอปพลิเคชันแนะนำทางและค้นหาห้องเรียน<br />
                    <span className="text-sm font-normal opacity-90">ภายในมหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี</span>
                </h1>

                {/* User Menu */}
                <div className="ml-auto flex items-center gap-3 px-4 py-2 bg-white/15 rounded-xl shadow-sm hover:bg-white/20 transition-all">
                    <span className="text-xl">👤</span>
                    <span className="text-white font-semibold text-sm">ผู้ดูแลระบบ</span>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="ml-2 px-4 py-1.5 bg-white/25 text-green-100 rounded-lg text-sm font-bold border border-green-200/50 hover:bg-green-100 hover:text-green-700 transition-all"
                    >
                        ออกจากระบบ
                    </button>
                </div>
            </div>
        </header>
    );
}
