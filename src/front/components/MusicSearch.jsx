import { useEffect, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";

export const MusicSearch = () => {
    const [currentSong, setCurrentSong] = useState(null);
    const [artistInput, setArtistInput] = useState("");
    const [songInput, setSongInput] = useState("");
    const [liked, setLiked] = useState(false);

    const playerRef = useRef(null);
    const intervalRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const token = localStorage.getItem("token");

    const search = async (artist, song) => {
        const response = await fetch(
            `https://www.theaudiodb.com/api/v1/json/123/searchtrack.php?s=${artist}&t=${song}`
        );

        if (response.ok) {
            const data = await response.json();
            setCurrentSong(data);
            setLiked(false);
        }
    };

    useEffect(() => {
        if (!currentSong?.track) return;

        const videoId = currentSong.track[0].strMusicVid
            .split("v=")[1]
            ?.split("&")[0];

        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
        }

        const createPlayer = () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }

            playerRef.current = new window.YT.Player("yt-player", {
                videoId,
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    rel: 0
                },
                events: {
                    onReady: (e) => {
                        setDuration(e.target.getDuration());
                        e.target.playVideo();
                        setIsPlaying(true);
                    },
                    onStateChange: (e) => {
                        setIsPlaying(
                            e.data === window.YT.PlayerState.PLAYING
                        );
                    }
                }
            });
        };

        window.YT?.Player
            ? createPlayer()
            : (window.onYouTubeIframeAPIReady = createPlayer);

    }, [currentSong]);


    useEffect(() => {
        intervalRef.current = setInterval(() => {
            if (playerRef.current?.getCurrentTime) {
                setCurrentTime(playerRef.current.getCurrentTime());
            }
        }, 500);

        return () => clearInterval(intervalRef.current);
    }, []);

    const togglePlay = () => {
        if (!playerRef.current) return;
        isPlaying
            ? playerRef.current.pauseVideo()
            : playerRef.current.playVideo();
    };

    const seek = (time) => {
        if (!playerRef.current) return;
        playerRef.current.seekTo(time, true);
        setCurrentTime(time);
    };

    const formatTime = (time = 0) => {
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min}:${sec.toString().padStart(2, "0")}`;
    };

    const toggleLike = async () => {
        if (!currentSong?.track) return;

        const postId = currentSong.track[0].idTrack;

        const response = await fetch(
            `/feed_posts/${postId}/likes`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (response.ok) {
            const data = await response.json();
            setLiked(data.liked);
        }
    };

    return (
        <div className="spotify-layout">

            <div className="top-card">
                <div className="top-row">

                    <div className="left-panel">
                        <div className="search-card">
                            <h2 className="app-title">Search Music</h2>

                            <div className="input-group">
                                <label>Artist</label>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setArtistInput(e.target.value)
                                    }
                                />
                            </div>

                            <div className="input-group">
                                <label>Song</label>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setSongInput(e.target.value)
                                    }
                                />
                            </div>

                            <button
                                className="spotify-btn"
                                onClick={() =>
                                    search(artistInput, songInput)
                                }
                            >
                                Buscar
                            </button>
                        </div>
                    </div>

                    {currentSong?.track && (
                        <div className="video-box">
                            <div id="yt-player" />
                        </div>
                    )}
                </div>
            </div>

            {currentSong?.track && (
                <div className="spotify-player">
                    <div className="player-info">
                        <strong>{currentSong.track[0].strTrack}</strong>
                        <span>{currentSong.track[0].strArtist}</span>
                    </div>

                    <button
                        className="player-btn"
                        onClick={togglePlay}
                    >
                        {isPlaying ? "⏸" : "▶"}
                    </button>

                    <button
                        className={`icon-btn ${liked ? "liked" : ""}`}
                        onClick={() => setLiked(!liked)}
                    >
                        <FaHeart />
                    </button>


                    <div className="progress-bar">
                        <span>{formatTime(currentTime)}</span>
                        <input
                            type="range"
                            min="0"
                            max={duration}
                            value={currentTime}
                            onChange={(e) =>
                                seek(Number(e.target.value))
                            }
                        />
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
            )}
        </div>
    );
};
