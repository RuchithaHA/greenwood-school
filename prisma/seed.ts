import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Hash admin password
  const passwordHash = await bcrypt.hash('Admin@1234', 10)

  // Create Admin
  await prisma.admin.upsert({
    where: { email: 'admin@greenwood.edu' },
    update: {},
    create: {
      email: 'admin@greenwood.edu',
      passwordHash,
      name: 'Principal Admin',
    },
  })

  // Create Registrations
  await prisma.registration.createMany({
    data: [
      {
        studentName: 'Arjun Sharma',
        dob: new Date('2018-05-15'),
        classApplying: '1',
        gender: 'Male',
        parentName: 'Rajesh Sharma',
        phone: '9876543210',
        email: 'arjun.parent@example.com',
        address: '45 Green Street, Bangalore',
        prevSchool: 'Little Flower School',
        status: 'pending',
      },
      {
        studentName: 'Priya Reddy',
        dob: new Date('2019-03-20'),
        classApplying: 'LKG',
        gender: 'Female',
        parentName: 'Suresh Reddy',
        phone: '9876543211',
        email: 'priya.parent@example.com',
        address: '78 Oak Avenue, Bangalore',
        prevSchool: null,
        status: 'approved',
      },
      {
        studentName: 'Rahul Kumar',
        dob: new Date('2017-08-10'),
        classApplying: '3',
        gender: 'Male',
        parentName: 'Amit Kumar',
        phone: '9876543212',
        email: 'rahul.parent@example.com',
        address: '12 Pine Road, Bangalore',
        prevSchool: 'St. Marys School',
        status: 'approved',
      },
      {
        studentName: 'Sneha Patel',
        dob: new Date('2016-12-05'),
        classApplying: '5',
        gender: 'Female',
        parentName: 'Dinesh Patel',
        phone: '9876543213',
        email: 'sneha.parent@example.com',
        address: '56 Elm Street, Bangalore',
        prevSchool: 'National Public School',
        status: 'rejected',
      },
      {
        studentName: 'Vikram Singh',
        dob: new Date('2018-09-25'),
        classApplying: '2',
        gender: 'Male',
        parentName: 'Manoj Singh',
        phone: '9876543214',
        email: 'vikram.parent@example.com',
        address: '90 Maple Lane, Bangalore',
        prevSchool: 'Kendriya Vidyalaya',
        status: 'pending',
      },
    ],
  })

  // Create Students
  await prisma.student.createMany({
    data: [
      { name: 'Ananya Gupta', class: '1', section: 'A', rollNo: '101', parentName: 'Raj Gupta', phone: '9876543201' },
      { name: 'Karthik Nair', class: '2', section: 'B', rollNo: '102', parentName: 'Suresh Nair', phone: '9876543202' },
      { name: 'Divya Menon', class: '3', section: 'A', rollNo: '103', parentName: 'Ravi Menon', phone: '9876543203' },
      { name: 'Aditya Rao', class: '4', section: 'C', rollNo: '104', parentName: 'Venkat Rao', phone: '9876543204' },
      { name: 'Meera Iyer', class: '5', section: 'B', rollNo: '105', parentName: 'Krishna Iyer', phone: '9876543205' },
      { name: 'Rohan Sharma', class: '6', section: 'A', rollNo: '106', parentName: 'Sunil Sharma', phone: '9876543206' },
      { name: 'Pooja Verma', class: '7', section: 'B', rollNo: '107', parentName: 'Amit Verma', phone: '9876543207' },
      { name: 'Arun Kumar', class: '8', section: 'A', rollNo: '108', parentName: 'Prakash Kumar', phone: '9876543208' },
      { name: 'Kavita Das', class: '9', section: 'C', rollNo: '109', parentName: 'Bikash Das', phone: '9876543209' },
      { name: 'Nikhil Joshi', class: '10', section: 'A', rollNo: '110', parentName: 'Mohan Joshi', phone: '9876543210' },
    ],
  })

  // Create Events
  await prisma.event.createMany({
    data: [
      {
        title: 'Annual Day 2024',
        description: 'Join us for our grand Annual Day celebration featuring cultural performances and prize distribution.',
        eventDate: new Date('2024-12-15'),
        category: 'Cultural',
        imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800',
      },
      {
        title: 'Sports Day',
        description: 'Annual sports competition with track and field events, games, and prizes.',
        eventDate: new Date('2024-11-20'),
        category: 'Sports',
        imageUrl: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800',
      },
      {
        title: 'Science Fair',
        description: 'Students showcase innovative science projects and experiments.',
        eventDate: new Date('2024-10-10'),
        category: 'Academic',
        imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
      },
      {
        title: 'Cultural Fest',
        description: 'Celebration of art, music, dance, and drama from various cultures.',
        eventDate: new Date('2024-09-05'),
        category: 'Cultural',
        imageUrl: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800',
      },
      {
        title: 'Parent-Teacher Meeting',
        description: 'Opportunity for parents to discuss student progress with teachers.',
        eventDate: new Date('2024-08-15'),
        category: 'Academic',
        imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800',
      },
    ],
  })

  // Create Gallery items
  await prisma.gallery.createMany({
    data: [
      {
        albumName: 'Sports Day',
        imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800',
        caption: 'Students participating in track events',
        category: 'Sports',
      },
      {
        albumName: 'Annual Day',
        imageUrl: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800',
        caption: 'Cultural dance performance',
        category: 'Annual Day',
      },
      {
        albumName: 'Campus',
        imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
        caption: 'School building from main gate',
        category: 'Campus',
      },
      {
        albumName: 'Science Fair',
        imageUrl: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800',
        caption: 'Students presenting science projects',
        category: 'Science Fair',
      },
      {
        albumName: 'Sports',
        imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800',
        caption: 'Football team practice',
        category: 'Sports',
      },
      {
        albumName: 'Annual Day',
        imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
        caption: 'Prize distribution ceremony',
        category: 'Annual Day',
      },
      {
        albumName: 'Campus',
        imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800',
        caption: 'Library interior',
        category: 'Campus',
      },
      {
        albumName: 'Science Fair',
        imageUrl: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=800',
        caption: 'Robotics exhibition',
        category: 'Science Fair',
      },
    ],
  })

  // Create Staff
  await prisma.staff.createMany({
    data: [
      {
        name: 'Dr. Anita Sharma',
        designation: 'Principal',
        department: 'Administration',
        email: 'principal@greenwood.edu',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      },
      {
        name: 'Mr. Rajesh Kumar',
        designation: 'Vice Principal',
        department: 'Administration',
        email: 'viceprincipal@greenwood.edu',
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      },
      {
        name: 'Mrs. Meena Reddy',
        designation: 'Mathematics Teacher',
        department: 'Academics',
        email: 'meena@greenwood.edu',
        photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      },
      {
        name: 'Mr. Suresh Nair',
        designation: 'Science Teacher',
        department: 'Academics',
        email: 'suresh@greenwood.edu',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      },
      {
        name: 'Mrs. Kavita Iyer',
        designation: 'English Teacher',
        department: 'Academics',
        email: 'kavita@greenwood.edu',
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      },
      {
        name: 'Mr. Vikram Singh',
        designation: 'Physical Education',
        department: 'Sports',
        email: 'vikram@greenwood.edu',
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
      },
      {
        name: 'Mrs. Divya Menon',
        designation: 'Librarian',
        department: 'Library',
        email: 'divya@greenwood.edu',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      },
      {
        name: 'Dr. Arun Gupta',
        designation: 'School Counselor',
        department: 'Student Welfare',
        email: 'arun@greenwood.edu',
        photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      },
    ],
  })

  // Create Contact submissions
  await prisma.contact.createMany({
    data: [
      {
        name: 'Sunita Agarwal',
        email: 'sunita@example.com',
        phone: '9988776655',
        message: 'I would like to know about the admission process for Class 1 for the upcoming academic year.',
      },
      {
        name: 'Mahesh Babu',
        email: 'mahesh@example.com',
        phone: '9988776644',
        message: 'Please send me the fee structure for Class 6 to 10.',
      },
      {
        name: 'Lakshmi Devi',
        email: 'lakshmi@example.com',
        phone: '9988776633',
        message: 'Is there any scholarship available for meritorious students?',
      },
    ],
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
