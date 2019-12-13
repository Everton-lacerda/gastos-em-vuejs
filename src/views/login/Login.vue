<template>
  <form @submit.prevent="doLogin()" class="form-login">
      <div class="card">
        <div class="card-header text-center">
        <h1 class="mb-0">Expenses</h1>
        </div>
        <div class="card-body">
            <div class="form-group">
                <input type="email" class="form-control" placeholder="E-mail" required v-model="email">
            </div>
            <div class="form-group">
                <input type="password" class="form-control" placeholder="senha" required v-model="password">
            </div>
            <button class="btn btn-primary w-100" :disabled="loading">
                <template v-if="loading">
                  Carregando...
                  <i class="fa fa-spinner fa-spin"></i>
                </template>
                <template v-else>
                  Enviar
                  <i class="fa fa-sign-in-alt"></i>
                </template>
            </button>
        </div>
      </div>
  </form>
</template>

<script>
export default {
  name: 'login',
  data: () => {
    return {
      loading: false,
      email: 'teste@hotmail.com',
      password: '123456'
    }
  },
  methods: {
    async doLogin () {
      this.loading = true
      const { email, password } = this
      try {
        const res = await this.$firebase.auth().signInWithEmailAndPassword(email, password)
        window.uid = res.user.uid
        this.$router.push({ name: 'home' })
      } catch (err) {
        let message = ''
        switch (err.code) {
          case 'auth/user-not-found':
            message = 'não foi possível localizar o usuário'
            break
          case 'auth/wrong-password':
            message = 'senha inválida'
            break
          default:
            message = 'não foi possível fazer o login'
        }
        this.$root.$emit('Notification::show', {
          message,
          type: 'danger'
        })
      }
      this.loading = false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (window.uid) {
        vm.$router.push({ name: 'home' })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.form-login{
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
        font-size: 18px;
    }
    .card {
        width: 550px;
        color: var(--dark)
    }
}
</style>
