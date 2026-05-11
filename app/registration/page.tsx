'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface Student {
  id: number
  name: string
  email: string
  phone: string
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

export default function RegistrationPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [student, setStudent] = useState<Student | null>(null)
  const [application, setApplication] = useState<Application | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm()

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
        setValue('email', data.email)
      } else {
        // Not logged in, will be redirected by middleware
      }
    } catch (error) {
      console.error('Failed to fetch student data')
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
      console.error('Failed to fetch application')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: any) => {
    if (!student) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          studentId: student.id
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.error === 'Email already registered') {
          toast.error('This email is already registered.')
        } else {
          toast.error('Something went wrong. Please try again.')
        }
        return
      }

      toast.success('Application submitted successfully!')
      router.push('/student/dashboard')
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const classes = ['LKG', 'UKG', ...Array.from({ length: 12 }, (_, i) => String(i + 1))]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  // If not logged in, show login prompt (middleware should redirect anyway)
  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto h-12 w-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl">G</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please login to apply for admission
          </h2>
          <p className="text-gray-600 mb-6">
            You need to create a student account first before applying for admission.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Login to Continue
          </Link>
        </div>
      </div>
    )
  }

  // If already applied, show status
  if (application) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Application Already Submitted
            </h2>
            <p className="text-gray-600 mb-6">
              Your application for {application.classApplying} has been submitted and is currently being processed.
            </p>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 mb-6">
              Status: {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </div>
            <div>
              <Link
                href="/student/dashboard"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-[#1a5c2e] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Student Registration</h1>
          <p className="text-xl">Register your child for the upcoming academic year</p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#1a5c2e] mb-8 text-center">
              Registration Form
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Student Name */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Student Name *
                </label>
                <input
                  type="text"
                  {...register('studentName', {
                    required: 'Student name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' },
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4a61d]"
                />
                {errors.studentName && (
                  <p className="text-red-500 text-sm mt-1">{errors.studentName.message?.toString()}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  {...register('dob', { required: 'Date of birth is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4a61d]"
                />
                {errors.dob && (
                  <p className="text-red-500 text-sm mt-1">{errors.dob.message?.toString()}</p>
                )}
              </div>

              {/* Class Applying */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Class Applying For *
                </label>
                <select
                  {...register('classApplying', { required: 'Class selection is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4a61d]"
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
                {errors.classApplying && (
                  <p className="text-red-500 text-sm mt-1">{errors.classApplying.message?.toString()}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Gender *</label>
                <div className="flex space-x-6">
                  {['Male', 'Female', 'Other'].map((gender) => (
                    <label key={gender} className="flex items-center">
                      <input
                        type="radio"
                        value={gender}
                        {...register('gender', { required: 'Gender selection is required' })}
                        className="mr-2"
                      />
                      <span>{gender}</span>
                    </label>
                  ))}
                </div>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender.message?.toString()}</p>
                )}
              </div>

              {/* Parent Name */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Parent/Guardian Name *
                </label>
                <input
                  type="text"
                  {...register('parentName', {
                    required: 'Parent name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' },
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4a61d]"
                />
                {errors.parentName && (
                  <p className="text-red-500 text-sm mt-1">{errors.parentName.message?.toString()}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Phone must be exactly 10 digits',
                    },
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4a61d]"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message?.toString()}</p>
                )}
              </div>

              {/* Email - Read-only */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  value={student.email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">Email from your account (cannot be changed)</p>
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Home Address *</label>
                <textarea
                  {...register('address', {
                    required: 'Address is required',
                    minLength: { value: 10, message: 'Address must be at least 10 characters' },
                  })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4a61d]"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.message?.toString()}</p>
                )}
              </div>

              {/* Previous School */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Previous School (Optional)
                </label>
                <input
                  type="text"
                  {...register('prevSchool')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4a61d]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#f4a61d] text-[#1a5c2e] font-bold rounded-lg hover:bg-[#e59515] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
