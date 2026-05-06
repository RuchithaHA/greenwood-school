export default function AcademicsPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-[#1a5c2e] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Academics</h1>
          <p className="text-xl">CBSE Curriculum with Modern Teaching Methods</p>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a5c2e] mb-12 text-center">Classes We Offer</h2>
          
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Pre-Primary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-[#1a5c2e] mb-3">Pre-Primary</h3>
              <p className="text-gray-600 mb-2">Classes: LKG, UKG</p>
              <p className="text-gray-700">
                Play-based learning focusing on motor skills, language development, and social
                interaction through activities, games, and storytelling.
              </p>
            </div>

            {/* Primary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-[#1a5c2e] mb-3">Primary (Class 1-5)</h3>
              <p className="text-gray-600 mb-2">Subjects: English, Hindi, Mathematics, Science, Social Studies, Art, Physical Education</p>
              <p className="text-gray-700">
                Strong foundation in core subjects with emphasis on reading, writing, and
                numeracy skills. Activity-based learning to foster curiosity.
              </p>
            </div>

            {/* Middle */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-[#1a5c2e] mb-3">Middle School (Class 6-8)</h3>
              <p className="text-gray-600 mb-2">Additional Subjects: Computer Science, Sanskrit</p>
              <p className="text-gray-700">
                Expanded curriculum preparing students for secondary education. Focus on
                analytical thinking and project-based learning.
              </p>
            </div>

            {/* Secondary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-[#1a5c2e] mb-3">Secondary (Class 9-10)</h3>
              <p className="text-gray-600 mb-2">CBSE Board Examination with all core subjects</p>
              <p className="text-gray-700">
                Comprehensive preparation for CBSE board exams. Rigorous academic schedule
                with regular assessments and remedial classes.
              </p>
            </div>

            {/* Senior Secondary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-[#1a5c2e] mb-3">Senior Secondary (Class 11-12)</h3>
              <div className="space-y-3 mt-4">
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-bold text-[#f4a61d]">Science Stream</h4>
                  <p className="text-gray-700 text-sm">
                    Physics, Chemistry, Biology/Computer Science, Mathematics, English
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-bold text-[#f4a61d]">Commerce Stream</h4>
                  <p className="text-gray-700 text-sm">
                    Accountancy, Business Studies, Economics, Mathematics, English
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-bold text-[#f4a61d]">Arts Stream</h4>
                  <p className="text-gray-700 text-sm">
                    History, Geography, Political Science, Psychology, English
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a5c2e] mb-12 text-center">
            Teaching Methodology
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a5c2e] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-[#1a5c2e] mb-2">Smart Classrooms</h3>
              <p className="text-gray-700">
                Digital boards and interactive learning tools for enhanced understanding
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a5c2e] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-[#1a5c2e] mb-2">Project-Based Learning</h3>
              <p className="text-gray-700">
                Hands-on projects to develop critical thinking and problem-solving skills
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a5c2e] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-[#1a5c2e] mb-2">Regular Assessments</h3>
              <p className="text-gray-700">
                Continuous evaluation to track progress and provide timely feedback
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a5c2e] mb-12 text-center">
            Academic Achievements
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-[#1a5c2e] text-white p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-[#f4a61d] mb-2">100%</div>
              <p>Pass Rate</p>
            </div>
            <div className="bg-[#1a5c2e] text-white p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-[#f4a61d] mb-2">85%</div>
              <p>Distinction</p>
            </div>
            <div className="bg-[#1a5c2e] text-white p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-[#f4a61d] mb-2">50+</div>
              <p>State Rankers</p>
            </div>
            <div className="bg-[#1a5c2e] text-white p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-[#f4a61d] mb-2">15</div>
              <p>CBSE Merit Awards</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
