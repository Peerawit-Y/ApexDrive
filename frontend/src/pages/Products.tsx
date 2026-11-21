import React, { useState, useMemo } from 'react';
import { Product, FilterState } from '../types/product';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { filterAndSortProducts, getBrands, getCategories } from '../services/productService';
import { SlidersHorizontal, Car, Gauge } from 'lucide-react';

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
      <div className="space-y-4 pb-2">
        <div>
          <div className="flex items-center gap-2 text-rose-500 font-mono text-xs font-bold uppercase tracking-widest">
            <Gauge className="w-4 h-4" />
            <span>APEX SHOWROOM & TELEMETRY ARCHIVE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">คลังรถยนต์และข้อมูลจำเพาะ</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-normal">
            ค้นหาและคัดกรองตามพละกำลัง ระบบขับเคลื่อน (RWD / AWD) หรือสถาปัตยกรรมเครื่องยนต์ เพื่อการเปรียบเทียบสเปกอย่างแม่นยำ
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <div className="flex-1 w-full">
            <SearchBar
              value={filters.searchQuery}
              onChange={(val) => setFilters(prev => ({ ...prev, searchQuery: val }))}
            />
          </div>
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden w-full sm:w-auto px-5 py-3.5 bg-white/[0.06] rounded-xl text-xs font-mono font-semibold text-slate-200 flex items-center justify-center gap-2"
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
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>
              SHOWING <strong className="text-white font-bold">{filteredProducts.length}</strong> / 8 CHASSIS
            </span>
            {(filters.brand || filters.category || filters.drivetrain || filters.minHorsepower > 0 || filters.searchQuery) && (
              <button
                onClick={handleReset}
                className="text-rose-400 hover:text-rose-300 font-medium underline underline-offset-4"
              >
                ล้างการค้นหาทั้งหมด
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="glass-panel p-12 rounded-2xl text-center space-y-4">
              <Car className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">ไม่พบรถยนต์ที่ตรงตามเงื่อนไข</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto font-mono">
                ลองปรับลดเงื่อนไขแรงม้าขั้นต่ำ หรือกดปุ่ม "RESET" ในแถบกรองข้อมูล
              </p>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-mono font-semibold shadow-lg shadow-rose-950/40"
              >
                ล้างตัวกรองทั้งหมด
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
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
