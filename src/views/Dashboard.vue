<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import router from '../router';
import store from '../store';

const searchQuery = ref({
  query: ''
})

const errorMsg = ref('')
const errorStatus = ref(false)

function searchTerm() {
  store.dispatch("getWord", searchQuery.value.query)
    .then(() => {
      router.push({ name: 'search', params: { query: searchQuery.value.query } })
    })
    .catch((err) => {
      errorMsg.value = err.message
      errorStatus.value = true
      setTimeout(() => {
        errorMsg.value = ''
        errorStatus.value = false
      }, 5000);
    })
}
</script>

<template>
  <div v-show="errorStatus" class="toast toast-top toast-end -top-56 z-50">
    <div class="alert alert-error">
      <div>
        <span>{{ errorMsg }}</span>
      </div>
    </div>
  </div>
  
  <h1 class="text-center mb-3">Word Dictionary</h1>

  <form @submit.prevent="searchTerm">
    <div class="form-control flex-1">
      <label class="input-group input-group-md">
        <span>
          <MagnifyingGlassIcon class="w-4 h-4" />
        </span>
        <input type="text" v-model="searchQuery.query" placeholder="Type here" class="w-full input input-bordered focus:hover:ring-0" />
      </label>
    </div>
  </form>
</template>