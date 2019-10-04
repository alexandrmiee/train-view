<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

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

import {
  BNavbar,
  BCollapse,
  BNavbarNav,
  BNavItemDropdown,
  BDropdownItem,
  BNavForm,
  BButton,
  BFormInput,
  BNavbarToggle,
  BNavbarBrand,
  BListGroup,
  BListGroupItem
} from "bootstrap-vue";

export default {
  name: "home",
  components: {
    BNavbar,
    BCollapse,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BNavForm,
    BButton,
    BFormInput,
    BNavbarToggle,
    BNavbarBrand,
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
