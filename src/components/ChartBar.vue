<script>
import { Bar } from "vue-chartjs";
import { mapState } from "vuex";

export default {
  extends: Bar,
  data() {
    return {
      chart: {
        labels: ["start"],
        datasets: [
          {
            label: "# states",
            data: [1],
            borderWidth: 1
          }
        ]
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
        this.chart.datasets[0].data.push(data.train.route);
        if (this.chart.labels.length > 20) {
          this.chart.labels.shift();
          this.chart.datasets[0].data.shift();
        }
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
