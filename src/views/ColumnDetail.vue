<template>
    <div class="column-detail-page w-690">
        <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
            <div class="col-3 text-center">
                <img
                    :src="column.avatar && column.avatar.fitUrl"
                    :alt="column.title"
                    class="rounded-circle border w-100"
                />
            </div>
            <div class="col-9">
                <h4>{{ column.title }}</h4>
                <p class="text-muted">{{ column.description }}</p>
            </div>
        </div>
        <post-list :list="list"></post-list>
        <button v-if="!isLastPage" @click="loadMorePage" class="btn btn-outline-primary mt-2 mb-5 mx-auto w-25 d-block">
            加载更多
        </button>
    </div>
</template>

 <script lang="ts">
import { defineComponent, computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import PostList from '../components/PostList.vue'
import { GlobalDataProps, ColumnProps } from '../store/index'
import { addColumnAvatar } from '../helper'
import useLoadMore from '../hooks/useLoadMore'

export default defineComponent({
    components: {
        PostList
    },
    setup() {
        const store = useStore<GlobalDataProps>()
        const route = useRoute()
        // 为了让 computed 响应对应的变化，添加响应式对象
        const currentId = ref(route.params.id)
        onMounted(() => {
            store.dispatch('fetchColumn', currentId.value)
            store.dispatch('fetchPosts', { cid: currentId.value })
        })
        // 检测变化
        watch(
            () => route.params,
            (toParams) => {
                // 确保要变化的路径是进入到用户的专栏
                if ((toParams && toParams.id) === store.state.user.column) {
                    // 重新发送请求，在 store 中有对应的缓存设置
                    store.dispatch('fetchColumn', toParams.id)
                    store.dispatch('fetchPosts', toParams.id)
                    // 重新赋值，这样 computed 会变化
                    currentId.value = toParams.id
                }
            }
        )
        const count = computed(() => store.getters.getPostsCountByCid(currentId.value))
        const currentPage = computed(() => store.getters.getPostsCurrentPageByCid(currentId.value))
        const column = computed(() => {
            const selectColumn = store.getters.getColumnById(currentId.value) as ColumnProps | undefined
            if (selectColumn) {
                addColumnAvatar(selectColumn, 100, 100)
            }
            return selectColumn
        })
        const list = computed(() => store.getters.getPostsByCid(currentId.value))
        const { loadMorePage, isLastPage } = useLoadMore('fetchPosts', count, {
            currentPage: currentPage.value,
            cid: currentId.value
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
