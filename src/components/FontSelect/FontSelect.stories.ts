import FontSelectSvelte from "./FontSelect.svelte";

export default {
  Component: FontSelectSvelte,
  title: "Font Select",
};

const Template = (args) => ({
  Component: FontSelectSvelte,
  props: args,
});

export const NoSelection = Template.bind({});
NoSelection.args = {};

export const Selection = Template.bind({});
Selection.args = {
  selection: "mono",
};
