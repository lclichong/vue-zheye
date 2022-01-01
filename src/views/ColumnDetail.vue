<template>
  <div class="column-detail-page w-690">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar.fitUrl" :alt="column.title" class="rounded-circle border w-100" />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
    <button v-if="!isLastPage" @click="loadMorePage" class="btn btn-outline-primary mt-2 mb-5 mx-auto w-25 d-block">加载更多</button>
  </div>
</template>

 <script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import PostList from '../components/PostList.vue'
import { GlobalDataProps } from '../store/index'
import { addColumnAvatar } from '../helper'
import useLoadMore from '../hooks/useLoadMore'

export default defineComponent({
    components: {
        PostList
    },
    setup() {
        const store = useStore<GlobalDataProps>()
        const route = useRoute()
        const currentId = route.params.id as string
        onMounted(() => {
            store.dispatch('fetchColumn', currentId)
            store.dispatch('fetchPosts', { cid: currentId })
        })
        const total = computed(() => {
            if (store.state.posts.loadedColumns[currentId]) {
                return store.state.posts.loadedColumns[currentId].total
            } else {
                return 0
            }
        })
        const currentPage = computed(() => {
            if (store.state.posts.loadedColumns[currentId]) {
                return store.state.posts.loadedColumns[currentId].currentPage
            } else {
                return 1
            }
        })
        const column = computed(() => {
            addColumnAvatar(store.getters.getColumnById(currentId), 50, 50)
            return store.getters.getColumnById(currentId)
        })
        const list = computed(() => store.getters.getPostsByCid(currentId))
        const { loadMorePage, isLastPage } = useLoadMore('fetchPosts', total, {
            pageSize: 5,
            currentPage: currentPage.value ? currentPage.value + 1 : 2,
            cid: currentId
        })
        return {
            column,
            list,
            loadMorePage,
            isLastPage
        }
    }
})
</script>

<style>
.w-690 {
    width: 690px;
    margin: 0 auto;
}
</style>
<style scoped>
.rounded-circle {
    width: 225px;
}
</style>
