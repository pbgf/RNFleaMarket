
export default {

  namespace: 'user',

  state: sessionStorage.getItem('userInfo')?JSON.parse(sessionStorage.getItem('userInfo')):{},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    saveUser(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
