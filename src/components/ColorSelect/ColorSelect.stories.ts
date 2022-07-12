import ColorSelectSvelte from "./ColorSelect.svelte";


export default {
  Component: ColorSelectSvelte,
  title: "Color Select",
};

const Template = (args) => ({
  Component: ColorSelectSvelte,
  props: args,
});

export const NoSelection = Template.bind({});
NoSelection.args = {};

export const Selection = Template.bind({});
Selection.args = {
  selection: "magenta",
};
