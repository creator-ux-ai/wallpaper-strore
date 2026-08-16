import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Upload, X, ArrowLeft, Image as ImageIcon, Save, Loader2 } from 'lucide-react';
import { getWallpapers, uploadImage, addWallpaper, updateWallpaper } from '../../services/wallpaperService';
import { categories } from '../../data/wallpapers';

export default function UploadForm() {
  const { id: docId } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(docId);

  const [uploadStatus, setUploadStatus] = useState('idle');
  const [fetching, setFetching] = useState(isEditMode);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    category: categories[0],
    quality: '4K',
    resolution: '',
    format: '',
    keywords: [],
    featured: false,
    latest: true,
    image: '',
    download: '',
    fileName: '',
    id: 0
  });

  const [keywordInput, setKeywordInput] = useState('');
  const fileInputRef = useRef(null);
  const [existingWallpapers, setExistingWallpapers] = useState([]);

  useEffect(() => {
    async function init() {
      try {
        const wallpapers = await getWallpapers();
        setExistingWallpapers(wallpapers);
        
        if (isEditMode) {
          const w = wallpapers.find(w => w.docId === docId);
          if (w) {
            setFormData(w);
            setPreview(w.image);
          } else {
            setError('Wallpaper not found.');
          }
        } else {
          // Find max ID for new upload
          const maxId = wallpapers.reduce((max, w) => Math.max(max, w.id || 0), 0);
          setFormData(prev => ({ ...prev, id: maxId + 1 }));
        }
      } catch (err) {
        console.error("Error init form:", err);
        setError("Failed to load data.");
      } finally {
        setFetching(false);
      }
    }
    init();
  }, [docId, isEditMode]);

  useEffect(() => {
    // Cleanup object URLs to avoid memory leaks
    return () => {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    setFile(selectedFile);
    setError('');

    // Detect format
    const format = selectedFile.name.split('.').pop().toUpperCase();
    
    // Create preview and detect resolution
    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    
    const img = new Image();
    img.onload = () => {
      setFormData(prev => ({
        ...prev,
        resolution: `${img.width} × ${img.height}`,
        format: format === 'JPEG' ? 'JPG' : format
      }));
    };
    img.src = objectUrl;
  };

  const handleKeywordAdd = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newKeyword = keywordInput.trim().toLowerCase();
      if (newKeyword && !formData.keywords.includes(newKeyword)) {
        setFormData(prev => ({
          ...prev,
          keywords: [...prev.keywords, newKeyword]
        }));
      }
      setKeywordInput('');
    }
  };

  const removeKeyword = (keywordToRemove) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keywordToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditMode && !file) {
      setError('Please select an image to upload.');
      return;
    }
    if (!formData.title.trim()) {
      setError('Title is required.');
      return;
    }

    setUploadStatus('uploading_image');
    setError('');

    try {
      let finalData = { ...formData };

      if (file) {
        // Upload new image
        const { downloadURL, uniqueName } = await new Promise((resolve, reject) => {
          uploadImage(
            file,
            (progress) => setUploadProgress(progress),
            (err) => reject(err),
            (url, name) => resolve({ downloadURL: url, uniqueName: name })
          );
        });

        setUploadStatus('image_uploaded');
        finalData = {
          ...finalData,
          image: downloadURL,
          download: downloadURL,
          fileName: uniqueName
        };
      }

      setUploadStatus('saving_metadata');
      if (isEditMode) {
        await updateWallpaper(docId, finalData);
      } else {
        await addWallpaper(finalData);
      }
      
      setUploadStatus('success');
      setTimeout(() => navigate('/admin'), 1500);
    } catch (err) {
      console.error("Save error:", err);
      setError(err.message || 'Failed to save wallpaper.');
      setUploadStatus('error');
    }
  };

  if (fetching) {
    return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-12">
      {/* Navbar */}
      <nav className="bg-gray-900 border-b border-gray-800 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center gap-4">
          <Link to="/admin" className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold tracking-tight">
            {isEditMode ? 'Edit Wallpaper' : 'Upload New Wallpaper'}
          </h1>
        </div>
      </nav>

      <main className="container mx-auto p-4 md:p-6 max-w-4xl mt-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError('')}><X size={18} /></button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Column - Image Upload */}
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden group">
              {preview ? (
                <>
                  <img src={preview} alt="Preview" className="w-full h-full object-cover absolute inset-0 opacity-50 group-hover:opacity-30 transition-opacity" />
                  <img src={preview} alt="Preview" className="max-w-full max-h-[350px] relative z-10 rounded shadow-2xl" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center">
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-3 bg-white text-black font-semibold rounded-xl flex items-center gap-2"
                    >
                      <ImageIcon size={18} />
                      Change Image
                    </button>
                  </div>
                </>
              ) : (
                <div 
                  className="text-center cursor-pointer flex flex-col items-center p-8 w-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 mb-4 group-hover:scale-110 transition-transform">
                    <Upload size={28} />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Select an Image</h3>
                  <p className="text-gray-500 text-sm">JPG, PNG, WEBP (Max 10MB)</p>
                </div>
              )}
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/jpeg, image/png, image/webp" 
              />
            </div>
            
            {uploadStatus === 'uploading_image' && (
              <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
                <div className="flex justify-between text-sm mb-2 text-gray-400">
                  <span>Uploading image...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-red-600 h-2 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Metadata Form */}
          <div className="space-y-5">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl space-y-5">
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white transition-all outline-none"
                  placeholder="e.g. Shiva Trishul"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Category <span className="text-red-500">*</span></label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white transition-all outline-none"
                  >
                    {categories.filter(c => c !== 'All' && c !== 'Favorites' && c !== '4K').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Quality</label>
                  <select
                    value={formData.quality}
                    onChange={(e) => setFormData({...formData, quality: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white transition-all outline-none"
                  >
                    <option value="HD">HD</option>
                    <option value="Full HD">Full HD</option>
                    <option value="4K">4K</option>
                    <option value="8K">8K</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 flex justify-between">
                    <span>Resolution</span>
                    <span className="text-[10px] text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded uppercase">Auto</span>
                  </label>
                  <input
                    type="text"
                    value={formData.resolution}
                    onChange={(e) => setFormData({...formData, resolution: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-300 transition-all outline-none"
                    placeholder="e.g. 2160 × 3840"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 flex justify-between">
                    <span>Format</span>
                    <span className="text-[10px] text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded uppercase">Auto</span>
                  </label>
                  <input
                    type="text"
                    value={formData.format}
                    onChange={(e) => setFormData({...formData, format: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-300 transition-all outline-none uppercase"
                    placeholder="e.g. JPG"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Keywords
                  <span className="text-gray-500 text-xs ml-2 font-normal">(Press Enter or comma to add)</span>
                </label>
                <div className="p-2 bg-gray-950 border border-gray-800 rounded-xl focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent transition-all">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.keywords.map(kw => (
                      <span key={kw} className="bg-gray-800 text-gray-300 px-2.5 py-1 rounded-md text-sm flex items-center gap-1">
                        {kw}
                        <button type="button" onClick={() => removeKeyword(kw)} className="text-gray-500 hover:text-red-400">
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={handleKeywordAdd}
                    className="w-full bg-transparent border-none outline-none text-white text-sm px-1 py-1"
                    placeholder="Type keyword and press Enter..."
                  />
                </div>
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={formData.featured}
                      onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors ${formData.featured ? 'bg-orange-500' : 'bg-gray-700'}`}>
                      <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.featured ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Featured</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={formData.latest}
                      onChange={(e) => setFormData({...formData, latest: e.target.checked})}
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors ${formData.latest ? 'bg-orange-500' : 'bg-gray-700'}`}>
                      <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.latest ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Mark as Latest</span>
                </label>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-800">
                <button
                  type="submit"
                  disabled={(uploadStatus !== 'idle' && uploadStatus !== 'error') || (!isEditMode && !file)}
                  className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 rounded-xl font-semibold shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {uploadStatus === 'uploading_image' && <><Loader2 size={18} className="animate-spin" /> Uploading image... {Math.round(uploadProgress)}%</>}
                  {uploadStatus === 'image_uploaded' && <><Loader2 size={18} className="animate-spin" /> Image uploaded</>}
                  {uploadStatus === 'saving_metadata' && <><Loader2 size={18} className="animate-spin" /> Saving wallpaper...</>}
                  {uploadStatus === 'success' && <><Save size={18} /> Wallpaper uploaded successfully</>}
                  {uploadStatus === 'error' && <><X size={18} /> Upload failed</>}
                  {uploadStatus === 'idle' && <><Save size={18} /> {isEditMode ? 'Save Changes' : 'Upload Wallpaper'}</>}
                </button>
              </div>
              
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
