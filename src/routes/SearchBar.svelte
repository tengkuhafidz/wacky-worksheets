<script>
    export let searchPrompt
    export let handleSearch

    const handleKeypress = (event) => {
        if (event.key === "Enter") {
            handleSearch()
        }
    }

    const constuctQueryParam = (mainPrompt) => {
        return mainPrompt ? `?mainPrompt=${mainPrompt}` : ""
    }
</script>

<div class="text-center padding-top-large margin-top padding-bottom-large container container-sm">
    <div class="form-group ">
        <input type="text" placeholder="Search for fun image ideas; they'll love it!" id="paperInputs1" class="input-block shadow" bind:value={searchPrompt} on:keydown={handleKeypress}/>
    </div>
    <div class="padding-small">
        <button class="btn-primary margin-right" on:click={handleSearch}>Search</button>
        <a href={`/generate-images${constuctQueryParam(searchPrompt)}`} class="paper-btn">Generate</a>
    </div>
</div>