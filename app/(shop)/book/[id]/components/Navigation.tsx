interface Props {
  title: string;
  category: string;
  parentCategory?: string;
}

const Navigation: React.FC<Props> = ({ title, category, parentCategory }) => {
  return (
    <div className="w-full bg-3 text-xs">
      <div className="container py-4">
        پردیس کتاب / {parentCategory && <span>{parentCategory} /</span>}
        <span>{category}</span> / <span>{title}</span>
      </div>
    </div>
  );
};

export default Navigation;
