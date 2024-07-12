<template>
	<div id="app-music">
		<section class="section is-medium" style="height: 100vh">
			<div class="container is-max-widescreen">
				<p class="title">Currently Streaming on Spotify</p>
				<div v-if="currentlyStreaming && currentlyStreaming.isPlaying">
					<div class="box">
						<article class="media">
							<figure class="media-left">
								<p class="image is-128x128">
									<img :src="currentlyStreaming.images[0].url" />
								</p>
							</figure>
							<div class="media-content">
								<div class="content">
									<p>
										<strong>{{ currentlyStreaming.creator }}</strong>
										<br />
										{{ currentlyStreaming.name }}
									</p>
									<progress
										class="progress is-success"
										:value="currentlyStreaming.progress"
										:max="currentlyStreaming.duration"
									></progress>
									<button
										class="button is-rounded"
										@click="openLink(currentlyStreaming!.externalUrl, true)"
									>
										<font-awesome-icon :icon="['fab', 'spotify']" />
									</button>
								</div>
							</div>
						</article>
					</div>
				</div>
				<div v-else>
					<div class="has-text-centered pt-6">
						<font-awesome-icon class="is-size-1" :icon="['fab', 'spotify']" />
						<p class="is-size-4">No media is currently playing</p>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import { type Media } from '@/assets/models/project'

export default {
	name: 'app-music',
	mounted(): void {
		this.musicStream = new WebSocket(`${import.meta.env.VITE_APP_WS_HOST}/music`)
		this.musicStream.onmessage = (event) => {
			const message = JSON.parse(event.data)
			this.currentlyStreaming = message
		}
	},
	unmounted(): void {
		this.musicStream?.close()
	},
	data() {
		return {
			currentlyStreaming: null as Media | null,
			musicStream: null as WebSocket | null
		}
	},
	methods: {
		openLink(link: string, newTab: boolean) {
			window.open(link, newTab ? '_blank' : '_parent')
		}
	}
}
</script>
