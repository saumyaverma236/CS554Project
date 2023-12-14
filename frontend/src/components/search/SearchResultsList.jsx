import SearchResult from "./SearchResult";

export default function SearchResultsList(props) {
    const { searchResults } = props;

    // Map through the array of search results, creating a SearchResult component for each one
    return (
        <div>
            {searchResults.map(result => {
                return (
                    <div key={result.id}>
                        <SearchResult result={result} key={result.id} />
                    </div>
                )
            })}
        </div>
    )
}