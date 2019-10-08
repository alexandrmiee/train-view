import { generateColor } from "../constants";

const testData = {
  label: "",
  data: [],
  backgroundColor: [], //new color for new label
  borderWidth: 1
};

const colors = generateColor();

export const datasets = count => {
  const array = [...new Array(count)].map(() => {
    return { ...testData };
  });
  array.forEach((ds, index) => {
    const color = colors.next();
    ds.label = `#label-${index}`;
    ds.data = [...new Array(10)].map((_, index) => index);
    ds.backgroundColor = [...new Array(10)].map(() => color.value);
  });

  return array;
};

export const labels = count => {
  const array = [...new Array(count)].map((_, index) => `#label-${index}`);
  return array;
};
