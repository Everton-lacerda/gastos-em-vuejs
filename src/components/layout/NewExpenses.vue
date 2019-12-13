<template>
<div class="w-100 d-flex justify-content-center pt-3">
  <button class="btn btn-outline-primary btn-add" @click="showModal = true">
   <i class="fa fa-plus"></i>
   Add Gasto
  </button>
  <form @submit.prevent="submit()">
    <div class="modal fade"  :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Adicionar novo gasto</h5>
                <button type="button" class="close" @click="closeModal()">
                <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="form-group col-8">
                        <label for="">Descrição</label>
                        <input type="text" class="form-control" v-model="form.description" required >
                    </div>
                    <div class="form-group col-4">
                        <label for="">Valor (R$)</label>
                        <input type="text" class="form-control" v-model="form.value" required>
                    </div>
                    <div class="form-group col-12 flex-column d-flex align-items-center">
                        <input type="file" class="d-none" accept="image/*" ref="input" @change="handleFile($event)">
                        <button type="button" class="mt-4 btn w-50 btn-outline-secondary" @click="openFileDialog()">Adicionar Comprovante</button>
                        <div class="mt-2" v-if="form.receipt">
                          {{form.receipt.name}}
                          <button class="btn badge badge-light" @click="form.receipt = ''">
                            <i class="fa fa-trash text-danger"></i>
                          </button>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary"  @click="closeModal()">Fechar</button>
                <button class="btn btn-primary" :disabled="loading">
                  <template v-if="loading">
                    <i class="fa fa-spin fa-spinner"></i>
                    incluindo...
                  </template>
                  <template>
                    Incluir Novo Gasto
                  </template>
                </button>
            </div>
            </div>
        </div>
    </div>
  </form>
  <div class="modal-backdrop fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}"></div>
</div>

</template>
<script>
export default {
  data: () => ({
    showModal: false,
    loading: false,
    form: {
      receipt: '',
      description: '',
      value: ''
    }
  }),
  computed: {
    fileName () {
      const { receipt } = this.form
      if (receipt) {
        const split = receipt.name.split('.')
        return `${split[0]}-${new Date().getDate()}.${split[1]}`
      } else {
        return ''
      }
    }
  },
  methods: {
    openFileDialog () {
      this.$refs.input.value = null
      this.$refs.input.click()
    },
    handleFile (e) {
      this.form.receipt = e.target.files[0]
    },
    async submit () {
      let url = ''
      this.loading = true

      try {
        this.$root.$emit('Spinner::show')
        const ref = this.$firebase.database().ref(window.uid)
        const id = ref.push().key

        if (this.form.receipt) {
          const snapshot = await this.$firebase.storage().ref(window.uid).child(this.fileName).put(this.form.receipt)

          url = await snapshot.ref.getDownloadURL()
        }

        const payload = {
          id,
          ...this.form,
          receipt: url,
          createdAt: new Date().getTime()
        }
        ref.child(id).set(payload, err => {
          this.$root.$emit('Spinner::hide')
          if (err) {
            this.$root.$emit('Notification::show', {
              type: 'danger',
              message: 'Não foi possivel inserir o gasto, tente novamente'
            })
            this.loading = false
          } else {
            this.$root.$emit('Notification::show', {
              type: 'success',
              message: 'Gasto inserido com sucesso!'
            })
            this.closeModal()
            this.loading = false
          }
        })
      } catch (err) {
        this.$root.$emit('Notification::show', {
          type: 'danger',
          message: 'Não foi possivel inserir o gasto, tente novamente'
        })
      } finally {
        this.$root.$emit('Spinner::hide')
        this.loading = false
      }
    },
    closeModal () {
      this.showModal = false
    }
  }
}
</script>
<style lang="scss" scoped>
.modal {
    color: var(--dark)
}
.btn-add:hover {
  color: var(--light) !important;
}
</style>
