<template>
  <div id="coding">
    <section class="screen__full-height section">
      <div class="columns">
        <div class="column is-10 is-offset-1">
          <div class="columns is-multiline">
            <div class="column is-full">
              <h1 class="title">Projects</h1>
            </div>
            <div class="column is-one-third" v-for="project in projects" :key="project.id">
              <router-link tag="div" :to="{ name: 'project', params: { projectId: project.id }}" class="card grow__box coding__box" v-on:click="print(project.id)">
                <div class="card-content">
                  <p class="title is-4">{{project.name}}</p>
                  <p class="title is-6">Company - {{project.company}}</p>
                  <div class="content">{{project.year}}</div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="column is-1"></div>
      </div>
      <!-- <div>
        <button class="button" v-on:click="addElement()">Add Project</button>
      </div> -->
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Project from '../assets/models/project'
import ProjectService from '../services/project.service'

@Component({
  name: 'coding'
})
export default class Coding extends Vue {
  private projects: Project[] = []
  private projectService: ProjectService = new ProjectService()

  mounted () {
    this.projects = this.projectService.getProjects()
  };

  addElement () {
    this.projects.push({
      id: Math.random(),
      name: `test${Math.random()}`,
      company: 'Test',
      year: 2016
    })
  }
}
</script>

<style lang="scss">
  .coding__box {
    min-height: 240px;
  }
</style>
