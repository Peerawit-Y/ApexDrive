import rawProducts from '../data/products.json';
import { Product, FilterState } from '../types/product';

export const products: Product[] = rawProducts as Product[];

export const getProducts = (): Product[] => {
  return products;
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.slice(0, 4);
};

export const getBrands = (): string[] => {
  return Array.from(new Set(products.map(p => p.brand)));
};

export const getCategories = (): string[] => {
  return Array.from(new Set(products.map(p => p.category)));
};

export const filterAndSortProducts = (filters: FilterState): Product[] => {
  return products
    .filter(p => {
      // Search Query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchTitle = `${p.brand} ${p.model}`.toLowerCase().includes(query);
        const matchEngine = p.engine.toLowerCase().includes(query);
        const matchCategory = p.category.toLowerCase().includes(query);
        if (!matchTitle && !matchEngine && !matchCategory) return false;
      }

      // Brand Filter
      if (filters.brand && p.brand !== filters.brand) return false;

      // Category Filter
      if (filters.category && p.category !== filters.category) return false;

      // Drivetrain Filter
      if (filters.drivetrain && p.drivetrain !== filters.drivetrain) return false;

      // Min/Max Price
      if (filters.minPrice > 0 && p.price < filters.minPrice) return false;
      if (filters.maxPrice > 0 && p.price > filters.maxPrice) return false;

      // Min Horsepower
      if (filters.minHorsepower > 0 && p.horsepower < filters.minHorsepower) return false;

      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'hp-desc':
          return b.horsepower - a.horsepower;
        case 'acc-asc':
          return a.acceleration_0_100_sec - b.acceleration_0_100_sec;
        case 'name-asc':
        default:
          return `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`);
      }
    });
};
