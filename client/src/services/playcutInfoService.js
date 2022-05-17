import axios from "axios"

const key = "EhXCtFmpRDrdhSOVgVUh"
const secret = "FrzlTFzDsNFmhfAdYZRvyeiKmZJjqHdD"
// let query = "pink floyd"
// let artist_id = 0

export default class playcutInfoService {
  // fetches from public folder for testing. demo library is made up of dj entries copied from the playlist api.
  // async searchArtist() {
  //   // let globalThis = this
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then(function (data) {
  //       return data.results[0].id
  //     })
  // }

  async getArtistData(query) {
    let type = "artist"
    let url = `https://api.discogs.com/database/search?q=${query}&type=${type}&key=${key}&secret=${secret}`
    let url2 = `https://api.discogs.com/artists`

    let response = axios.get(url).then((res) => res.data.results[0].id)

    let artist_id = await response

    let res = axios.get(`${url2}/${await artist_id}`).then((res) => res.data)
    console.log(res)

    return await res
  }

  // async getArtistProfile() {
  //   // let response = await this.searchArtist()
  //   // let res = await this.getArtistProfile(response)
  //   console.log("hi")
  // }
}
