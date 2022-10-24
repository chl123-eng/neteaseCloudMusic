const state = {
  account: {},
  bindings: {},
  profile: {},
};

const getters = {};

const mutations = {
  SET_ACCOUNT(state, val) {
    state.account = val;
  },
  SET_BINDINGS(state, val) {
    state.bindings = val;
  },
  SET_PROFILE(state, val) {
    state.profile = val;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
