import type { ServiceItem } from '../types';

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'earth-excavation',
    title: 'Earth Excavation',
    shortDesc: 'Pipeline, footing, pits and all types of soil work.',
    fullDesc: 'Comprehensive excavation services for residential foundations, commercial basements, drainage canals, pipeline trenches, and underground tank pits with laser-guided depth precision.',
    iconName: 'excavation',
    suitableEquipment: ['JCB 3DX', 'Crawler Excavator (20T)'],
    features: ['Foundation footing pits', 'Pipeline & culvert trenches', 'Lake deepening & desilting', 'Hard rock chiseling']
  },
  {
    id: 'earth-filling',
    title: 'Earth Filling',
    shortDesc: 'Mass earth filling and site development.',
    fullDesc: 'End-to-end bulk soil, gravel, red earth, and quarry dust filling with layer-by-layer roller compaction for low-lying residential plots, industrial yards, and factory floors.',
    iconName: 'filling',
    suitableEquipment: ['Tipper Lorry (16 CBM)', 'Tractor Tipper', 'Road Roller'],
    features: ['Red soil & gravel supply', 'Layer-by-layer compaction', 'Basement backfilling', 'Industrial yard elevation']
  },
  {
    id: 'road-work',
    title: 'Road Work',
    shortDesc: 'All types of road construction.',
    fullDesc: 'Complete road-bed preparation, subgrade cutting, gravel spreading, wet mix macadam grading, and vibratory compaction for highway bypasses, layout roads, and rural connectivity.',
    iconName: 'road',
    suitableEquipment: ['Road Roller', 'Bulldozer', 'Tipper Lorry'],
    features: ['Sub-base grading', 'Vibratory compaction', 'Bituminous base prep', 'Shoulder cutting & drainage']
  },
  {
    id: 'demolition-work',
    title: 'Demolition Work',
    shortDesc: 'Building demolition and site clearing.',
    fullDesc: 'Controlled demolition of RCC structures, industrial sheds, old masonry houses, and concrete pavements equipped with hydraulic rock breakers and high-reach shears.',
    iconName: 'demolition',
    suitableEquipment: ['Excavator with Breaker', 'JCB 3DX', 'Tipper Lorry'],
    features: ['RCC structure knocking', 'Hydraulic breaker chiseling', 'Instant debris haulage', 'Safe perimeter containment']
  },
  {
    id: 'land-development',
    title: 'Land Development',
    shortDesc: 'Site leveling and land preparation.',
    fullDesc: 'Turn undeveloped acreage and agricultural fields into approved real estate layouts, agricultural farms, or factory foundations with heavy dozers and graders.',
    iconName: 'development',
    suitableEquipment: ['Bulldozer', 'JCB 3DX', 'Tractor Utility'],
    features: ['Heavy vegetation uprooting', 'Topsoil stripping & grading', 'Plot boundary demarcation', 'Natural drainage contours']
  }
];
