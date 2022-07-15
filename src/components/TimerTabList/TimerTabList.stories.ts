import { action } from "@storybook/addon-actions";
import SettingsProviderSvelte from "../storyDecorators/SettingsProvider.svelte";
import TimerTabList from "./TimerTabList.svelte";

export default {
  Component: TimerTabList,
  title: "Timer Tab List",
  argTypes: {
    activeTimer: {
      options: ["pomodoro", "shortBreak", "longBreak"],
      control: { type: "radio" },
    },
    selectTimerType: { action: "selectTimerType" },
  },
  parameters: {
    backgrounds: {
      default: "background",
      values: [{ name: "background", value: "#1E213F" }],
    },
  },
  decorators: [
    (_story, { parameters: { storeValues } }) => ({
      Component: SettingsProviderSvelte,
      props: {
        storeValues,
      },
    }),
  ],
};

const Template = (args) => ({
  Component: TimerTabList,
  props: args,
  on: {
    selectTimerType: action("selectTimerType"),
  },
});

export const Default = Template.bind({});
Default.args = {
  activeTimer: "pomodoro",
};
Default.parameters = {
  storeValues: {
    color: "red",
  },
};

export const BlueUI = Template.bind({});
BlueUI.args = {
  activeTimer: "pomodoro",
};
BlueUI.parameters = {
  storeValues: {
    color: "blue",
  },
};

export const MagentaUI = Template.bind({});
MagentaUI.args = {
  activeTimer: "pomodoro",
};
MagentaUI.parameters = {
  storeValues: {
    color: "magenta",
  },
};
