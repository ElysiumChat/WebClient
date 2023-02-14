<script lang="ts">
	import {
		theme,
		themeList,
		token,
		user,
		AudioChannelNotify,
		AudioChannelRing,
		AudioChannelVoice
	} from '$lib/stores';
	import { me as APIMe } from '$lib/api';
	import { goto } from '$app/navigation';
	import {login as WSLogin} from '$lib/socket'

	let notifyChannelElement: HTMLAudioElement;
	let ringChannelElement: HTMLAudioElement;
	let voiceChannelElement: HTMLAudioElement;

	let themeURL = '';

	if (localStorage.getItem('token')) {
		token.set(<string>localStorage.getItem('token'));
	}

	if (localStorage.getItem('theme')) {
		theme.set(<string>localStorage.getItem('theme'));
		themeURL = <string>$themeList.find((x) => x.name == $theme)?.url;
	}

	if (localStorage.getItem('themeList') != undefined && localStorage.getItem('themeList') != '{}') {
		themeList.set(JSON.parse(<string>localStorage.getItem('themeList')));
	}

	theme.subscribe((value) => {
		localStorage.setItem('theme', value);
		themeURL = <string>$themeList.find((x) => x.name == value)?.url;
	});

	themeList.subscribe((value) => {
		localStorage.setItem('themeList', JSON.stringify($themeList));
	});

	token.subscribe((value) => {
		APIMe($token)
			.then((res) => {
				user.set(res);
				WSLogin($token)
			})
			.catch((err) => {
				console.error(err.error);
				token.set('');
				localStorage.setItem('token', '');
				goto('/login');
			});
	});

	AudioChannelNotify.subscribe(value => {
		if(!notifyChannelElement)return
		if(value.stop)return notifyChannelElement.pause()
		notifyChannelElement.src = value.url
		notifyChannelElement.loop = value.loop
		notifyChannelElement.play()
	})

	AudioChannelRing.subscribe(value => {
		if(!ringChannelElement)return
		if(value.stop)return ringChannelElement.pause()
		ringChannelElement.src = value.url
		ringChannelElement.loop = value.loop
		ringChannelElement.play()
	})

</script>

<svelte:head>
	<link rel="stylesheet" href={themeURL} />
	<title>Elysium</title>
</svelte:head>

<audio autoplay bind:this={notifyChannelElement} />
<audio autoplay bind:this={ringChannelElement} />
<audio autoplay bind:this={voiceChannelElement} />

<slot />
