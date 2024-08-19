import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getTrackById } from '../utils/supabaseUtils';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';

function TrackDetail() {
  const { trackId } = useParams();
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchTrackDetails = async () => {
      try {
        const trackData = await getTrackById(trackId);
        setTrack(trackData);
      } catch (error) {
        console.error('Error fetching track details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackDetails();
  }, [trackId]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgress = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      const seekTime = parseFloat(e.target.value);
      audioRef.current.currentTime = seekTime;
      setProgress(seekTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.addEventListener('timeupdate', handleProgress);
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });

      return () => {
        audio.removeEventListener('timeupdate', handleProgress);
        audio.removeEventListener('loadedmetadata', () => {
          setDuration(audio.duration);
        });
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [track]); // Re-run this effect when `track` changes

  if (loading) {
    return null; // Render nothing while loading
  }

  if (!track) {
    return <div className="text-center text-white">Track not found</div>;
  }

  return (
    <div className="-mt-8 flex flex-col items-center justify-center min-h-screen p-2">
      <img src={track.image_url || '/default-album-art.jpg'} alt={track.title} className="w-64 h-64 rounded-lg shadow-lg mb-4" />
      <h2 className="text-white text-2xl font-bold mb-2">{track.title}</h2>
      <p className="text-gray-400 mb-4">{track.artist}</p>
      <div className="w-full max-w-md mb-4">
        <input
          type="range"
          min="0"
          max={duration}
          value={progress}
          onChange={handleSeek}
          className="w-full"
        />
        <div className="flex justify-between text-gray-400 text-sm">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-6">
        <button className="text-white text-2xl"><FaStepBackward /></button>
        <button onClick={handlePlayPause} className="bg-nsdr-accent text-nsdr-dark p-4 rounded-full text-3xl">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className="text-white text-2xl"><FaStepForward /></button>
      </div>
      <audio ref={audioRef} src={track?.audio_url} />
    </div>
  );
}

export default TrackDetail;