<template>
  <b-navbar toggleable="lg" type="dark" variant="info" tabs>
    <b-navbar-brand>Train framework</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="modules">Modules</b-nav-item>
        <b-nav-item to="control">Control</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import {
  BNavbar,
  BCollapse,
  BNavbarNav,
  BNavbarToggle,
  BNavbarBrand
} from "bootstrap-vue";

export default {
  name: "NavigationBar",
  components: {
    BNavbar,
    BCollapse,
    BNavbarNav,
    BNavbarToggle,
    BNavbarBrand
  }
};
</script>
