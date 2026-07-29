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

  const existingNames = new Set(baseProducts.map(p => p.name));
  const usedImages = new Set<string>(baseProducts.map(p => p.imageUrl));
  const generated: Product[] = [];
  let nextId = maxIdNum + 1;

  for (const catName of CATEGORIES_LIST) {
    const templates = ALL_VARIETIES[catName] || [];
    const currentCount = existingCounts[catName] || 0;
    let addedForCat = 0;
    
    const images = CATEGORY_IMAGES[catName] || [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80'
    ];

    const limit = Math.min(templates.length, images.length);
    for (let i = 0; i < limit; i++) {
      const template = templates[i];
      if (existingNames.has(template.name)) continue;
      existingNames.add(template.name);

      const skuCat = catName
        .split(' ')
        .map(w => w[0])
        .join('')
        .toUpperCase();
      const skuNum = String(currentCount + addedForCat + 1).padStart(3, '0');

      const imgUrl = images[i];
      if (usedImages.has(imgUrl)) continue;
      usedImages.add(imgUrl);

      const galleryImg2 = images[(i + 1) % images.length];
      const galleryImg3 = images[(i + 2) % images.length];

      const newProduct: Product = {
        id: `prod-${nextId++}`,
        name: template.name,
        category: catName,
        price: template.price,
        originalPrice: Math.round(template.price * 1.15),
        description: template.desc,
        material: template.material,
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
      addedForCat++;
    }
  }

  return [...baseProducts, ...generated];
}
