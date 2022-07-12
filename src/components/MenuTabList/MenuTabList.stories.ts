import MenuTabListSvelte from "./MenuTabList.svelte";

export default {
  Component: MenuTabListSvelte,
  title: "Menu Tab List",
};

const Template = (args) => ({
  Component: MenuTabListSvelte,
  props: args,
});

export const FirstTab = Template.bind({});
FirstTab.args = {
  options: ["timer", "system"],
  label: "Options Page",
  activeTab: 0,
};

export const SecondTab = Template.bind({});
SecondTab.args = {
  ...FirstTab.args,
  activeTab: 1,
};
