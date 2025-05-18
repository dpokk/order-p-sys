import { Menu } from 'lucide-react';

const Navbar = ({ onToggleSidebar }) => {
  return (
    <header className="h-16 bg-[#fbfbfe] shadow-md flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-10 border-b border-[#dedcff]">
      <button className="md:hidden" onClick={onToggleSidebar}>
        <Menu size={24} color="#2f27ce" />
      </button>
      <h1 className="text-xl font-semibold text-[#2f27ce]">Order Processing Admin</h1>
      <div className="flex items-center gap-3">
        {/* <div className="w-8 h-8 bg-[#dedcff] rounded-full" /> */}
      </div>
    </header>
  );
};

export default Navbar;
