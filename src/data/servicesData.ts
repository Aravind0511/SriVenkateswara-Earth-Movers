import type { ServiceItem } from '../types';

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'earth-excavation',
    title: 'Earth Excavation & Trenching',
    shortDesc: 'Foundation pits, utility pipelines, drainage trenches, and mass earth cutting.',
    fullDesc: 'Comprehensive excavation services with precision depth control. Equipped with our Hitachi 140, 215, 220, and JCB fleet for residential foundations, commercial basements, agricultural canals, and underground pipelines.',
    iconName: 'excavation',
    suitableEquipment: ['Hitachi 140 Excavator', 'Hyundai Robex 215L', 'Hitachi ZAXIS 220LC', 'JCB 3DX'],
    features: ['Foundation footings & column pits', 'Water & utility pipeline trenches', 'Mass basement & lake excavation', 'Canal desilting & berm dressing']
  },
  {
    id: 'rock-breaking-blasting',
    title: 'Rock Breaking & Controlled Blasting',
    shortDesc: 'Hydraulic breaker chiseling, boulder splitting, and certified rock blasting.',
    fullDesc: 'Specialized hard rock solutions combining high-impact hydraulic rock breakers with high-CFM tractor air compressors and certified controlled rock blasting for deep wells, foundation rock strata, and quarrying.',
    iconName: 'breaker',
    suitableEquipment: ['Excavator with Heavy Rock Breaker', 'Tractor Compressor & Blasting Unit'],
    features: ['Hard granite boulder splitting', 'Bedrock foundation chiseling', 'Certified controlled rock blasting', 'High-pressure pneumatic jackhammer drilling']
  },
  {
    id: 'long-reach-excavation',
    title: '50 Feet Long Reach Excavation',
    shortDesc: 'Deep well sinking, wide canal desilting, and high-reach embankment works.',
    fullDesc: 'Specialized 50-foot extended reach boom excavator designed for jobs where machines cannot get close to edges. Ideal for deep agricultural open wells, canal and river desilting from bank tops, and high-reach demolition. Available for interstate mobilization across Tamil Nadu, Kerala, Andhra Pradesh, and Karnataka.',
    iconName: 'reach',
    suitableEquipment: ['50 Feet Long Reach Hitachi Excavator'],
    features: ['50-foot deep well digging & desilting', 'Canal & river cleaning from top bank', 'Steep slope profiling & highway dressing', 'High-reach structural access']
  },
  {
    id: 'building-demolition',
    title: 'Building Demolition',
    shortDesc: 'Controlled demolition of RCC structures, old houses, and industrial sheds.',
    fullDesc: 'Safe, controlled demolition of residential houses, commercial buildings, RCC slabs, concrete pavements, and industrial sheds, paired with heavy rock breakers and tipper trucks for rapid debris clearance.',
    iconName: 'demolition',
    suitableEquipment: ['Excavator with Heavy Rock Breaker', '50 Feet Long Reach Hitachi', 'BharatBenz Heavy Tipper Lorry'],
    features: ['RCC structure knocking & beam cutting', 'Old building & masonry razing', 'Immediate on-site debris loading & haulage', 'Safe controlled perimeter dismantling']
  },
  {
    id: 'earth-filling',
    title: 'Earth Filling & Land Leveling',
    shortDesc: 'Bulk soil filling, plot elevation, and site preparation.',
    fullDesc: 'End-to-end bulk red earth, gravel, and quarry dust filling with site leveling for low-lying residential plots, industrial yards, commercial layouts, and building plinths.',
    iconName: 'filling',
    suitableEquipment: ['BharatBenz Heavy Tipper Lorry', 'Hyundai Robex 215L', 'JCB 3DX'],
    features: ['Bulk red soil & gravel delivery', 'Layer-by-layer plot elevation', 'Basement backfilling & dressing', 'Industrial plot leveling']
  },
  {
    id: 'bulk-haulage',
    title: 'Bulk Haulage & Tipper Transport',
    shortDesc: '16 CBM BharatBenz 10-wheeler tipper fleet for aggregate and muck shifting.',
    fullDesc: 'High-capacity commercial tipper lorry fleet for transporting blue metal aggregates, M-sand, gravel, excavated earth, and demolition debris across Tamil Nadu, Kerala, Andhra Pradesh, and Karnataka.',
    iconName: 'haulage',
    suitableEquipment: ['BharatBenz Heavy Tipper Lorry (10-Wheeler)'],
    features: ['16 CBM heavy-tonnage capacity', 'Quarry blue metal & gravel delivery', 'Excavation muck & debris haulage', 'Prompt multi-vehicle fleet deployment']
  }
];
