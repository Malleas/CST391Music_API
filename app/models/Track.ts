export class Track
{
    private _id: number
    private _number: number
    private _title: string
    private _lyrics: string


    constructor(id: number, number: number, title: string, lyrics: string) {
        this._id = id;
        this._number = number;
        this._title = title;
        this._lyrics = lyrics;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get number(): number {
        return this._number;
    }

    set number(value: number) {
        this._number = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get lyrics(): string {
        return this._lyrics;
    }

    set lyrics(value: string) {
        this._lyrics = value;
    }
}