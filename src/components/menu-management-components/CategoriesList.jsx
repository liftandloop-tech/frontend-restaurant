import React from 'react';
import CategoryItem from './CategoryItem';
// import '../MenuManagement.css'; // Removed manual CSS import

const CategoriesList = ({ categories, setActiveCategory, onToggleStatus, onDelete, onEdit }) => {
  return (
    <div className="flex flex-col gap-2">
      {categories.map(category => (
        <CategoryItem
          key={category.id}
          category={category}
          isSelected={category.isSelected}
          isActive={category.isActive}
          setActiveCategory={setActiveCategory}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default CategoriesList;
