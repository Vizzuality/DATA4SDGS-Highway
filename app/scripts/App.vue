<template>
  <div id="app">
    <header class="l-header">
      <router-view name="HeaderComponent"></router-view>
    </header>
    <main class="l-main">
      <router-view></router-view>
    </main>
    <footer class="l-footer">
      <router-view name="FooterComponent"></router-view>
    </footer>
  </div>
</template>

<style></style>

<script>

export default { name: 'app' };
</script>
