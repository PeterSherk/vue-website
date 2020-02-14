import Project from '@/assets/models/project'

export default class ProjectService {
  private projects: Project[] = []

  constructor () {
    this.projects.push({
      id: 1,
      name: 'Project Tracker',
      company: 'Volvo Trucks',
      year: 2017,
      data: {
        overview: 'The Project Tracker is an application ' +
        'used by Requirements Managers to track their progress on various Projects. ' +
        'After seeing the requested updates and the current application, I decided to rewrite the ' +
        'application in C# using Windows Forms. My goals were simplicity and functionality. ' +
        'I was the only intern assigned to this task.',
        description: ['hi']
      }
    })
  }

  public getProjects (): Project[] {
    return this.projects
  }

  public addProject (project: Project): void {
    this.projects.push(project)
  }

  public getProject (id: number): Project | undefined {
    return this.projects.find((project) => {
      return project.id === id
    })
  }
}
