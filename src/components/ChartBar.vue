<script>
import { Bar } from "vue-chartjs";
import { mapActions } from "vuex";

export default {
  extends: Bar,
  data() {
    return {
      chart: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
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
  mounted() {
    this.renderChart(this.chart, this.options);
    setInterval(
      function() {
        this.chart.labels.shift();
        this.chart.labels.push("e");
        this.chart.datasets[0].data.shift();
        this.chart.datasets[0].data.push(Math.random());
        this.renderChart(this.chart, this.options);
      }.bind(this),
      10000
    );
    this.connect({ server: "ws://127.0.0.1:3000/ws", timeout: 10000 });
  },
  methods: {
    ...mapActions("websocket", ["sendMessage", "connect"])
    // updateChat(){

    // }
  }
};
</script>

<style></style>
