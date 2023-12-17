import { useContext, useState } from "react";
import DeviceContext from "../../context/DeviceContext";
import axios from "axios";

//TODO: Need to fix modal scrolling and layout to show images and artist names
export default function SearchResult(props) {
    const { result } = props;

    const [inQueue, setInQueue] = useState(false);
    const { deviceID } = useContext(DeviceContext);

    const fetchData = async (trackUri) => {
        try {
            const { data } = await axios.post('/api/add-track', {
                deviceId: deviceID,
                trackUri: trackUri,
            });

            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = () => {
        fetchData(result.uri);
        setInQueue(true);
    }

    // Display the name, artist(s), and cover image for each track in search result
    return <div>
        {result.name}
        <br />
        {result.artists.join(', ')}
        <br />
        <img src={result.image} alt={result.name} />
        <br />
        {!inQueue && (
            <button onClick={() => handleClick()}>Add to Queue</button>
        )}
        {inQueue && (
            <button disabled>✔️</button>
        )}
        <hr />
    </div>
}