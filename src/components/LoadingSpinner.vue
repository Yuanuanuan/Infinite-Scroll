<template>
  <div class="flex items-center justify-center gap-2 loading-container">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
</template>

<style scoped lang="scss">
.loading-container {
  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #000;
    animation: bounce 1s infinite ease-in-out;

    &:nth-child(2) {
      animation-delay: 0.15s;
    }

    &:nth-child(3) {
      animation-delay: 0.3s;
    }
  }
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0.8) translateY(0);
    opacity: 0.7;
  }
  40% {
    transform: scale(1.2) translateY(-10px);
    opacity: 1;
  }
}
</style>
