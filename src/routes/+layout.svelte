<nav class="border fixed split-nav">
    <div class="nav-brand">
      <h3><a href="/">Wacky Worksheets</a></h3>
    </div>
    <div class="collapsible">
      <input id="collapsible1" type="checkbox" name="collapsible1">
      <label for="collapsible1">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
      </label>
      <div class="collapsible-body">
        <!-- <ul class="inline">
          <li><a href="/">Image Gallery</a></li>
          <li><a href="/generate-questions" class="btn-block">Worksheet Generator</a></li>
        </ul> -->
      </div>
    </div>
  </nav>
  <main class="margin-top-large padding-top-large">
      <slot />
  </main>