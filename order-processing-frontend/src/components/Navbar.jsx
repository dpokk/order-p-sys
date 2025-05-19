import { Menu } from 'lucide-react';

const Navbar = ({ onToggleSidebar }) => {
  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-border">
      <div className="flex items-center justify-between h-16 px-6 py-10">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-text-light hover:text-text hover:bg-surface rounded-lg lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-2xl pl-6 font-semibold">ORDER PROCESSING SYSTEM</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
