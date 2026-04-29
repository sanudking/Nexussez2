export type SupplierReview = {
  id: string;
  buyerName: string;
  rating: number;
  qualityRating: number;
  packagingRating: number;
  deliveryRating: number;
  feedback: string;
  verified: boolean;
  date: string;
};

export type CatalogItem = {
  type: 'image' | 'video' | 'brochure' | 'sample';
  url: string;
  title: string;
};

export type Supplier = {
  id: string;
  name: string;
  trustScore: number;
  certifications: string[];
  sourcingMethod: string;
  ratings: number;
  reviewsCount: number;
  deliverySpeedDays: number;
  usps: string[];
  image: string;
  catalog: CatalogItem[];
  reviews: SupplierReview[];
};

export type RawMaterial = {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  description: string;
};

export type SupplierListing = {
  id: string;
  supplierId: string;
  materialId: string;
  pricePerUnit: number;
  unit: string;
  moq: number;
  deliveryCharge: number;
  stockAvailability: number;
  expectedDeliveryTime: string;
  bulkDiscounts: {
    threshold: number;
    discountPercent: number;
  }[];
  qualityGrade: string;
  durabilityScore: number; // 1-10
  images: string[];
};

export type PooledOrder = {
  id: string;
  materialId: string;
  totalVolume: number;
  unit: string;
  targetPricePerUnit: number;
  status: 'open' | 'bidding' | 'closed';
  timeRemaining: string; // e.g., "12h 45m"
  bids: {
    supplierId: string;
    bidPricePerUnit: number;
    deliveryDays: number;
  }[];
};

export const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: 'sup-1',
    name: 'Apex SteelWorks',
    trustScore: 98,
    certifications: ['ISO 9001', 'ISI Marked', 'Green-Metals Certified'],
    sourcingMethod: 'Direct Ore & Recycled Blend',
    ratings: 4.8,
    reviewsCount: 124,
    deliverySpeedDays: 3,
    usps: ['Zero-defect guarantee', 'Real-time GPS tracking', 'Largest inventory in West India'],
    image: 'https://images.unsplash.com/photo-1530982011887-3cc11cc85693?auto=format&fit=crop&q=80&w=400',
    catalog: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1518112166137-85f9979a43dd?auto=format&fit=crop&q=80&w=400', title: 'Steel Pipes Warehouse' },
      { type: 'video', url: '#', title: 'Manufacturing Process Demo' },
      { type: 'brochure', url: '#', title: 'Q3 Product Brochure (PDF)' }
    ],
    reviews: [
      { id: 'rev-1', buyerName: 'Sunrise Manufacturing', rating: 5, qualityRating: 5, packagingRating: 4, deliveryRating: 5, feedback: 'Excellent quality steel rods. The delivery was exactly on time and tracking helped immensely.', verified: true, date: '2 days ago' },
      { id: 'rev-2', buyerName: 'AutoParts Hub', rating: 4, qualityRating: 5, packagingRating: 5, deliveryRating: 3, feedback: 'Great material but the truck arrived a bit late due to weather.', verified: true, date: '1 week ago' }
    ]
  },
  {
    id: 'sup-2',
    name: 'Vibrant Textiles India',
    trustScore: 95,
    certifications: ['GOTS Certified', 'Fair Trade', 'ISO 14001'],
    sourcingMethod: 'Organic Farms',
    ratings: 4.9,
    reviewsCount: 210,
    deliverySpeedDays: 4,
    usps: ['100% Organic Cotton', 'Color-fast guarantee', 'Zero chemical dyes'],
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=400',
    catalog: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1558769132-cb1fac089431?auto=format&fit=crop&q=80&w=400', title: 'Cotton Rolls' },
      { type: 'sample', url: '#', title: 'Request Physical Fabric Swatches' }
    ],
    reviews: [
      { id: 'rev-3', buyerName: 'Fashion Forward Garments', rating: 5, qualityRating: 5, packagingRating: 5, deliveryRating: 5, feedback: 'The best organic cotton we have sourced so far. Perfectly packed.', verified: true, date: '1 month ago' }
    ]
  },
  {
    id: 'sup-3',
    name: 'ElectroComponents Global',
    trustScore: 92,
    certifications: ['RoHS Compliant', 'ISO 9001'],
    sourcingMethod: 'Direct from OEM',
    ratings: 4.6,
    reviewsCount: 89,
    deliverySpeedDays: 2,
    usps: ['Lab-tested circuitry', 'Same-day dispatch for bulk', '1-year replacement warranty'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400',
    catalog: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=400', title: 'Circuit Boards' }
    ],
    reviews: []
  },
  {
    id: 'sup-4',
    name: 'TimberCraft Suppliers',
    trustScore: 94,
    certifications: ['FSC Certified Wood'],
    sourcingMethod: 'Sustainable Forests',
    ratings: 4.7,
    reviewsCount: 156,
    deliverySpeedDays: 5,
    usps: ['Termite-proof treated', 'Kiln dried', 'Custom cut sizes available'],
    image: 'https://images.unsplash.com/photo-1601058268499-e52658b8ebf8?auto=format&fit=crop&q=80&w=400',
    catalog: [],
    reviews: []
  }
];

export const MOCK_MATERIALS: RawMaterial[] = [
  // Textile
  { id: 'mat-tex-1', name: 'Organic Cotton Yarn', category: 'Textile', subCategory: 'Yarn', description: 'High-quality, long-staple organic cotton yarn for premium garment manufacturing.' },
  { id: 'mat-tex-2', name: 'Polyester Fabric Rolls', category: 'Textile', subCategory: 'Fabric Rolls', description: 'Durable, wrinkle-resistant polyester rolls suitable for sportswear.' },
  { id: 'mat-tex-3', name: 'Raw Silk', category: 'Textile', subCategory: 'Silk', description: 'Premium mulberry raw silk strands.' },
  // Steel
  { id: 'mat-stl-1', name: 'TMT Steel Rods (8mm)', category: 'Steel', subCategory: 'Rods', description: 'Thermo Mechanically Treated bars with high yield strength for construction.' },
  { id: 'mat-stl-2', name: 'Galvanized Steel Sheets', category: 'Steel', subCategory: 'Sheets', description: 'Rust-resistant zinc-coated steel sheets for industrial roofing.' },
  { id: 'mat-stl-3', name: 'Seamless Steel Pipes', category: 'Steel', subCategory: 'Pipes', description: 'High-pressure tolerant seamless pipes for fluid transportation.' },
  // Furniture
  { id: 'mat-fur-1', name: 'Teak Wood Planks', category: 'Furniture', subCategory: 'Wood', description: 'Kiln-dried, premium grade teak wood for luxury furniture.' },
  { id: 'mat-fur-2', name: 'High-Density Memory Foam', category: 'Furniture', subCategory: 'Foam', description: 'Orthopedic grade memory foam blocks for mattresses.' },
  { id: 'mat-fur-3', name: 'Marine Grade Plywood (18mm)', category: 'Furniture', subCategory: 'Plywood', description: 'Waterproof plywood for kitchen and bathroom cabinetry.' },
  // Electronics
  { id: 'mat-ele-1', name: 'Copper Core Wires (2.5 sq mm)', category: 'Electronics', subCategory: 'Wires', description: 'Fire-retardant industrial grade copper wiring.' },
  { id: 'mat-ele-2', name: 'Microcontroller Boards (ESP32)', category: 'Electronics', subCategory: 'Circuits', description: 'Wi-Fi & Bluetooth enabled microcontroller boards for IoT applications.' },
  { id: 'mat-ele-3', name: 'Proximity Sensors', category: 'Electronics', subCategory: 'Sensors', description: 'Inductive proximity sensors for industrial automation.' }
];

export const MOCK_LISTINGS: SupplierListing[] = [
  {
    id: 'lst-1',
    supplierId: 'sup-1',
    materialId: 'mat-stl-1',
    pricePerUnit: 52,
    unit: 'kg',
    moq: 5000,
    deliveryCharge: 2500,
    stockAvailability: 150000,
    expectedDeliveryTime: '3-4 Days',
    bulkDiscounts: [{ threshold: 10000, discountPercent: 3 }],
    qualityGrade: 'Fe-500D',
    durabilityScore: 9.8,
    images: ['https://images.unsplash.com/photo-1518112166137-85f9979a43dd?auto=format&fit=crop&q=80&w=400'],
  },
  {
    id: 'lst-2',
    supplierId: 'sup-2',
    materialId: 'mat-tex-1',
    pricePerUnit: 280,
    unit: 'kg',
    moq: 100,
    deliveryCharge: 800,
    stockAvailability: 5000,
    expectedDeliveryTime: '2-3 Days',
    bulkDiscounts: [{ threshold: 500, discountPercent: 5 }],
    qualityGrade: 'Premium A+',
    durabilityScore: 8.5,
    images: ['https://images.unsplash.com/photo-1558769132-cb1fac089431?auto=format&fit=crop&q=80&w=400'],
  },
  {
    id: 'lst-3',
    supplierId: 'sup-3',
    materialId: 'mat-ele-2',
    pricePerUnit: 350,
    unit: 'piece',
    moq: 50,
    deliveryCharge: 300,
    stockAvailability: 2000,
    expectedDeliveryTime: '1-2 Days',
    bulkDiscounts: [{ threshold: 200, discountPercent: 10 }],
    qualityGrade: 'Industrial Standard',
    durabilityScore: 9.0,
    images: ['https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=400'],
  },
  {
    id: 'lst-4',
    supplierId: 'sup-4',
    materialId: 'mat-fur-1',
    pricePerUnit: 2200,
    unit: 'cft',
    moq: 50,
    deliveryCharge: 4000,
    stockAvailability: 800,
    expectedDeliveryTime: '5-7 Days',
    bulkDiscounts: [{ threshold: 200, discountPercent: 8 }],
    qualityGrade: 'First Quality',
    durabilityScore: 9.5,
    images: ['https://images.unsplash.com/photo-1601058268499-e52658b8ebf8?auto=format&fit=crop&q=80&w=400'],
  },
  {
    id: 'lst-5',
    supplierId: 'sup-1',
    materialId: 'mat-stl-2',
    pricePerUnit: 60,
    unit: 'kg',
    moq: 2000,
    deliveryCharge: 1500,
    stockAvailability: 50000,
    expectedDeliveryTime: '2-3 Days',
    bulkDiscounts: [{ threshold: 5000, discountPercent: 4 }],
    qualityGrade: 'ASTM A653',
    durabilityScore: 9.0,
    images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400'],
  },
  {
    id: 'lst-6',
    supplierId: 'sup-1',
    materialId: 'mat-stl-3',
    pricePerUnit: 75,
    unit: 'kg',
    moq: 1000,
    deliveryCharge: 2000,
    stockAvailability: 30000,
    expectedDeliveryTime: '4-5 Days',
    bulkDiscounts: [{ threshold: 3000, discountPercent: 5 }],
    qualityGrade: 'API 5L',
    durabilityScore: 9.5,
    images: ['https://images.unsplash.com/photo-1504307651254-35680f356f58?auto=format&fit=crop&q=80&w=400'],
  },
  {
    id: 'lst-7',
    supplierId: 'sup-2',
    materialId: 'mat-tex-2',
    pricePerUnit: 150,
    unit: 'meter',
    moq: 500,
    deliveryCharge: 500,
    stockAvailability: 10000,
    expectedDeliveryTime: '2-3 Days',
    bulkDiscounts: [{ threshold: 2000, discountPercent: 8 }],
    qualityGrade: 'Sports Grade',
    durabilityScore: 8.8,
    images: ['https://images.unsplash.com/photo-1558769132-cb1fac089431?auto=format&fit=crop&q=80&w=400'],
  },
  {
    id: 'lst-8',
    supplierId: 'sup-3',
    materialId: 'mat-ele-1',
    pricePerUnit: 45,
    unit: 'meter',
    moq: 1000,
    deliveryCharge: 200,
    stockAvailability: 50000,
    expectedDeliveryTime: '1-2 Days',
    bulkDiscounts: [{ threshold: 5000, discountPercent: 12 }],
    qualityGrade: 'Industrial Standard',
    durabilityScore: 9.2,
    images: ['https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=400'],
  },
  {
    id: 'lst-9',
    supplierId: 'sup-4',
    materialId: 'mat-fur-2',
    pricePerUnit: 800,
    unit: 'sheet',
    moq: 20,
    deliveryCharge: 1500,
    stockAvailability: 500,
    expectedDeliveryTime: '3-5 Days',
    bulkDiscounts: [{ threshold: 100, discountPercent: 5 }],
    qualityGrade: 'Ortho Grade',
    durabilityScore: 8.5,
    images: ['https://images.unsplash.com/photo-1601058268499-e52658b8ebf8?auto=format&fit=crop&q=80&w=400'],
  },
  {
    id: 'lst-10',
    supplierId: 'sup-1',
    materialId: 'mat-ele-3',
    pricePerUnit: 1200,
    unit: 'piece',
    moq: 10,
    deliveryCharge: 500,
    stockAvailability: 200,
    expectedDeliveryTime: '5-7 Days',
    bulkDiscounts: [{ threshold: 50, discountPercent: 10 }],
    qualityGrade: 'Industrial Auto',
    durabilityScore: 9.9,
    images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400'],
  }
];

export const MOCK_POOLED_ORDERS: PooledOrder[] = [
  {
    id: 'pool-1',
    materialId: 'mat-stl-1',
    totalVolume: 18500,
    unit: 'kg',
    targetPricePerUnit: 48,
    status: 'bidding',
    timeRemaining: '08h 45m',
    bids: [
      { supplierId: 'sup-1', bidPricePerUnit: 49.5, deliveryDays: 4 },
      { supplierId: 'sup-2', bidPricePerUnit: 50.0, deliveryDays: 5 }
    ]
  },
  {
    id: 'pool-2',
    materialId: 'mat-tex-1',
    totalVolume: 1200,
    unit: 'kg',
    targetPricePerUnit: 260,
    status: 'bidding',
    timeRemaining: '23h 10m',
    bids: []
  },
  {
    id: 'pool-3',
    materialId: 'mat-stl-2',
    totalVolume: 50000,
    unit: 'kg',
    targetPricePerUnit: 55,
    status: 'bidding',
    timeRemaining: '14h 20m',
    bids: [
      { supplierId: 'sup-3', bidPricePerUnit: 58.0, deliveryDays: 3 }
    ]
  },
  {
    id: 'pool-4',
    materialId: 'mat-ele-1',
    totalVolume: 10000,
    unit: 'meter',
    targetPricePerUnit: 40,
    status: 'bidding',
    timeRemaining: '05h 15m',
    bids: []
  },
  {
    id: 'pool-5',
    materialId: 'mat-fur-1',
    totalVolume: 500,
    unit: 'cft',
    targetPricePerUnit: 2000,
    status: 'bidding',
    timeRemaining: '02h 30m',
    bids: [
      { supplierId: 'sup-4', bidPricePerUnit: 2100, deliveryDays: 7 }
    ]
  },
  {
    id: 'pool-6',
    materialId: 'mat-stl-3',
    totalVolume: 25000,
    unit: 'kg',
    targetPricePerUnit: 70,
    status: 'bidding',
    timeRemaining: '11h 55m',
    bids: [
      { supplierId: 'sup-2', bidPricePerUnit: 73.0, deliveryDays: 5 },
      { supplierId: 'sup-1', bidPricePerUnit: 71.5, deliveryDays: 4 }
    ]
  },
  {
    id: 'pool-7',
    materialId: 'mat-tex-2',
    totalVolume: 8000,
    unit: 'meter',
    targetPricePerUnit: 140,
    status: 'bidding',
    timeRemaining: '48h 00m',
    bids: []
  },
  {
    id: 'pool-8',
    materialId: 'mat-ele-2',
    totalVolume: 2000,
    unit: 'piece',
    targetPricePerUnit: 320,
    status: 'bidding',
    timeRemaining: '06h 40m',
    bids: [
      { supplierId: 'sup-3', bidPricePerUnit: 335.0, deliveryDays: 2 }
    ]
  }
];
