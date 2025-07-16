<template>
  <div class="min-h-screen">
    <AppHeader />
    <BannerSection
        image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        title="Idéas"
        subtitle="Where all our great things begin"
    />


    <main class="container mx-auto px-4 py-12 -mt-10 relative z-10">
      <!-- Controls -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <p class="text-gray-600">
          Showing {{ startItem }} - {{ endItem }} of {{ totalIdeas }}
        </p>

        <div class="flex flex-col sm:flex-row gap-4">
          <div>
            <label class="text-gray-700 mr-2">Show per page:</label>
            <select
              v-model="itemsPerPage"
              class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option v-for="option in perPageOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>

          <div>
            <label class="text-gray-700 mr-2">Sort by:</label>
            <select
              v-model="sortBy"
              class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="-published_at">Newest</option>
              <option value="published_at">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>

      <!-- Ideas grid -->
      <div v-else>
        <div v-if="ideas.length === 0" class="text-center py-20">
          <p class="text-gray-500 text-xl">No ideas found</p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <IdeaCard
            v-for="idea in ideas"
            :key="idea.id"
            :idea="idea"
          />
        </div>

        <!-- Pagination -->
        <PaginationControls
          v-if="totalPages > 1"
          :current-page="currentPage"
          :total-pages="totalPages"
          @page-change="handlePageChange"
          class="mt-12"
        />
      </div>
    </main>

    <footer class="bg-gray-800 text-white py-12">
      <div class="container mx-auto px-4 text-center">
        <p>Oleh: REYMONDO SAPUTRA S - MAGANG BERDAMPAK</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

// Import komponen
import AppHeader from '@/components/layout/Header.vue'
import BannerSection from '@/components/banner/Banner.vue'
import IdeaCard from '@/components/IdeaCard.vue'
import PaginationControls from '@/components/Pagination.vue'

const API_BASE_URL = import.meta.env.VITE_API_URL

const ideas = ref([])
const loading = ref(true)
const totalIdeas = ref(0)

const currentPage = ref(1)
const itemsPerPage = ref(10)
const sortBy = ref('-published_at')
const perPageOptions = [10, 20, 50]

const totalPages = computed(() => Math.ceil(totalIdeas.value / itemsPerPage.value))

const startItem = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1)
const endItem = computed(() => {
  const end = currentPage.value * itemsPerPage.value
  return end > totalIdeas.value ? totalIdeas.value : end
})


const fetchIdeas = async () => {
  loading.value = true
  try {
    const params = new URLSearchParams()
    params.set('page[number]', currentPage.value)
    params.set('page[size]', itemsPerPage.value)
    params.append('append[]', 'small_image')
    params.append('append[]', 'medium_image')
    params.set('sort', sortBy.value)

    console.log('Fetching:',`${API_BASE_URL}/ideas?${params}`)

    const response = await fetch(`${API_BASE_URL}/ideas?${params}`, {
      headers: {
        'Accept': 'application/json'
      }
    })

    console.log('Response OK:', response.ok)

    if (!response.ok) {
      const text = await response.text()
      console.log('BAD RESPONSE BODY:', text)
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    console.log('API DATA:', data)

    ideas.value = data.data


    totalIdeas.value = data.meta?.pagination?.total || data.data.length

  } catch (error) {
    console.error('Error fetching ideas:', error)
  } finally {
    loading.value = false
  }
}





const handlePageChange = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

watch([currentPage, itemsPerPage, sortBy], fetchIdeas)


onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const page = urlParams.get('page')
  const perPage = urlParams.get('perPage')
  const sort = urlParams.get('sort')

  if (page) currentPage.value = parseInt(page)
  if (perPage) itemsPerPage.value = parseInt(perPage)
  if (sort) sortBy.value = sort

  fetchIdeas()
})

watch([currentPage, itemsPerPage, sortBy], () => {
  const params = new URLSearchParams()
  params.set('page', currentPage.value)
  params.set('perPage', itemsPerPage.value)
  params.set('sort', sortBy.value)
  window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
})
</script>
