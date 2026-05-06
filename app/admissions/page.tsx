import Link from 'next/link'

export default function AdmissionsPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-[#1a5c2e] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Admissions</h1>
          <p className="text-xl">Join the Greenwood Family</p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a5c2e] mb-12 text-center">Admission Process</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                step: '1',
                title: 'Download & Fill Form Online',
                desc: 'Complete the registration form available on our website',
              },
              {
                step: '2',
                title: 'Submit Form with Documents',
                desc: 'Attach required documents and submit online or at school office',
              },
              {
                step: '3',
                title: 'Entrance Test',
                desc: 'Class 6 and above applicants take an entrance assessment',
              },
              {
                step: '4',
                title: 'Parent-Principal Interview',
                desc: 'Interactive session to understand child\'s needs',
              },
              {
                step: '5',
                title: 'Fee Payment & Confirmation',
                desc: 'Pay admission fee and complete enrollment formalities',
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#f4a61d] text-[#1a5c2e] rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#1a5c2e] mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a5c2e] mb-12 text-center">Eligibility</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#1a5c2e] mb-4">Pre-Primary (LKG/UKG)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Age: 3+ for LKG, 4+ for UKG</li>
                <li>• No entrance test</li>
                <li>• Parent interview only</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#1a5c2e] mb-4">Class 1-5</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Age appropriate for class</li>
                <li>• Basic assessment</li>
                <li>• Transfer certificate required</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#1a5c2e] mb-4">Class 6-10</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Entrance test in English, Math, Science</li>
                <li>• Previous academic record review</li>
                <li>• Transfer certificate mandatory</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#1a5c2e] mb-4">Class 11-12</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Minimum 60% in Class 10</li>
                <li>• Stream-specific aptitude test</li>
                <li>• Subject combination choice</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a5c2e] mb-12 text-center">Fee Structure</h2>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-[#1a5c2e] text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Class</th>
                  <th className="px-6 py-4 text-right">Admission Fee</th>
                  <th className="px-6 py-4 text-right">Annual Fee</th>
                  <th className="px-6 py-4 text-right">Term Fee</th>
                  <th className="px-6 py-4 text-right">Transport</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { class: 'LKG-UKG', admission: '₹5,000', annual: '₹35,000', term: '₹12,000', transport: '₹8,000' },
                  { class: '1-5', admission: '₹7,500', annual: '₹45,000', term: '₹15,000', transport: '₹8,000' },
                  { class: '6-10', admission: '₹10,000', annual: '₹55,000', term: '₹18,000', transport: '₹8,000' },
                  { class: '11-12', admission: '₹12,000', annual: '₹65,000', term: '₹22,000', transport: '₹8,000' },
                ].map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4 font-semibold">{row.class}</td>
                    <td className="px-6 py-4 text-right">{row.admission}</td>
                    <td className="px-6 py-4 text-right">{row.annual}</td>
                    <td className="px-6 py-4 text-right">{row.term}</td>
                    <td className="px-6 py-4 text-right">{row.transport}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a5c2e] mb-12 text-center">
            Documents Required
          </h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-4">
            {[
              'Birth Certificate',
              'Transfer Certificate',
              'Previous Year Report Card',
              'Passport Size Photos (4)',
              'Aadhar Card Copy',
              'Parent ID Proof',
              'Address Proof',
              'Medical Certificate',
            ].map((doc, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow flex items-center">
                <span className="text-[#f4a61d] mr-3">✓</span>
                <span className="text-gray-700">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a5c2e] mb-12 text-center">
            Important Dates 2024-25
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { date: 'November 1 - December 31, 2024', event: 'Admission forms available' },
              { date: 'January 15, 2025', event: 'Last date for submission' },
              { date: 'January 20-25, 2025', event: 'Entrance tests' },
              { date: 'February 1-5, 2025', event: 'Interviews' },
              { date: 'February 15, 2025', event: 'Result announcement' },
              { date: 'March 1-15, 2025', event: 'Fee payment & admission' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow flex items-center">
                <div className="w-32 flex-shrink-0 text-[#f4a61d] font-semibold">{item.date}</div>
                <div className="flex-1 text-gray-700">{item.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1a5c2e] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-xl mb-8">
            Start your child&apos;s journey with Greenwood School today
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
