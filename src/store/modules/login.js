/*
 * @Descripttion:
 * @version:
 * @Author: chl
 * @Date: 2022-10-25 09:41:15
 * @LastEditors: chl
 * @LastEditTime: 2022-11-03 16:43:48
 */
const state = {
  account: {},
  bindings: {},
  profile: {},
  person: {
    name: "John",
    age: "22",
    sex: "male",
  },
};

const getters = {
  getage: (state) => {
    return state.person.age;
  },
};
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
