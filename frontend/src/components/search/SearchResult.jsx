//TODO: Need to fix modal scrolling and layout to show images and artist names
export default function SearchResult(props) {
    const { result } = props;

    // Display the name, artist(s), and cover image for each track in search result
    return <div>
        {result.name}
        <br />
        {result.artists.join(', ')}
        <br />
        <img src={result.image} alt={result.name} />
        <br />
        <hr />
    </div>
}