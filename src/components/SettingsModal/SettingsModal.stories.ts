import CenteredComponentSvelte from "../storyDecorators/CenteredComponent.svelte";
import SettingsProviderSvelte from "../storyDecorators/SettingsProvider.svelte";
import SettingsModalSvelte from "./SettingsModal.svelte";

export default {
  Component: SettingsModalSvelte,
  title: "Settings Modal",
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
});

export const Initial = Template.bind({});
Initial.args = {};
