// import ButtonSvelte from "./Button.svelte";

import { action } from "@storybook/addon-actions";
import MenuBar from "./MenuBar.svelte";

export default {
  title: "Menu Bar",
  Component: MenuBar,
  parameters: {
    backgrounds: {
      default: "background",
      values: [{ name: "background", value: "#1E213F" }],
    },
  },
  argTypes: {
    openSettings: { action: "openSettings" },
    openHelp: { action: "openHelp" },
  },
};

const Template = (args) => ({
  Component: MenuBar,
  props: args,
  on: {
    openSettings: action("openSettings"),
    openHelp: action("openHelp"),
  },
});

export const Default = Template.bind({});
