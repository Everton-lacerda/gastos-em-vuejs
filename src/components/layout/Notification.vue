<template>
  <div
  v-if="show" class="alert alert-dismissible fade show" role="alert" :class="`alert-${type}`">
   {{ message }}
    <button type="button" class="close" @click="close()">
        <span>&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: false,
    message: '',
    type: 'danger'
  }),
  methods: {
    close () {
      this.show = false
      this.type = 'danger'
      this.message = ''
    }
  },
  created () {
    this.$root.$on('Notification::show', playload => {
      this.show = true
      this.type = playload.type
      this.message = playload.message

      setTimeout(() => { this.close() }, playload.timeout || 4000)
    })
  }
}
</script>

<style scoped>
.alert {
    top: 20px;
    right: 20px;
    z-index: 10000;
    max-width: 400px;
    position: absolute;
}
</style>
