import { useState } from 'react';
import { Send, Link as LinkIcon, PlayCircle } from 'lucide-react';

const SharePage = () => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'link' | 'youtube'>('link');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const sharedLinks = JSON.parse(localStorage.getItem('sharedLinks') || '[]');
    sharedLinks.push({
      id: Date.now(),
      url,
      title,
      type,
      createdAt: new Date(),
    });
    localStorage.setItem('sharedLinks', JSON.stringify(sharedLinks));
    
    setMessage('Resource shared successfully!');
    setUrl('');
    setTitle('');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Share a Resource</h1>
          
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              {message}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Resource Type</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setType('link')}
                  className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
                    type === 'link' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  <LinkIcon size={18} /> Link
                </button>
                <button
                  type="button"
                  onClick={() => setType('youtube')}
                  className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
                    type === 'youtube' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  <PlayCircle size={18} /> YouTube
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Awesome React Tutorial"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="https://..."
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
            >
              <Send size={18} /> Share Resource
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SharePage;