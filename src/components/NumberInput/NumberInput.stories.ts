import { within } from "@storybook/testing-library";

import NumberInputSvelte from "./NumberInput.svelte";

export default {
  Component: NumberInputSvelte,
  title: "NumberInput",
};

const Template = (args) => ({
  Component: NumberInputSvelte,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  id: "ni-default",
  label: "pomodoro",
  placeholder: 0,
  value: 0,
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await canvas.getByText("increment");
  await canvas.getByText("decrement");
};

export const WithValue = Template.bind({});
WithValue.args = {
  ...Default.args,
  id: "ni-with-value",
  value: 5,
};

export const WithInvalidValue = Template.bind({});
WithInvalidValue.args = {
  ...Default.args,
  id: "ni-with-invalid-value",
  value: -5,
};
