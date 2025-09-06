import { defineStore } from 'pinia'
import { setToken } from '@/utils/storage'
import { getToken } from '@/utils/storage'
export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken() || '',
    roleId: 10,
  }),
  actions: {
    setToken(token: string) {
      this.token = token
      setToken(token)
    },
    setRoleId(roleId: number) {
      this.roleId = roleId
    },
  },
  getters: {
    isAminRole: (state) => state.roleId === 20,
  },
})
