<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
    <div class="aspect-card w-full relative overflow-hidden">
      <img 
        :src="idea.medium_image?.[0]?.url"
        :alt="idea.title"
        loading="lazy"
        class="w-full h-full object-cover transition-all duration-500 hover:scale-105"
      />
    </div>
    <div class="p-5">
      <h3 class="font-bold text-lg line-clamp-3 min-h-[72px] mb-3">{{ idea.title }}</h3>
      <div class="flex items-center">
        <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-800">{{ idea.author || 'Unknown Author' }}</p>
          <p class="text-xs text-gray-500">Followers</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  idea: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.aspect-card {
  aspect-ratio: 3 / 2;
}
</style>
