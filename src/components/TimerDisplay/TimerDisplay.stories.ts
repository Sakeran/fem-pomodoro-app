import SettingsProviderSvelte from "../storyDecorators/SettingsProvider.svelte";
import TimerDisplay from "./TimerDisplay.svelte";

export default {
  Component: TimerDisplay,
  title: "Timer Display",
  argTypes: {
    percentageComplete: {
      control: {
        type: "range",
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
  },
  parameters: {
    backgrounds: {
      default: "background",
      values: [{ name: "background", value: "#1E213F" }],
    },
    actions: {
      handles: ["click"],
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
  Component: TimerDisplay,
  props: args,
  on: {},
});

export const Default = Template.bind({});
Default.args = {
  percentageComplete: 0,
  secondsRemaining: 60 * 13 + 47,
  actionName: "restart",
};
Default.parameters = {
  storeValues: {
    color: "red",
  },
};

export const SerifFont = Template.bind({});
SerifFont.args = {
  ...Default.args,
  actionName: "start",
};
SerifFont.parameters = {
  storeValues: {
    font: "serif",
  },
};

export const MonospaceFont = Template.bind({});
MonospaceFont.args = {
  ...Default.args,
  actionName: "pause",
};
MonospaceFont.parameters = {
  storeValues: {
    font: "mono",
  },
};
