'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function RegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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

      toast.success('Registration submitted! We will contact you within 48 hours.')
      reset()
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const classes = ['LKG', 'UKG', ...Array.from({ length: 12 }, (_, i) => String(i + 1))]

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

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f4a61d]"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message?.toString()}</p>
                )}
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
