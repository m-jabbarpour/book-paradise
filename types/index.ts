export interface Author {
  firstName: string;
  lastName: string;
  birthDate: Date | null;
  id: number;
}

export interface Translator {
  firstName: string;
  lastName: string;
  id: number;
}

export interface Publisher {
  id: number;
  title: string;
}

interface CategoryInBook {
  title: string;
  parentId: number | null;
  parent: string | null;
  id: number;
}

export interface Category {
  id: number;
  title: string;
  parentId: number | null;
}

export type CategoryWithChildren = Category & {
  children: CategoryWithChildren[];
};

export type CategoryWithParent = Category & {
  parent: CategoryWithParent;
};

export interface Book {
  title: string;
  description: string;
  price: number;
  inventory: number;
  categoryId: number;
  category: CategoryInBook;
  authors: Author[];
  translators?: Author[];
  publisherId: number;
  publisher: Publisher;
  id: number;
}
