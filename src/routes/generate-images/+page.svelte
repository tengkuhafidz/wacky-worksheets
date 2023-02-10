<script lang="ts">
	import Hero from "../Hero.svelte";
	import Listing from "../Listing.svelte";
    import { enhance } from '$app/forms';
	import Loading from "../Loading.svelte";


    export let data
    export let form
    
    const imageStyles = data.imageStyles?.split(",") || ['black & white', 'flat', 'cartoon']

    let mainPrompt = data.mainPrompt 
    let isBlackWhite = imageStyles.includes('black & white')
    let isFlat = imageStyles.includes('flat');
    let isCartoon = imageStyles.includes('cartoon');
    let numOfImages = 2

    let isLoading = false
</script>

<Hero title="Generate Fun Images! 🤪" description="wacky images retains in the 🧠 better 🤓" />

{#if !isLoading}
<div class="text-center padding-top-large margin-top padding-bottom container container-sm">
    <form method="POST" use:enhance={() => {isLoading=true}}>
        <div class="form-group">
            <textarea placeholder="Get creative; the sky is the NOT the limit!" id="generate-images" name="image-prompt" class="input-block shadow" value={mainPrompt}/>
        </div>
        <div class="row">
            <div class="sm-6 md-4 col text-left">
                <p class="text-left margin-top-none">Image Styles:</p>
                <fieldset class="form-group margin-bottom-none">
                    <label class="paper-check" for="switch-black-white">
                        <input id="switch-black-white" name="image-styles" type="checkbox" bind:checked={isBlackWhite} value="black & white"/>
                        <span>Back & White</span>
                    </label>
                </fieldset>
                <fieldset class="form-group margin-bottom-none">
                    <label class="paper-check" for="switch-flat">
                        <input id="switch-flat" name="image-styles" type="checkbox" bind:checked={isFlat}  value="flat"/>
                        <span>Flat</span>
                    </label>
                </fieldset>
                <fieldset class="form-group margin-bottom-none">
                    <label class="paper-check" for="switch-cartoon">
                        <input id="switch-cartoon" name="image-styles" type="checkbox" bind:checked={isCartoon} value="cartoon"/>
                        <span>Cartoon</span>
                    </label>
                </fieldset>
                <input name="image-styles" value="extreme long shot" type="hidden"/>
            </div>

            <div class="sm-6 md-4 col text-left padding-top-small">
                <div class="form-group" >
                    <label for="input-range">Generate <span class="badge success" style="font-size: 1rem;">{numOfImages}</span> images:</label>
                    <input type="range" name="num-images" id="input-range" min="1" max="5" bind:value={numOfImages} class="input-block">
                  </div>
            </div>
        </div>

        <div class="padding">
            <button class="btn-primary margin-right" type="submit">Generate Images</button>
            <a href="/" class="paper-btn ">Back to Search</a>
        </div>
    </form>
</div>
{/if}

{#if isLoading && !form?.success} 
    <Loading itemType="Images"/>   
{/if}

{#if form?.success}
    <Listing imageRecords={form?.responseData?.imageRecords} />
{/if}
