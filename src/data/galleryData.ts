import type { GalleryItem } from '../types';
import { getAssetUrl } from '../utils/assets.ts';

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Heavy Rock Breaking with Hydraulic Hammer',
    category: 'Rock Breaking',
    location: 'Granite Quarry Worksite',
    image: getAssetUrl('/gallery/rock-breaker-action.jpg'),
    description: 'Hyundai Robex 215L excavator equipped with hydraulic rock breaker actively chiseling massive granite boulders into transportable aggregates.'
  },
  {
    id: 'gal-2',
    title: 'Tata Hitachi ZAXIS 220LC Quarry Operations',
    category: 'Excavation',
    location: 'Quarry Extraction Division',
    image: getAssetUrl('/gallery/hitachi-220-quarry.jpg'),
    description: '22-Ton severe-duty Tata Hitachi quarry crawler excavator clearing hard rock strata and mass overburden with reinforced rock bucket.'
  },
  {
    id: 'gal-3',
    title: 'Hitachi 140 High-Elevation Hilltop Earthwork',
    category: 'Earthmoving',
    location: 'Hilltop Infrastructure Project',
    image: getAssetUrl('/gallery/hitachi-140-hilltop.jpg'),
    description: 'Agile 14-ton hydraulic excavator executing foundation leveling and drainage trenches on elevated rocky terrain.'
  },
  {
    id: 'gal-4',
    title: 'BharatBenz 10-Wheeler Tipper Fleet on Site',
    category: 'Haulage',
    location: 'Commercial Infrastructure Site',
    image: getAssetUrl('/gallery/tipper-fleet-site.jpg'),
    description: 'Dual BharatBenz 16 CBM multi-axle heavy dump trucks lined up for high-tonnage earth and blue metal material haulage.'
  },
  {
    id: 'gal-5',
    title: 'Kobelco SK220XD Heavy Excavator & Tipper Team',
    category: 'Excavation',
    location: 'Industrial Layout Development',
    image: getAssetUrl('/gallery/kobelco-220-field.jpg'),
    description: 'Heavy 22-ton crawler excavator working in tandem with BharatBenz tipper dumpers for rapid site clearing and bulk loading.'
  },
  {
    id: 'gal-6',
    title: 'Hyundai Robex 215L Smart Earthmoving Operations',
    category: 'Excavation',
    location: 'Basement Excavation Project',
    image: getAssetUrl('/gallery/robex-215-earthwork.jpg'),
    description: 'Heavy-duty 21.5-ton crawler excavator carrying out mass earth cutting and foundation pit preparation.'
  },
  {
    id: 'gal-7',
    title: 'Precision Hydraulic Rock Chiseling in Hard Strata',
    category: 'Rock Breaking',
    location: 'Rock Trenching Site',
    image: getAssetUrl('/gallery/sany-breaker-quarry.jpg'),
    description: 'Heavy hydraulic breaker chisel penetrating solid bedrock for deep foundation footings and utility trenches.'
  },
  {
    id: 'gal-8',
    title: 'Mobile Tractor Compressor Rock Drilling Rig',
    category: 'Drilling & Blasting',
    location: 'Controlled Rock Blasting Work',
    image: getAssetUrl('/gallery/compressor-tractor.jpg'),
    description: 'Farmtrac 60 utility tractor operating high-pressure air compressor and pneumatic jackhammers for controlled rock cracking.'
  },
  {
    id: 'gal-9',
    title: 'BharatBenz 16 CBM Bulk Material Dump Truck',
    category: 'Haulage',
    location: 'Aggregate Transit Hub',
    image: getAssetUrl('/gallery/bharatbenz-tipper-front.jpg'),
    description: 'Commercial 10-wheeler tipper lorry (TN.34.MD.2615) ready for bulk sand, gravel, and blue metal aggregate dispatch.'
  },
  {
    id: 'gal-10',
    title: 'Kobelco SK220XD LC Heavy Duty Crawler Excavator',
    category: 'Excavation',
    location: 'Infrastructure Corridor',
    image: getAssetUrl('/gallery/kobelco-220-closeup.jpg'),
    description: 'Close-up perspective of 22-ton heavy crawler excavator showcasing reinforced boom and heavy-duty bucket.'
  },
  {
    id: 'gal-11',
    title: '50 Feet Long Reach Excavator Riverbed & Canal Desilting',
    category: 'Excavation',
    location: 'Interstate Project (Tamil Nadu & Kerala)',
    image: getAssetUrl('/gallery/long-reach-50ft-trench.jpg'),
    description: 'Specialized 50-foot extended reach boom carrying out deep canal excavation, embankment shaping, and waterway clearing without track edge hazards.'
  },
  {
    id: 'gal-12',
    title: '50 Feet Long Reach Excavator Deep Pit & Slope Excavation',
    category: 'Excavation',
    location: 'Commercial Infrastructure (Karnataka & Andhra Pradesh)',
    image: getAssetUrl('/gallery/long-reach-50ft-action.jpg'),
    description: 'Extended boom excavator executing deep foundation digging and high-reach trimming across interstate infrastructure contracts.'
  }
];
