import type { SettingsOptions } from "../stores/settings";

type NotificationMessageCreator = (duration: number) => {
  title: string;
  message: string;
};

type NotificationMessages = {
  [T in keyof SettingsOptions["time"]]: NotificationMessageCreator;
};

const messages: NotificationMessages = {
  pomodoro: function (duration: number): { title: string; message: string } {
    return {
      title: "Pomodoro complete!",
      message: `You completed a ${duration}-minute pomodoro!`,
    };
  },
  shortBreak: function (duration: number): { title: string; message: string } {
    return {
      title: "Short break is up!",
      message: `Your ${duration}-minute short break is complete. Time to focus!`,
    };
  },
  longBreak: function (duration: number): { title: string; message: string } {
    return {
      title: "Your long break is over!",
      message: `Your ${duration}-minute long break is complete. Time to focus!`,
    };
  },
};

export function makeNotificationMessage(
  timerType: SettingsOptions["timerType"],
  duration: number
) {
  return messages[timerType](duration);
}
