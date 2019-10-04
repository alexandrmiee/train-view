let ws = null;
let connectionTimeout = null;

const stopReconnect = () => {
  clearInterval(connectionTimeout);
  connectionTimeout = null;
};

// const close = () => {
//   if (ws) ws.close();
//   stopReconnect();
// };

const reconnect = (server, timeout, commit) => {
  if (ws) ws.close();
  ws = null;
  stopReconnect();
  connectionTimeout = setInterval(() => {
    /**TODO: subscribe */
    ws = new WebSocket(server);
    ws.onopen = () => {
      commit(`updateProp`, { prop: "connected", value: true });
      stopReconnect();
    };

    ws.onmessage = data => {
      console.log(data.data);
      commit(`updateProp`, { prop: "message", value: JSON.parse(data.data) });
    };
    ws.onerror = () => {
      commit(`updateProp`, { prop: "connected", value: false });
      reconnect(server, timeout, commit);
      ws.close();
    };

    ws.onclose = () => {
      commit(`updateProp`, { prop: "connected", value: false });
      reconnect(server, timeout, commit);
    };
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
      if (ws) {
        ws.send(JSON.stringify(data));
        console.log("try to send data");
      }
      return new Error("not connected");
    },

    connect({ commit }, { server, timeout }) {
      if (ws) ws.close();
      reconnect(server, timeout, commit);
    },

    close() {
      if (ws) ws.close();
      stopReconnect();
    }
  },
  mutations: {
    updateProp(state, { prop, value }) {
      state[prop] = value;
    }
  }
};
