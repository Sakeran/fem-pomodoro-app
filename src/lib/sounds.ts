import { Howl, Howler } from "howler";

Howler.volume(0.75);

export class SoundManager {
  public soundIsAllowed = false;

  private sounds = {
    beep: new Howl({ src: ["assets/sounds/beep_2.wav"] }),
    close: new Howl({ src: ["assets/sounds/beep_4.wav"], volume: 0.5 }),
    ring: new Howl({ src: ["assets/sounds/Lead_4.wav"] }),
  };

  play(sound: keyof typeof this.sounds) {
    if (!this.soundIsAllowed) return;

    const s = this.sounds[sound];
    if (!s) return;

    s.play();
  }
}

export const soundManagerKey = "soundManagerKey";
