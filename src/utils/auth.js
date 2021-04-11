const SessionKey = 'SessionKey'

export function getToken() {
  return window.localStorage.getItem(SessionKey)
}

export function setToken(data) {
  return window.localStorage.setItem(SessionKey, data)
}

export function removeToken() {
  return window.localStorage.removeItem(SessionKey)
}

export function getCookies(key) {
  return window.localStorage.getItem(key)
}

export function setCookies(key, value) {
  return window.localStorage.setItem(key, value)
}

export function removeCookies(key) {
  return window.localStorage.removeItem(key)
}
