import { NavLink } from 'react-router-dom';
import { X, Package, Users, ShoppingCart } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { path: '/orders', icon: ShoppingCart, label: 'Orders' },
    { path: '/products', icon: Package, label: 'Products' },
    { path: '/customers', icon: Users, label: 'Customers' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-border lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 py-10 border-b border-border">
          <h2 className="text-lg pl-4 font-semibold text-text">Services</h2>
          <button
            onClick={onClose}
            className="p-2 text-text-light hover:text-text hover:bg-surface rounded-lg lg:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                  flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-[#dedcff] text-slate-900 pointer-events-none' // disables hover effect
                    : 'bg-white text-slate-500 hover:bg-[#dedcff]/50 hover:text-slate-900'}
                `
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>




        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="flex items-center gap-3 px-4 py-3 hover:bg-stone-200 transition-colors rounded-lg">
            <div className="h-10 w-10 rounded-full bg-gray-300 text-white flex items-center justify-center">
              <span className="text-sm font-medium">UD</span>
            </div>
            <div className=" ">
              <p className="text-sm font-medium text-text">UD Solutions Ltd.</p>
              <p className="text-xs text-text-light">Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
