import type { EquipmentItem } from '../types';
import { getAssetUrl } from '../utils/assets.ts';

export const EQUIPMENT_LIST: EquipmentItem[] = [
  {
    id: 'all-vehicles-fleet',
    name: 'Complete Fleet Package (All Vehicles)',
    type: 'Full Fleet Turnkey Solution',
    category: 'Full Fleet',
    model: 'Sri Venkateshwara Heavy Machinery Fleet (8 Units Combined)',
    shortDesc: 'Book our entire fleet together with one card: Hitachi 140/215/220, 50ft Long Reach, Rock Breaker, BharatBenz Tipper, Compressor & JCB 3DX.',
    fullDesc: 'The Complete Fleet Package provides full-scale end-to-end turnkey machinery deployment for major infrastructure, township development, large industrial construction, and highway contracts. Includes all 8 core machines: Hitachi 140 Excavator, Hyundai Robex 215L, Tata Hitachi ZAXIS 220LC Quarry Excavator, 50 Feet Long Reach Excavator, Excavator with Heavy Rock Breaker, BharatBenz 10-Wheeler Tipper Lorry, Tractor Compressor with Blasting Unit, and JCB 3DX Backhoe Loader, complete with dedicated certified heavy machine operators, on-site fuel coordination, and priority mobilization.',
    status: 'available',
    statusText: 'Available',
    image: getAssetUrl('/equipment/all-vehicles-fleet.jpg'),
    specs: {
      operatingWeight: '100+ Tonnes Combined Fleet Weight',
      enginePower: '1,000+ HP Cumulative Engine Output',
      bucketCapacity: 'Multi-size: 0.26 m³ to 1.15 m³ + 16 CBM Dump Truck',
      diggingDepth: 'Up to 12.5 meters (41 ft) with 50ft Long Reach',
      reach: '50 Feet (15.2m) Long Reach + Heavy Rock Breaker',
      payloadCapacity: '16 CBM Tipper + Heavy Haulage Support',
      fuelCapacity: 'Full Fleet Multi-Tank Continuous Operation',
      transmission: 'Hydrostatic Crawler, 4WD & Multi-Axle Heavy Drives'
    },
    rates: {
      hourly: 'Available on Call',
      daily: 'Tariff on Request',
      weekly: 'Custom Weekly Tariff',
      project: 'Turnkey Project Contract Quote'
    },
    applications: [
      'Turnkey Infrastructure & Four-Lane Highway Projects',
      'Mega Industrial & Residential Township Development',
      'Mass Earth Excavation, Truck Haulage & Site Leveling',
      'Deep Well Sinking, Canal & Riverbed Desilting',
      'Hard Granite Quarry Overburden & Controlled Blasting',
      'RCC Building Demolition & Instant Debris Removal'
    ],
    operatorIncluded: true,
    minRentalHours: 8
  },
  {
    id: 'hitachi-140',
    name: 'Hitachi 140 Excavator',
    type: 'Crawler Hydraulic Excavator',
    category: 'Excavator',
    model: 'Tata Hitachi ZAXIS 140H / Sany SY140C-9',
    shortDesc: 'Agile 14-ton hydraulic excavator for foundation footing, pipeline trenching, and rural earthwork.',
    fullDesc: 'The 140 class hydraulic crawler excavator delivers exceptional versatility and fuel efficiency in a compact footprint. Designed for projects that require high breakout force and precision digging in tighter spaces. Ideal for residential foundation pits, utility pipeline trenches, canal berm dressing, and rural agricultural earthworks.',
    status: 'available',
    statusText: 'Available',
    image: getAssetUrl('/equipment/hitachi-140.jpg'),
    specs: {
      operatingWeight: '14,000 kg',
      enginePower: '95 HP Turbocharged Diesel',
      bucketCapacity: '0.65 m³ Trench & General Purpose Bucket',
      diggingDepth: '5.53 meters (18.1 ft)',
      reach: '8.34 meters ground level reach',
      fuelCapacity: '240 Litres',
      transmission: 'Hydrostatic 2-speed travel drive'
    },
    rates: {
      hourly: 'Available on Call',
      daily: 'Tariff on Request',
      weekly: 'Custom Weekly Tariff',
      project: 'Custom Contract Quote'
    },
    applications: [
      'Foundation Footing & Column Pits',
      'Water & Utility Pipeline Trenching',
      'Canal Lining & Agricultural Desilting',
      'Rural Road Berm Cutting & Dressing'
    ],
    operatorIncluded: true,
    minRentalHours: 4
  },
  {
    id: 'hitachi-215',
    name: 'Hyundai Robex 215L Excavator',
    type: 'Heavy Hydraulic Excavator',
    category: 'Excavator',
    model: 'Hyundai Robex 215L Smart Crawler',
    shortDesc: 'High-production 21.5-ton crawler excavator for mass earthmoving, commercial basements, and site grading.',
    fullDesc: 'The Robex 215L Smart hydraulic crawler excavator is engineered for high-tonnage production earthmoving. Built with heavy-duty structural steel boom components, heavy undercarriage tracks, and fast hydraulic cycle times. Excels in deep commercial basements, mass soil excavation, highway cutting, and continuous dump truck loading.',
    status: 'available',
    statusText: 'Available',
    image: getAssetUrl('/equipment/hitachi-215.jpg'),
    specs: {
      operatingWeight: '21,500 kg',
      enginePower: '145 HP Heavy Duty Turbo Diesel',
      bucketCapacity: '1.05 m³ Heavy Duty Earth Bucket',
      diggingDepth: '6.73 meters (22.1 ft)',
      reach: '9.92 meters maximum reach',
      fuelCapacity: '340 Litres',
      transmission: 'High-torque hydrostatic crawler drive'
    },
    rates: {
      hourly: 'Available on Call',
      daily: 'Tariff on Request',
      weekly: 'Custom Weekly Tariff',
      project: 'Volume / CBM Contract Basis'
    },
    applications: [
      'Mass Earth Excavation & Basement Pits',
      'Commercial Site Clearance & Leveling',
      'High-Capacity Tipper Truck Loading',
      'Highway Cutting & Earth Embankments'
    ],
    operatorIncluded: true,
    minRentalHours: 6
  },
  {
    id: 'hitachi-220',
    name: 'Hitachi ZAXIS 220LC Quarry Excavator',
    type: 'Heavy Quarry Excavator',
    category: 'Excavator',
    model: 'Tata Hitachi ZAXIS 220LC Quarry Edition',
    shortDesc: 'Severe-duty 22-ton quarry crawler excavator for hard strata excavation, rock overburden, and mass earthworks.',
    fullDesc: 'Specially reinforced 22-ton quarry-spec hydraulic excavator built for demanding hard-rock environments and heavy infrastructure. Featuring high-tensile track frames, rock-deflector guards, heavy-duty rock bucket, and superior hydraulic breakout power. The premier choice for hard earth cutting, quarry overburden clearing, and deep industrial excavations.',
    status: 'available',
    statusText: 'Available',
    image: getAssetUrl('/equipment/hitachi-220.jpg'),
    specs: {
      operatingWeight: '22,400 kg',
      enginePower: '168 HP Heavy Turbocharged Engine',
      bucketCapacity: '1.15 m³ Reinforced Rock Bucket',
      diggingDepth: '6.85 meters (22.5 ft)',
      reach: '10.15 meters maximum reach',
      fuelCapacity: '380 Litres',
      transmission: 'Independent hydraulic hydrostatic track drive'
    },
    rates: {
      hourly: 'Available on Call',
      daily: 'Tariff on Request',
      weekly: 'Custom Weekly Tariff',
      project: 'Quarry / CBM Project Quote'
    },
    applications: [
      'Granite Quarry Overburden Clearing',
      'Hard Strata & Compacted Earth Excavation',
      'Deep Lake Deepening & Industrial Foundations',
      'Heavy Infrastructure Bulk Material Handling'
    ],
    operatorIncluded: true,
    minRentalHours: 6
  },
  {
    id: 'hitachi-long-reach-50ft',
    name: '50 Feet Long Reach Hitachi Excavator',
    type: 'Super Long Front Excavator',
    category: 'Long Reach Excavator',
    model: 'Hitachi Super Long Front 50-Foot Extended Reach',
    shortDesc: 'Specialized 50-foot extended reach boom for deep wells, canal & river desilting, and high-reach demolition.',
    fullDesc: 'Equipped with a custom-engineered 50-foot (15.2 meter) extended reach boom and arm assembly. Indispensable for job sites where machines cannot operate near edges or deep contours — including deep agricultural well digging, desilting wide canals and rivers from embankments, deep lake reclamation, and safe high-reach building demolition. Available for rapid interstate deployment across Tamil Nadu, Kerala, Andhra Pradesh, and Karnataka.',
    status: 'available',
    statusText: 'Available',
    image: getAssetUrl('/equipment/hitachi-50ft-long-reach-v2.jpg?v=20261022'),
    specs: {
      operatingWeight: '24,500 kg',
      enginePower: '160 HP Common Rail Turbo Diesel',
      bucketCapacity: '0.55 m³ Specialized Long Reach Ditching Bucket',
      diggingDepth: '12.5 meters (41.0 ft)',
      reach: '15.24 meters (50 Feet) Ground Level Reach',
      fuelCapacity: '360 Litres',
      transmission: 'Dual-speed hydrostatic crawler drive'
    },
    rates: {
      hourly: 'Available on Call',
      daily: 'Tariff on Request',
      weekly: 'Custom Weekly Tariff',
      project: 'Project Contract Basis'
    },
    applications: [
      '50-Foot Deep Well Sinking & Desilting',
      'Canal, Riverbed & Lake Clearing from Embankment',
      'Steep Slope Trimming & Highway Embankments',
      'High-Reach Building & Structure Demolition',
      'Interstate Contracts across Tamil Nadu, Kerala, AP & Karnataka'
    ],
    operatorIncluded: true,
    minRentalHours: 6
  },
  {
    id: 'rock-breaker',
    name: 'Excavator with Heavy Rock Breaker',
    type: 'Hydraulic Rock Breaker Unit',
    category: 'Rock Breaker',
    model: 'Hyundai / Sany Excavator with Heavy Hydraulic Chisel Hammer',
    shortDesc: 'High-impact hydraulic rock hammer for chiseling hard blue granite rock, boulder splitting, and demolition.',
    fullDesc: 'Heavy tracked crawler excavator fitted with high-frequency, high-impact hydraulic rock breaker hammer. Delivers intense crushing power to break massive blue granite boulders, chisel solid bedrock for building foundations and utility trenches, and safely demolish reinforced concrete (RCC) columns, slabs, and old commercial structures.',
    status: 'available',
    statusText: 'Available',
    image: getAssetUrl('/equipment/rock-breaker.jpg'),
    specs: {
      operatingWeight: '21,500 kg (with Breaker Unit)',
      enginePower: '145 HP Turbo Diesel',
      impactRate: '1,200 - 1,500 Blows Per Minute (BPM)',
      chiselDiameter: '140 mm Heavy-Duty Moil Point / Chisel',
      hydraulicFlow: '150 - 190 Litres / minute',
      fuelCapacity: '340 Litres',
      transmission: 'Reinforced severe-duty track drive'
    },
    rates: {
      hourly: 'Available on Call',
      daily: 'Tariff on Request',
      weekly: 'Custom Weekly Tariff',
      project: 'Per-Foot / Volume Rock Breaking Quote'
    },
    applications: [
      'Hard Blue Granite Rock Breaking & Boulder Splitting',
      'Bedrock Foundation Pits & Column Chiseling',
      'Solid Rock Utility Trenching',
      'Reinforced Concrete (RCC) Structural Demolition'
    ],
    operatorIncluded: true,
    minRentalHours: 4
  },
  {
    id: 'tipper-lorry',
    name: 'BharatBenz Heavy Tipper Lorry (10-Wheeler)',
    type: 'Heavy Dump Truck (10-Wheeler)',
    category: 'Tipper',
    model: 'BharatBenz 2823C 10-Wheeler 16 CBM Heavy Tipper',
    shortDesc: 'Commercial 16 CBM multi-axle tipper lorry for bulk sand, blue metal aggregates, gravel, and muck haulage.',
    fullDesc: 'Heavy-payload BharatBenz 10-wheeler tipper dump truck engineered for rugged site haulage and long-distance bulk material transit. Equipped with a 16 cubic meter high-tensile steel tipping body, fast hydraulic hoist, and fuel-efficient common rail diesel engine. Essential for transporting excavated soil, quarry aggregates, blue metal, and demolition debris.',
    status: 'available',
    statusText: 'Available',
    image: getAssetUrl('/equipment/tipper-lorry.jpg'),
    specs: {
      operatingWeight: '28,000 kg GVW',
      enginePower: '240 HP OM 926 Turbocharged Diesel',
      payloadCapacity: '16 Cubic Meters / ~20+ Tonnes',
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
      'Bulk Excavated Earth & Muck Haulage',
      'Quarry Blue Metal & Gravel Supply Transport',
      'Mass Earth Filling & Site Embankment',
      'Building Demolition Debris Shifting'
    ],
    operatorIncluded: true,
    minRentalHours: 4
  },
  {
    id: 'compressor-blasting',
    name: 'Tractor Compressor & Controlled Blasting Unit',
    type: 'Mobile Air Compressor & Rock Drill',
    category: 'Compressor & Blasting',
    model: 'Farmtrac 60 Tractor with High-CFM Air Compressor & Blasting Unit',
    shortDesc: 'Mobile high-CFM tractor compressor paired with pneumatic jackhammer drills and certified controlled rock blasting.',
    fullDesc: 'Mobile rock drilling and blasting setup featuring a Farmtrac 60 utility tractor coupled with a high-pressure pneumatic air compressor and jackhammer drills. Specialized in drilling deep boreholes into solid bedrock and granite formations, followed by certified controlled rock blasting for deep well sinking, basement rock leveling, and quarry extraction.',
    status: 'available',
    statusText: 'Available',
    image: getAssetUrl('/equipment/compressor-blasting.jpg'),
    specs: {
      operatingWeight: '3,500 kg (Combined Unit)',
      enginePower: '60 HP Classic Diesel',
      compressorCapacity: '450 - 550 CFM @ 150 PSI High Pressure',
      payloadCapacity: 'Dual heavy pneumatic jackhammers supported',
      fuelCapacity: '65 Litres',
      transmission: '8 Forward + 2 Reverse sliding mesh'
    },
    rates: {
      hourly: 'Available on Call',
      daily: 'Tariff on Request',
      weekly: 'Custom Weekly Tariff',
      project: 'Hole-Depth / Rock Volume Quote'
    },
    applications: [
      'Hard Rock Drilling & Jackhammer Puncturing',
      'Controlled Rock Blasting for Open Wells & Pits',
      'Bedrock Trench Shattering in Tough Ground',
      'Granite Quarry Secondary Boulder Blasting'
    ],
    operatorIncluded: true,
    minRentalHours: 4
  },
  {
    id: 'jcb-3dx',
    name: 'JCB 3DX Backhoe Loader',
    type: 'Backhoe Loader',
    category: 'Backhoe',
    model: 'JCB 3DX Super EcoMAX 4WD',
    shortDesc: 'Heavy-duty 4WD all-rounder for foundation pits, utility trenching, loading, and material shifting.',
    fullDesc: 'The JCB 3DX is the most trusted workhorse for construction foundations, pipeline trenching, and site development. Equipped with an EcoMAX fuel-efficient diesel engine, heavy-duty loader arm, and high-breakout-force backhoe bucket. Ideal for urban excavation, road berm trimming, pipeline trenching, and general site clearance.',
    status: 'available',
    statusText: 'Available',
    image: getAssetUrl('/equipment/jcb-3dx.jpg'),
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
      'Foundation Footing & Column Pits',
      'Trenching for Pipelines & Cables',
      'Material Shifting & Truck Loading',
      'Site Clearing & Land Leveling'
    ],
    operatorIncluded: true,
    minRentalHours: 4
  }
];
