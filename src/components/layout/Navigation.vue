<template>
  <ul class="nav flex-column justify-content-between">
    <div>
      <router-link
      v-for="(router, i) in routerLinks" :key="i"
      class="nav-link pt-2"
      :to="{name: router.name}"
      exact
      exact-active-class="active"
    >
      <i class="fa" :class="`fa-${router.meta.icon}`"></i>
      {{ router.meta.title }}
    </router-link>
    <new-expense class="mt-3" />
    </div>
    <btn-logout />
</ul>
</template>
<script>
import NewExpense from './NewExpenses'
import BtnLogout from './Logout'
export default {
  name: 'navigation',
  components: {
    BtnLogout,
    NewExpense
  },
  computed: {
    routerLinks () {
      return this.$router.options.routes.filter(router => router.name !== 'login')
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
    margin-left: -15;
    height: calc(100vh - 65px);
    .nav-link {
        color: var(--bg-dashbord-text);
        transition: .4s;
        &.active {
          color: var(--bg-dashbord-text-active);
          background-color: transparent;
        }
        &:hover {
          color: var(--bg-dashbord-text-active);
           background-color: var(--bg-text-active);
        }
    }
}
</style>
