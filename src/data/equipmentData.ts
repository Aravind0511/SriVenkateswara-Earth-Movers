import type { EquipmentItem } from '../types';

export const EQUIPMENT_LIST: EquipmentItem[] = [
  {
    id: 'jcb-3dx',
    name: 'JCB 3DX',
    type: 'Backhoe Loader',
    category: 'Backhoe',
    model: '3DX Super EcoMAX 4WD',
    shortDesc: 'Heavy-duty all-rounder for excavation, trenching, loading, and material shifting.',
    fullDesc: 'The JCB 3DX is the most trusted workhorse for Indian infrastructure, building foundations, and site development. Equipped with an EcoMAX fuel-efficient diesel engine, heavy-duty loader arm, and high-breakout-force backhoe bucket. Ideal for urban excavation, road berm trimming, pipeline trenching, and general site clearance.',
    status: 'available',
    statusText: 'Available',
    image: '/equipment/jcb-3dx.jpg',
    specs: {
      operatingWeight: '7,460 kg',
      enginePower: '76 HP @ 2200 rpm',
      bucketCapacity: 'Loader: 1.0 m³ / Backhoe: 0.26 m³',
      diggingDepth: '4.77 meters (15.6 ft)',
      payloadCapacity: '1,800 kg loader lift',
      fuelCapacity: '128 Litres',
      transmission: 'Synchromesh 4-speed'
    },
    rates: {
      hourly: 'Available on Call',
      daily: 'Tariff on Request',
      weekly: 'Custom Weekly Tariff',
      project: 'Custom Contract Quote'
    },
    applications: [
      'Foundation Footing & Pits',
      'Trenching for Pipelines & Cables',
      'Material Shifting & Truck Loading',
      'Site Clearing & Land Leveling'
    ],
    operatorIncluded: true,
    minRentalHours: 4
  },
  {
    id: 'excavator-20t',
    name: 'Excavator',
    type: 'Crawler Excavator',
    category: 'Excavator',
    model: '20-Ton Heavy Duty Crawler',
    shortDesc: 'Heavy tracked excavator engineered for deep rock excavation, mass earth removal, and demolition.',
    fullDesc: 'High-production 20-ton tracked crawler excavator equipped with heavy rock bucket and optional rock-breaker attachment. High hydraulic power and continuous 360-degree slew capacity make this machine indispensable for large-scale earth cutting, quarry overburden clearing, pond digging, and massive basement excavation.',
    status: 'available',
    statusText: 'Available',
    image: '/equipment/excavator.jpg',
    specs: {
      operatingWeight: '20,500 kg',
      enginePower: '140 HP Turbocharged',
      bucketCapacity: '0.92 m³ Heavy Duty Rock Bucket',
      diggingDepth: '6.65 meters (21.8 ft)',
      reach: '9.87 meters maximum ground reach',
      fuelCapacity: '350 Litres',
      transmission: 'Independent hydraulic hydrostatic track drive'
    },
    rates: {
      hourly: 'Available on Call',
      daily: 'Tariff on Request',
      weekly: 'Custom Weekly Tariff',
      project: 'Volume / CBM Contract Basis'
    },
    applications: [
      'Deep Basement & Lake Excavation',
      'Hard Rock Chiseling (Breaker optional)',
      'Canal & Highway Earth Cutting',
      'Commercial Demolition Work'
    ],
    operatorIncluded: true,
    minRentalHours: 6
  },
  {
    id: 'tractor-tipper',
    name: 'Tractor',
    type: 'Agriculture & Construction',
    category: 'Tractor',
    model: '55 HP Utility Tractor with Hydraulic Tipper',
    shortDesc: 'Compact and agile utility tractor with hydraulic tipping trailer for rural roads and localized haulage.',
    fullDesc: 'Robust 55 HP dual-clutch utility tractor paired with heavy-duty 3-ton hydraulic tipping trolley. Perfect for agricultural land development, farm leveling, manure / gravel transport, narrow street excavation debris shifting, and auxiliary support at roadworks where full-sized tippers cannot maneuver.',
    status: 'available',
    statusText: 'Available',
    image: '/equipment/tractor.jpg',
    specs: {
      operatingWeight: '2,200 kg (Tractor alone)',
      enginePower: '55 HP @ 2100 rpm',
      payloadCapacity: '3.5 Tonnes Hydraulic Tipping Trailer',
      fuelCapacity: '60 Litres',
      transmission: '8 Forward + 2 Reverse sliding mesh',
      reach: 'Hydraulic high-angle tipping'
    },
    rates: {
      hourly: 'Available on Call',
      daily: 'Tariff on Request',
      weekly: 'Custom Weekly Tariff',
      project: 'Trip / Day Contract Rate'
    },
    applications: [
      'Farmland Leveling & Clearing',
      'Sand, Gravel & Brick Transport',
      'Narrow Lane Debris Hauling',
      'Small Plot Soil Redistribution'
    ],
    operatorIncluded: true,
    minRentalHours: 4
  },
  {
    id: 'tipper-lorry',
    name: 'Tipper Lorry',
    type: 'Transport & Hauling',
    category: 'Tipper',
    model: '10-Wheeler 16 CBM Heavy Dump Truck',
    shortDesc: 'Heavy-payload 16 CBM tipper lorry for bulk sand, aggregate, gravel, and muck transportation.',
    fullDesc: 'Commercial heavy-duty multi-axle tipper lorry designed for high-tonnage bulk hauling. Equipped with reinforced high-tensile steel tipping body, fast hydraulic hoist, and all-weather radial tires. Essential for moving hundreds of tons of excavated earth, filling material, blue metal aggregate, or river sand over long distances.',
    status: 'available',
    statusText: 'Available',
    image: '/equipment/tipper.jpg',
    specs: {
      operatingWeight: '28,000 kg GVW',
      enginePower: '230 HP Common Rail Diesel',
      payloadCapacity: '16 Cubic Meters / ~20 Tonnes',
      fuelCapacity: '300 Litres',
      transmission: '9-speed synchromesh with crawler gear'
    },
    rates: {
      hourly: 'Available on Call',
      daily: 'Tariff on Request',
      weekly: 'Custom Weekly Tariff',
      project: 'Per-Trip / Per-CBM Basis'
    },
    applications: [
      'Bulk Earth & Soil Haulage',
      'Quarry Blue Metal & Gravel Delivery',
      'Mass Earth Filling & Embankment',
      'Construction Site Muck Removal'
    ],
    operatorIncluded: true,
    minRentalHours: 4
  },
  {
    id: 'bulldozer',
    name: 'Bulldozer',
    type: 'Land Development',
    category: 'Bulldozer',
    model: 'Heavy Tracked Crawler Dozer D6',
    shortDesc: 'High-torque crawler bulldozer for dense vegetation clearing, mass leveling, and rough grading.',
    fullDesc: 'Engineered for prime earth pushing and rough grading in demanding terrains. Features a heavy-duty semi-U blade with hydraulic tilt, severe-duty undercarriage tracks, and a rear single-shank ripper for breaking compacted hardpan. Essential for large-scale township layouts, industrial plots, and highway subgrade profiling.',
    status: 'rented',
    statusText: 'Currently Rented',
    image: '/equipment/bulldozer.jpg',
    specs: {
      operatingWeight: '18,500 kg',
      enginePower: '175 HP Heavy Duty Turbo Diesel',
      bucketCapacity: 'Blade Capacity: 3.8 m³ Semi-U Blade',
      diggingDepth: 'Ripper penetration: 550 mm',
      fuelCapacity: '320 Litres',
      transmission: 'Planetary powershift 3F/3R'
    },
    rates: {
      hourly: 'Available on Call',
      daily: 'Tariff on Request',
      weekly: 'Custom Weekly Tariff',
      project: 'Per-Acre Leveling Contract'
    },
    applications: [
      'Large Acreage Site Leveling',
      'Dense Shrub & Forest Land Clearing',
      'Road Embankment Soil Spreading',
      'Subgrade Compaction Preparation'
    ],
    operatorIncluded: true,
    minRentalHours: 8
  },
  {
    id: 'road-roller',
    name: 'Road Roller',
    type: 'Soil Compaction',
    category: 'Road Roller',
    model: '11-Ton Soil Vibratory Compactor',
    shortDesc: 'Single-drum vibratory roller for soil, gravel, and asphalt road sub-base compaction.',
    fullDesc: 'Heavy-duty 11-ton vibratory soil compactor engineered to achieve required soil densities in minimal passes. Features dual-frequency hydraulic vibration, hydrostatic propulsion, high static linear load, and excellent gradeability. Crucial for tarmac roads, paver block base preparation, factory flooring, and canal bed compaction.',
    status: 'available',
    statusText: 'Available',
    image: '/equipment/road-roller.jpg',
    specs: {
      operatingWeight: '11,200 kg',
      enginePower: '105 HP Water Cooled Diesel',
      drumWidth: '2,140 mm (7 ft)',
      payloadCapacity: 'Centrifugal force: up to 260 kN',
      fuelCapacity: '220 Litres',
      transmission: 'Full hydrostatic drive system'
    },
    rates: {
      hourly: 'Available on Call',
      daily: 'Tariff on Request',
      weekly: 'Custom Weekly Tariff',
      project: 'Square-Meter / Project Contract'
    },
    applications: [
      'Highway & Rural Road Compaction',
      'Industrial Floor Sub-base Preparation',
      'Earth Filling Bed Compaction',
      'Layout Paver Block Base Rolling'
    ],
    operatorIncluded: true,
    minRentalHours: 4
  }
];
