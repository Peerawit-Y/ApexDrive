import React, { useState, useMemo } from 'react';
import { Product, FilterState } from '../types/product';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { filterAndSortProducts, getBrands, getCategories } from '../services/productService';
import { SlidersHorizontal, Car } from 'lucide-react';

interface ProductsProps {
  compareIds: string[];
  cartIds: string[];
  onToggleCompare: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const defaultFilters: FilterState = {
  searchQuery: '',
  brand: '',
  category: '',
  drivetrain: '',
  minPrice: 0,
  maxPrice: 0,
  minHorsepower: 0,
  sortBy: 'name-asc'
};

export const Products: React.FC<ProductsProps> = ({
  compareIds,
  cartIds,
  onToggleCompare,
  onAddToCart
}) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const brands = useMemo(() => getBrands(), []);
  const categories = useMemo(() => getCategories(), []);
  const filteredProducts = useMemo(() => filterAndSortProducts(filters), [filters]);

  const handleReset = () => {
    setFilters(defaultFilters);
  };

  return (
    <div className="space-y-8">
      
      {/* Page Title & Search Header */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">Inventory & Catalog</span>
          <h1 className="text-3xl font-extrabold text-white mt-1">รายการรถยนต์ทั้งหมด</h1>
          <p className="text-xs text-slate-400 mt-1">
            ค้นหา กรองตามพละกำลัง ระบบขับเคลื่อน และเปรียบเทียบสเปกได้ในที่เดียว
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full">
            <SearchBar
              value={filters.searchQuery}
              onChange={(val) => setFilters(prev => ({ ...prev, searchQuery: val }))}
            />
          </div>
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden w-full sm:w-auto px-4 py-3 bg-brand-card border border-brand-border rounded-xl text-xs font-semibold text-slate-200 flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-rose-500" />
            <span>กรองข้อมูล ({filteredProducts.length})</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Sidebar Filter + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filter */}
        <div className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} lg:col-span-1`}>
          <FilterPanel
            filters={filters}
            brands={brands}
            categories={categories}
            onChange={setFilters}
            onReset={handleReset}
          />
        </div>

        {/* Product Cards Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              พบทั้งหมด <strong className="text-white font-bold">{filteredProducts.length}</strong> รุ่น
            </span>
            {(filters.brand || filters.category || filters.drivetrain || filters.minHorsepower > 0 || filters.searchQuery) && (
              <button
                onClick={handleReset}
                className="text-rose-400 hover:text-rose-300 font-medium underline"
              >
                ล้างการค้นหาทั้งหมด
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-brand-card p-12 rounded-2xl border border-brand-border text-center space-y-4">
              <Car className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">ไม่พบรถยนต์ที่ตรงตามเงื่อนไข</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                ลองปรับเปลี่ยนคำค้นหา หรือกดปุ่ม "ล้างค่า" ในแถบกรองข้อมูลเพื่อดูรายการทั้งหมด
              </p>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
              >
                ล้างตัวกรอง
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(car => (
                <ProductCard
                  key={car.id}
                  product={car}
                  isCompared={compareIds.includes(car.id)}
                  isInCart={cartIds.includes(car.id)}
                  onToggleCompare={onToggleCompare}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
