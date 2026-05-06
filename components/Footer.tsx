import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#1a5c2e] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Column */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#f4a61d]">About Greenwood School</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Nurturing minds since 1995, Greenwood School is a CBSE-affiliated institution
              committed to excellence in education and holistic development of students.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#f4a61d]">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#f4a61d] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/academics" className="text-gray-300 hover:text-[#f4a61d] transition-colors">
                  Academics
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="text-gray-300 hover:text-[#f4a61d] transition-colors">
                  Admissions
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-[#f4a61d] transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#f4a61d] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#f4a61d]">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#f4a61d] mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Education Lane, Greenwood Nagar, Bangalore - 560001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-[#f4a61d] flex-shrink-0" />
                <span className="text-gray-300">+91 80 2345 6789</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-[#f4a61d] flex-shrink-0" />
                <span className="text-gray-300">info@greenwoodschool.edu.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2024 Greenwood School. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
