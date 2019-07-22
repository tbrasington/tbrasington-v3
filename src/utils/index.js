export function smallScreen() {
  if (typeof window !== "undefined") {
    if (window.innerWidth < 600) {
      return true
    }
  }
  return false
}