import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
            <Topbar />
            <div className="flex pt-[72px]">
                <Sidebar />
                <main className="flex-1 p-6 ml-[260px] min-h-[calc(100vh-72px)]">
                    <div className="max-w-7xl mx-auto animate-fade-in">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
