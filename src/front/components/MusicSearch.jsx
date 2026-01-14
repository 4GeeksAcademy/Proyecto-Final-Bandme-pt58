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
        
       <div style={{
  backgroundColor: "black",
  padding: "24px",
  paddingBottom: "24px",
  borderRadius: "16px",
  maxWidth: "600px",
  margin: "10",
  justifyContent: "start",
  position: "fixed",
    bottom: "120px",      
    left: "0px",          
    transform: "scale(0.7)",
    transformOrigin: "bottom left",
    zIndex: 2000 
}}>

  <label
    htmlFor="artist-input"
    style={{ color: "#b3b3b3", display: "block", marginBottom: "4px" }}
  >
    Artist
  </label>

  <input
    type="text"
    id="artist-input"
    onChange={(e) => setArtistInput(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      backgroundColor: "#ffffff",
      color: "black",
      border: "none",
      marginBottom: "16px"
    }}
  />

  <label
    htmlFor="song-input"
    style={{ color: "#b3b3b3", display: "block", marginBottom: "4px" }}
  >
    Song
  </label>

  <input
    type="text"
    id="song-input"
    onChange={(e) => setSongInput(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      backgroundColor: "#ffffff",
      color: "black",
      border: "none",
      marginBottom: "20px"
    }}
  />

  <button
    onClick={() => search(artistInput, songInput)}
    style={{
      backgroundColor: "#1DB954",
      color: "black",
      padding: "10px 24px",
      borderRadius: "999px",
      border: "none",
      fontWeight: "bold",
      cursor: "pointer",
      marginBottom: "24px"
    }}
  >
    Search
  </button>

  <h1 style={{ color: "white", marginBottom: "16px" }}>
    {currentSong?.track[0].strTrack}
  </h1>

  <div style={{
    borderRadius: "16px",
    overflow: "hidden",
    backgroundColor: "#121212"
  }}>
    <LiteYouTubeEmbed
      id={currentSong?.track[0].strMusicVid.replace(
        "https://www.youtube.com/watch?v=",
        ""
      )}
      title={currentSong?.track[0].strTrack}
    />
  </div>

</div>


        </>
    )
}