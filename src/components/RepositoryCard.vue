<template>
  <div
    class="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group"
  >
    <a
      :href="repository.html_url"
      target="_blank"
      rel="noopener noreferrer"
      class="text-black"
    >
      <div class="flex justify-between items-start mb-3">
        <h3 class="text-xl font-bold text-gray-900 group-hover:underline">
          {{ repository.name }}
        </h3>
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <span
            v-if="repository.language"
            class="bg-black text-white font-bold text-xs px-2 py-1 rounded-full"
          >
            {{ repository.language }}
          </span>
          <span class="flex items-center gap-1">
            <img src="/star.svg" alt="" class="w-4 h-4" />
            {{ thousands(repository.stargazers_count) }}
          </span>
        </div>
      </div>

      <p class="text-gray-600 text-sm mb-3 leading-relaxed">
        {{ repository.description || "No description available" }}
      </p>

      <div class="flex justify-between items-center text-xs text-gray-500">
        <span>Updated: {{ formatDate(repository.updated_at) }}</span>
        <span>Created: {{ formatDate(repository.created_at) }}</span>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import type { Repository } from "@/types/github";
import thousands from "@/utils/thousands";

interface Props {
  repository: Repository;
}

defineProps<Props>();

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>
