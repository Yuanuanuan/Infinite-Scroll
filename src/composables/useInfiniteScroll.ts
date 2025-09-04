import { ref, onMounted, onUnmounted } from "vue";
import type { Repository } from "@/types/github";
import { getRepositories } from "@/services/github";

export function useInfiniteScroll() {
  const repositories = ref<Repository[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const hasMore = ref(true);
  const currentPage = ref(1);

  const loadRepositories = async (page: number = 1) => {
    if (loading.value) return;

    loading.value = true;
    error.value = null;

    try {
      const response = await getRepositories(page);

      repositories.value.push(...response.repositories);

      hasMore.value = response.hasNext;
      currentPage.value = page;
    } catch (err) {
      error.value = (err as Error)?.message || "Failed to load repositories";
    } finally {
      loading.value = false;
    }
  };

  const loadMore = () => {
    if (!loading.value && hasMore.value) {
      loadRepositories(currentPage.value + 1);
    }
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    const scrolledPercentage = (scrollTop + clientHeight) / scrollHeight;

    if (scrolledPercentage > 0.8 && hasMore.value && !loading.value) {
      loadMore();
    }
  };

  const refresh = () => {
    repositories.value = [];
    currentPage.value = 1;
    hasMore.value = true;
    loadRepositories(1);
  };

  onMounted(() => {
    loadRepositories(1);
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return {
    repositories,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
}
