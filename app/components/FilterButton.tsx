import { FilterType } from '../types/todo';

interface FilterButtonProps {
  filter: FilterType;
  currentFilter: FilterType;
  onClick: (filter: FilterType) => void;
}

export default function FilterButton({ filter, currentFilter, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={() => onClick(filter)}
      className={`filter-button ${currentFilter === filter ? 'active' : ''}`}
    >
      {filter.charAt(0).toUpperCase() + filter.slice(1)}
    </button>
  );
} 