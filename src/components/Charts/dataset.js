import { datasets, labels } from "./__mock__/bars";

import Chart from "chart.js";
import { generateColor } from "./constants";

const colors = generateColor();

class Dataset {
  datasets;
  _maxBars;

  constructor(datasets = [], maxBars = 20) {
    if (Array.isArray(datasets) || !datasets) this.datasets = datasets;
    else throw new Error("datasets is not instanse of Array");
    this._maxBars = maxBars;
  }

  add = ({ data, name }) => {
    const datasetIndex = this.datasets.findIndex(ds => ds.label === name);

    if (datasetIndex === -1) {
      this.datasets.push({
        label: name,
        data: [data],
        backgroundColor: colors.next().value, //new color for new label
        borderWidth: 1
      });
    } else {
      this.datasets[datasetIndex].data.push(data);
      if (this.datasets[datasetIndex].data.length > 20) {
        this.datasets[datasetIndex].data.shift();
      }
    }
  };
}

export class ChartBar extends Chart {
  datasets;
  labels;
  chart;

  constructor(canvas = document.getElementById("chart"), size = 1) {
    const ds = new Dataset(datasets(size, 10));
    const lbls = labels(10);
    const chart = super(canvas, {
      type: "bar",
      data: {
        labels: lbls,
        datasets: ds.datasets
      },
      options: {
        responsive: true,
        legend: {
          position: "top"
        },
        title: {
          display: true,
          text: "Chart.js Bar Chart"
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
    this.datasets = ds;
    this.labels = lbls;
    this.chart = chart;
  }

  add({ data, name, label }) {
    this.datasets.add({ data, name });
    if (label) {
      if (this.labels.length > 20) {
        this.labels.shift();
      }
      this.labels.push(label);
    }
    return this;
  }

  updateChart() {
    this.chart.update();
    return this;
  }

  test(times = 10, timeout = 1000) {
    setTimeout(
      function() {
        if (times)
          this.add({
            data: Math.floor(Math.random() * 3) + 3,
            name: "#debug-dataset-0",
            label: `step-${times}`
          })
            .updateChart()
            .test(times - 1);
      }.bind(this),
      timeout
    );
  }
}
