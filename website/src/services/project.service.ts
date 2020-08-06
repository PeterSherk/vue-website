import Project from '@/assets/models/project'
import axios, { AxiosResponse } from 'axios'

export default class ProjectService {
  private API_HOST = process.env.VUE_APP_API_HOST;

  public getProjects (filter?: string): Promise<AxiosResponse<Project[]>> {
    let filterText = ''
    if (filter) {
      filterText = `?filter=${filter}`
    }
    return axios.get(`${this.API_HOST}/api/v1/projects${filterText}`)
  }

  public getProject (id: number | undefined): Promise<AxiosResponse<Project>> {
    return axios.get(`${this.API_HOST}/api/v1/projects/${id}`)
  }
}
