export class Actor {

    id?: number;
    nameActor: string;

    constructor(id: number = null,
                actorName: string = '') {
        this.id = id;
        this.nameActor = actorName;
    }
}