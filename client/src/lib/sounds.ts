// Sound file URLs
const SOUNDS = {
  switch: 'https://assets.codepen.io/1149983/smb3_enter_level.wav',
  point: 'https://assets.codepen.io/1149983/smb_coin.wav',
  fault: 'https://assets.codepen.io/1149983/smb_bump.wav',
  victory: 'https://assets.codepen.io/1149983/smb_stage_clear.wav',
};

type SoundType = keyof typeof SOUNDS;

// Create audio elements
const audioElements: Record<SoundType, HTMLAudioElement> = {} as Record<SoundType, HTMLAudioElement>;

// Initialize audio elements when DOM is ready
if (typeof window !== 'undefined') {
  Object.entries(SOUNDS).forEach(([key, url]) => {
    const audio = new Audio(url);
    audio.preload = 'auto';
    audioElements[key as SoundType] = audio;
  });
}

// Play sound function
export function playSound(type: SoundType) {
  try {
    const audio = audioElements[type];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(err => {
        // Silently fail - this often happens due to browser autoplay policies
        console.log(`Sound play failed: ${err.message}`);
      });
    }
  } catch (error) {
    console.error('Error playing sound:', error);
  }
}
