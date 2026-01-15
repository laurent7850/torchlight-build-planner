import React from 'react';
import { Link } from 'react-router-dom';
import { Swords, Users, Zap, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { heroes } from '../data/heroes';

export const HomePage: React.FC = () => {
  const features = [
    {
      icon: Swords,
      title: 'Hero Selection',
      description: 'Choose from 11 unique heroes, each with multiple traits and playstyles.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Zap,
      title: 'Skill Linking',
      description: 'Build powerful skill combinations with main skills and support gems.',
      color: 'from-yellow-500 to-amber-500',
    },
    {
      icon: Shield,
      title: 'Equipment Planning',
      description: 'Plan your gear with our intuitive equipment panel and stat calculator.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      title: 'Share Builds',
      description: 'Save and share your builds with the community. Get feedback and inspire others.',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            Vorax Season Ready
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Torchlight Infinite
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Build Planner
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Plan, create, and share your Torchlight Infinite builds. Choose your hero,
            customize skills, and optimize your equipment for maximum power.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/create"
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-red-700 transition-all shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40"
            >
              Create Build
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/builds"
              className="flex items-center gap-2 px-8 py-4 bg-slate-800 border border-slate-600 text-white rounded-xl font-semibold text-lg hover:bg-slate-700 hover:border-purple-500 transition-all"
            >
              Browse Builds
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Everything You Need to Build
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 hover:border-purple-500/50 transition-all group"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heroes Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Choose Your Hero</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Each hero brings unique abilities and playstyles. Find the one that matches your preferred combat style.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {heroes.slice(0, 6).map(hero => (
              <Link
                key={hero.id}
                to={`/create?hero=${hero.id}`}
                className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 hover:border-orange-500/50 hover:bg-slate-800 transition-all group text-center"
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl">
                    {hero.class === 'Berserker' && '⚔️'}
                    {hero.class === 'Divineshot' && '🏹'}
                    {hero.class === 'Frostfire' && '🔥'}
                    {hero.class === 'Commander' && '🤖'}
                    {hero.class === 'Assassin' && '🗡️'}
                    {hero.class === 'Spacetime Witness' && '✨'}
                  </span>
                </div>
                <h3 className="font-semibold text-white">{hero.name}</h3>
                <p className="text-xs text-gray-400">{hero.class}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/create"
              className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
            >
              View all heroes
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-purple-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Create Your Build?
          </h2>
          <p className="text-gray-400 mb-8">
            Sign up to save your builds and share them with the community.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all shadow-lg shadow-orange-500/30"
            >
              Create Free Account
            </Link>
            <Link
              to="/create"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Or start without an account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
