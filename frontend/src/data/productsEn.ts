import { Product } from '../types/product';
import { Language } from '../context/LanguageContext';

interface ProductEnOverride {
  engine: string;
  transmission: string;
  description: string;
  highlights: string[];
}

export const productsEnMap: Record<string, ProductEnOverride> = {
  'apex-x-hyper': {
    engine: '6.5L Hand-Built Mid-Engine Twin-Turbocharged V12',
    transmission: '8-Speed Dual-Clutch Full-Time All-Wheel Drive',
    description:
      'The ultimate flagship of APEX Sports. Powered by a hand-assembled 6.5-liter twin-turbocharged V12 producing 980 HP and 1,000 Nm, built around a full carbon-fiber Monofuselage monocoque with active aerodynamics.',
    highlights: [
      'Hand-built 6.5L mid-engine twin-turbo V12 producing 980 HP and 1,000 Nm of torque',
      '0–100 km/h in 2.5 seconds with a top speed exceeding 350 km/h',
      'Full carbon-fiber Monofuselage monocoque — the lightest and stiffest chassis in the lineup',
      'Active Aerodynamics automatically adjusting rear wing angle and intake ducts with speed',
      'Strictly limited worldwide production with an individually numbered cockpit plaque',
      'Ready for delivery: 1 unit (Arancio Apex Metallic) | 4-year / 120,000 km warranty'
    ]
  },
  'apex-10-evo': {
    engine: '5.2L Naturally Aspirated V10 (8,700 RPM Redline)',
    transmission: '7-Speed Dual-Clutch Rear-Wheel Drive (RWD)',
    description:
      'A pure mid-engine naturally aspirated V10 supercar screaming to 8,700 RPM. Delivers 670 HP to the rear wheels with a lightweight titanium exhaust system and standard factory carbon-ceramic brakes.',
    highlights: [
      '5.2L naturally aspirated V10 delivering 670 HP and 600 Nm up to 8,700 RPM',
      '0–100 km/h in 2.9 seconds via a 7-speed dual-clutch rear-wheel-drive transmission',
      'Unmistakable naturally aspirated V10 soundtrack through a lightweight titanium exhaust',
      'Mid-engine architecture offering low center of gravity and GT3-level cornering balance',
      'Factory-standard Carbon Ceramic Brakes and magnetic ride suspension',
      'Ready for delivery: 2 units (Giallo Apex Yellow, Grigio Nimbus Grey) | 4-year / 120,000 km warranty'
    ]
  },
  'apex-gt3-track': {
    engine: '4.0L Naturally Aspirated Flat-6 (9,000 RPM Redline)',
    transmission: '7-Speed Close-Ratio Dual-Clutch Rear-Wheel Drive (RWD)',
    description:
      'A street-legal circuit weapon engineered around a 9,000 RPM 4.0L naturally aspirated flat-six. Equipped with a swan-neck DRS rear wing, motorsport double-wishbone front suspension, and factory roll bar.',
    highlights: [
      '4.0L naturally aspirated Flat-6 producing 540 HP and 470 Nm with a 9,000 RPM redline',
      '0–100 km/h in 3.1 seconds with a 7-speed close-ratio dual-clutch transmission',
      'Large Swan-Neck rear wing integrated with active Drag Reduction System (DRS)',
      'Motorsport-derived Double Wishbone front suspension for razor-sharp turn-in',
      'Ultra-lightweight cabin with factory rear roll bar and 6-point racing harnesses',
      'Ready for delivery: 2 units (Racing White, Lizard Apex Green) | 4-year / 120,000 km warranty'
    ]
  },
  'apex-8-vantage': {
    engine: '4.0L Front-Mid Mounted Twin-Turbocharged V8',
    transmission: '8-Speed Automatic Rear Transaxle (RWD)',
    description:
      'A timeless V8 grand tourer pairing a 665 HP front-mid mounted twin-turbo V8 with a rear transaxle for ideal 50:50 weight distribution, wrapped in sculpted aluminum bodywork and hand-stitched leather.',
    highlights: [
      '4.0L twin-turbo V8 delivering 665 HP and 800 Nm, sprinting 0–100 km/h in 3.4 seconds',
      'Front-Mid Engine paired with a Rear Transaxle achieving perfect 50:50 weight balance',
      'Sculpted aluminum body complemented by a hand-crafted full leather interior',
      'Deep, resonant V8 exhaust note with selectable Sport+ and Track driving modes',
      'Ready for delivery: 3 units (Aston Apex Racing Green, Satin Silver, Onyx Black)',
      '4-year / 120,000 km warranty | Up to 75% financing available'
    ]
  },
  'apex-suv-rs': {
    engine: '4.0L High-Output Twin-Turbocharged V8',
    transmission: '8-Speed Automatic All-Wheel Drive (AWD) with Sport Differential',
    description:
      'A 680 HP super sports SUV that fuses supercar acceleration with five-seat versatility, 616 liters of cargo capacity, and Active Roll Stabilization for effortless command on every road surface.',
    highlights: [
      '4.0L twin-turbo V8 producing 680 HP and 850 Nm, reaching 0–100 km/h in 3.3 seconds',
      'All-Wheel Drive with torque-vectoring sport differential and sport air suspension',
      'Active Roll Stabilization minimizing body lean through high-speed corners',
      'Spacious 5-seat cabin with a generous 616-liter rear luggage compartment',
      'Ready for delivery: 4 units (Nero Noctis Black, Grigio Lynx Grey, Bianco Icarus White)',
      '4-year / 120,000 km warranty | Up to 75% financing available'
    ]
  },
  'apex-5-touring': {
    engine: '4.0L High-Output Twin-Turbocharged V8',
    transmission: '8-Speed Sport Automatic All-Wheel Drive (AWD)',
    description:
      'A 650 HP wide-body performance sports wagon combining blistering 3.2-second 0–100 km/h acceleration, Dynamic All-Wheel Steering, and up to 1,680 liters of expandable cargo space.',
    highlights: [
      '4.0L twin-turbo V8 generating 650 HP and 850 Nm with 0–100 km/h in 3.2 seconds',
      'Distinctive wide-fender 5-door sports wagon silhouette blending speed with practicality',
      '565-liter cargo bay expanding to 1,680 liters with rear seats folded flat',
      'Dynamic All-Wheel Steering for effortless agility and high-speed lane stability',
      'Ready for delivery: 3 units (Daytona Matte Grey, Sonoma Green, Mythos Black)',
      '4-year / 120,000 km warranty | Up to 75% financing available'
    ]
  },
  'apex-35-gt': {
    engine: '3.8L Hand-Built Twin-Turbocharged V6',
    transmission: '6-Speed Dual-Clutch Intelligent All-Wheel Drive (AWD)',
    description:
      'An all-wheel-drive performance coupe driven by a hand-assembled 620 HP twin-turbo V6 and Torque Vectoring AWD, launching from 0–100 km/h in just 2.8 seconds with real-time cockpit telemetry.',
    highlights: [
      'Hand-built 3.8L twin-turbo V6 delivering 620 HP and 700 Nm of torque',
      '0–100 km/h in 2.8 seconds through a 6-speed dual-clutch intelligent AWD system',
      'Torque Vectoring AWD providing relentless grip across dry and wet conditions',
      'Real-time cockpit Telemetry displaying G-force, fluid temperatures, and boost pressure',
      'Full carbon-fiber aero package with a high-downforce rear wing',
      'Ready for delivery: 4 units (Metallic Gunmetal, Pearl White, Bayside Apex Blue)'
    ]
  },
  'apex-4-coupe': {
    engine: '3.0L Track-Tuned Twin-Turbocharged Inline-6',
    transmission: '8-Speed Sport Automatic with Active Electronic LSD',
    description:
      'A purist 2-seat lightweight sports coupe packing 560 HP to the rear wheels, shedding over 100 kg via carbon-fiber bodywork, rear-seat deletion, and full carbon bucket seats.',
    highlights: [
      'Track-tuned 3.0L twin-turbocharged Inline-6 producing 560 HP and 650 Nm of torque',
      '0–100 km/h in 3.5 seconds with pure rear-wheel drive and electronic LSD',
      'Over 100 kg weight reduction via carbon-fiber components, rear-seat delete, and full bucket seats',
      'Precision-calibrated steering delivering direct road and track feedback',
      'Integrated Drift Mode and 10-stage fine-adjustable traction control',
      'Ready for delivery: 5 units (Alpine White, APEX Cobalt Blue, Nardo Matte Grey)'
    ]
  },
  'apex-2-clubsport': {
    engine: '3.0L Twin-Turbocharged Inline-6',
    transmission: '6-Speed Manual / 8-Speed Sport Automatic with M-Spec LSD',
    description:
      'A compact rear-wheel-drive sports coupe with a short, wide wheelbase, 50:50 weight balance, and 480 HP — equally thrilling on daily roads and weekend track days.',
    highlights: [
      '3.0L twin-turbo Inline-6 delivering 480 HP and 600 Nm, reaching 0–100 km/h in 3.9 seconds',
      'Available with a 6-speed manual or 8-speed sport automatic paired with M-Spec LSD',
      'Short, wide stance with 50:50 weight distribution and 3-stage Adaptive suspension',
      'Touring-car inspired flared arches with variable-valve sport exhaust',
      'Ready for delivery: 6 units (Zandvoort Apex Blue, Toronto Apex Red, Sapphire Black)',
      '4-year / 120,000 km warranty | Up to 75% financing available'
    ]
  },
  'apex-86-spirit': {
    engine: '2.4L Naturally Aspirated Flat-4 Boxer',
    transmission: '6-Speed Close-Ratio Manual with Torsen LSD',
    description:
      'A featherweight 1,260 kg rear-wheel-drive sports coupe powered by a 255 HP naturally aspirated 2.4L Boxer engine and 6-speed manual gearbox — crafted for pure driving balance and track beginners.',
    highlights: [
      '2.4L naturally aspirated Flat-4 Boxer producing 255 HP and 275 Nm of torque',
      '6-speed close-ratio manual gearbox with RWD and Torsen LSD (0–100 km/h in 5.8s)',
      'Ultra-light 1,260 kg curb weight with class-leading low center of gravity',
      'Fold-flat rear seats capable of carrying a full set of four spare track wheels and tires',
      'Ready for delivery: 7 units (Halo White, Ignition Red, Trueno Blue)',
      'Most accessible entry into APEX Sports | 4-year / 120,000 km warranty'
    ]
  }
};

export const getLocalizedProduct = (product: Product, lang: Language): Product => {
  if (lang !== 'en') return product;
  const override = productsEnMap[product.id];
  if (!override) return product;
  return {
    ...product,
    engine: override.engine,
    transmission: override.transmission,
    description: override.description,
    highlights: override.highlights
  };
};
