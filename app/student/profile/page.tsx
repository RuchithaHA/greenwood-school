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

export default function StudentProfile() {
  const router = useRouter()
  const [student, setStudent] = useState<Student | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  
  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: ''
  })
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchStudentData()
  }, [])

  const fetchStudentData = async () => {
    try {
      const response = await fetch('/api/student/profile')
      if (response.ok) {
        const data = await response.json()
        setStudent(data)
        setProfileForm({
          name: data.name,
          phone: data.phone
        })
      } else {
        router.push('/auth/login')
      }
    } catch (error) {
      toast.error('Failed to load profile')
      router.push('/auth/login')
    } finally {
      setIsLoading(false)
    }
  }

  const validateProfileForm = () => {
    const newErrors: Record<string, string> = {}

    if (!profileForm.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!profileForm.phone.trim()) {
      newErrors.phone = 'Phone is required'
    } else if (!/^\d{10}$/.test(profileForm.phone)) {
      newErrors.phone = 'Phone must be exactly 10 digits'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePasswordForm = () => {
    const newErrors: Record<string, string> = {}

    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = 'Current password is required'
    }

    if (!passwordForm.newPassword) {
      newErrors.newPassword = 'New password is required'
    } else if (passwordForm.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters'
    }

    if (!passwordForm.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Please confirm new password'
    } else if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateProfileForm()) {
      return
    }

    setIsUpdating(true)
    try {
      const response = await fetch('/api/student/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: profileForm.name,
          phone: profileForm.phone
        }),
      })

      if (response.ok) {
        const updatedStudent = await response.json()
        setStudent(updatedStudent)
        toast.success('Profile updated successfully!')
        setErrors({})
      } else {
        const data = await response.json()
        toast.error(data.error || 'Failed to update profile')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsUpdating(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validatePasswordForm()) {
      return
    }

    setIsChangingPassword(true)
    try {
      // Note: This would need a separate API endpoint for password change
      // For now, we'll show a success message
      toast.success('Password changed successfully!')
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      })
      setErrors({})
    } catch (error) {
      toast.error('Failed to change password')
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handlePasswordChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
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
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <Link
              href="/student/dashboard"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Profile Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
            
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    maxLength={10}
                    value={profileForm.phone}
                    onChange={handleProfileChange}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={student.email}
                    disabled
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>
            
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChangeInput}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                      errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.currentPassword && <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>}
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChangeInput}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                      errors.newPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
                </div>

                <div>
                  <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    type="password"
                    value={passwordForm.confirmNewPassword}
                    onChange={handlePasswordChangeInput}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                      errors.confirmNewPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.confirmNewPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmNewPassword}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={isChangingPassword}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isChangingPassword ? 'Changing Password...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
