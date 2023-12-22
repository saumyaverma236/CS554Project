import { useState, useEffect, useRef } from 'react';
import SearchModal from './search/SearchModal';
import MusicPlayerScrubber from './MusicPlayerScrubber';

import DeviceContext from '../context/DeviceContext';
import axios from 'axios';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

const track = {
	name: "",
	album: {
		images: [
			{ url: "" }
		]
	},
	artists: [
		{ name: "" }
	]
}

function WebPlayback(props) {

	const cardStyle = {
        backgroundColor: '#ffe4e1', // Misty Rose background
        boxShadow: '0 4px 15px 0 rgba(13, 144, 98, 0.2), 0 6px 20px 0 rgba(10, 156, 149, 0.19)',
        padding: '2em',
        textAlign: 'center',
        margin: '20px'
    };

	let counter = 0

	const [is_paused, setPaused] = useState(false);
	const [is_active, setActive] = useState(false);
	const [player, setPlayer] = useState(undefined);
	const [current_track, setTrack] = useState(track);
	const [queue, setQueue] = useState([]);
	const [selfUpdate, setSelfUpdate] = useState(true)
	const deviceID = useRef(null);
	// const [playBackState, setPlayBackState] = useState(undefined)

	// const [playbackResponse, setPlaybackResponse] = useState(undefined)

	const [showSearchModal, setShowSearchModal] = useState(false);
    // counter += 1
	// console.log('myplayerstate:::::::::')
	// // console.log(counter)
	// // console.log(props.playerState)

	
	let shouldEmit = true



	useEffect(() => {
		console.log('inside my useEffect myplayerstate update')
		
			    console.log('recieved updated state in WebPlayback')
                console.log(props.playerState)
				

				const fetchData = async () => {
					console.log('called fetchdata in useeffect:::: ')
					let test = [props.playerState.current_track];

					if (props.playerState.paused) {
						player.togglePlay()
						return
					}

					
					try {

						
							let test2 = props.playerState.next_tracks.map(track => track.uri);
							test = [props.playerState.current_track, ...test2]
						
						console.log('my uris::::')
						console.log(test)
						
						    
							const { data } = await axios.post('/api/set-track', {
								trackUris: test,
								position: props.playerState.position
								
							});

							// setTimeout(() => {
							// 	if (props.playerState.paused === true) {
							// 		player.pause().then(() => {
							// 			console.log('Paused!');
							// 		  });
							// 	}
							// }, 300);
							

							
							
							
							console.log(data);

							
						

					
					} catch (error) {
						setSelfUpdate(true)
						console.log(error);
					}
				};

                
			    
				fetchData()
				

		
	  }, [props.playerState]); // Effect will re-run if props.playbackState changes
	  

	useEffect(() => {

		const script = document.createElement("script");
		script.src = "https://sdk.scdn.co/spotify-player.js";
		script.async = true;

		document.body.appendChild(script);

		window.onSpotifyWebPlaybackSDKReady = () => {

			const player = new window.Spotify.Player({
				name: 'Web Playback SDK',
				getOAuthToken: cb => { cb(props.token); },
				volume: 0.5
			});

			setPlayer(player);

			player.addListener('ready', ({ device_id }) => {
				console.log('Ready with Device ID', device_id);
				deviceID.current = device_id;
				fetchData(device_id);
			});

			player.addListener('not_ready', ({ device_id }) => {
				console.log('Device ID has gone offline', device_id);
			});

			player.addListener('player_state_changed', ( async state => {
				console.log('listener function player_state_changed')
				
			
				if (!state) {
					return;
				}

				setTrack(state.track_window.current_track);
				setQueue(state.track_window.next_tracks.slice(0, 5));
				setPaused(state.paused);



				player.getCurrentState().then(state => {
					(!state) ? setActive(false) : setActive(true)
				});

				console.log('inside listener::::::')
				console.log(state)
				
				 

			}));

			player.connect();

		};

		

	}, []);

	const emitPlayerState = (state) => {
		console.log('emit playerstatechanged called:::::')
					props.socketRef.current.emit('player_state_changed', {
						state
					  });
	}

	// API Call to get Playback State 
	// SetInterval to retrieve state every x seconds

	// const getPlaybackState = async () => {
	// 	try {
	// 		const { data } = await axios.get('/api/playback-state');
    //         console.log('my playback data::::::')
	// 		console.log(data);
	// 		setPlaybackResponse(data)
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// setInterval(() => {
	// 	console.log('Getting Playback State');
	// 	getPlaybackState();
	// }, 1000);
	
	const fetchData = async (deviceId) => {
		try {
			const { data } = await axios.post('/api/transfer-playback', {
				deviceId: deviceId
			});

			console.log(data);
		} catch (error) {
			console.log(error)
		}
	}

	const handleCloseModals = () => {
		setShowSearchModal(false);
	}
	const albumImageStyle = {
        width: '80px',  // Adjust the width as needed
        height: '80px', // Adjust the height as needed
        margin: 'auto'  // Centers the image
    };

	

	if (!is_active) {
        return (
            <DeviceContext.Provider value={{ deviceID: deviceID.current }}>
				
                <Container>
                    <Box textAlign="center">
                        <Typography variant="h6">
                            Instance not active. Transfer your playback using your Spotify app
                        </Typography>
                        <Button variant="contained" color="primary" onClick={() => setShowSearchModal(true)}>
                            Search for Songs
                        </Button>
                    </Box>

                    {showSearchModal && (
                        <SearchModal 
                            isOpen={showSearchModal}
                            handleClose={handleCloseModals}
                        />
                    )}
                </Container>
            </DeviceContext.Provider>
        );
    }else {
		return (
            <DeviceContext.Provider value={{ deviceID: deviceID.current }}>
                <Box className="container">
                    <Box className="main-wrapper">
                        <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                            <CardMedia
                                component="img"
                                image={current_track.album.images[0].url}
                                alt={current_track.name}
								// sx={albumImageStyle}
                                className="now-playing__cover"
                            />

                            <Box className="now-playing__side">
                                <Typography variant="h6" className="now-playing__name">
                                    {current_track.name}
                                </Typography>
                                <Typography variant="subtitle1" className="now-playing__artist">
                                    {current_track.artists[0].name}
                                </Typography>

                                {props.isHost && (
                                    <>
                                        <Button className="btn-spotify" onClick={() => {
										player.previousTrack() 
										setTimeout(() => {
											player.getCurrentState().then(mystate => {
												console.log('after previous track')
												console.log(mystate)
												emitPlayerState(mystate)
												props.handleHostPlayerAction('Host skipped to previous song in queue')
											});
										}, 100);
										}} >
										
                                            &lt;&lt;
                                        </Button>
                                        <Button className="btn-spotify" onClick={() => {
											player.togglePlay()
										 // Set a delay of 100 milliseconds (adjust as needed)
									setTimeout(() => {
										player.getCurrentState().then(mystate => {
											console.log('after toggle play')
											console.log(mystate)
											emitPlayerState(mystate)
										});
										props.handleHostPlayerAction('Host toggled play state of song')
									}, 100);
									 }} >
									 {is_paused ? "PLAY" : "PAUSE"}
                                     </Button>
                                        <Button className="btn-spotify" onClick={() => {
											player.nextTrack() 
											setTimeout(() => {
												player.getCurrentState().then(mystate => {
													console.log('after next track')
													console.log(mystate)
													emitPlayerState(mystate)
												});
												props.handleHostPlayerAction('Host skipped to next song in queue')
											}, 100);
											}} >
                                            &gt;&gt;
                                        </Button>
                                    </>
                                )}
                            </Box>
                        </Card>

                        <Button onClick={() => setShowSearchModal(true)} style={{ backgroundColor: '#ff7f50', width:'200px', height:'40px'}}>
                            Search for Songs
                        </Button>

                        <Box className='queued_songs_list'>
                            <Typography variant="h6">Queued Songs</Typography>
                            {queue.map(track => (
                                <Box key={track.uri} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CardMedia
                                        component="img"
                                        image={track.album.images[1].url}
                                        alt={track.name}
                                        sx={{ width: 48, height: 48, mr: 2 }}
                                    />
                                    <Box>
                                        <Typography className="queue__name">{track.name}</Typography>
                                        <Typography className="queue__artist">{track.artists[0].name}</Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>

                        {showSearchModal && (
                            <SearchModal isOpen={showSearchModal} handleClose={() => setShowSearchModal(false)} />
                        )}
                    </Box>
                </Box>
            </DeviceContext.Provider>
        );
	}
}

export default WebPlayback

