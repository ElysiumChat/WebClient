<script lang="ts">
	import { goto } from '$app/navigation';
    import {token, user, activeSpace} from '$lib/stores'
    import SpaceList from '$lib/components/SpaceList.svelte';
    import ChannelList from '$lib/components/ChannelList.svelte';
    import {cache} from '$lib/api'

    document.title = 'Elysium'

    if(!$token){
        goto('/login')
    }

    if($user){
        document.title = `Elysium - ${$user.name}`
    }

    activeSpace.subscribe(value => {
        if(!value)return
        document.title = `Elysium - ${value.name}`
    })

</script>

{#if $user}

    <SpaceList />
    <ChannelList />

    <h3>Selected Space: {$activeSpace.name}</h3>

{/if}

<style>
    h3 {
        position:absolute;
        top: 5rem;
        left: 50%;
    }
</style>
