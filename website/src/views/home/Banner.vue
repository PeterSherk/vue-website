<template>
	<div>
		<section class="hero is-fullheight-with-navbar">
			<div class="hero-body">
				<div class="container">
					<div class="columns">
						<div class="column is-5 is-offset-1">
							<h1 class="title">Welcome</h1>
							<h2 class="subtitle">
								This website showcases my many passions, from coding to cooking to music.
							</h2>
						</div>
						<div class="column is-5 is-narrow-tablet is-narrow-mobile">
							<div class="grid">
								<div class="cell">
									<RouterLink to="music" class="box grow__box">
										<IconTile tileTitle="Music" icon="compact-disc" />
									</RouterLink>
									<RouterLink to="coding" class="box grow__box">
										<IconTile tileTitle="Coding" icon="laptop-code" />
									</RouterLink>
									<RouterLink to="cooking" class="box grow__box">
										<IconTile tileTitle="Cooking" icon="cookie-bite" />
									</RouterLink>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import IconTile from '@/components/IconTile.vue'

export default {
	name: 'app-banner',
	components: {
		IconTile
	}
}
</script>

<style lang="scss"></style>
