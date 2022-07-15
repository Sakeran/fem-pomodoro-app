import { action } from "@storybook/addon-actions";

import SettingsProviderSvelte from "../storyDecorators/SettingsProvider.svelte";
import SettingsModalSvelte from "./SettingsModal.svelte";

export default {
  Component: SettingsModalSvelte,
  title: "Settings Modal",
  argTypes: {
    close: { action: "closed" },
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
  Component: SettingsModalSvelte,
  props: args,
  on: {
    close: action('close'),
  },
});

export const Initial = Template.bind({});
Initial.args = {};

export const CustomSettings = Template.bind({});
CustomSettings.parameters = {
  storeValues: {
    time: {
      pomodoro: 13,
    },
    font: "serif",
    color: "magenta",
    sound: true,
  },
};
