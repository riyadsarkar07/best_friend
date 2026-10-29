"use client";

import { useRef, useState } from "react";
import { Music, Pause, Play, VolumeX } from "lucide-react";
import { friendshipConfig } from "@/data/friendship-config";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const hasTrack = Boolean(friendshipConfig.musicSrc);

  const toggle = async () => {
    if (!hasTrack || !audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }
    await audioRef.current.play();
    setPlaying(true);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 flex flex-wrap gap-2">
      {hasTrack && <audio ref={audioRef} src={friendshipConfig.musicSrc} loop />}
      <button
        type="button"
        onClick={toggle}
        disabled={!hasTrack}
        className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-paper/95 px-4 text-sm font-semibold text-ink shadow-[0_10px_24px_rgba(80,58,42,0.14)] disabled:cursor-not-allowed disabled:opacity-70"
        aria-label={hasTrack ? friendshipConfig.musicLabel : "Music is not configured yet"}
      >
        {hasTrack ? (
          playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />
        ) : (
          <VolumeX className="h-4 w-4" />
        )}
        <Music className="h-4 w-4" />
        {hasTrack ? (playing ? "Pause music" : "Play music") : "Add a song in config"}
      </button>
      {hasTrack && (
        <button
          type="button"
          onClick={toggleMute}
          className="inline-flex min-h-12 min-w-12 cursor-pointer items-center justify-center rounded-full bg-paper/95 text-ink shadow-[0_10px_24px_rgba(80,58,42,0.14)]"
          aria-label={muted ? "Unmute music" : "Mute music"}
        >
          <VolumeX className={`h-4 w-4 ${muted ? "opacity-100" : "opacity-40"}`} />
        </button>
      )}
    </div>
  );
}
