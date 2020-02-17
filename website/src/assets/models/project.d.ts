export default interface Project {
  id: number,
  name: string,
  company: string,
  year: number,
  overview: string,
  content?: ProjectContent[]
}

export interface ProjectContent {
  description: string,
  title?: string,
  image?: string
}