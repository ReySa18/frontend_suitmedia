<template>
  <div class="flex items-center justify-center space-x-2 mt-10">
    <button 
      @click="$emit('page-change', currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Previous
    </button>

    <div class="flex space-x-1">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="$emit('page-change', page)"
        :class="[
          'w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center',
          currentPage === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
        ]"
      >
        {{ page }}
      </button>
    </div>

    <button 
      @click="$emit('page-change', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
    </button>
  </div>
</template>

<script setup>
defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})
</script>
