// sum.test.js
import { expect, test } from 'vitest'
import ProjectService from './project.service'
import type Project from '@/assets/models/project'

const projectService = new ProjectService()

test('gets all projects from api', async () => {
	const response: Project[] = (await projectService.getProjects()).data
	expect(response.length).toBe(1)
	const responseWithFilter: Project[] = (await projectService.getProjects('filter')).data
	expect(responseWithFilter.length).toBe(1)
})

test('gets just one project by id', async () => {
	const response: Project = (await projectService.getProject(1)).data
	expect(response).not.toBeUndefined()
})
