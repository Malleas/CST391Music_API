import {Artist} from "../models/Artist";
import * as util from 'util'
import {Album} from "../models/Album";
import {Track} from "../models/Track";
import * as mysql from "mysql";

export class MusicDAO
{
    private host:string
    private dbPort: number
    private user: string
    private password: string
    private pool: any


    constructor(host: string, dbPort: number, user: string, password: string) {
        this.host = host;
        this.dbPort = dbPort;
        this.user = user;
        this.password = password;
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: this.host,
            port: this.dbPort,
            user: this.user,
            password: this.password,

        })
    }
    public findArtist(callback: any){
        let artists:Artist[] = []
        this.pool.getConnection(function (err:any, connection:any){
            if(err) throw err
            connection.query('SELECT distinct ARTIST from MUSIC.ALBUM', function (err:any, rows:any, fields:any){
                connection.release();
                if(err) throw err

                for(let x = 0; x < rows.length; ++x){
                    artists.push(new Artist(x, rows[x].ARTIST))
                }
                callback(artists)
            })
        })
    }

    public findAlbums(artist:string, callback:any){
        let albums:Album[] = []
        this.pool.getConnection(async function (err:any, connection:any){
            connection.release()
            if(err) throw err

            connection.query = util.promisify(connection.query)
            let results1 = await connection.query('SELECT * FROM MUSIC.ALBUM WHERE ARTIST=?', [artist])
            for(let x = 0; x < results1.length; ++x){
                let albumId = results1[x].ID
                let tracks:Track[] = []
                let results2 = await connection.query('SELECT * FROM MUSIC.TRACK WHERE ALBUM_ID=?', [albumId])
                for(let y = 0; y < results2.length; ++y){
                    tracks.push(new Track(results2[x].ID, results2[x].NUMBER, results2[x].TITLE, results2[x].LYRICS))
                }
                albums.push(new Album(results1[x].ID, results1[x].TITLE, results1[x].ARTIST, results1[x].YEAR, results1[x].IMAGE_NAME, results1[x].DESCRIPTION, tracks))
            }
            callback(albums)
        })
    }

    public findAllAlbums(callback: any){
        let albums:Album[] = []
        this.pool.getConnection(async function (err:any, connection:any){
            connection.release()
            if(err)throw err
            connection.query=util.promisify(connection.query)
            let results1 = await connection.query('SELECT * FROM MUSIC.ALBUM')
                for(let x = 0; x < results1.length; ++x){
                    let albumId = results1[x].ID
                    let tracks:Track[] = []
                    let results2 = await connection.query('SELECT * FROM MUSIC.TRACK WHERE ALBUM_ID=?', [albumId])
                    for (let y = 0; y < results1.length; ++y){
                        tracks.push(new Track(results2[x].ID, results2[x].NUMBER, results2[x].TITLE, results2[x].LYRICS))
                    }
                    albums.push(new Album(results1[x].ID, results1[x].TITLE, results1[x].ARTIST, results1[x].YEAR, results1[x].IMAGE_NAME, results1[x].DESCRIPTION, tracks))
                }
          callback(albums)
        })
    }

    public findAlbum(albumId: number, callback: any){
        let album:Album[] = []
        this.pool.getConnection(async function (err:any, connection:any){
            connection.release()
            if(err) throw err

            connection.query = util.promisify(connection.query)
            let results1 = await connection.query('SELECT * FROM MUSIC.ALBUM WHERE ID=?', [albumId])
            for(let x = 0; x < results1.length; ++x){
                let tracks:Track[] = []
                let results2 = await connection.query('SELECT * FROM MUSIC.TRACK WHERE ALBUM_ID=?', [albumId])
                for(let y = 0; y < results2.length; ++y){
                    tracks.push(new Track(results2[x].ID, results2[x].NUMBER, results2[x].TITLE, results2[x].LYRICS))
                }
                album.push(new Album(results1[x].ID, results1[x].TITLE, results1[x].ARTIST,results1[x].YEAR, results1[x].IMAGE_NAME, results1[x].DESCRIPTION,  tracks))
            }
            callback(album)
        })
    }

    public findAlbumByArtist(search: string, callback: any){
        let albums:Album[] = []
        this.pool.getConnection(async function (err:any, connection:any){
            connection.release()
            if(err) throw err

            connection.query = util.promisify(connection.query)
            let results1 = await connection.query("SELECT * FROM MUSIC.ALBUM WHERE ARTIST LIKE concat('%',?,'%')", [search])
            for(let x = 0; x < results1.length; ++x){
                let albumId = results1[x].ID
                let tracks:Track[] = []
                let results2 = await connection.query('SELECT * FROM MUSIC.TRACK WHERE ALBUM_ID=?', [albumId])
                for(let y = 0; y < results2.length; ++y){
                    tracks.push(new Track(results2[x].ID, results2[x].NUMBER, results2[x].TITLE, results2[x].LYRICS))
                }
                albums.push(new Album(results1[x].ID, results1[x].TITLE, results1[x].ARTIST, results1[x].YEAR, results1[x].IMAGE_NAME, results1[x].DESCRIPTION, tracks))
            }
            callback(albums)
        })
    }

    public findAlbumsByDescription(search: string, callback: any){
        let albums:Album[] = []
        this.pool.getConnection(async function (err:any, connection:any){
            connection.release()
            if(err) throw err

            connection.query = util.promisify(connection.query)
            let results1 = await connection.query("SELECT * FROM MUSIC.ALBUM WHERE DESCRIPTION LIKE concat('%',?,'%')", [search])
            for(let x = 0; x < results1.length; ++x){
                let albumId = results1[x].ID
                let tracks:Track[] = []
                let results2 = await connection.query('SELECT * FROM MUSIC.TRACK WHERE ALBUM_ID=?', [albumId])
                for(let y = 0; y < results2.length; ++y){
                    tracks.push(new Track(results2[x].ID, results2[x].NUMBER, results2[x].TITLE, results2[x].LYRICS))
                }
                albums.push(new Album(results1[x].ID, results1[x].TITLE, results1[x].ARTIST, results1[x].YEAR, results1[x].IMAGE_NAME, results1[x].DESCRIPTION, tracks))
            }
            callback(albums)
        })
    }

    public create(album: Album, callback: any){
        let albumId = -1
        this.pool.getConnection(async function (err:any, connection:any){
            connection.release()
            if(err) throw err

            connection.query = util.promisify(connection.query)
            if(await connection.query("INSERT INTO MUSIC.ALBUM (TITLE, ARTIST, YEAR, IMAGE_NAME, DESCRIPTION) VALUES (?,?,?,?,?)", [album.title, album.artist, album.year, album.image_name, album.description])){
                let idResponse = await connection.query("SELECT ID FROM MUSIC.ALBUM ORDER BY ID DESC LIMIT 1")
                album.id = idResponse[0].ID
            }
            for (let x = 0; x < album.tracks.length; ++x){
                await connection.query("INSERT INTO MUSIC.TRACK (ALBUM_ID, TITLE, NUMBER, VIDEO_URL, LYRICS) VALUES (?,?,?,?,?)", [album.id, album.tracks[x].title, album.tracks[x].number, "https://picsum.photos/200/300", album.tracks[x].lyrics])
            }
            callback(album.id)
        })
    }

    public update(album:Album, callback: any){
        let status = 0;
        this.pool.getConnection(async function (err:any, connection:any){
            connection.release()
            if(err) throw err

            if(await connection.query("UPDATE MUSIC.ALBUM SET TITLE = ?, ARTIST = ?, YEAR = ?, IMAGE_NAME = ?, DESCRIPTION = ? WHERE ID = ?", [album.title, album.artist, album.year, album.image_name, album.description, album.id])){
                status = 1
            }else {
                status = -1
            }
            callback(status)
        })
    }

    public delete(albumId: number, callback: any){
        let status = 0
        this.pool.getConnection(async function (err:any, connection:any){
            connection.release()
            if(err) throw err
            if(await connection.query("DELETE FROM MUSIC.ALBUM WHERE ID = ?", [albumId])){
                status = 1
            }else{
                status = -1
            }
            callback(status)
        })
    }
}
