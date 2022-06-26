class Local {
  setStorage(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value))
  }
  getStorage(key: string) {
    return JSON.parse(localStorage.getItem(key)) || ''
  }
  removeStorage(key: string) {
    localStorage.removeItem(key)
  }
  clearStorage() {
    localStorage.clear()
  }
}

export default new Local()
