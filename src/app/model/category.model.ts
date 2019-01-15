export class CategoryModel {

    id: string;
    name: string;
    products:
        {
            id: string,
            name: string,
            price: number
        }[];

    constructor() {
    }

}
