<script lang="ts">
    import {token} from '$lib/stores'
    import {Button, Form, FormGroup, Input, FormText, Label} from 'sveltestrap'
    import Fa from 'svelte-fa'
    import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
	import { goto } from '$app/navigation';
    import {TwoSeventyRing} from 'svelte-svg-spinners'
    import {register as APIRegister} from '$lib/api'

    let email = ''
    let password = ''
    let password_confirm = ''
    let username = ''

    let loading = false

    const register = async () => {
        if(loading)return
        if(password != password_confirm)return alert('Passwords do not match')
        loading = true
        await APIRegister(email, username, password)
            .then(() => {
                goto('/login')
            })
            .catch(err => {
                alert(err.error)
            })
        loading = false
    }

</script>

<div id="register-prompt">
    <h1>Register</h1>
    
    <Form on:submit={register}>
        <FormGroup>
            <Label for="username">Username</Label>
            <Input required type="text" placeholder="LeeroyJenkins" id="username" bind:value={username} />
        </FormGroup>
        <FormGroup>
            <Label for="email">E-Mail</Label>
            <Input required type="email" placeholder="leeroy.jenkins@elysium.chat" id="email" bind:value={email} />
        </FormGroup>
        <FormGroup>
            <Label for="password">Password</Label>
            <Input required type="password" id="password" placeholder="TheDuckGoesQuack1234" bind:value={password} />
        </FormGroup>
        <FormGroup>
            <Label for="password-confirm">Confirm Password</Label>
            <Input required type="password" id="password-confirm" placeholder="TheDuckGoesQuack1234" bind:value={password_confirm} />
        </FormGroup>
        <Button type="submit" color="secondary">
            {#if loading}
                <TwoSeventyRing class="loading-spinner" />
            {:else}
                <Fa icon={faArrowRight} />
            {/if}
        </Button>
    </Form>
    <h4>Already a member? <a href="/login">Log in!</a></h4>
</div>