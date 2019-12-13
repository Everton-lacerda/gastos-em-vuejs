<template>
  <div class="months-navigation">
    <div v-for="(month, i) in groupedMonths" :key="i"  class="month-link">
     <div class="month-label">{{ month.month }}</div>
     <div class="value-label" v-money-format="month.total"></div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import groupBy from 'lodash.groupby'

export default {
  name: 'lista-gastos',
  data: () => ({
    expenses: []
  }),
  created () {
    this.getData()
  },
  computed: {
    groupedMonths () {
      if (this.expenses.length) {
        const months = groupBy(this.expenses, i => (
          moment(i.createdAt).format('MM/YYYY')
        ))
        const sortedMonths = Object.keys(months).sort((a, b) => {
          const pattern = 'MM/YYYY HH'
          return moment(`${a} 01`, pattern).isBefore(moment(`${b} 01`, pattern))
            ? -1
            : +1
        })

        return sortedMonths.map(month => ({
          month,
          data: months[month],
          total: months[month].map(i => parseFloat(i.value)).reduce((a, c) => a + c, 0)
        }))
      } else {
        return []
      }
    }
  },
  methods: {
    getData () {
      const ref = this.$firebase.database().ref(`/${window.uid}`)

      ref.on('value', snapshot => {
        const values = snapshot.val()
        this.expenses = Object.keys(values).map(i => values[i])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.months-navigation {
  display: flex;
  width: calc(100% + 30px);
  margin-left: - 15px;
  background-color: var(--featured-dark);
  color: white;
  .month-link {
    padding: 15px;
    cursor: pointer;
    transition: .4s;
    text-align: center;
    &:hover {
      background-color: var(--featured)
    }
    .value-label {
      color: var(--darked);
      font-size: 8pt;
    }
  }
}
</style>
