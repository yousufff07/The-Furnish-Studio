import { Product, CategoryName, ToneColor } from '../types';
import { RESIDENTIAL_VARIETIES } from './varieties/residentialVarieties';
import { STUDIO_VARIETIES } from './varieties/studioVarieties';
import { CATEGORY_IMAGES } from './varieties/categoryImages';

const ALL_VARIETIES: Record<string, typeof RESIDENTIAL_VARIETIES[string]> = {
  ...RESIDENTIAL_VARIETIES,
  ...STUDIO_VARIETIES
};

const CATEGORIES_LIST: CategoryName[] = [
  'Living Room',
  'Bedroom',
  'Dining Room',
  'Office Furniture',
  'Outdoor Furniture',
  'Storage Furniture',
  'Decor & Accessories',
  'Lighting & Sculptures',
  'Rugs & Textiles',
  'Bar & Entertainment',
  'Bathroom & Spa',
  'Kids & Nursery',
  'Kitchen & Dining Island',
  'Lounge & Lobby',
  'Acoustic & Studio',
  'Wellness & Sanctuary',
  'Library & Study'
];

export function generateDivisionVarieties(baseProducts: Product[]): Product[] {
  const existingCounts: Record<string, number> = {};
  let maxIdNum = 0;

  baseProducts.forEach(p => {
    existingCounts[p.category] = (existingCounts[p.category] || 0) + 1;
    const idMatch = p.id.match(/^prod-(\d+)$/);
    if (idMatch) {
      const num = parseInt(idMatch[1], 10);
      if (num > maxIdNum) {
        maxIdNum = num;
      }
    }
  });

  const generated: Product[] = [];
  let nextId = maxIdNum + 1;

  for (const catName of CATEGORIES_LIST) {
    const templates = ALL_VARIETIES[catName] || [];
    const currentCount = existingCounts[catName] || 0;
    const needed = Math.max(0, 25 - currentCount);
    
    const images = CATEGORY_IMAGES[catName] || [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80'
    ];

    for (let i = 0; i < needed; i++) {
      const template = templates[i % templates.length] || {
        name: `${catName} Bespoke Piece`,
        price: 45000,
        material: 'Wood',
        color: 'rust' as ToneColor,
        desc: `Exquisite custom handcrafted piece designed for ${catName.toLowerCase()} settings.`,
        dimensions: '72"W x 34"D x 30"H'
      };

      const skuCat = catName
        .split(' ')
        .map(w => w[0])
        .join('')
        .toUpperCase();
      const skuNum = String(currentCount + i + 1).padStart(3, '0');

      const nameSuffix = i >= templates.length ? ` II` : '';
      const imgIdx = i % images.length;
      const imgUrl = images[imgIdx];
      const galleryImg2 = images[(imgIdx + 1) % images.length];
      const galleryImg3 = images[(imgIdx + 2) % images.length];

      const newProduct: Product = {
        id: `prod-${nextId++}`,
        name: `${template.name}${nameSuffix}`,
        category: catName,
        price: template.price,
        originalPrice: Math.round(template.price * 1.15),
        description: template.desc,
        material: template.material,
        color: template.color,
        availableColors: ['rust', 'slate', 'greige'],
        stock: Math.floor(Math.random() * 14) + 6,
        rating: Number((4.6 + (i % 4) * 0.1).toFixed(1)),
        reviewCount: Math.floor(Math.random() * 35) + 14,
        imageUrl: imgUrl,
        galleryImages: [imgUrl, galleryImg2, galleryImg3],
        dimensions: template.dimensions || '70"W x 36"D x 30"H',
        weight: '48 kg',
        sku: `FURN-${skuCat}-${skuNum}`,
        isBestSeller: i === 0 || i === 4,
        isNew: i === 1 || i === 5,
        createdAt: '2026-03-15'
      };

      generated.push(newProduct);
    }
  }

  return [...baseProducts, ...generated];
}
