import ButtonSvelte from "./Button.svelte";

export default {
  title: "Button",
  Component: ButtonSvelte,
  parameters: {
    actions: {
      handles: ["click"],
    },
  },
};

const Template = (args) => ({
  Component: ButtonSvelte,
  props: args,
});

export const Normal = Template.bind({});
Normal.args = {
  text: "Apply",
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Normal.args,
  disabled: true,
};
