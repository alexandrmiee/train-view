<template>
  <div class="chart-bar">
    <div class="chart-bar__area area">
      <canvas id="chart" class="area__canvas" width="100" height="40"></canvas>
    </div>
    <b-button class="chart-bar__button" @click="mock">Проверка</b-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ChartBar } from "./dataset";

export default {
  computed: {
    ...mapState("websocket", ["message", "connected"])
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    message(message) {
      const { module, data } = message.value;
      if (module && data) {
        this.chart.labels.push(module);
        this.chart.datasets.add({ data: data.train.route, label: module });
        this.$data._chart.updateChart();
      }
    }
  },
  mounted() {
    this.chart = new ChartBar(document.getElementById("chart"));
  },
  methods: {
    mock() {
      this.chart.test();
    }
  }
};
</script>

<style lang="scss" scoped>
.chart-bar {
  position: relative;
  width: 1800px;

  &__area {
    overflow-x: auto;

    .area__canvas {
      position: absolute;
      left: 0;
      top: 0;
      pointer-events: none;
    }
  }

  &__button {
    position: absolute;
    top: 10px;
    left: 40px;
  }
}
</style>
