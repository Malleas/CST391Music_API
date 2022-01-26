const {Album} = require('./lib/app/models/Album')
const {Track} = require('./lib/app/models/Track')
const {Artist} = require('./lib/app/models/Artist')
const bodyParser = require('body-parser')

const express = require('express')
const {MusicDAO} = require("./lib/app/database/MusicDAO");
const app = express()
const port = 3000

const host = "localhost"
const dbPort = 8889
const user = "root"
const password = "root"


app.get('/', (req, res) => res.send('Music API App!'))
app.listen(port)
app.use(bodyParser.json())

app.get("/artists", function (_req, res){
    let dao = new MusicDAO(host, dbPort, user, password)
    dao.findArtist(function (artists){
        res.json(artists)
    })
})

app.get("/albums/:artist", function (_req, res){
    let dao = new MusicDAO(host, dbPort, user, password)
    dao.findAlbums(_req.params.artist, function (albums){
        res.json(albums)
    })
})

app.get("/albums", function (_req, res){
    let dao = new MusicDAO(host, dbPort, user, password)
    dao.findAllAlbums(function (albums){
        res.json(albums)
    })
})

app.get("/album/:id", function (_req, res){
    let dao = new MusicDAO(host, dbPort, user, password)
    dao.findAlbum(Number(_req.params.id), function (album){
        res.json(album)
    })
})

app.get("/albums/search/artist/:search", function (_req, res){
    let dao = new MusicDAO(host, dbPort, user, password)
    dao.findAlbumByArtist(_req.params.search, function (albums){
        res.json(albums)
    })
})

app.get("/albums/search/description/:search", function (_req, res){
    let dao = new MusicDAO(host, dbPort, user, password)
    dao.findAlbumsByDescription(_req.params.search, function (albums){
        res.json(albums)
    })
})

app.post('/albums', function (_req, res){
    if(!_req.body.title){
        res.status(400).json({error: "Invalid Album Posted"})
    }else {
        let tracks = []
        for(let x = 0; x < _req.body.tracks.length; ++x){
            tracks.push(new Track(-1, _req.body.tracks[x].number, _req.body.tracks[x].title, _req.body.tracks[x].lyrics))
        }
        let album = new Album(-1, _req.body.title, _req.body.artist, _req.body.year, _req.body.image_name, _req.body.description, tracks)
        
        let dao = new MusicDAO(host, dbPort, user, password)
        dao.create(album, function (albumId){
            if(albumId === -1){
                res.status(400).json({error: "Failed to create new Album"})
            }else {
                res.status(200).json({success: "New Album created"})
            }
        })
    }
})

app.put('/albums/:id', function (_req, res){
    let album = new Album(_req.params.id, _req.body.title, _req.body.artist, _req.body.year, _req.body.image_name, _req.body.description, [])
    
    let dao = new MusicDAO(host, dbPort, user, password)
    dao.update(album, function (status){
        if(status === -1){
            res.status(400).json({error: "Unable to update"})
        }else{
            res.status(200).json({success: "Update successful"})
        }
    })
})

app.delete('/albums/:id', function (_req, res){
    let dao = new MusicDAO(host, dbPort, user, password)
    dao.delete(_req.params.id, function (status){
        if(status === -1){
            res.status(400).json({error: "Unable to delete"})
        }else{
            res.status(200).json({success: "Delete successful"})
        }
    })
})

