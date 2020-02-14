<template>
  <section class="screen__full-height section has-text-centered">
    <div v-if="project">
      <div class="columns is-mobile is-multiline is-centered">
        <h1 class="title column is-full">{{project.name}}</h1>
        <h2 class="subtitle column is-full">Company : <u>{{project.company}}</u></h2>
        <div class="level is-mobile column is-narrow">
          <font-awesome-icon class="level-item" :icon="['far', 'calendar-alt']" />
          <p class="level-item">{{project.year}}</p>
        </div>
      </div>
      <br><br>
      <div class="columns is-mobile is-multiline is-centered" v-if="project.data">
        <h2 class="column is-size-3 is-full">Overview</h2>
        <h2 class="column is-size-5 is-6-desktop is-8-tablet">{{project.data.overview}}</h2>
      </div>
    </div>
    <div v-else>
      <h1 class="title">Project "{{pathId}}" doesn't exist.</h1>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Project from '../assets/models/project'
import ProjectService from '../services/project.service'

@Component({
  name: 'project'
})
export default class ProjectDetails extends Vue {
  private project: Project | undefined
  private projectService: ProjectService = new ProjectService()
  private pathId: number | undefined

  created () {
    this.pathId = +this.$route.params['projectId']
    this.project = this.currentProject(this.pathId)
  }

  currentProject (projId: number): Project | undefined {
    // this will eventually be an HTTP call
    return this.projectService.getProject(projId)
  }

  getProject (projId: number): number {
    return projId !== 1 ? 500 : 200
  }
}
</script>

<style lang="scss">

</style>
