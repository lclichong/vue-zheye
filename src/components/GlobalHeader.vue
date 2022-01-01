<template>
  <nav class="navbar-dark bg-primary justify-content-between mb-4 px-4">
    <div class="w-75 mx-auto navbar">
      <router-link class="navbar-brand" to="/">者也专栏</router-link>
      <ul v-if="!user.isLogin" class="list-inline mb-0">
        <li class="list-inline-item">
          <router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link>
        </li>
        <li class="list-inline-item">
          <router-link to="/signup" class="btn btn-outline-light my-2">注册</router-link>
        </li>
      </ul>
      <ul v-else class="list-inline mb-0">
        <li class="list-inline-item">
          <dropdown :title="`你好 ${user.nickName}`">
            <dropdown-item closeAfterClick>
              <router-link to="/create" class="dropdown-item">新建文章</router-link>
            </dropdown-item>
            <dropdown-item closeAfterClick>
              <router-link :to="`/column/${user.column}`" class="dropdown-item">我的专栏</router-link>
            </dropdown-item>
            <dropdown-item closeAfterClick>
              <router-link to="/edit" class="dropdown-item">编辑资料</router-link>
            </dropdown-item>
            <dropdown-item closeAfterClick>
              <a href="#" class="dropdown-item" @click="checkout">退出登陆</a>
            </dropdown-item>
          </dropdown>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useStore } from 'vuex'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import { UserProps } from '../store/index'
import createMessage from './createMessage'

export default defineComponent({
    name: 'GlobalHeader',
    components: {
        Dropdown,
        DropdownItem
    },
    props: {
        user: {
            type: Object as PropType<UserProps>,
            required: true
        }
    },
    setup() {
        const store = useStore()
        const checkout = () => {
            store.commit('signOut')
            createMessage('退出成功', 'success')
        }
        return {
            checkout
        }
    }
})
</script>
