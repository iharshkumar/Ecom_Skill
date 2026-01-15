import React from 'react';
import {
    LayoutDashboard, Package, PlusCircle, LogOut, Settings, Search
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard size={20} /> },
        { id: 'products', label: 'All Products', icon: <Package size={20} /> },
        { id: 'add-product', label: 'Add New Product', icon: <PlusCircle size={20} /> },
    ];

    return (
        <div className="flex flex-col h-full p-6">
            {/* Logo */}
            <div className="!mb-10 !pl-2 flex items-center gap-2">
                <img src="https://thumbs.dreamstime.com/b/e-commerce-logornyou-can-use-icons-commercial-use-mobile-app-pc-e-commerce-logo-you-can-use-icons-194797444.jpg" className='w-[50px] h-[50px] min-w-[50px]' />
                <h2 className="text-2xl font-extrabold !bg-gray-700 hover:!bg-red-600 bg-clip-text text-transparent whitespace-nowrap">
                    ADMIN PANEL
                </h2>
            </div>

            {/* Search */}
            <div className="!mb-8 !relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-slate-400" />
                </div>
                <input
                    type="text"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-primary focus:border-primary block pl-10 p-2.5 transition-colors"
                    placeholder="Search..."
                />
            </div>

            {/* Menu */}
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <div className="!px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Main Menu</div>
                </div>
                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === item.id
                                ? 'bg-primary-light text-primary'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Footer / Settings */}
            <div className="mt-auto pt-8 border-t border-slate-100">
                <p className="!px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Settings</p>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-500 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors">
                    <Settings size={20} />
                    <span>General</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-500 rounded-lg hover:bg-red-50 transition-colors mt-1">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
