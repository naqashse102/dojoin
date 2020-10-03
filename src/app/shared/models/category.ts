export class Category {
    id: string;
    title: string;
    subCategories: Category[];
  
    constructor(category: any = {}) {
      this.id = category.id;
      this.title = category.title || '';
      this.subCategories = category.subCategories || [];
    }
  }
  