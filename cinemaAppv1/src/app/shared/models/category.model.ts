export class Category {

    id?: number;
    nameCategory: string;

    constructor(id: number = null,
                nameCategory: string = '') {
        this.id = id;
        this.nameCategory = nameCategory;
    }
}
