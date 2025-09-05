export default function thousands(num: number, options = {}) {
  return new Intl.NumberFormat("zh-TW", {
    maximumFractionDigits: 2,
    ...options,
  }).format(num);
}
