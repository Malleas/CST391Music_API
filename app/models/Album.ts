import {Track} from "./Track";

export class Album
{
    private _id: number
    private _title: string
    private _artist: string
    private _year: number
    private _image_name: string
    private _description: string
    private _tracks: Track[]


    constructor(id: number, title: string, artist: string, year: number, image_name: string, description: string, tracks: Track[]) {
        this._id = id;
        this._title = title;
        this._artist = artist;
        this._year = year;
        this._image_name = image_name;
        this._description = description;
        this._tracks = tracks;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get artist(): string {
        return this._artist;
    }

    set artist(value: string) {
        this._artist = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get year(): number {
        return this._year;
    }

    set year(value: number) {
        this._year = value;
    }

    get tracks(): Track[] {
        return this._tracks;
    }

    set tracks(value: Track[]) {
        this._tracks = value;
    }

    get image_name(): string {
        return this._image_name;
    }

    set image_name(value: string) {
        this._image_name = value;
    }
}