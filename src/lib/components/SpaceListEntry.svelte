<script lang="ts">
	import { ListGroupItem } from 'sveltestrap';
	import { getSpace, getFile } from '../api';
	import { token, activeSpace } from '../stores';
    import type {Space} from '../../global'

    let imageEl: HTMLImageElement;

	export let id = '';
	export let active = false;

	let name = '';
	let icon = '';
    let space = <Space>{}

	getSpace(id, $token).then((result) => {
        space = result 
		name = space.name;
		icon = space.icon || '/default_space.png';
        
        imageEl.src = icon + '?size=128'
	});

    const setSpace = () => {
        activeSpace.set(space)
    }
</script>

<ListGroupItem action {active} on:click={setSpace}>
	<img bind:this={imageEl} alt={name} title={name} class="space-icon">
</ListGroupItem>
