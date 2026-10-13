import type { Booking } from '../types';

export const INITIAL_BOOKINGS: Booking[] = [
  // JCB 3DX pre-configured bookings matching reference UI
  {
    id: 'BK-1001',
    equipmentId: 'jcb-3dx',
    equipmentName: 'JCB 3DX Backhoe Loader',
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
    equipmentName: 'JCB 3DX Backhoe Loader',
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
    equipmentName: 'JCB 3DX Backhoe Loader',
    customerName: 'R. Soundararajan',
    phoneNumber: '+91 99445 77889',
    rentalType: 'Weekly',
    projectLocation: 'Rasipuram Agricultural College',
    startDate: '2026-10-22',
    endDate: '2026-10-24',
    status: 'Confirmed',
    createdAt: '2026-10-03T14:15:00Z'
  },

  // Hitachi 140 Excavator
  {
    id: 'BK-1004',
    equipmentId: 'hitachi-140',
    equipmentName: 'Hitachi 140 Excavator',
    customerName: 'Thirumalai Foundations',
    phoneNumber: '+91 98940 33221',
    rentalType: 'Daily',
    projectLocation: 'Omalur Highway Pipeline Project',
    startDate: '2026-10-17',
    endDate: '2026-10-20',
    status: 'Confirmed',
    createdAt: '2026-10-04T16:20:00Z'
  },

  // Hyundai Robex 215L
  {
    id: 'BK-1005',
    equipmentId: 'hitachi-215',
    equipmentName: 'Hyundai Robex 215L Excavator',
    customerName: 'Kavitha Infra Projects',
    phoneNumber: '+91 94432 99881',
    rentalType: 'Project Based',
    projectLocation: 'Sankari Heavy Excavation Site',
    startDate: '2026-10-09',
    endDate: '2026-10-11',
    status: 'Confirmed',
    createdAt: '2026-10-02T10:00:00Z'
  },

  // Hitachi 220 Quarry Excavator
  {
    id: 'BK-1006',
    equipmentId: 'hitachi-220',
    equipmentName: 'Hitachi ZAXIS 220LC Quarry Excavator',
    customerName: 'Sri Balaji Blue Metals',
    phoneNumber: '+91 94435 66778',
    rentalType: 'Project Based',
    projectLocation: 'Namakkal Quarry Division',
    startDate: '2026-10-15',
    endDate: '2026-10-28',
    status: 'Confirmed',
    createdAt: '2026-09-28T08:00:00Z'
  },

  // 50 Feet Long Reach Excavator
  {
    id: 'BK-1007',
    equipmentId: 'hitachi-long-reach-50ft',
    equipmentName: '50 Feet Long Reach Hitachi Excavator',
    customerName: 'Cauvery River Desilting Project',
    phoneNumber: '+91 97500 12345',
    rentalType: 'Weekly',
    projectLocation: 'Paramathi Velur Canal Basin',
    startDate: '2026-10-12',
    endDate: '2026-10-18',
    status: 'Confirmed',
    createdAt: '2026-10-03T12:00:00Z'
  },

  // Excavator with Rock Breaker
  {
    id: 'BK-1008',
    equipmentId: 'rock-breaker',
    equipmentName: 'Excavator with Heavy Rock Breaker',
    customerName: 'K. R. Construction & Demolition',
    phoneNumber: '+91 96290 67890',
    rentalType: 'Daily',
    projectLocation: 'Salem Junction Commercial Demolition',
    startDate: '2026-10-10',
    endDate: '2026-10-12',
    status: 'Confirmed',
    createdAt: '2026-10-05T15:40:00Z'
  },

  // BharatBenz Tipper Lorry
  {
    id: 'BK-1009',
    equipmentId: 'tipper-lorry',
    equipmentName: 'BharatBenz Heavy Tipper Lorry (10-Wheeler)',
    customerName: 'Tamil Nadu Highway Subcontractor',
    phoneNumber: '+91 98430 55443',
    rentalType: 'Daily',
    projectLocation: 'NH-44 Four-Lane Expansion',
    startDate: '2026-10-16',
    endDate: '2026-10-19',
    status: 'Confirmed',
    createdAt: '2026-10-02T14:00:00Z'
  },

  // Tractor Compressor & Blasting Unit
  {
    id: 'BK-1010',
    equipmentId: 'compressor-blasting',
    equipmentName: 'Tractor Compressor & Controlled Blasting Unit',
    customerName: 'V. Palanisamy Well Digging',
    phoneNumber: '+91 94421 88776',
    rentalType: 'Project Based',
    projectLocation: 'Tiruchengode Hard Rock Agricultural Well',
    startDate: '2026-10-20',
    endDate: '2026-10-22',
    status: 'Confirmed',
    createdAt: '2026-10-04T10:00:00Z'
  }
];
