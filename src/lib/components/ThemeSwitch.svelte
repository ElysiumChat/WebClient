<script lang="ts">
	import { theme, themeList } from '$lib/stores';
</script>

<select bind:value={$theme} placeholder="Theme">
	{#each $themeList as x}
		<option value={x.name}>{x.name}</option>
	{/each}
</select>
