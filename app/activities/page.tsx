export default function ActivitiesPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-[#1a5c2e] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Activities</h1>
          <p className="text-xl">Holistic Development Through Sports, Arts & Clubs</p>
        </div>
      </section>

      {/* Sports Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a5c2e] mb-12 text-center">Sports</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Cricket', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400' },
              { name: 'Football', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400' },
              { name: 'Basketball', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400' },
              { name: 'Badminton', image: 'https://images.unsplash.com/photo-1592656094267-764a45160876?w=400' },
              { name: 'Athletics', image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400' },
              { name: 'Chess', image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400' },
            ].map((sport, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={sport.image}
                  alt={sport.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-[#1a5c2e]">{sport.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Arts & Culture Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a5c2e] mb-12 text-center">Arts & Culture</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Music', icon: '🎵', desc: 'Vocal and instrumental training' },
              { name: 'Dance', icon: '💃', desc: 'Classical and contemporary dance' },
              { name: 'Drama', icon: '🎭', desc: 'Theater and performing arts' },
              { name: 'Fine Arts', icon: '🎨', desc: 'Painting, drawing, and crafts' },
            ].map((art, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-5xl mb-4">{art.icon}</div>
                <h3 className="text-xl font-bold text-[#1a5c2e] mb-2">{art.name}</h3>
                <p className="text-gray-600">{art.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clubs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a5c2e] mb-12 text-center">Clubs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Science Club', icon: '🔬', desc: 'Experiments and innovation' },
              { name: 'Eco Club', icon: '🌱', desc: 'Environmental awareness' },
              { name: 'Math Olympiad', icon: '📐', desc: 'Problem solving excellence' },
              { name: 'Literary Society', icon: '📚', desc: 'Debate and creative writing' },
            ].map((club, index) => (
              <div key={index} className="bg-[#1a5c2e] text-white p-6 rounded-lg text-center">
                <div className="text-5xl mb-4">{club.icon}</div>
                <h3 className="text-xl font-bold text-[#f4a61d] mb-2">{club.name}</h3>
                <p className="text-gray-300">{club.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
