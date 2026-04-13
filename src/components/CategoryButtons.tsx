import type { Category } from '../types';

interface CategoryButtonsProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryName: string | null) => void;
}

const CategoryButtons = ({ categories, selectedCategory, onSelectCategory }: CategoryButtonsProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-4 py-2 rounded-full font-medium transition-all transform hover:scale-105 ${
            selectedCategory === null
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Videos
        </button>
        
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onSelectCategory(category.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all transform hover:scale-105 ${
              selectedCategory === category.name
                ? `${category.color} text-white shadow-lg`
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryButtons;