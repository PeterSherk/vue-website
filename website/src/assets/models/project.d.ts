export default interface Project {
  id: number,
  name: string,
  company: string,
  year: number,
  overview: string,
  content?: ProjectContent[]
}

export interface Media {
  name: string,
  progress: number,
  duration: number,
  externalUrl: string,
  isPlaying: boolean,
  creator: string,
  images: MediaImage[]
}

export interface MediaImage {
  height: number,
  url: string,
  width: number
}

export interface ProjectContent {
  description: string,
  title?: string,
  image?: string
}