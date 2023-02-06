<script>
	import Hero from "./Hero.svelte";
    import SearchBar from "./SearchBar.svelte";
	import Listing from "./Listing.svelte";
	import Fuse from "fuse.js"

	export let data
	
	let imageRecords = data?.imageRecords ?? []
	let searchPrompt = ""

	const fuse = new Fuse(imageRecords, {
		keys: ['mainPrompt', 'imageStyles']
	})

	const handleSearch = () => {
		if(!searchPrompt) {
			imageRecords = data?.imageRecords ?? []
			return 
		}

        const fuseResults = fuse.search(searchPrompt)
		imageRecords = fuseResults.map(result => result.item);
    }
</script>

<Hero title="Fun Images for Your Worksheets! 🤩" description="Use wacky images generated with ❤️ by AI 🤖"/>
<SearchBar bind:searchPrompt={searchPrompt}  handleSearch={handleSearch}/>
<Listing imageRecords={imageRecords}/>