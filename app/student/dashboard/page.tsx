'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface Student {
  id: number
  name: string
  email: string
  phone: string
  createdAt: string
}

interface Application {
  id: number
  studentName: string
  dob: string
  classApplying: string
  gender: string
  parentName: string
  phone: string
  email: string
  address: string
  prevSchool?: string
  status: string
  createdAt: string
}

export default function StudentDashboard() {
  const router = useRouter()
  const [student, setStudent] = useState<Student | null>(null)
  const [application, setApplication] = useState<Application | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStudentData()
    fetchApplication()
  }, [])

  const fetchStudentData = async () => {
    try {
      const response = await fetch('/api/student/profile')
      if (response.ok) {
        const data = await response.json()
        setStudent(data)
      } else {
        router.push('/auth/login')
      }
    } catch (error) {
      toast.error('Failed to load profile')
      router.push('/auth/login')
    }
  }

  const fetchApplication = async () => {
    try {
      const response = await fetch('/api/student/application')
      if (response.ok) {
        const data = await response.json()
        setApplication(data)
      }
    } catch (error) {
      console.error('Failed to load application')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/student/logout', { method: 'POST' })
      toast.success('Logged out successfully')
      router.push('/')
    } catch (error) {
      toast.error('Failed to logout')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            ⏳ Application Pending
          </span>
        )
      case 'approved':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            ✅ Application Approved!
          </span>
        )
      case 'rejected':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            ❌ Application Rejected
          </span>
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!student) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {student.name}! 👋
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Application Status Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h2>
              
              {!application ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 mb-4">
                    You have not applied yet
                  </div>
                  <p className="text-gray-600 mb-6">
                    Apply for admission to Greenwood School to start your journey.
                  </p>
                  <Link
                    href="/registration"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Apply for Admission Now →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {getStatusBadge(application.status)}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Applied Date</p>
                      <p className="font-medium">
                        {new Date(application.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Class Applied For</p>
                      <p className="font-medium">{application.classApplying}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Student Name</p>
                      <p className="font-medium">{application.studentName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Parent Name</p>
                      <p className="font-medium">{application.parentName}</p>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    {application.status === 'pending' && (
                      <p className="text-sm text-gray-600">
                        We will contact you within 48 hours regarding your application.
                      </p>
                    )}
                    {application.status === 'approved' && (
                      <p className="text-sm text-green-600">
                        Congratulations! Please visit the school with all necessary documents for further processing.
                      </p>
                    )}
                    {application.status === 'rejected' && (
                      <div>
                        <p className="text-sm text-red-600 mb-2">
                          We regret to inform you that your application has been rejected.
                        </p>
                        <Link
                          href="/contact"
                          className="text-green-600 hover:text-green-700 text-sm font-medium"
                        >
                          Contact School →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* My Profile Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">My Profile</h2>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{student.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{student.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{student.phone}</p>
                </div>
              </div>
              <Link
                href="/student/profile"
                className="mt-4 block w-full text-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Edit Profile
              </Link>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
              <div className="space-y-2">
                <Link
                  href="/events"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  View School Events →
                </Link>
                <Link
                  href="/gallery"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  View Gallery →
                </Link>
                <Link
                  href="/contact"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Contact School →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
