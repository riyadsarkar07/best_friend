"use client";

import { useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { friendshipConfig } from "@/data/friendship-config";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const hasTrack = Boolean(friendshipConfig.musicSrc);

  if (!hasTrack) return null;

  const toggle = async () => {
    if (!hasTrack || !audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }
    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 flex items-end gap-2 sm:bottom-6 sm:left-6">
      {hasTrack && <audio ref={audioRef} src={friendshipConfig.musicSrc} loop preload="none" />}
      <div className="flex items-center gap-1 rounded-full border border-line bg-paper/95 p-1 pl-1.5 shadow-[var(--shadow-sm)] backdrop-blur-sm">
        <button
          type="button"
          onClick={toggle}
          disabled={!hasTrack}
          className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-sage-deep text-paper transition hover:bg-sage disabled:cursor-not-allowed disabled:bg-cream-deep disabled:text-ink-faint"
          aria-label={
            hasTrack
              ? `${playing ? "Pause" : "Play"} ${friendshipConfig.musicLabel}`
              : "Music is not configured yet"
          }
          title={hasTrack ? friendshipConfig.musicLabel : "Add a song in the config file"}
        >
          {hasTrack ? (
            playing ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4 translate-x-[1px]" />
            )
          ) : (
            <VolumeX className="h-4 w-4" />
          )}
        </button>

        <div className="hidden pr-2 sm:block">
          <p className="max-w-[8.5rem] truncate text-[0.72rem] font-semibold leading-tight text-ink">
            {hasTrack ? friendshipConfig.musicLabel : "No song yet"}
          </p>
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-ink-faint">
            {hasTrack ? (playing ? "Now playing" : "Music") : "Add in config"}
          </p>
        </div>

        {hasTrack && (
          <button
            type="button"
            onClick={toggleMute}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-ink-soft transition hover:bg-cream"
            aria-label={muted ? "Unmute music" : "Mute music"}
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  );
}
