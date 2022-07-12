import CheckboxSvelte from "./Checkbox.svelte";

export default {
  Component: CheckboxSvelte,
  title: "Checkbox",
};

const Template = (args) => ({
  Component: CheckboxSvelte,
  props: args,
});

export const Unchecked = Template.bind({});
Unchecked.args = {
  label: "Option",
  checked: false,
};

export const Checked = Template.bind({});
Checked.args = {
  label: "Option",
  checked: true,
};
