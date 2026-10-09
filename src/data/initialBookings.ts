import type { Booking } from '../types';

export const INITIAL_BOOKINGS: Booking[] = [
  // JCB 3DX pre-configured bookings matching reference UI
  {
    id: 'BK-1001',
    equipmentId: 'jcb-3dx',
    equipmentName: 'JCB 3DX',
    customerName: 'K. Periasamy',
    phoneNumber: '+91 98421 11223',
    rentalType: 'Daily',
    projectLocation: 'Salem Steel Plant Bypass Road',
    startDate: '2026-10-06',
    endDate: '2026-10-08',
    status: 'Confirmed',
    createdAt: '2026-10-01T09:00:00Z'
  },
  {
    id: 'BK-1002',
    equipmentId: 'jcb-3dx',
    equipmentName: 'JCB 3DX',
    customerName: 'Anand Builders',
    phoneNumber: '+91 97890 44556',
    rentalType: 'Daily',
    projectLocation: 'Namakkal Collectorate New Block',
    startDate: '2026-10-14',
    endDate: '2026-10-14',
    status: 'Confirmed',
    createdAt: '2026-10-02T11:30:00Z'
  },
  {
    id: 'BK-1003',
    equipmentId: 'jcb-3dx',
    equipmentName: 'JCB 3DX',
    customerName: 'R. Soundararajan',
    phoneNumber: '+91 99445 77889',
    rentalType: 'Weekly',
    projectLocation: 'Rasipuram Agricultural College',
    startDate: '2026-10-22',
    endDate: '2026-10-24',
    status: 'Confirmed',
    createdAt: '2026-10-03T14:15:00Z'
  },

  // Excavator bookings
  {
    id: 'BK-1004',
    equipmentId: 'excavator-20t',
    equipmentName: 'Excavator (20-Ton)',
    customerName: 'Kavitha Infra Projects',
    phoneNumber: '+91 94432 99881',
    rentalType: 'Project Based',
    projectLocation: 'Sankari Quarry Division',
    startDate: '2026-10-09',
    endDate: '2026-10-11',
    status: 'Confirmed',
    createdAt: '2026-10-02T10:00:00Z'
  },
  {
    id: 'BK-1005',
    equipmentId: 'excavator-20t',
    equipmentName: 'Excavator (20-Ton)',
    customerName: 'Thirumalai Foundations',
    phoneNumber: '+91 98940 33221',
    rentalType: 'Daily',
    projectLocation: 'Omalur Highway Bridge Work',
    startDate: '2026-10-17',
    endDate: '2026-10-20',
    status: 'Confirmed',
    createdAt: '2026-10-04T16:20:00Z'
  },

  // Bulldozer bookings (Currently Rented across month)
  {
    id: 'BK-1006',
    equipmentId: 'bulldozer',
    equipmentName: 'Bulldozer',
    customerName: 'SIPCOT Industrial Park Developers',
    phoneNumber: '+91 94421 88776',
    rentalType: 'Project Based',
    projectLocation: 'Perundurai Mega Industrial Complex',
    startDate: '2026-10-01',
    endDate: '2026-10-31',
    status: 'Confirmed',
    createdAt: '2026-09-28T08:00:00Z'
  },

  // Road Roller bookings
  {
    id: 'BK-1007',
    equipmentId: 'road-roller',
    equipmentName: 'Road Roller',
    customerName: 'State Highway Subcontractor',
    phoneNumber: '+91 97500 12345',
    rentalType: 'Daily',
    projectLocation: 'Tiruchengode Outer Ring Road',
    startDate: '2026-10-15',
    endDate: '2026-10-16',
    status: 'Confirmed',
    createdAt: '2026-10-03T12:00:00Z'
  },
  {
    id: 'BK-1008',
    equipmentId: 'road-roller',
    equipmentName: 'Road Roller',
    customerName: 'Evergreen Layout Promoters',
    phoneNumber: '+91 96290 67890',
    rentalType: 'Daily',
    projectLocation: 'Mettur Dam View Layout',
    startDate: '2026-10-28',
    endDate: '2026-10-30',
    status: 'Confirmed',
    createdAt: '2026-10-05T15:40:00Z'
  },

  // Tractor Tipper bookings
  {
    id: 'BK-1009',
    equipmentId: 'tractor-tipper',
    equipmentName: 'Tractor with Tipper',
    customerName: 'V. Palanisamy Farm',
    phoneNumber: '+91 98430 55443',
    rentalType: 'Daily',
    projectLocation: 'Paramathi Velur Banana Plantation',
    startDate: '2026-10-10',
    endDate: '2026-10-11',
    status: 'Confirmed',
    createdAt: '2026-10-02T14:00:00Z'
  },

  // Tipper Lorry bookings
  {
    id: 'BK-1010',
    equipmentId: 'tipper-lorry',
    equipmentName: 'Tipper Lorry',
    customerName: 'Sri Balaji Blue Metals',
    phoneNumber: '+91 94435 66778',
    rentalType: 'Weekly',
    projectLocation: 'Kandhampatti Flyover Site',
    startDate: '2026-10-16',
    endDate: '2026-10-18',
    status: 'Confirmed',
    createdAt: '2026-10-04T10:00:00Z'
  }
];
