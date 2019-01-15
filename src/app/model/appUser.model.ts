export class AppUserModel {

    id: number;
    username: string = '';
    password: string = '';
    actived: boolean = true;
    roles:
        {
            id: number,
            roleName: string
        }[];

    constructor() {
    }

}
