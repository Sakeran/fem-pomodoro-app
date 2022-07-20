import { Ticker } from "../lib/ticker";
import { Readable, readable } from "svelte/store";

type TimerData = {
  ellapsedTime: number;
  running: boolean;
};

export type TimerStore = Readable<TimerData>;

export function createTimer() {
  const ticker = new Ticker();

  let callback;

  const cleanUp = () => {
    ticker.stop();
    if (callback) ticker.clearOnTick(callback);
  };

  // Timer Data
  const data: TimerData = {
    ellapsedTime: 0,
    running: false,
  };

  // Timer API

  let onChange: () => void;

  const setData = (newData: Partial<TimerData>) => {
    Object.assign(data, newData);

    if (onChange) onChange();
  };

  const start = () => {
    if (data.running) return;

    ticker.start();
    setData({ running: true });
  };

  const pause = () => {
    if (!data.running) return;

    ticker.stop();
    setData({ running: false });
  };

  const restart = () => {
    ticker.stop();
    
    setData({
      ellapsedTime: 0,
      running: false,
    });
  };

  // Timer Store
  const timer = readable(data, (set) => {
    // Ticker Callback
    callback = (seconds) => {
      data.ellapsedTime += seconds;
      set(data);
    };

    // Set store on external data change
    onChange = () => set(data);

    ticker.onTick(callback);

    return () => cleanUp();
  });

  return Object.assign(timer, { start, pause, restart });
}
