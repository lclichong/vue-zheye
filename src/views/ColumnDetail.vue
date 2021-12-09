<template>
    <div class="column-detail-page w-75 mx-auto">
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
    </div>
</template>

 <script lang="ts">
import { defineComponent, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import PostList from '../components/PostList.vue'
import { GlobalDataProps } from '../store/index'
import { addColumnAvatar } from '../helper'

export default defineComponent({
    components: {
        PostList
    },
    setup() {
        const store = useStore<GlobalDataProps>()
        const route = useRoute()
        const currentId = route.params.id
        onMounted(() => {
            store.dispatch('fetchColumn', currentId)
            store.dispatch('fetchPosts', currentId)
        })
        const column = computed(() => store.getters.getColumnById(currentId))
        const list = computed(() => store.getters.getPostsByCid(currentId))
        watch(column, (newVal) => {
            addColumnAvatar(newVal, 50, 50)
        })
        return {
            column,
            list
        }
    }
})
</script>

<style scoped>
.rounded-circle {
    width: 225px;
    height: 225px;
}
</style>
