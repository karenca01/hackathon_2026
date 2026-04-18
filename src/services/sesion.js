import AsyncStorage from '@react-native-async-storage/async-storage';

class SessionStorage {
  constructor(namespace = 'appSession') {
    this.namespace = namespace;
  }

  async setToken(token) {
    await AsyncStorage.setItem(`${this.namespace}:token`, token);
  }

  async getToken() {
    return await AsyncStorage.getItem(`${this.namespace}:token`);
  }

  async setUserData(userData) {
    await AsyncStorage.setItem(`${this.namespace}:userData`, JSON.stringify(userData));
  }

  async getUserData() {
    const data = await AsyncStorage.getItem(`${this.namespace}:userData`);
    return data ? JSON.parse(data) : null;
  }

  async clearSession() {
    await AsyncStorage.removeItem(`${this.namespace}:token`);
    await AsyncStorage.removeItem(`${this.namespace}:userData`);
  }
}

const sessionStore = new SessionStorage();

export default sessionStore;