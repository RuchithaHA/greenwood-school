import Link from 'next/link'
import { GraduationCap, Trophy, Calendar, Users } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920)',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Nurturing Minds Since 1995
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Excellence in Education | CBSE Affiliated | Bangalore
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/registration"
              className="px-8 py-3 bg-[#f4a61d] text-[#1a5c2e] font-bold rounded-lg hover:bg-[#e59515] transition-colors"
            >
              Register Now
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-[#1a5c2e] transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#1a5c2e] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-[#f4a61d]">2500+</div>
              <div className="text-sm">Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#f4a61d]">150+</div>
              <div className="text-sm">Teachers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#f4a61d]">28 Years</div>
              <div className="text-sm">Excellence</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#f4a61d]">CBSE</div>
              <div className="text-sm">Affiliated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Greenwood Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#1a5c2e] mb-12">
            Why Greenwood School?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#1a5c2e] rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#1a5c2e] mb-2">
                Academic Excellence
              </h3>
              <p className="text-gray-600">
                Consistent 100% pass results with distinction in CBSE board exams
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#1a5c2e] rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#1a5c2e] mb-2">
                Sports & Activities
              </h3>
              <p className="text-gray-600">
                State-level champions in cricket, football, and athletics
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#1a5c2e] rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#1a5c2e] mb-2">
                Modern Facilities
              </h3>
              <p className="text-gray-600">
                Smart classrooms, science labs, library, and computer labs
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#1a5c2e] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#1a5c2e] mb-2">
                Expert Faculty
              </h3>
              <p className="text-gray-600">
                Qualified and experienced teachers dedicated to student success
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Registration CTA */}
      <section className="py-16 bg-[#1a5c2e] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Admissions open for the academic year 2024-25. Register your child today
            and give them the best education.
          </p>
          <Link
            href="/registration"
            className="inline-block px-8 py-4 bg-[#f4a61d] text-[#1a5c2e] font-bold rounded-lg hover:bg-[#e59515] transition-colors text-lg"
          >
            Register Online
          </Link>
        </div>
      </section>
    </div>
  )
}
