<script lang="ts">
	import Hero from "../Hero.svelte";

    // export let data
    // export let form
    
    // const imageStyles = data.imageStyles?.split(",") || ['black & white', 'flat', 'cartoon']

    let mainPrompt = ""
    let isWacky = true
    let isBlackWhite = true
    let isFlat = true
    let isCartoon = true
    let numOfQuestions = 2

</script>

<Hero title="Generate fun questions! 🤪" description="making questions engaging helps to retain students' focus. 🤓" />

<div class="text-center padding-top-large margin-top padding-bottom container container-sm">
    <form method="POST">
        <div class="form-group">
            <textarea placeholder="Paste a sample question that you want to replicate" id="generate-questions" name="text-prompt" class="input-block shadow" value={mainPrompt}/>
        </div>
        <div class="row">
            <div class="sm-6 md-3 col">
                <div>
                    <fieldset class="form-group">
                        <p class="text-left margin-top-none">Mood:</p>
                        <label for="paperSwitch1" class="paper-switch-tile">
                          <input id="paperSwitch1" name="mood" type="checkbox" checked={isWacky}  />
                          <div class="paper-switch-tile-card border">
                              <div class="paper-switch-tile-card-back border background-secondary">Wacky</div>
                              <div class="paper-switch-tile-card-front border background-danger">Serious</div>
                          </div>
                        </label>
                </div>
            </div>
            <div class="sm-6 md-4 col">
                
                    <p class="text-left margin-top-none">Replace:</p>
                    <fieldset class="form-group">
                        <label class="paper-switch">
                            <input id="switch-black-white" name="replace-items" type="checkbox" bind:checked={isBlackWhite} value="characters"/>
                            <span class="paper-switch-slider"></span>
                        </label>
                        <label for="switch-black-white" class="paper-switch-label">
                            Characters
                        </label>
                    </fieldset>
            
                    <fieldset class="form-group">
                        <label class="paper-switch">
                            <input id="switch-flat" name="replace-items" type="checkbox" bind:checked={isFlat}  value="setting"/>
                            <span class="paper-switch-slider"></span>
                        </label>
                        <label for="switch-flat" class="paper-switch-label">
                            Setting
                        </label>
                    </fieldset>
            
                    <fieldset class="form-group">
                        <label class="paper-switch">
                            <input id="switch-cartoon" name="replace-items" type="checkbox" bind:checked={isCartoon} value="numbers"/>
                            <span class="paper-switch-slider"></span>
                        </label>
                        <label for="switch-cartoon" class="paper-switch-label">
                            Numbers
                        </label>
                    </fieldset>
            </div>

            <div class="sm-6 md-4 col text-left padding-top-small">
                <div class="form-group" >
                    <label for="input-range">Generate <span class="badge success" style="font-size: 1rem;">{numOfQuestions}</span> questions:</label>
                    <input type="range" name="num-questions" id="input-range" min="1" max="5" bind:value={numOfQuestions} class="input-block">
                  </div>
            </div>

        </div>

        <div class="padding">
            <button class="btn-primary margin-right" type="submit">Generate Questions</button>
        </div>
    </form>
</div>

<!-- <div>
    {#if form?.success}
        <Listing imageRecords={form?.data?.imageRecords} />
    {/if}
</div> -->