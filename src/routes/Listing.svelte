<script>
    export let imageRecords

    const downloadImage = async (url) => {
        const image = await fetch(url)
        const imageBlob = await image.blob()
        const imageURL = URL.createObjectURL(imageBlob)
        const link = document.createElement('a')
        link.href = imageURL
        link.download = 'image.jpg'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
</script>

<div class="row flex-center margin-large">
    {#if imageRecords?.length > 0}
    {#each imageRecords as imageRecord}
    <div class="col sm-6 md-2 padding-small">
                <div class="card">
                    <img src={imageRecord.imageUrl} alt={imageRecord.mainPrompt}>
                    <div class="padding-small text-center">
                      <button on:click={() => downloadImage(imageRecord.imageUrl)} class="btn-primary btn-small" >Download</button>
                      <a href={`/generate-images?mainPrompt=${imageRecord.mainPrompt}&imageStyles=${encodeURIComponent(imageRecord?.imageStyles)}`} class="paper-btn btn-small">Variation</a>
                    </div>
                  </div>
            </div>
        {/each}
    {/if}
</div>