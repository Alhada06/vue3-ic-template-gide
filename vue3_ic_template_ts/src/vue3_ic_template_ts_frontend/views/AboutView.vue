<script setup lang="ts">
import { ref } from 'vue'
import { canisterId, createActor } from '@declarations/vue3_ic_template_ts_backend'
const greeting = ref<string | null>('')
// eslint-disable-next-line no-undef
const input = ref('')
const actor = createActor(canisterId, { agentOptions: { host: process.env.VITE_HOST } })
const greet = async () => {
  try {
    actor.greet(input.value).then((greet: string | null) => {
      greeting.value = greet || ''
    })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="about">
    <form @submit.prevent="greet" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <input
          v-model="input"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="insert you name"
          required
        />
      </div>

      <div class="flex items-center justify-between">
        <button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Call Greet
        </button>
      </div>
    </form>
    <div v-if="greeting" class="p-4 text-2xl">{{ greeting }}</div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
