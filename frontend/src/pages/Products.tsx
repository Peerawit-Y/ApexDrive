import React, { useState, useMemo } from 'react';
import { Product, FilterState } from '../types/product';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { filterAndSortProducts, getBrands, getCategories, products as allProducts } from '../services/productService';
import { SlidersHorizontal, RotateCcw, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
  const { t } = useLanguage();
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const brands = useMemo(() => getBrands(), []);
  const categories = useMemo(() => getCategories(), []);
  const filteredProducts = useMemo(() => filterAndSortProducts(filters), [filters]);

  const handleReset = () => {
    setFilters(defaultFilters);
  };

  const hasActiveFilters = Boolean(
    filters.brand || filters.category || filters.drivetrain || filters.minHorsepower > 0 || filters.searchQuery
  );

  const advancedCount = (filters.category ? 1 : 0) + (filters.minHorsepower > 0 ? 1 : 0);

  return (
    <div className="space-y-12 pb-20">
      
      {/* 1. Grand Editorial Showroom Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
        <div className="space-y-3">
          <div className="text-[11px] tracking-[0.3em] uppercase text-neutral-500">
            APEXDRIVE COLLECTION
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white">
            {t('คอลเลกชันยนตรกรรม', 'The Collection')}
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 font-light max-w-xl leading-relaxed">
            {t(
              'คัดสรรยนตรกรรมสปอร์ตและซูเปอร์คาร์ระดับไอคอน พร้อมข้อมูลจำเพาะทางวิศวกรรมอย่างเป็นทางการ',
              'Curated iconic sports cars and hypercars presented with official factory engineering specifications.'
            )}
          </p>
        </div>

        <div className="flex items-baseline gap-2 text-neutral-400 font-light lg:text-right">
          <span className="text-3xl sm:text-4xl text-white tracking-tight">
            {filteredProducts.length}
          </span>
          <span className="text-xs tracking-[0.2em] uppercase text-neutral-500">
            / {allProducts.length} MODELS
          </span>
        </div>
      </div>

      {/* 2. Horizontal Luxury Marque Tabs */}
      <div className="space-y-6">
        <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto pb-3 border-b border-white/[0.08] no-scrollbar">
          <button
            type="button"
            onClick={() => setFilters(prev => ({ ...prev, brand: '' }))}
            className={`pb-3 -mb-[13px] text-xs tracking-[0.2em] uppercase whitespace-nowrap transition-all border-b ${
              filters.brand === ''
                ? 'text-white border-white font-medium'
                : 'text-neutral-500 border-transparent hover:text-neutral-200'
            }`}
          >
            {t('ทั้งหมด', 'All Marques')}
          </button>
          {brands.map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => setFilters(prev => ({ ...prev, brand }))}
              className={`pb-3 -mb-[13px] text-xs tracking-[0.2em] uppercase whitespace-nowrap transition-all border-b ${
                filters.brand === brand
                  ? 'text-white border-white font-medium'
                  : 'text-neutral-500 border-transparent hover:text-neutral-200'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* 3. Sleek Minimalist Control Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="w-full lg:max-w-md">
            <SearchBar
              value={filters.searchQuery}
              onChange={(val) => setFilters(prev => ({ ...prev, searchQuery: val }))}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Drivetrain Pills */}
            <div className="inline-flex items-center p-1 rounded-full bg-white/[0.03] border border-white/[0.1]">
              {['', 'RWD', 'AWD'].map((dt) => (
                <button
                  key={dt}
                  type="button"
                  onClick={() => setFilters(prev => ({ ...prev, drivetrain: dt }))}
                  className={`px-4 py-1.5 rounded-full text-[11px] tracking-[0.18em] uppercase transition-all ${
                    filters.drivetrain === dt
                      ? 'bg-white text-black font-medium'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {dt === '' ? 'ALL' : dt}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
                className="appearance-none bg-white/[0.03] border border-white/[0.1] hover:border-white/30 rounded-full pl-4 pr-9 py-2.5 text-xs text-neutral-200 font-light focus:outline-none focus:border-white/40 transition-all cursor-pointer"
              >
                <option value="name-asc" className="bg-[#0B0C10]">{t('เรียงตามชื่อรุ่น (A–Z)', 'Sort: Name (A–Z)')}</option>
                <option value="hp-desc" className="bg-[#0B0C10]">{t('พละกำลังสูงสุด (HP)', 'Sort: Horsepower (High)')}</option>
                <option value="acc-asc" className="bg-[#0B0C10]">{t('0–100 กม./ชม. เร็วที่สุด', 'Sort: 0–100 km/h Fastest')}</option>
                <option value="price-asc" className="bg-[#0B0C10]">{t('ราคา: น้อยไปมาก', 'Sort: Price (Low to High)')}</option>
                <option value="price-desc" className="bg-[#0B0C10]">{t('ราคา: มากไปน้อย', 'Sort: Price (High to Low)')}</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Toggle Advanced Filters */}
            <button
              type="button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs tracking-wider border transition-all ${
                showAdvancedFilters || advancedCount > 0
                  ? 'bg-white text-black border-white font-medium'
                  : 'bg-transparent text-neutral-300 border-white/[0.12] hover:border-white/35 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{t('ตัวกรองเพิ่มเติม', 'Refine')}{advancedCount > 0 ? ` (${advancedCount})` : ''}</span>
            </button>

            {/* Reset Link */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs text-neutral-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('ล้างค่า', 'Reset')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Collapsible Minimalist Advanced Filter Bar */}
        {showAdvancedFilters && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0B0C10] border border-white/[0.08] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-2.5">
              <label className="block text-[10px] tracking-[0.25em] uppercase text-neutral-500">
                {t('ประเภทและสถาปัตยกรรม (Category)', 'Category & Architecture')}
              </label>
              <div className="relative">
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full appearance-none bg-white/[0.04] border border-white/[0.1] rounded-xl pl-4 pr-10 py-3 text-xs text-neutral-200 font-light focus:outline-none focus:border-white/35 transition-all"
                >
                  <option value="" className="bg-[#0B0C10]">{t('ทุกประเภท', 'All Categories')}</option>
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-[#0B0C10]">{c}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-neutral-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <label className="text-[10px] tracking-[0.25em] uppercase text-neutral-500">
                  {t('พละกำลังขั้นต่ำ (Minimum Output)', 'Minimum Horsepower')}
                </label>
                <span className="text-sm font-light text-white tracking-wider">
                  {filters.minHorsepower > 0 ? `${filters.minHorsepower.toLocaleString()} HP` : t('ไม่จำกัด', 'Any')}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1500"
                step="50"
                value={filters.minHorsepower}
                onChange={(e) => setFilters(prev => ({ ...prev, minHorsepower: Number(e.target.value) }))}
                className="w-full accent-white bg-white/10 rounded-lg h-1 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-600 tracking-wider">
                <span>0 HP</span>
                <span>500 HP</span>
                <span>1,000 HP</span>
                <span>1,500 HP</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Full-Width Expansive Showroom Gallery */}
      {filteredProducts.length === 0 ? (
        <div className="py-28 px-6 rounded-2xl border border-white/[0.08] bg-[#0B0C10] text-center space-y-5">
          <p className="text-[11px] tracking-[0.28em] uppercase text-neutral-500">
            NO MATCHING MODELS
          </p>
          <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            {t('ไม่พบยนตรกรรมที่ตรงตามเงื่อนไข', 'No Matching Vehicles Found')}
          </h3>
          <p className="text-sm text-neutral-400 font-light max-w-md mx-auto leading-relaxed">
            {t(
              'ลองปรับเปลี่ยนคำค้นหา ลดเงื่อนไขพละกำลัง หรือแสดงยนตรกรรมทั้งหมดในโชว์รูม',
              'Try adjusting your search query, lowering the horsepower filter, or viewing the full collection.'
            )}
          </p>
          <div className="pt-2">
            <button
              onClick={handleReset}
              className="px-8 py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-medium tracking-[0.15em] uppercase transition-all"
            >
              {t('แสดงยนตรกรรมทั้งหมด', 'View All Models')}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-10">
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
  );
};
