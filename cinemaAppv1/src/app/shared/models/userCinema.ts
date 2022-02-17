export class UserCinema {

    id?: number;
    passwordUserCinema:string;
    usernameUserCinema:string;
    nameUserCinema:string;
    surnameUserCinema:string;
    emailUserCinema:string;
    typeUserCinema:number;
    stateUserCinema:number;

    constructor(id: number = null,
                usernameUserCinema: string = '',
                passwordUserCinema: string = '',
                nameUserCinema: string = '',
                surnameUserCinema: string = '',
                emailUserCinema: string = '',
                typeUserCinema: number = 0,
                stateUserCinema:number= 1) {
        this.id=id;
        this.usernameUserCinema=usernameUserCinema;
        this.passwordUserCinema=passwordUserCinema;
        this.nameUserCinema=nameUserCinema;
        this.surnameUserCinema=surnameUserCinema;
        this.emailUserCinema=emailUserCinema;
        this.typeUserCinema=typeUserCinema;
        this.stateUserCinema=stateUserCinema;

    }
}