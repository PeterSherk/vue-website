import Project from '@/assets/models/project'
import axios, { AxiosResponse } from 'axios'

export default class ProjectService {
  private projects: Project[] = []
  private API_HOST = process.env.VUE_APP_API_HOST;

  public getProjects (): Project[] {
    return this.projects
  }

  public getProject (id: number | undefined): Promise<AxiosResponse<Project>> {
    return axios.get(`${this.API_HOST}/api/v1/projects/${id}`)
  }
}
