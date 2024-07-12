<template>
	<div class="level is-mobile">
		<div class="level-left">
			<div class="level-item">
				<font-awesome-icon :icon="['fas', icon]" size="3x" />
			</div>
			<div class="level-item">
				<h1 class="title">{{ tileTitle }}</h1>
			</div>
		</div>
		<div class="level-right">
			<div class="level-item">
				<font-awesome-icon :icon="['fas', 'chevron-right']" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">

export default {
	props: {
		tileTitle: {
			default: 'Default Title'
		},
		icon: {
			default: 'exclamation-triangle'
		}
		// tileTitle = 'Default Title' as string,
		// icon = 'exclamation-triangle' as string,
	}
}
</script>

<style lang="scss"></style>
