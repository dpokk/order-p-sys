import { NavLink } from 'react-router-dom';
import { Box, Users, ShoppingCart } from 'lucide-react';

const navItems = [
  { name: 'Products', path: '/products', icon: <Box size={18} /> },
  { name: 'Customers', path: '/customers', icon: <Users size={18} /> },
  { name: 'Orders', path: '/orders', icon: <ShoppingCart size={18} /> },
];

const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-[#dedcff] text-[#050315] flex flex-col h-full border-r border-[#2f27ce]">
      <div className="flex items-center justify-center h-16 border-b border-[#2f27ce] bg-[#fbfbfe]">
        <span className="text-xl font-bold text-[#2f27ce]">OrderSys</span>
      </div>
      <nav className="flex-1 mt-4 flex flex-col space-y-2 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition-colors font-medium ${
                isActive
                  ? 'bg-[#2f27ce] text-[#fbfbfe]' // primary bg, light text
                  : 'hover:bg-[#433bff] hover:text-[#fbfbfe] text-[#2f27ce]'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
