export class Director {

    id?: number;
    nameDirector: string;

    constructor(id: number = null,
                nameDirector: string = '') {
        this.id = id;
        this.nameDirector = nameDirector;
    }
}
