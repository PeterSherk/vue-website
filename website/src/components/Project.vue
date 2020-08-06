<template>
  <section class="screen__full-height section">
    <template v-if="loading">
      <div class="loader"></div>
    </template>
    <template v-else-if="errored">
      <GenericError errorMessage="Oops! An error occurred." errorPicturePath="img/moose_404.jpeg"
        altText="moose error"/>
      <!-- <h1 class="title has-text-centered">There has been an error.</h1> -->
    </template>
    <template v-else-if="project && !loading">
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
    </template>
    <template v-else>
      <h1 class="title has-text-centered">Project "{{pathId}}" doesn't exist.</h1>
    </template>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Project from '../assets/models/project'
import ProjectService from '../services/project.service'
import { AxiosResponse, AxiosError } from 'axios'
import GenericError from '@/components/GenericError.vue'

@Component({
  name: 'project',
  components: {
    GenericError
  }
})
export default class ProjectDetails extends Vue {
  private project: Project | undefined
  private projectService: ProjectService = new ProjectService()
  private pathId: number | undefined
  private loading: boolean = true;
  private errored: boolean = false;

  created () {
    this.pathId = +this.$route.params['projectId']
  }

  mounted () {
    this.projectService.getProject(this.pathId)
      .then((response: AxiosResponse<Project>) => {
        this.project = response.data
      })
      .catch((error: AxiosError) => {
        console.log(error)
        this.errored = true
      })
      .finally(() => {
        this.loading = false
      })
  }

  descrSize (image: string): string {
    return image ? 'is-4' : 'is-full'
  }

  data () {
    return {
      project: null,
      loading: true,
      errored: false,
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
