import { useEffect, useState } from "react"
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';


export const MusicSearch = () => {

    const [currentSong, setCurrentSong] = useState()
    const [artistInput, setArtistInput] = useState()
    const [songInput, setSongInput] = useState()
    
    const search = async (artist, song) => {
        
       const response = await fetch(`https://www.theaudiodb.com/api/v1/json/123/searchtrack.php?s=${artist}&t=${song}`)
       if(response.ok){
        const data = await response.json()
        console.log(data);
        setCurrentSong(data)
        
       }

    }


    return (
        <>
        <label htmlFor="artist-input">Artista: </label>
        <input type="text" id="artist-input" onChange={(e) => setArtistInput(e.target.value) }/>
        <label htmlFor="song-input">Cancion: </label>
        <input type="text" id="song-input" onChange={(e) => setSongInput(e.target.value)}/>
        <button onClick={() => search(artistInput, songInput)}>Buscar</button>
        <h1>{currentSong?.track[0].strTrack}</h1>
              <LiteYouTubeEmbed
      id= {currentSong?.track[0].strMusicVid.replace("https://www.youtube.com/watch?v=", "")}
      title= {currentSong?.track[0].strTrack}
    />
        </>
    )
}