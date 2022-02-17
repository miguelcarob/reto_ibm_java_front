import {UserCinema} from './userCinema';


export class Cinema {
    id?: number;
    idUserCinema: UserCinema;
    webCinema:string;
    addressCinema:string;
    cityCinema:string;


    constructor(id: number = null,
                idUserCinema: UserCinema,
                webCinema: string = '',
                addressCinema:string='',
                cityCinema:string='') {
        this.id=id;
        this.idUserCinema=idUserCinema;
        this.addressCinema=addressCinema;
        this.cityCinema=cityCinema;
        this.webCinema=webCinema;
    }
}