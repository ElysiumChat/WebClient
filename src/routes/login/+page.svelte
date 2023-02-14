<script lang="ts">
	import { token } from '$lib/stores';
	import { Button, Form, FormGroup, Input, FormText, Label } from 'sveltestrap';
	import Fa from 'svelte-fa';
	import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
	import { goto } from '$app/navigation';
	import { TwoSeventyRing } from 'svelte-svg-spinners';
	import { login as APILogin } from '$lib/api';

	let email = '';
	let password = '';

	let loading = false;

	const login = async () => {
        if(loading)return
		loading = true;
		await APILogin(email, password)
			.then((restoken) => {
				token.set(restoken);
				localStorage.setItem('token', restoken);
				goto('/');
			})
			.catch((err) => {
				alert(err.error);
			});
        loading = false
	};
</script>

<div id="login-prompt">
	<h1>Login</h1>

	<Form on:submit={login}>
		<FormGroup>
			<Label for="email">E-Mail</Label>
			<Input
				required
				type="email"
				placeholder="leeroy.jenkins@elysium.chat"
				id="email"
				bind:value={email}
			/>
		</FormGroup>
		<FormGroup>
			<Label for="password">Password</Label>
			<Input
				required
				type="password"
				id="password"
				placeholder="TheDuckGoesQuack1234"
				bind:value={password}
			/>
		</FormGroup>
		<Button type="submit" color="secondary">
			{#if loading}
				<TwoSeventyRing class="loading-spinner" />
			{:else}
				<Fa icon={faArrowRight} />
			{/if}
		</Button>
	</Form>

	<h4>No account? <a href="/register">Create one!</a></h4>
</div>
