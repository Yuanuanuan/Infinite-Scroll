<script setup lang="ts">
import { useInfiniteScroll } from "@/composables/useInfiniteScroll";
import RepositoryCard from "@/components/RepositoryCard.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import UserProfile from "@/components/UserProfile.vue";

const { repositories, loading, error, hasMore, refresh } = useInfiniteScroll();
</script>

<template>
  <div class="min-h-screen max-w-4xl mx-auto bg-white text-black flex flex-col">
    <header>
      <div class="mx-auto px-4 py-6">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <img src="/github.svg" alt="" width="32" height="32" />
            <h1 class="text-3xl font-bold">Infinite Scroll</h1>
          </div>
          <button
            :disabled="loading"
            class="px-4 py-2 bg-black text-white text-ml rounded-lg cursor-pointer hover:bg-black/90"
            @click="refresh"
          >
            Restart
          </button>
        </div>
      </div>
    </header>

    <main class="p-4 flex-1">
      <h2 class="text-[26px] font-bold pb-3">Reference Github User.</h2>
      <UserProfile />

      <h2 class="text-[26px] font-bold mt-12 pb-3">Repositories.</h2>
      <div
        v-if="error"
        class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
      >
        <div class="flex items-center">
          <svg
            class="w-6 h-6 text-red-400 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-red-400">{{ error }}</span>
        </div>
      </div>

      <div v-if="!hasMore && !loading" class="text-center py-12">
        <div class="text-black text-lg">No repositories found</div>
      </div>

      <div class="space-y-4">
        <RepositoryCard
          v-for="repo in repositories"
          :key="repo.id"
          :repository="repo"
        />
      </div>

      <div v-if="loading" class="h-20 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    </main>

    <footer class="bg-white w-full">
      <div
        class="max-w-4xl mx-auto px-4 py-6 text-center text-gray-500 text-sm"
      >
        <p>
          Infinite Scroll Demo - Fetching
          <span class="font-bold text-black">{{ repositories.length }}</span>
          repositories
        </p>
      </div>
    </footer>
  </div>
</template>
