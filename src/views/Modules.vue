<template>
  <div>
    <b-list-group class="side-menu" v-if="config">
      <b-list-group-item v-for="item in Object.keys(config)" :key="item">
        <b-button
          block
          variant="light"
          @click="showTable(config[item], item)"
          >{{ item }}</b-button
        >
      </b-list-group-item>
    </b-list-group>
    <div class="page">
      <b-table
        v-if="table"
        :striped="true"
        :bordered="true"
        :borderless="true"
        :outlined="false"
        :small="true"
        :hover="true"
        :dark="false"
        :fixed="false"
        :foot-clone="false"
        :no-border-collapse="false"
        head-variant="dark"
        stacked
        :items="table.rows"
        :fields="table.columns"
      >
        <template v-slot:cell()="data">
          <b-list-group>
            <b-list-group-item
              v-for="item in Object.keys(data.value)"
              :key="item"
              >{{ item }} = {{ data.value[item] }}</b-list-group-item
            >
          </b-list-group>
        </template>
      </b-table>
      <codemirror
        ref="codemirror"
        :value="code"
        :options="cmOptions"
        mode="text/x-csrc"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Config from "@/ORM/models/Config";
import Template from "@/ORM/models/Template";

import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/clike/clike";

import { BButton, BListGroup, BListGroupItem } from "bootstrap-vue";

export default {
  name: "Modules",
  components: {
    BButton,
    BListGroup,
    BListGroupItem,
    codemirror
  },
  data() {
    return {
      config: null,
      table: null,
      code: "",
      cmOptions: {
        tabSize: 2,
        mode: "text/x-csrc",
        theme: "default",
        lineNumbers: true,
        line: true,
        readOnly: true
      }
    };
  },
  created() {
    try {
      Config.$fetch().then(data => {
        this.config = data;
      });
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    showTable(table, name) {
      this.table = {
        columns: Object.keys(table),
        rows: [{ ...table }]
      };
      Template.$get({
        params: {
          name
        }
      }).then(data => {
        this.code = data;
      });
    }
  }
};
</script>

<style>
.CodeMirror-line {
  text-align: left;
}
.CodeMirror {
  border: 1px solid #eee;
  height: auto;
}
</style>
<style lang="scss" scoped>
.side-menu {
  position: absolute;
  top: 56px;
  left: 0;
}

.page {
  margin-left: 200px;
}
</style>
