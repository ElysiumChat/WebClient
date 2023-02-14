<script lang="ts">
	import { ListGroup } from 'sveltestrap';
	import { user, activeSpace } from '../stores';
	import SpaceListEntry from './SpaceListEntry.svelte';
</script>

{#if $user._id}
	<div id="space-list">
		<ListGroup flush>
			{#each $user.spaces as space}
				{#if $activeSpace._id == space}
					<SpaceListEntry id={space} active />
				{:else}
					<SpaceListEntry id={space} />
				{/if}
			{/each}
		</ListGroup>
	</div>
{/if}
