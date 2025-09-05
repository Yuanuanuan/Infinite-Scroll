<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
    <div v-if="loading" class="flex items-center justify-center py-8">
      <LoadingSpinner />
    </div>

    <div v-else-if="error" class="text-center py-8 text-red-600">
      Failed to load user information
    </div>

    <div v-else-if="user" class="flex-1 flex items-start gap-6">
      <div class="flex-shrink-0">
        <img
          :src="user.avatar_url"
          :alt="user.login"
          class="w-35 h-35 rounded-full border-2 border-gray-200"
        />
      </div>

      <div class="pl-4 flex flex-col">
        <h2 class="text-3xl font-bold text-gray-900">
          {{ user.name || user.login }}
        </h2>
        <a
          :href="user.html_url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 hover:text-blue-800 text-ml font-medium hover:underline"
        >
          @{{ user.login }}
        </a>

        <p v-if="user.bio" class="text-gray-600 my-3 leading-relaxed">
          {{ user.bio }}
        </p>

        <div class="flex items-center gap-6 text-sm text-gray-500">
          <div class="flex items-center gap-1">
            <img src="/repo.svg" alt="" class="w-5 h-5 inline" />
            <span>
              <strong>{{ thousands(user.public_repos) }}</strong>
              repositories
            </span>
          </div>

          <div class="flex items-center gap-1">
            <img src="/follow.svg" alt="" class="w-5 h-5 inline" />
            <span>
              <strong>{{ thousands(user.followers) }}</strong>
              followers
            </span>
            <span> · </span>
            <span>
              <strong>{{ thousands(user.following) }} </strong>
              following
            </span>
          </div>

          <div v-if="user.location" class="flex items-center gap-1">
            <img src="/location.svg" alt="" class="w-5 h-5 inline" />
            <span>{{ user.location }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { GitHubUser } from "@/types/github";
import { getUser } from "@/services/github";
import LoadingSpinner from "./LoadingSpinner.vue";
import thousands from "@/utils/thousands";

const user = ref<GitHubUser | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

const loadUser = async () => {
  loading.value = true;
  error.value = null;

  try {
    user.value = await getUser();
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Failed to load user";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadUser();
});
</script>
