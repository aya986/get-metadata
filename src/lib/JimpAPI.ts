class JimpAPI {
  public static instance: JimpAPI;

  static getInstance() {
    if (typeof JimpAPI.instance === "object") {
      return JimpAPI.instance;
    }
    JimpAPI.instance = new JimpAPI();
    return JimpAPI.instance;
  }

  public async eraseRoom(id: string): Promise<any> {
    try {
    } catch (error) {
      console.log(`error is `, error);
      return null;
    }
  }
}

export default JimpAPI.getInstance();
