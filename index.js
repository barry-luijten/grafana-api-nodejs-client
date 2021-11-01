const axios = require('axios')
const _  = require('lodash')

class GrafanaAPIClient {
  #org = {
    id: null,
    name: null,
    apiKey = null
  }
  #baseUrl = null
  #ax = null
  #adminAuth = null
  
  constructor(baseUrl, options = {}) {
    this.baseUrl = baseUrl
    this.#adminAuth = _.get(options,'admin_auth', null)
    this.#apiKey = _.get(options,'api_key', null)
    this.#org = _.get(options,'org', null) || this.#org
    this.#ax = axios.create({
      baseURL: this.#baseUrl,
      timeout: 10000
    })
  }
  
  get baseUrl() {
    return this.#baseUrl
  }
  set baseUrl(newUrl) {
    this.#baseUrl = newUrl
    if (this.#baseUrl.endsWith('/')) this.#baseUrl = _.trimEnd(this.#baseUrl, '/')
  }

  async test() {
    let request = {
      auth: this.#adminAuth
    }
    try {
      let response = await this.#ax.get('/admin/stats', request)
      return response.statusText
    } catch (error) {
      return error.toJSON()
    }
  }

}

module.exports = GrafanaAPIClient