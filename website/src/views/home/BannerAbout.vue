<template>
	<div id="app-bannerabout">
		<section class="section mb-6">
			<div class="container">
				<div class="level">
					<div class="level-item has-text-centered">
						<img
							class="bannerabout__head"
							src="https://api.petersherk.com/img/positano.jpeg"
							alt="Picture of Peter"
						/>
					</div>
					<div class="level-item has-text-centered">
						<div class="content">
							<p class="title">Peter Sherk</p>
							<p class="subtitle">Full-Stack Developer out of Raleigh, North Carolina.</p>
							<p class="subtitle">
								<router-link
									id="bannerabout__subtitle-button"
									to="/about"
									target="button"
									class="button is-rounded"
								>
									About Me
									<font-awesome-icon
										id="bannerabout__subtitle-button__icon"
										style="margin-left: 8px"
										:icon="['fas', 'chevron-right']"
									/>
								</router-link>
							</p>
							<div class="buttons is-centered">
								<button
									class="button is-rounded"
									@click="openLink('mailto:psherk95@gmail.com', false)"
								>
									<font-awesome-icon :icon="['far', 'envelope']" />
								</button>
								<button
									class="button is-rounded"
									@click="openLink('https://www.linkedin.com/in/peter-sherk', true)"
								>
									<font-awesome-icon :icon="['fab', 'linkedin']" />
								</button>
								<button
									class="button is-rounded"
									@click="openLink('https://github.com/PeterSherk', true)"
								>
									<font-awesome-icon :icon="['fab', 'github']" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
export default {
	name: 'app-bannerabout',
	methods: {
		openLink: (link: string, newTab: boolean) => {
			window.open(link, newTab ? '_blank' : '_parent')
		}
	}
}
</script>

<style lang="scss">
@keyframes moveleft {
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(3px);
	}
}
#bannerabout__subtitle-button:hover {
	#bannerabout__subtitle-button__icon {
		animation: moveleft 0.25s 1 normal forwards;
	}
}
.bannerabout__head {
	width: 240px;
	height: 320px;
	box-shadow:
		0 4px 8px 0 rgba(0, 0, 0, 0.2),
		0 6px 20px 0 rgba(0, 0, 0, 0.19);
	border-radius: 10px;
}
</style>
