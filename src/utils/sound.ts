/**
 * Reusable Audio Engine for Quriv Technologies
 * Supports local audio files (/public/audio/*.mp3) with Web Audio API synthesis fallback.
 */

export type AudioTrackType = 'ambient' | 'click' | 'hover' | 'transition' | 'section';

class SoundArchitecture {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private audioCache: Map<AudioTrackType, HTMLAudioElement> = new Map();
  private ambientAudio: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      // Pre-configure audio tracks pointing to /public/audio/
      const tracks: AudioTrackType[] = ['ambient', 'click', 'hover', 'transition', 'section'];
      tracks.forEach((track) => {
        const audio = new Audio(`/audio/${track}.mp3`);
        audio.preload = 'none';
        this.audioCache.set(track, audio);
      });
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ambientAudio) {
      if (muted) {
        this.ambientAudio.pause();
        this.ambientAudio.currentTime = 0;
      } else {
        this.ambientAudio.play().catch(() => {});
      }
    }
  }

  public async playAmbient() {
    if (this.isMuted) {
      console.log('Audio is muted, cannot play ambient');
      return;
    }
    
    // Initialize audio context first
    this.initContext();
    
    if (!this.ambientAudio) {
      const audio = this.audioCache.get('ambient');
      if (audio) {
        this.ambientAudio = audio.cloneNode() as HTMLAudioElement;
        this.ambientAudio.loop = true;
        this.ambientAudio.volume = 0.7;
        console.log('Created ambient audio element with volume 0.7');
      } else {
        console.error('Ambient audio not found in cache');
        return;
      }
    }
    
    if (this.ambientAudio) {
      try {
        // Resume audio context if suspended (required for autoplay policy)
        if (this.ctx && this.ctx.state === 'suspended') {
          await this.ctx.resume();
        }
        
        if (this.ambientAudio.paused) {
          await this.ambientAudio.play();
          console.log('Ambient audio playing successfully at volume:', this.ambientAudio.volume);
        } else {
          console.log('Ambient audio already playing');
        }
      } catch (e) {
        console.error('Failed to play ambient audio:', e);
        console.error('This is likely due to browser autoplay policy. Audio will play on first user interaction.');
      }
    }
  }

  private playAudioFile(track: AudioTrackType): Promise<boolean> {
    return new Promise((resolve) => {
      const audio = this.audioCache.get(track);
      if (!audio) return resolve(false);

      const clone = audio.cloneNode() as HTMLAudioElement;
      clone.volume = track === 'ambient' ? 0.2 : 0.4;
      
      const playPromise = clone.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => resolve(true))
          .catch(() => resolve(false));
      } else {
        resolve(false);
      }
    });
  }

  public async playHover() {
    // Hover sound disabled
    return;
  }

  public async playClick() {
    if (this.isMuted) return;
    const played = await this.playAudioFile('click');
    if (played) return;

    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {
      // Ignore
    }
  }

  public async playCameraTransition() {
    if (this.isMuted) return;
    const played = await this.playAudioFile('transition');
    if (played) return;

    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.4);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.025, this.ctx.currentTime + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.85);
    } catch {
      // Ignore
    }
  }

  public async playSectionSound() {
    // Section sound disabled
    return;
  }

  public playChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 gold chord
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.02, this.ctx!.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + idx * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + idx * 0.08);
        osc.stop(this.ctx!.currentTime + idx * 0.08 + 0.65);
      });
    } catch {
      // Ignore
    }
  }
}

export const soundManager = new SoundArchitecture();
