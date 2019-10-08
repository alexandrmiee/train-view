import { generateColor } from "./constants";
import { isArray } from "util";

const colors = generateColor();

export default class {
  datasets;
  _maxBars;

  constructor(datasets = [], maxBars = 20) {
    if (isArray(datasets) || !datasets) this.datasets = datasets;
    else throw new Error("datasets is not instanse of Array");
    this._maxBars = maxBars;
  }

  add = ({ data, label }) => {
    const dataset = this.datasets.find(ds => (ds.label = label));
    if (!dataset) {
      this.datasets.push({
        label,
        data: [data],
        backgroundColor: [colors.next()], //new color for new label
        borderWidth: 1
      });
    } else {
      dataset.data.push(data);
      dataset.backgroundColor.push(dataset.backgroundColor[0]); //repeat color for that label
      if (dataset.data.length > 20) {
        dataset.data.shift();
        dataset.backgroundColor.shift();
      }
    }
  };
}
