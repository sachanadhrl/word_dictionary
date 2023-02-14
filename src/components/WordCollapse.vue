<script setup>
import { SpeakerWaveIcon } from "@heroicons/vue/24/outline"
import { ref } from "vue"
import { useRouter } from "vue-router"

import store from "../store"

const router = useRouter()

const props = defineProps({
  wordData: Object,
  wordNumber: Number,
})

const tabIndex = ref(1)

const setCurrentTab = (tabNumber) => {
  tabIndex.value = tabNumber
}

const wordLink = (query) => {
  store.dispatch("getWord", query)
    .then(() => {
      router.push({ name: 'search', params: { query: query } })
    })  
}

const playPronounce = (audioLink) => {
  const audio = new Audio(audioLink)
  audio.play()
}
</script>

<template>
  <div
    class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-3"
  >
    <input type="checkbox" />
    <div class="collapse-title">
      <h1 class="oswalf">{{ wordNumber }}. {{ wordData?.word }}</h1>
    </div>
    <div class="collapse-content">
      <div v-for="(pronounce, index) in wordData?.phonetics" :key="index" class="flex items-center gap-1.5">
        <p class="text-sky-500">
          {{ pronounce.text }}
        </p>
        <button v-show="pronounce.audio" class="btn btn-link" @click="playPronounce(pronounce.audio)">
          <SpeakerWaveIcon />
        </button>
      </div>
      <div class="tabs w-full flex-nowrap capitalize overflow-x-auto mt-3">
        <a
          v-for="(meaning, tabNumber) in wordData?.meanings"
          :key="tabNumber + 1"
          :class="[tabNumber + 1 === tabIndex ? 'tab-active' : '']"
          @click="setCurrentTab(tabNumber + 1)"
          class="tab tab-lifted"
        >
          {{ meaning.partOfSpeech }}
        </a>
      </div>

      <div
        v-for="(meaning, tabNumber) in wordData?.meanings"
        :key="tabNumber + 1"
        :class="[tabNumber + 1 === tabIndex ? 'block' : 'hidden']"
        class="tabs-content text-sm py-2.5"
      >
        <p class="font-semibold uppercase">
          Definitions
          <span class="text-slate-400">{{ meaning?.definitions.length }}</span>
        </p>

        <dl v-for="(item, index) in meaning?.definitions" :key="index">
          <dt class="font-medium">{{ index +1 }}. {{ item.definition }}</dt>
          <dd>{{ item.example }}</dd>
        </dl>

        <div class="divider my-1" />

        <div class="grid grid-cols-2">
          <div>
            <p class="font-semibold uppercase">
              Synonyms
              <span class="text-slate-400">
                {{ meaning?.synonyms?.length }}
              </span>
            </p>
            <ul v-if="meaning?.synonyms">
              <li v-for="(synonym, index) in meaning?.synonyms" :key="index">
                <button class="btn btn-link" @click="wordLink(synonym)">
                  {{ synonym }}
                </button>
              </li>
            </ul>
          </div>
          <div>
            <p class="font-semibold uppercase">
              Antonyms
              <span class="text-slate-400">
                {{ meaning?.antonyms?.length }}
              </span>
            </p>
            <ul v-if="meaning?.antonyms">
              <li v-for="(antonym, index) in meaning?.antonyms" :key="index">
                {{ antonym }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
