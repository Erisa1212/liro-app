import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Radio, 
  BookOpen, 
  PlusCircle,
  Bookmark
} from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Dashboard', isLink: true },
  { path: '/status', icon: Radio, label: 'Status', isLink: true },
  { path: '/reading', icon: BookOpen, label: 'Reading', isLink: true },
  { id: 'add-book', icon: PlusCircle, label: 'Add new Book', isLink: false },
  { path: '/saved-books', icon: Bookmark, label: 'Saved Books', isLink: true },
];

function Sidebar() {
  const navigate = useNavigate();

  const handleAddNewBook = () => {
    navigate('/reading', { state: { openAddModal: true } });
  };

  return (
    <aside className="w-64 h-screen bg-[#FFFFFF] border-r border-[#E5E7EB] flex flex-col">
      {/* Logo */}
      <div className="bg-[#E7000B] p-6">
        <img 
          src="src/assets/logo.svg" 
          alt="LIRO" 
          className="h-10 object-contain"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          item.isLink ? (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-[#FEF2F2] text-[#E7000B]' 
                  : 'text-stone-700 hover:text-[#E7000B] hover:bg-stone-50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon 
                    className={`w-5 h-5 ${isActive ? 'text-[#E7000B]' : 'text-stone-400'}`} 
                  />
                  {item.label}
                </>
              )}
            </NavLink>
          ) : (
            <button
              key={item.id}
              onClick={handleAddNewBook}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-stone-700 hover:text-[#E7000B] hover:bg-stone-50"
            >
              <item.icon className="w-5 h-5 text-stone-400" />
              {item.label}
            </button>
          )
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;