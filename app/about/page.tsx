export default function AboutPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-[#1a5c2e] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">About Greenwood School</h1>
          <p className="text-xl">Excellence in Education Since 1995</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a5c2e] mb-8 text-center">Our Story</h2>
          <div className="max-w-4xl mx-auto text-gray-700 leading-relaxed">
            <p className="mb-4">
              Founded in 1995 by Dr. Ramesh Kumar, Greenwood School began with a vision to provide
              quality education accessible to all. Starting with just 200 students and 15 teachers,
              we have grown into one of Bangalore's most respected CBSE-affiliated institutions.
            </p>
            <p className="mb-4">
              Over the past 28 years, we have consistently maintained high academic standards while
              focusing on holistic development. Our alumni have gone on to excel in various fields
              across the globe, carrying forward the values instilled during their time at Greenwood.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-[#1a5c2e] mb-4">Our Vision</h2>
              <p className="text-gray-700 text-lg italic">
                "To be a centre of excellence in holistic education, nurturing young minds to become
                responsible, compassionate, and successful global citizens."
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#1a5c2e] mb-4">Our Mission</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#f4a61d] mr-2">•</span>
                  Provide quality education with modern teaching methodologies
                </li>
                <li className="flex items-start">
                  <span className="text-[#f4a61d] mr-2">•</span>
                  Foster character building and moral values
                </li>
                <li className="flex items-start">
                  <span className="text-[#f4a61d] mr-2">•</span>
                  Encourage critical thinking and creativity
                </li>
                <li className="flex items-start">
                  <span className="text-[#f4a61d] mr-2">•</span>
                  Promote physical fitness and sportsmanship
                </li>
                <li className="flex items-start">
                  <span className="text-[#f4a61d] mr-2">•</span>
                  Prepare students for global challenges
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a5c2e] mb-12 text-center">
            Principal&apos;s Message
          </h2>
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
                  alt="Dr. Anita Sharma"
                  className="w-48 h-48 rounded-lg object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1a5c2e] mb-2">
                  Dr. Anita Sharma
                </h3>
                <p className="text-[#f4a61d] font-semibold mb-4">Principal</p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Welcome to Greenwood School. Since taking over as Principal in 2010, I have been
                  privileged to witness our students grow into confident, capable individuals ready
                  to face the challenges of the modern world.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our dedicated team of educators works tirelessly to create an environment where
                  every child can discover their unique talents and reach their full potential. We
                  believe in nurturing not just academic excellence but also character, creativity,
                  and compassion.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  I invite you to join the Greenwood family and become part of our journey towards
                  educational excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a5c2e] mb-12 text-center">Our Journey</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { year: '1995', event: 'School founded with 200 students' },
              { year: '2000', event: 'Secondary wing established' },
              { year: '2005', event: 'Senior Secondary section added' },
              { year: '2010', event: 'New campus inaugurated' },
              { year: '2015', event: 'CBSE Merit Award recipient' },
              { year: '2024', event: '2500+ students, 150+ teachers' },
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-24 flex-shrink-0 text-[#f4a61d] font-bold text-xl">{item.year}</div>
                <div className="flex-1 border-l-4 border-[#f4a61d] pl-4 py-2">
                  <p className="text-gray-700">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* School Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a5c2e] mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {['Integrity', 'Excellence', 'Respect', 'Innovation', 'Compassion'].map(
              (value, index) => (
                <div key={index} className="text-center p-6 bg-[#1a5c2e] rounded-lg">
                  <h3 className="text-xl font-bold text-[#f4a61d]">{value}</h3>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
