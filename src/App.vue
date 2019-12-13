<template>
  <div id="app">
    <base-spinner />
    <notification />
    <div class="container-fluid" v-if="isLogged">
      <div class="row">
        <div class="col-2 navigation-sidebar">
          <h2 class="app-title mb-3">Expenses</h2>
          <hr>
          <navigation />
        </div>
        <div class="col">
          <router-view/>
        </div>
      </div>
    </div>
    <router-view v-else />
  </div>
</template>

<script>

import BaseSpinner from './components/global/BaseSpinner'
import Navigation from './components/layout/Navigation'
import Notification from './components/layout/Notification'

export default {
  components: {
    BaseSpinner,
    Navigation,
    Notification
  },
  data: () => ({
    isLogged: false
  }),
  mounted () {
    this.$firebase.auth().onAuthStateChanged(user => {
      window.uid = user ? user.uid : null
      this.isLogged = !!user
      console.log(window.uid)

      this.$router.push({ name: window.ui ? 'home' : 'login' })

      setTimeout(() => {
        this.$root.$emit('Spinner::hide')
      }, 300)
    })
  }
}
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  color: var(--darker);
  background-color: var(--light-medium);
  hr {
    background-color: var(--light);
    width: 55%;
  }
  .navigation-sidebar {
    color: var(--light);
    background-color: var(--bg-dashbord);
    height: 100vh;
    padding-left: 0px;
    padding-right: 0px;
    .app-title {
      font-size: 20px;
      margin-top: 10px;
      text-align: center;
    }
  }
}
</style>
