export default interface Project {
  id: number,
  name: string,
  company: string,
  year: number,
  data?: ProjectData
}

export interface ProjectData {
  overview: string,
  description: string[],
  images?: string[]
}