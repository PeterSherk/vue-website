<template>
  <section class="screen__full-height section">
    <div v-if="project">
      <div class="columns is-mobile is-multiline is-centered has-text-centered">
        <h1 class="title column is-full">{{project.name}}</h1>
        <h2 class="subtitle column is-full">Company : <u>{{project.company}}</u></h2>
        <div class="level is-mobile column is-narrow">
          <font-awesome-icon class="level-item" :icon="['far', 'calendar-alt']" />
          <p class="level-item">{{project.year}}</p>
        </div>
      </div>
      <br><br>
      <div class="columns is-mobile is-multiline is-centered has-text-centered">
        <h2 class="column is-size-3 is-full">Overview</h2>
        <h2 class="column is-size-5 is-6-desktop is-8-tablet">{{project.overview}}</h2>
      </div>
      <br><br>
      <div class="columns is-mobile is-multiline is-centered" v-if="project.content">
        <div class="column is-full" v-for="content in project.content" :key="content.description">
          <div class="column is-full"></div>
          <div class="column is-full is-size-2 has-text-centered" v-if="content.title">{{content.title}}</div>
          <div class="columns level project__content-border">
            <p class="column level-item content has-text-centered" :class="descrSize(content.image)">{{content.description}}</p>
            <div class="column is-8 level-item" v-if="content.image">
              <img class="project__content-img" :src="`${publicPath}${content.image}`" alt="description image" />
            </div>
          </div>
          <div class="column is-full"></div>
        </div>
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

  descrSize (image: string): string {
    return image ? 'is-4' : 'is-full'
  }

  data () {
    return {
      publicPath: process.env.BASE_URL
    }
  }
}
</script>

<style lang="scss">

.project__content-img {
  max-width:100%;
  max-height:100%;
}
.project__content-border {
  border-color: grey;
  border-style: solid;
  border-width: 2px;
  border-radius: 7px;
}
</style>
