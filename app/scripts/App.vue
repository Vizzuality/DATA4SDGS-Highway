<template>
  <div id="app">
    <div class="l-header">
      <router-view name="Header"></router-view>
    </div>
    <div class="l-main">
      <router-view></router-view>
    </div>
    <div class="l-footer">
      <router-view name="Footer"></router-view>
    </div>
  </div>
</template>

<style></style>

<script>

export default {
  name: 'app',
};
</script>
