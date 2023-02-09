<script>
    import { RingLoader } from 'svelte-loading-spinners'

    export let itemType
</script>

<div class="text-center container container-xs padding-larger paper margin-top-large">
    <div style="display: flex; justify-content: center;" >
        <RingLoader size={100} color="#333333"/>
    </div>
    <h4>Generating {itemType}...</h4>
    <p class="padding-none margin-none">(It might take awhile 👀)</p>
</div>   