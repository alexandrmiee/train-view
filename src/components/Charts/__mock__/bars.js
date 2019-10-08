import { generateColor } from "../constants";

const testData = {
  label: "",
  data: [],
  backgroundColor: [], //new color for new label
  borderWidth: 1
};

const colors = generateColor();

export const datasets = (numberOfDatasets, numberOfDataInSet) => {
  const array = [...new Array(numberOfDatasets)].map(() => {
    return { ...testData };
  });
  array.forEach((ds, index) => {
    const color = colors.next();
    ds.label = `#debug-dataset-${index}`;
    ds.data = [...new Array(numberOfDataInSet)].map(
      () => Math.floor(Math.random() * 3) + 3
    );
    ds.backgroundColor = color.value;
  });

  return array;
};

export const labels = count => {
  const array = [...new Array(count)].map((_, index) => `#label-${index}`);
  return array;
};
