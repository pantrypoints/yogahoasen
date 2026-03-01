<script lang="ts">
	import type { PageData } from './$types';

	interface Props { data: PageData; }
	let { data }: Props = $props();
</script>

<svelte:head>
	<title>{data.metadata?.title ?? 'Article'} · Yoga Hoa Sen</title>
</svelte:head>

<svelte:component this={data.content} />
