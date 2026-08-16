import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, LogOut, Image as ImageIcon, Search, Database } from 'lucide-react';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { getWallpapers, deleteWallpaper, addWallpaper } from '../../services/wallpaperService';
import { wallpapers as staticWallpapers } from '../../data/wallpapers';

export default function Dashboard() {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMigrating, setIsMigrating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWallpapers();
  }, []);

  const fetchWallpapers = async () => {
    setLoading(true);
    try {
      const data = await getWallpapers();
      setWallpapers(data);
    } catch (error) {
      console.error("Error fetching wallpapers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const handleDelete = async (docId, fileName) => {
    if (window.confirm('Are you sure you want to delete this wallpaper?')) {
      try {
        await deleteWallpaper(docId, fileName);
        setWallpapers(wallpapers.filter(w => w.docId !== docId));
      } catch (error) {
        console.error("Error deleting wallpaper:", error);
        alert('Failed to delete wallpaper.');
      }
    }
  };

  const handleMigrate = async () => {
    if (!window.confirm(`Are you sure you want to migrate ${staticWallpapers.length} wallpapers to Firebase? This should only be done once.`)) return;
    
    setIsMigrating(true);
    let successCount = 0;
    try {
      for (const w of staticWallpapers) {
        // Only migrate if we don't already have one with the same ID
        if (!wallpapers.some(existing => existing.id === w.id)) {
          await addWallpaper(w);
          successCount++;
        }
      }
      alert(`Migration complete. Uploaded ${successCount} new wallpapers.`);
      fetchWallpapers();
    } catch (err) {
      console.error("Migration error:", err);
      alert('Error during migration.');
    } finally {
      setIsMigrating(false);
    }
  };

  const filteredWallpapers = wallpapers.filter(w => 
    (w.title && w.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (w.category && w.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="bg-gray-900 border-b border-gray-800 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-red-600 flex items-center justify-center">
              <ImageIcon size={18} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="text-gray-400 hover:text-white transition-colors text-sm"
              target="_blank"
            >
              View Site
            </Link>
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-2"
              title="Logout"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-2xl font-semibold">Manage Wallpapers</h2>
          
          <div className="flex w-full sm:w-auto items-center gap-4 flex-wrap sm:flex-nowrap">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Search wallpapers..."
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-white transition-all outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {wallpapers.length === 0 && (
              <button
                onClick={handleMigrate}
                disabled={isMigrating}
                className="whitespace-nowrap px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <Database size={18} />
                {isMigrating ? 'Migrating...' : 'Migrate Data'}
              </button>
            )}
            <Link
              to="/admin/upload"
              className="whitespace-nowrap px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 rounded-lg font-medium shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2"
            >
              <Plus size={18} />
              Upload
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading wallpapers...</div>
        ) : filteredWallpapers.length === 0 ? (
          <div className="text-center py-20 bg-gray-900/50 border border-gray-800 rounded-2xl flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon size={32} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-medium mb-2">No wallpapers found</h3>
            <p className="text-gray-400 mb-6">Get started by uploading your first wallpaper, or migrate existing static data.</p>
            <div className="flex gap-4">
              <button
                onClick={handleMigrate}
                disabled={isMigrating}
                className="inline-flex px-6 py-3 bg-gray-800 text-white hover:bg-gray-700 rounded-xl font-semibold transition-all items-center gap-2 disabled:opacity-50"
              >
                <Database size={18} />
                {isMigrating ? 'Migrating Data...' : 'Migrate Existing Data'}
              </button>
              <Link
                to="/admin/upload"
                className="inline-flex px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-xl font-semibold transition-all items-center gap-2"
              >
                <Plus size={18} />
                Upload New
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-950/50 border-b border-gray-800 text-sm font-medium text-gray-400">
                    <th className="p-4 w-16">ID</th>
                    <th className="p-4">Thumbnail</th>
                    <th className="p-4">Title</th>
                    <th className="p-4 hidden md:table-cell">Category</th>
                    <th className="p-4 hidden sm:table-cell">Quality</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {filteredWallpapers.map((w) => (
                    <tr key={w.docId} className="hover:bg-gray-800/20 transition-colors group">
                      <td className="p-4 text-gray-500">#{w.id}</td>
                      <td className="p-4">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-gray-950 border border-gray-800">
                          <img 
                            src={w.image} 
                            alt={w.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{w.title}</div>
                        <div className="text-xs text-gray-500 mt-1 md:hidden">{w.category}</div>
                        <div className="flex gap-2 mt-2">
                          {w.featured && <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">Featured</span>}
                          {w.latest && <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Latest</span>}
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell text-gray-300">{w.category}</td>
                      <td className="p-4 hidden sm:table-cell text-gray-400 text-sm">{w.quality}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link 
                            to={`/admin/edit/${w.docId}`}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </Link>
                          <button 
                            onClick={() => handleDelete(w.docId, w.fileName)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
