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
      if (message.command && message.command === "data") {
        this.chart.labels.shift();
        this.chart.labels.push(message.label);
        this.chart.datasets[0].data.shift();
        this.chart.datasets[0].data.push(message.data);
        this.renderChart(this.chart, this.options);
      }
    }
  },
  mounted() {
    this.renderChart(this.chart, this.options);
  }
};
</script>

<style></style>
