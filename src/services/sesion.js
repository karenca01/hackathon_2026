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
}

const sessionStore = new SessionStorage();

export default sessionStore;