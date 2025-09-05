<script setup lang="ts">
import UserProfile from "@/components/UserProfile.vue";
</script>

<template>
  <div class="min-h-screen max-w-4xl mx-auto bg-white text-black">
    <header>
      <div class="mx-auto px-4 py-6">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <img src="/github.svg" alt="" width="32" height="32" />
            <h1 class="text-3xl font-bold">Infinite Scroll</h1>
          </div>
          <button
            class="px-4 py-2 bg-black text-white text-ml rounded-lg cursor-pointer hover:bg-black/90"
          >
            Restart
          </button>
        </div>
      </div>
    </header>

    <main class="p-4">
      <h2 class="text-[26px] font-bold pb-3">Reference Github User.</h2>
      <UserProfile />
    </main>
  </div>
</template>
