<template>
  <div class="base-spinner fa-3x" v-if="visible">
    <div>
      <i class="fa fa-circle-notch fa-spin"></i>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      visible: true
    }
  },
  created () {
    this.$root.$on('Spinner::show', () => { this.visible = true })
    this.$root.$on('Spinner::hide', () => { this.visible = false })
  }
}
</script>
<style lang="scss" scoped>

.base-spinner {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 200000;
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--dark-medium-opacity);
    color: var(--featured);
}
</style>
