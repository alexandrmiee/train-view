<script>
import { Bar } from "vue-chartjs";
import { mapState } from "vuex";

import Dataset from "./dataset";
import { datasets, labels } from "./__mock__/bars";

const ds = new Dataset(datasets(10));

export default {
  extends: Bar,
  data() {
    return {
      chart: {
        labels: labels(10),
        datasets: ds.datasets
      },
      options: {
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
    };
  },
  computed: {
    ...mapState("websocket", ["message", "connected"])
  },
  watch: {
    message(message) {
      const { module, data } = message.value;
      if (module && data) {
        this.chart.labels.push(module);
        this.chart.datasets.add({ data: data.train.route, label: module });

        this.$data._chart.update();
      }
    }
  },
  mounted() {
    this.renderChart(this.chart, this.options);
  }
};
</script>

<style></style>
