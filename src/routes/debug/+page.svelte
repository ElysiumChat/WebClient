<script lang="ts">
	import { goto } from '$app/navigation';
	import { token, user, AudioChannelNotify, AudioChannelRing } from '$lib/stores';
	import { Button, Table, Input } from 'sveltestrap';
	import { getSound } from '$lib/sounds';
	import {uploadFile, getFile} from '$lib/api'
	import {Buffer} from 'buffer'

	let files: FileList
	let space = ''
	let uploadResult = 'No Result'
	let imagePreviewElement: HTMLImageElement

	const uploadFiles = async () => {
		for(let file of files){
			const buffer = Buffer.from(await file.arrayBuffer())
			const ext = file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2)
			uploadFile($token, space, buffer , ext)
				.then(url => {
					uploadResult = url
					previewFile()
				})
				.catch(err => {
					console.error(err)
				})
		}
	}

	const previewFile = async () => {
		getFile(uploadResult)
			.then(file => {
				imagePreviewElement.src = URL.createObjectURL(file)
			})
	}

</script>

<h1>Debug Page</h1>

{#if $user}
	<div id="data">
		<Table>
			<thead>
				<tr>
					<th> Key </th>
					<th> Value </th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td> Token </td>
					<td>
						{$token}
					</td>
				</tr>
				<tr>
					<td> Username </td>
					<td>
						{$user.name}
					</td>
				</tr>
				<tr>
					<td> User ID </td>
					<td>
						{$user._id}
					</td>
				</tr>
			</tbody>
		</Table>
	</div>
{/if}

<div id="sounds">
	<Button
		on:click={() => {
			AudioChannelNotify.set({
				url: getSound('/sounds/default', 'ping'),
				loop: false
			});
		}}>Notify</Button
	>

	<Button
		on:click={() => {
			AudioChannelRing.set({
				url: getSound('/sounds/default', 'ringtone'),
				loop: true
			});
		}}>Ring Start</Button
	>

	<Button
		on:click={() => {
			AudioChannelRing.set({
				stop: true,
				url: '',
				loop: true
			});
		}}>Ring Stop</Button
	>
</div>

<div id="files">
	<Input type="file" bind:files></Input>
	<Input type="text" placeholder="Space ID" bind:value={space} />
	<Button color="secondary" on:click={uploadFiles}>Upload Files</Button>
	{uploadResult}
	<br><br>
	<img bind:this={imagePreviewElement} alt="preview">
</div>

<style>
	#data {
		text-align: center;
	}
	#files {
		margin-top: 5rem;
	}
</style>
