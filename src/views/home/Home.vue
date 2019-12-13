<template>
  <div class="home">
    <div class="row">
      <div class="col-6 home-box">
        <small>Você gastou</small>
        <div class="money" v-money-format="totals.totalSpent"></div>
        <small>em 89 compras</small>
      </div>
      <div class="col-6 home-box">
        <small>A média de gastos é de</small>
        <div class="money" v-money-format="totals.average"></div>
      </div>
      <div class="col-6 home-box">
        <small>O maior gasto foi de</small>
        <div class="money" v-money-format="totals.biggest.value"></div>
        <small>no dia 12/02/2019</small>
      </div>
      <div class="col-6 home-box">
        <small>O menor gasto foi de</small>
        <div class="money" v-money-format="totals.lowest.value"></div>
        <small>no dia 03/02/2019</small>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data: () => ({
    expenses: []
  }),
  created () {
    this.getData()
  },
  computed: {
    totals () {
      const { expenses: exp } = this
      const values = {
        totalSpent: 0,
        average: 0,
        biggest: {},
        lowest: {}
      }
      if (exp.length) {
        values.totalSpent = exp.map(e => parseFloat(e.value)).reduce((acc, cur) => acc + cur, 0)

        values.average = values.totalSpent / exp.length

        values.biggest = exp.sort((a, b) => parseFloat(b.value) - parseFloat(a.value))[0]
        values.lowest = exp.sort((a, b) => parseFloat(a.value) - parseFloat(b.value))[0]
      }
      return values
    }
  },
  methods: {
    getData () {
      const ref = this.$firebase.database().ref(`/${window.uid}`)

      ref.on('value', data => {
        const values = data.val()
        this.expenses = Object.keys(values).map(i => values[i])

        console.log(this.expenses)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 15px;;
  .home-box {
    width: 100%;
    height: calc(50vh - 15px);
    display: flex;
    font-size: 30pt;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(34, 35, 51, 0.15);
    small {
      font-size: 1.3rem;
    }
    .money {
      color: var(--featured);
    }
    &:nth-child(2), &:nth-child(4){
      border-left: none;
    }
    &:nth-child(3), &:nth-child(4){
      border-top: none;
    }
  }
}
</style>
