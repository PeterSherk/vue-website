<template>
  <div id="coding">
    <section class="screen__full-height section">
      <div class="columns">
        <div class="column is-10 is-offset-1">
          <div class="columns is-multiline">
            <div class="column is-full">
              <h1 class="title">Projects</h1>
            </div>
            <template v-if="loading">
              <div class="column is-full">
                <h1 class="title is-4">Loading...</h1>
              </div>
            </template>
            <template v-else-if="errored">
              <div class="column is-full">
                <GenericError errorMessage="Oops! An error occurred." errorPicturePath="img/moose_404.jpeg"
                  altText="moose error"/>
              </div>
            </template>
            <template v-else-if="projects.length != 0 && !loading">
              <div class="column is-one-third" v-for="project in projects" :key="project.id">
                <router-link tag="div" :to="{ name: 'projects', params: { projectId: project.id }}" class="card grow__box coding__box" v-on:click="print(project.id)">
                  <div class="card-content">
                    <p class="title is-4">{{project.name}}</p>
                    <p class="title is-6">Company - {{project.company}}</p>
                    <div class="content">{{project.year}}</div>
                  </div>
                </router-link>
              </div>
            </template>
            <template v-else>
              <div class="column is-full">
                <h1 class="title is-4">No projects available.</h1>
              </div>
            </template>
          </div>
        </div>
        <div class="column is-1"></div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { AxiosResponse, AxiosError } from 'axios'
import Project from '../assets/models/project'
import ProjectService from '../services/project.service'
import GenericError from '@/components/GenericError.vue'

@Component({
  name: 'coding',
  components: {
    GenericError
  }
})
export default class Coding extends Vue {
  private projects: Project[] = []
  private projectService: ProjectService = new ProjectService()
  private loading: boolean | undefined
  private errored: boolean | undefined

  mounted () {
    this.projectService.getProjects('overview')
      .then((response: AxiosResponse<Project[]>) => {
        this.projects = response.data
      })
      .catch((error: AxiosError) => {
        console.log(error)
        this.errored = true
      })
      .finally(() => {
        this.loading = false
      })
  };

  data () {
    return {
      errored: false,
      loading: true
    }
  }
}
</script>

<style lang="scss">
  .coding__box {
    min-height: 240px;
  }
</style>
