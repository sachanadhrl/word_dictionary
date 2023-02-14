<script setup>
import { ChevronLeftIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import store from '../store'
import WordCollapse from '../components/WordCollapse.vue'

const route = useRoute()

const loadingState = computed(() => store.state.word.loading)

const wordData = computed(() => store.state.word.data)
store.dispatch("getWord", route.params.query)

</script>

<template>
  <router-link to="/" class="btn btn-link">
    <ChevronLeftIcon />
    Search
  </router-link>
  
  <div class="mt-3">
    <div v-if="loadingState" class="flex justify-center">
      <ArrowPathIcon class="w-5 h-5 animate-spin" />
    </div>
    <WordCollapse v-else v-for="(words, index) in wordData" :key="index" :wordNumber="index+1" :wordData="words" />
  </div>
</template>