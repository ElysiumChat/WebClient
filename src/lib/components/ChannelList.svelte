<script lang="ts">
	import { ListGroup } from 'sveltestrap';
	import { user, activeSpace, activeChannel } from '../stores';
	import { cache } from '../api';
	import ChannelListEntry from './ChannelListEntry.svelte';

</script>

{#if $user._id && $activeSpace.channels}
	<div id="channel-list">
		<ListGroup flush>
			{#each $activeSpace.channels as channel}
				<ChannelListEntry id={channel} active={$activeChannel._id == channel} />
			{/each}
		</ListGroup>
	</div>
{/if}
