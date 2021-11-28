import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from '../testData'

interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
}
export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

export default createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: false
    }
  },
  mutations: {
    Login(state) {
      state.user = {
        ...state.user,
        isLogin: true,
        name: 'lc'
      }
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getColumnById: (state) => (id: number) => {
      return state.columns.find(c => c.id === id)
    },
    getPostsByCid: (state) => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid)
    }
  }
})
