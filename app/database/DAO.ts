export class DAO
{
    private _host: string
    private _database: string
    private _user: string
    private _password: string


    constructor(host: string, database: string, user: string, password: string) {
        this._host = host;
        this._database = database;
        this._user = user;
        this._password = password;
    }


    get host(): string {
        return this._host;
    }

    set host(value: string) {
        this._host = value;
    }

    get database(): string {
        return this._database;
    }

    set database(value: string) {
        this._database = value;
    }

    get user(): string {
        return this._user;
    }

    set user(value: string) {
        this._user = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }
}