export class NewCinema {
    id?:number;
    passwordUserCinema:string;
    usernameUserCinema:string;
    nameUserCinema:string;
    surnameUserCinema:string;
    emailUserCinema:string;
    webCinema:string;
    adressCinema:string;
    cityCinema:string;



    constructor(
                usernameUserCinema: string,
                nameUserCinema: string = '',
                emailUserCinema:string='',
                webCinema:string='') {
        this.usernameUserCinema=usernameUserCinema;
        this.nameUserCinema=nameUserCinema;
        this.emailUserCinema=emailUserCinema;
        this.webCinema=webCinema;
        this.surnameUserCinema='';
        this.passwordUserCinema='1234';
        this.adressCinema='Sin Dirección';
        this.cityCinema='Sin Ciudad';
    }
}