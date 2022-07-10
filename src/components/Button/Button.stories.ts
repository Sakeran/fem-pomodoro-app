import ButtonSvelte from "./Button.svelte";

console.log(ButtonSvelte);



export default {
  title: "Button",
  Component: ButtonSvelte,
};

const Template = (args) => ({
  Component: ButtonSvelte,
  props: args,
});

export const Normal = Template.bind({});
Normal.args = {
  text: "Apply",
  disabled: false
}

export const Disabled = Template.bind({});
Disabled.args = {
  ...Normal.args,
  disabled: true
}
