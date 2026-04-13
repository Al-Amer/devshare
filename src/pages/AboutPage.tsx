const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto flex items-center justify-center mb-4">
              <span className="text-4xl text-white">👨‍💻</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Amer Almonajed</h1>
            <p className="text-gray-600 mt-2">Frontend React Developer</p>
          </div>
          
          <div className="border-t border-b py-6 mb-6">
            <h2 className="text-xl font-semibold mb-3">About Me</h2>
            <p className="text-gray-700 leading-relaxed">
              I'm a passionate frontend developer specializing in React, TypeScript, and Tailwind CSS. 
              This project demonstrates my ability to build multi-page applications with real API integration,
              YouTube embedding, and sharing features.
            </p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Tailwind CSS', 'React Router', 'Axios', 'YouTube API'].map(tech => (
                <span key={tech} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3">Connect With Me</h2>
            <div className="flex gap-4">
              <a href="https://github.com/Al-Amer" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition">
                <span>🐙</span> GitHub
              </a>
              <a href="https://www.linkedin.com/in/amer-almonajed/" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition">
                <span>🔗</span> LinkedIn
              </a>
              <a href="mailto:amer.almonajed@gmx.de"
                 className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                <span>📧</span> Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;