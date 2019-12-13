import Vue from 'vue'

Vue.directive('money-format', (el, { value }) => {
  el.innerHTML = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
    minimumFractionDigits: 2
  }).format(value || 0)
})
