<script lang="ts">
	import { ListGroupItem } from 'sveltestrap';
	import { getChannel } from '../api';
	import { token, activeSpace, activeChannel } from '../stores';
	import type {Channel} from '../../global'

	export let id = '';
	export let active = false;

	let name = '';
	let channel = <Channel>{}

	getChannel(id, $token).then((result) => {
		channel = result
		name = result.name;
	});

    const setChannel = () => {
        activeChannel.set(channel)
    }
</script>

<ListGroupItem action {active} on:click={setChannel}>
	{name}
</ListGroupItem>
