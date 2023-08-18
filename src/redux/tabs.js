

import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

// https://juejin.cn/post/7101688098781659172#heading-8
const getMovieListApi = () =>
  fetch(
    'https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=24&page_id=1&ret_num=48'
  ).then(res => res.json())

// thunk函数允许执行异步逻辑, 通常用于发出异步请求。
// createAsyncThunk 创建一个异步action，方法触发的时候会有三种状态：
// pending（进行中）、fulfilled（成功）、rejected（失败）
export const getMovieData = createAsyncThunk('movie/getMovie',
  async () => {
    const res = await getMovieListApi();
    return res;
  }
);


export const TabsReducer = createSlice({
  name: 'tabs-router-reducer',
  initialState: {
    tabsKey: '',
    tabsRoutes: [],
    isTabs: false
  },
  reducers: {
    updateTabsKey: (state, action) => {
      console.log('tabs~13', current(state), action)
      if (action.payload) {
        state.tabsKey = action.payload?.key
        state.isTabs = action.payload?.isTabs || false
      } else {
        state.tabsKey = ''
        state.isTabs = false
      }

    },
    updateTabsRoutes: (state, action) => {
      console.log(19, state.tabsRoutes, action.payload)
      let tabs = current(state).tabsRoutes
      let notHas = action.payload.keyPath.length > 1 && !tabs.find(item => item.key == action.payload.key)
      console.log(39, tabs, notHas)
      if (notHas) {
        state.tabsRoutes = state.tabsRoutes.concat(action.payload)
      }

    },
    tabsRoutesRemove(state, action) {
      console.log(47, current(state), action)
      let tabs = current(state).tabsRoutes.filter(item => item.key !== action.payload)
      state.tabsRoutes = tabs
    },
    loadDataEnd: (state, { payload }) => {
      state.list = payload;
      state.totals = payload.length;
    },
  },
  // ajax 请求 
  extraReducers: builder => {
    builder
      .addCase(getMovieData.pending, (state) => {
        console.log("🚀 ~ 进行中！")
      })
      .addCase(getMovieData.fulfilled, (state, { payload }) => {
        console.log("🚀 ~ fulfilled", payload);
        state.list = payload.data.list
        state.totals = payload.data.list.length
      })
      .addCase(getMovieData.rejected, (state, err) => {
        console.log("🚀 ~ rejected", err)
      });
  }

})

export const { updateTabsKey,
  updateTabsRoutes, tabsRoutesRemove, loadDataEnd } = TabsReducer.actions;

export default TabsReducer.reducer
