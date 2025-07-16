<template>
  <div class="relative h-[60vh] min-h-[400px] overflow-hidden">
    <!-- Background image dengan efek parallax -->
    <div 
      ref="backgroundElement"
      class="absolute inset-0 bg-cover bg-center transition-all duration-300 z-0"
      :style="{ 
        backgroundImage: `url('${image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: `translateY(${parallaxOffset}px)`
      }"
    ></div>

    <!-- Overlay dengan teks -->
    <div 
      class="absolute inset-0 flex items-center justify-center z-20"
      :style="{ transform: `translateY(${textParallaxOffset}px)` }"
    >
      <div class="text-center px-4 relative z-30">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">{{ title }}</h1>
        <p class="text-xl md:text-2xl text-white opacity-90 drop-shadow-md">{{ subtitle }}</p>
      </div>
    </div>

    <!-- Gradient overlay untuk transisi ke area miring -->
    <div class="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-white"></div>

    <!-- Area miring di bagian bawah (diperbesar) -->
    <div class="skew-bottom bg-white z-40"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  image: String,
  title: String,
  subtitle: String
})

const backgroundElement = ref(null)
const parallaxOffset = ref(0)
const textParallaxOffset = ref(0)

const handleScroll = () => {
  if (!backgroundElement.value) return
  
  const scrollPosition = window.scrollY
  parallaxOffset.value = scrollPosition * 0.4
  textParallaxOffset.value = scrollPosition * 0.15
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.skew-bottom {
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 25vh; /* Diperbesar untuk kemiringan lebih curam */
  background: white;
  
  /* Kemiringan ekstrem (hampir setengah banner) */
  clip-path: polygon(0 40%, 100% 0, 100% 100%, 0% 100%);
  
  z-index: 40;
}
</style>