import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps } from '../testData'

interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
  columnId?: number
}
export interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
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
        name: 'lc',
        columnId: 1
      }
    },
    createPost(state, newPost) {
      state.posts.push(newPost)
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
