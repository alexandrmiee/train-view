let ws = null;
let connectionTimeout = null;

const reconnect = (server, timeout) => {
  ws = null;
  connectionTimeout = setInterval(() => {
    /**TODO: subscribe */
    ws = new WebSocket(server);
  }, timeout);
};

export default {
  namespaced: true,
  state: {
    connected: false,
    message: null
  },
  actions: {
    sendMessage(__store, data) {
      if (ws) ws.send(data);
      return new Error("not connected");
    },

    connect({ commit }, { server, timeout }) {
      if (ws) ws.close();
      ws = new WebSocket(server);

      ws.onopen = () => {
        commit(`updateProp`, { prop: "connected", value: true });
        clearInterval(connectionTimeout);
        connectionTimeout = null;
      };

      ws.onmessage = data =>
        commit(`updateProp`, { prop: "message", value: data });
      ws.onerror = () => {
        commit(`updateProp`, { prop: "connected", value: false });
        reconnect(server, timeout);
      };

      ws.onclose = () => {
        commit(`updateProp`, { prop: "connected", value: false });
        reconnect(server, timeout);
      };
    }
  },
  mutations: {
    updateProp(state, { prop, value }) {
      state[prop] = value;
    }
  }
};
