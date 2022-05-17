export default class LibraryService {
  // fetches from public folder for testing. demo library is made up of dj entries copied from the playlist api.
  async getLibrary() {
    return fetch("data/demoLibrary.json")
      .then((res) => res.json())
      .then((d) => d.data)
  }

  async getPlaycutEntries() {
    return fetch("data/demoPlaycutEntries.json")
      .then((res) => res.json())
      .then((d) => d)
  }
}
