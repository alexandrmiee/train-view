<template>
  <div>
    <b-button block @click="startTest" :disabled="!connected">Старт</b-button>
    <chart-bar style="position: relative; height:40vh; width:80vw" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ChartBar from "@/components/ChartBar.vue";
import { BButton } from "bootstrap-vue";

export default {
  name: "Control",
  components: {
    ChartBar,
    BButton
  },
  computed: {
    ...mapState("websocket", ["message", "connected"])
  },
  mounted() {
    this.connect({ server: "ws://127.0.0.1:3000/ws", timeout: 1000 });
  },
  methods: {
    ...mapActions("websocket", ["sendMessage", "connect"]),
    startTest() {
      this.sendMessage({ command: "start" });
    }
  }
};
</script>

<style></style>
