<template>
  <header 
    :class="{
      'transform -translate-y-full': !isVisible,
      'bg-orange-500 bg-opacity-80 backdrop-blur-md': isVisible
    }"
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300 shadow-md"
  >
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div class="text-2xl font-bold text-white">Suitmedia</div>
      <nav>
        <ul class="flex space-x-6">
          <li class="text-white hover:text-white py-2">Work</li>
          <li class="text-white hover:text-white py-2">About</li>
          <li class="text-white hover:text-white py-2">Services</li>
          <li class="font-semibold border-b-2 border-white text-white py-2">Ideas</li> <!-- Active -->
          <li class="text-white hover:text-white py-2">Careers</li>
          <li class="text-white hover:text-white py-2">Contact</li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(true)
const lastScrollPosition = ref(0)

const onScroll = () => {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
  if (currentScrollPosition < 0) return
  if (currentScrollPosition > lastScrollPosition.value) {
    isVisible.value = false
  } else {
    isVisible.value = true
  }
  lastScrollPosition.value = currentScrollPosition
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})
</script>
