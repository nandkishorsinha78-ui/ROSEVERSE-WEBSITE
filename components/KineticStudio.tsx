'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Expand,
  Keyboard,
} from 'lucide-react';

interface KineticStudioProps {
  isPlayingVideo: boolean;
  setIsPlayingVideo: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export default function KineticStudio({
  isPlayingVideo,
  setIsPlayingVideo,
}: KineticStudioProps) {
  const TOTAL_FRAMES = 300;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [fitMode, setFitMode] = useState<'contain' | 'cover'>('contain');
  const [filterClass, setFilterClass] = useState('none');
  const [isMuted, setIsMuted] = useState(true);
  const [fps, setFps] = useState(60);

  // Audio Context Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Preload Images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNumStr = String(i).padStart(3, '0');
      img.src = `frames/ezgif-frame-${frameNumStr}.jpg`;

      img.onload = () => {
        count++;
        setLoadedCount(count);
      };
      img.onerror = () => {
        count++;
        setLoadedCount(count);
      };

      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let targetFrame = currentFrame;
    let lastFrameTime = performance.now();
    let frameCount = 0;
    let lastFpsCheck = performance.now();

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container || isPlayingVideo) return;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = container.scrollHeight - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const currentScrollPos = -rect.top;
      const fraction = Math.max(0, Math.min(1, currentScrollPos / scrollableDistance));
      targetFrame = 1 + fraction * (TOTAL_FRAMES - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const render = (timestamp: number) => {
      animFrameId = requestAnimationFrame(render);

      // FPS Calculation
      frameCount++;
      if (timestamp - lastFpsCheck >= 1000) {
        setFps(Math.round((frameCount * 1000) / (timestamp - lastFpsCheck)));
        frameCount = 0;
        lastFpsCheck = timestamp;
      }

      // Handle video playback vs scroll interpolation
      if (isPlayingVideo) {
        const frameInterval = 1000 / (30 * playbackSpeed);
        if (timestamp - lastFrameTime >= frameInterval) {
          lastFrameTime = timestamp;
          setCurrentFrame((prev) => {
            const next = prev + 1 > TOTAL_FRAMES ? 1 : prev + 1;
            return next;
          });
        }
      } else {
        setCurrentFrame((prev) => {
          const diff = targetFrame - prev;
          if (Math.abs(diff) > 0.005) {
            return prev + diff * 0.45;
          }
          return targetFrame;
        });
      }

      // Draw Canvas Frame
      const frameIdx = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(currentFrame))) - 1;
      const img = images[frameIdx];

      if (img && img.complete && img.naturalWidth !== 0) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        ctx.clearRect(0, 0, width, height);

        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = width / height;

        let drawWidth: number;
        let drawHeight: number;

        if (fitMode === 'cover') {
          if (canvasRatio > imgRatio) {
            drawWidth = width;
            drawHeight = width / imgRatio;
          } else {
            drawHeight = height;
            drawWidth = height * imgRatio;
          }
        } else {
          if (canvasRatio < imgRatio) {
            drawWidth = width;
            drawHeight = width / imgRatio;
          } else {
            drawHeight = height;
            drawWidth = height * imgRatio;
          }
        }

        const offsetX = (width - drawWidth) / 2;
        const offsetY = (height - drawHeight) / 2;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animFrameId);
    };
  }, [images, isPlayingVideo, playbackSpeed, fitMode, currentFrame]);

  // Audio Toggle Engine
  const toggleAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    setIsMuted((prev) => {
      const next = !prev;
      if (!next && audioCtxRef.current) {
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(146.83, audioCtxRef.current.currentTime);
        gain.gain.setValueAtTime(0.01, audioCtxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, audioCtxRef.current.currentTime + 2);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        oscRef.current = osc;
        gainRef.current = gain;
      } else if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5);
        setTimeout(() => {
          oscRef.current?.stop();
          oscRef.current?.disconnect();
          oscRef.current = null;
        }, 500);
      }
      return next;
    });
  }, []);

  // Keyboard Hotkeys (Space, Left/Right, M, F)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('input, select, textarea, button')) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlayingVideo((prev) => !prev);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        setIsPlayingVideo(false);
        setCurrentFrame((prev) => Math.max(1, prev - 1));
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        setIsPlayingVideo(false);
        setCurrentFrame((prev) => Math.min(TOTAL_FRAMES, prev + 1));
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        toggleAudio();
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        setFitMode((prev) => (prev === 'contain' ? 'cover' : 'contain'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsPlayingVideo, toggleAudio]);

  const roundedFrame = Math.round(currentFrame);
  const progressFraction = (roundedFrame - 1) / (TOTAL_FRAMES - 1);
  const textOpacity = progressFraction <= 0.3 ? Math.max(0, 1 - progressFraction / 0.3) : 0;

  return (
    <section id="kinetic-studio" ref={containerRef} className="relative h-[300vh] bg-obsidian">
      {/* Screen Reader Live Region */}
      <div className="sr-only" aria-live="polite">
        Frame {roundedFrame} of 300. {isPlayingVideo ? 'Playing animation' : 'Paused'}.
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Render Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-center" />

        {/* Color Grading Overlay */}
        <div
          className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
            filterClass === 'glow'
              ? 'bg-crimson-rose/10 mix-blend-color-dodge'
              : filterClass === 'emerald'
              ? 'bg-emerald-accent/10 mix-blend-overlay'
              : filterClass === 'noir'
              ? 'contrast-125 grayscale'
              : filterClass === 'warm'
              ? 'bg-gold-accent/10 mix-blend-color-burn'
              : ''
          }`}
        />

        {/* Studio Heading Overlay with 30% Scroll Fade-Out */}
        <div
          className="studio-heading-overlay transition-all duration-75"
          style={{
            opacity: textOpacity.toFixed(3),
            transform: `translate(-50%, calc(-50% - ${progressFraction * 60}px)) scale(${
              1 - progressFraction * 0.15
            })`,
            visibility: textOpacity <= 0 ? 'hidden' : 'visible',
            pointerEvents: textOpacity <= 0 ? 'none' : 'auto',
          }}
        >
          <h1 className="studio-heading-title">ROSEVERSE</h1>
          <p className="studio-heading-subtitle">THE LOVE OF INDIANS</p>
        </div>

        {/* Milestone Cards Overlay */}
        <div className="absolute inset-x-6 top-1/3 max-w-sm pointer-events-none z-20">
          {roundedFrame >= 1 && roundedFrame <= 75 && (
            <div className="p-6 rounded-2xl bg-surface/85 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-2 transition-all">
              <span className="text-xs font-bold text-crimson-rose tracking-wider uppercase">
                PHASE 01 • FRAMES 001–075
              </span>
              <h3 className="font-heading text-xl text-white font-bold">Midnight Genesis</h3>
              <p className="font-body text-xs text-slate-300">
                Under ambient night mist, velvet crimson petals begin their silent unfolding.
              </p>
            </div>
          )}

          {roundedFrame >= 76 && roundedFrame <= 150 && (
            <div className="p-6 rounded-2xl bg-surface/85 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-2 transition-all">
              <span className="text-xs font-bold text-gold-accent tracking-wider uppercase">
                PHASE 02 • FRAMES 076–150
              </span>
              <h3 className="font-heading text-xl text-white font-bold">Rain & Dew Optics</h3>
              <p className="font-body text-xs text-slate-300">
                Microscopic rain droplets sparkle across the petal surface with crystal clarity.
              </p>
            </div>
          )}

          {roundedFrame >= 151 && roundedFrame <= 225 && (
            <div className="p-6 rounded-2xl bg-surface/85 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-2 transition-all">
              <span className="text-xs font-bold text-emerald-accent tracking-wider uppercase">
                PHASE 03 • FRAMES 151–225
              </span>
              <h3 className="font-heading text-xl text-white font-bold">Burgundy Radiance</h3>
              <p className="font-body text-xs text-slate-300">
                Unfolding layer by layer into complete grandeur, displaying deep ruby gradients.
              </p>
            </div>
          )}

          {roundedFrame >= 226 && roundedFrame <= 300 && (
            <div className="p-6 rounded-2xl bg-surface/85 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-2 transition-all">
              <span className="text-xs font-bold text-white tracking-wider uppercase">
                PHASE 04 • FRAMES 226–300
              </span>
              <h3 className="font-heading text-xl text-white font-bold">Eternal Symmetry</h3>
              <p className="font-body text-xs text-slate-300">
                A 300-frame masterwork of continuous high-definition motion in full clarity.
              </p>
            </div>
          )}
        </div>

        {/* Floating Atelier Control Bar HUD */}
        <div className="absolute bottom-8 inset-x-6 max-w-5xl mx-auto p-4 rounded-2xl bg-surface/85 border border-white/15 backdrop-blur-2xl shadow-2xl flex flex-wrap items-center justify-between gap-4 z-30">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlayingVideo((prev) => !prev)}
              className="w-10 h-10 rounded-full bg-crimson-rose text-white flex items-center justify-center hover:scale-105 transition-transform focus:ring-2 focus:ring-gold-accent"
              aria-label={isPlayingVideo ? 'Pause motion animation' : 'Play motion animation'}
              title="Play / Pause Motion (Space)"
            >
              {isPlayingVideo ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            <button
              onClick={() => {
                setIsPlayingVideo(false);
                setCurrentFrame((prev) => Math.max(1, prev - 1));
              }}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-slate-300 flex items-center justify-center hover:text-white focus:ring-2 focus:ring-gold-accent"
              aria-label="Previous frame"
              title="Previous Frame (Left Arrow)"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setIsPlayingVideo(false);
                setCurrentFrame((prev) => Math.min(TOTAL_FRAMES, prev + 1));
              }}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-slate-300 flex items-center justify-center hover:text-white focus:ring-2 focus:ring-gold-accent"
              aria-label="Next frame"
              title="Next Frame (Right Arrow)"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={toggleAudio}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all focus:ring-2 focus:ring-gold-accent ${
                !isMuted
                  ? 'bg-gold-accent text-obsidian border-gold-accent'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
              }`}
              aria-label={!isMuted ? 'Mute audio synthesizer' : 'Unmute audio synthesizer'}
              title="Toggle Sound Synth (M)"
            >
              {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-semibold text-slate-300">
              <span className="text-gold-accent font-bold">{String(roundedFrame).padStart(3, '0')}</span> / 300
              <span className="ml-2 text-emerald-accent">{fps} FPS</span>
            </div>
          </div>

          {/* Scrubber */}
          <div className="flex-1 min-w-[180px] max-w-md">
            <input
              type="range"
              min="1"
              max={TOTAL_FRAMES}
              value={roundedFrame}
              onChange={(e) => {
                setIsPlayingVideo(false);
                setCurrentFrame(parseInt(e.target.value, 10));
              }}
              aria-label="Frame timeline scrubber"
              className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-crimson-rose focus:ring-2 focus:ring-gold-accent"
            />
          </div>

          {/* Controls Right */}
          <div className="flex items-center gap-2">
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
              aria-label="Playback speed"
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 focus:outline-none focus:ring-2 focus:ring-gold-accent"
            >
              <option value="0.5" className="bg-obsidian">0.5x</option>
              <option value="1.0" className="bg-obsidian">1.0x</option>
              <option value="1.5" className="bg-obsidian">1.5x</option>
              <option value="2.0" className="bg-obsidian">2.0x</option>
            </select>

            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              aria-label="Color grading filter preset"
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 focus:outline-none focus:ring-2 focus:ring-gold-accent"
            >
              <option value="none" className="bg-obsidian">Original</option>
              <option value="glow" className="bg-obsidian">Velvet Glow</option>
              <option value="emerald" className="bg-obsidian">Emerald Rain</option>
              <option value="noir" className="bg-obsidian">Noir</option>
              <option value="warm" className="bg-obsidian">Golden Twilight</option>
            </select>

            <button
              onClick={() => setFitMode(fitMode === 'contain' ? 'cover' : 'contain')}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-slate-300 flex items-center justify-center hover:text-white focus:ring-2 focus:ring-gold-accent"
              aria-label="Toggle Cover or Contain fit mode"
              title="Toggle Cover/Contain (F)"
            >
              <Expand className="w-4 h-4" />
            </button>

            <div className="hidden lg:flex items-center gap-1 text-[10px] text-slate-400 border-l border-white/10 pl-2">
              <Keyboard className="w-3.5 h-3.5 text-gold-accent" />
              <span>[Space] [←/→] [M] [F]</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
