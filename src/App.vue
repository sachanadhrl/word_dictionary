<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="w-full p-5" :class="[ route.name === 'dashboard' ? 'absolute top-1/2 -translate-y-1/2' : '' ]">
    <router-view></router-view>
  </div>
</template>
