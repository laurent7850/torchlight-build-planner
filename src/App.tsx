import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { CreateBuildPage } from './pages/CreateBuildPage';
import { BuildsPage } from './pages/BuildsPage';
import { BuildDetailPage } from './pages/BuildDetailPage';
import { MyBuildsPage } from './pages/MyBuildsPage';
import { LoginPage, RegisterPage } from './pages/AuthPages';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateBuildPage />} />
            <Route path="/edit/:id" element={<CreateBuildPage />} />
            <Route path="/builds" element={<BuildsPage />} />
            <Route path="/build/:id" element={<BuildDetailPage />} />
            <Route path="/my-builds" element={<MyBuildsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TI</span>
                </div>
                <p className="text-sm text-gray-400">
                  Torchlight Infinite Build Planner
                </p>
              </div>
              <p className="text-sm text-gray-500">
                Fan-made tool. Not affiliated with XD Entertainment.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
