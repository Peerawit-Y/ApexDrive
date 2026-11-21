import React from 'react';
import { Search, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder
}) => {
  const { t } = useLanguage();
  const resolvedPlaceholder =
    placeholder ??
    t(
      'ค้นหารถยนต์ รุ่น เครื่องยนต์ หรือระบบขับเคลื่อน เช่น Bugatti, Revuelto, V12, AWD...',
      'Search models, engines, or drivetrains — e.g. Bugatti, Revuelto, V12, AWD...'
    );

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="w-4 h-4 text-neutral-500" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={resolvedPlaceholder}
        className="w-full pl-11 pr-10 py-3.5 bg-white/[0.03] border border-white/[0.1] rounded-full text-sm font-light text-white placeholder-neutral-500 focus:outline-none focus:border-white/35 focus:bg-white/[0.05] transition-all"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-500 hover:text-white transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
