<script>
    import html2pdf from "html2pdf.js";
	import Hero from "../Hero.svelte";
    import { enhance } from '$app/forms';
	import Loading from "../Loading.svelte";

    export let form

    let isLoading = false

    const downloadFlashcard = () => {
        var element = document.getElementById('pdf-flashcard');
        html2pdf(element);
    }
</script>


<Hero title="Generate Creative Flashcards! 🃏" description="Auto-magically generate flashcards 🤖🪄 " />
 
{#if !isLoading}
<div class="text-center padding-top-large margin-top padding-bottom container container-sm">
    <form method="POST" use:enhance={() => {isLoading=true}}>
        <div class="row text-left">
            <div class="col sm-4 margin-left-none padding-left-none">
              <div class="form-group">
                <label for="topic-input">Flashcard Topic</label>
                <input class="input-block" placeholder="e.g. Animals, Vehicles" type="text" id="topic-input" name="topic">
              </div>
            </div>
            <div class="col sm-8 padding-right-none">
              <div class="form-group">
                <label for="creative-scene-input">Creative scene</label>
                <input class="input-block" placeholder="e.g. wearing superhero costume, on the moon" type="text" id="creative-scene-input" name="creative-scene">
              </div>
            </div>
          </div>
        <div class="row text-left">
            <div class="sm-4 ">
                <fieldset class="form-group">
                    <legend>Art Style</legend>
                    <label for="art-style-1" class="paper-radio">
                      <input type="radio" name="art-style" id="art-style-1" value="digital art" checked> <span>Digital Art</span>
                    </label>
                    <label for="art-style-2" class="paper-radio">
                      <input type="radio" name="art-style" id="art-style-2" value="one-line art"> <span>One-line Art</span>
                    </label>
                    <label for="art-style-3" class="paper-radio">
                        <input type="radio" name="art-style" id="art-style-3" value="3d art"> <span>3D Art</span>
                    </label>
                    <label for="art-style-7" class="paper-radio">
                        <input type="radio" name="art-style" id="art-style-7" value="low poly"> <span>Low Poly</span>
                        </label>
                    <label for="art-style-4" class="paper-radio">
                        <input type="radio" name="art-style" id="art-style-4" value="realistic drawing"> <span>Realistic Drawing</span>
                    </label>
                    <label for="art-style-5" class="paper-radio">
                        <input type="radio" name="art-style" id="art-style-5" value="draft sketch"> <span>Draft Sketch</span>
                    </label>
                  </fieldset>
            </div>

            <div class="sm-4">
                <fieldset class="form-group ">
                    <legend>Drawing Tool</legend>
                    <label for="drawing-tool-1" class="paper-radio">
                      <input type="radio" name="drawing-tool" id="drawing-tool-1" value="digital" checked> <span>Digital</span>
                    </label>
                    <label for="drawing-tool-2" class="paper-radio">
                      <input type="radio" name="drawing-tool" id="drawing-tool-2" value="pencil"> <span>Pencil</span>
                    </label>
                    <label for="drawing-tool-3" class="paper-radio">
                        <input type="radio" name="drawing-tool" id="drawing-tool-3" value="colour pencil"> <span>Colour Pencil</span>
                      </label>
                      <label for="drawing-tool-5" class="paper-radio">
                        <input type="radio" name="drawing-tool" id="drawing-tool-5" value="water colour"> <span>Water Colour</span>
                      </label>
                      <label for="drawing-tool-6" class="paper-radio">
                        <input type="radio" name="drawing-tool" id="drawing-tool-6" value="airbrush"> <span>Airbrush</span>
                      </label>
                      <label for="drawing-tool-7" class="paper-radio">
                        <input type="radio" name="drawing-tool" id="drawing-tool-7" value="charcoal"> <span>Charcoal</span>
                      </label>
                  </fieldset>
            </div>

            <div class="sm-4">
                <fieldset class="form-group ">
                    <legend>Vibe</legend>
                    <label for="vibe-1" class="paper-radio">
                      <input type="radio" name="colours" id="vibe-1" value="normal" checked> <span>Normal</span>
                    </label>
                    <label for="vibe-2" class="paper-radio">
                      <input type="radio" name="colours" id="vibe-2" value="futuristic"> <span>Futuristic</span>
                    </label>
                    <label for="vibe-3" class="paper-radio">
                        <input type="radio" name="colours" id="vibe-3" value="funky"> <span>Funky</span>
                      </label>

                      <label for="vibe-4" class="paper-radio">
                        <input type="radio" name="colours" id="vibe-4" value="cute"> <span>Cute</span>
                      </label>

                      <label for="vibe-6" class="paper-radio">
                        <input type="radio" name="colours" id="vibe-6" value="modern"> <span>Modern</span>
                      </label>
                      <label for="vibe-7" class="paper-radio">
                        <input type="radio" name="colours" id="vibe-7" value="antique"> <span>Antique</span>
                      </label>
                  </fieldset>
            </div>
        </div>

        <div class="padding">
            <button class="btn-primary margin-right" type="submit">Generate Flashcard</button>
        </div>
    </form>
</div>
{/if}

{#if isLoading && !form?.success} 
    <Loading itemType="Flashcard"/>   
{/if}

{#if form?.success}
    <div class="paper container container-md margin-top" id="pdf-flashcard">
        <div class="row padding">
            <div class="sm-10">
                <h3 class="padding-none margin-none">{form?.responseData?.title}</h3>
                <p class="margin-top-small">{form?.responseData?.options?.artStyle}, {form?.responseData?.options?.drawingTool}, {form?.responseData?.options?.colours}</p>
            </div>
            <div class="sm-2">
                <button class="btn-block btn-small" on:click={downloadFlashcard}>Download</button>
            </div>
        </div>
        <div class="row">
            {#each form?.responseData?.flashcardItems as item}
            <div class="sm-4">
                <div class="card">
                    <img src={`data:image/png;base64, ${item.base64Image}`} alt={item.name}>
                    <p class="text-center padding-none margin-small">{item.name}</p>
                </div>
            </div>
            {/each}
        </div>
    </div>
 {/if}
