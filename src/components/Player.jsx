import { useState, useRef, useEffect, useContext } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import BlindtestContext from "../BlindtestContext";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
  
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
};

  const Widget = styled('div')(({ theme }) => ({
    padding: 16,
    borderRadius: 16,
    width: 343,
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(40px)',
  }));
  
  const CoverImage = styled('div')({
    width: 100,
    height: 100,
    objectFit: 'cover',
    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
      width: '100%',
    },
  });
  
  const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
  });
  
export default function Player({track, onNext, onPrev}) {

  const {blindtest, handleBlindtest} = useContext(BlindtestContext)
  const [karaoke, setKaraoke] = useState(false)
  const [ open, setOpen ] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

    const currentTrack = useRef();

    const theme = useTheme();
    const duration = 200; // seconds
    const [position, setPosition] = useState(32);
    const [paused, setPaused] = useState(false);
    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
    }
    const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
    const lightIconColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';



    useEffect(() => {
      if (!currentTrack.current) {
        return;
      }

      currentTrack.current.addEventListener('ended', () => console.log('ZIK FINISHED'));
    }, [currentTrack.current])

    useEffect(() => {
      if(currentTrack.current){
        currentTrack.current.currentTime = 0;
        currentTrack.current.load()
        currentTrack.current.play()
      }
    }, [track])
if (!track) {
  return null
}
const handleKaraoke = () => {
  setKaraoke(!karaoke)
  setOpen(!open)
}

    return (
        <>
        <h2 style={{fontSize: "2em"}}>Musique en cours</h2>
        <FormControlLabel control={ <Switch onChange={handleBlindtest} />} label="Blindtest" sx={{position: "fixed", top: 12, left: 10}}/>
        <FormControlLabel control={ <Switch onChange={handleKaraoke} />} label="Karaoke" sx={{position: "fixed", top: 45, left: 10}}/>
         <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Widget>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CoverImage>
            <img
              alt="???"
              src={blindtest ? null : track.cover}
              />
          </CoverImage>
          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography noWrap>
              <b>{blindtest ? "???" : track.artist}</b>
            </Typography>
            <Typography noWrap letterSpacing={-0.25}>
            {blindtest ? "???" : track.title}
            </Typography>
          </Box>
        </Box>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => setPosition(value)}
          sx={{
              color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
              height: 4,
              '& .MuiSlider-thumb': {
                  width: 8,
                  height: 8,
                  transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                  '&:before': {
                      boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                    },
                    '&:hover, &.Mui-focusVisible': {
                        boxShadow: `0px 0px 0px 8px ${
                            theme.palette.mode === 'dark'
                            ? 'rgb(255 255 255 / 16%)'
                            : 'rgb(0 0 0 / 16%)'
                        }`,
                    },
                    '&.Mui-active': {
                        width: 20,
                        height: 20,
                    },
                },
                '& .MuiSlider-rail': {
                    opacity: 0.28,
                },
            }}
            />
        <Box
          sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: -2,
            }}
            >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box>
        <Box
          sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: -1,
            }}
            >
          <IconButton aria-label="previous song">
            <FastRewindRounded fontSize="large" htmlColor={mainIconColor} onClick={onPrev}/>
          </IconButton>
          <IconButton
            aria-label={paused ? 'play' : 'pause'}
            onClick={() => setPaused(!paused)}
            >
            {paused ? (
                <PlayArrowRounded
                sx={{ fontSize: '3rem' }}
                htmlColor={mainIconColor}
                onClick={() => currentTrack.current.play()}
                />
                ) : (
                    <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} onClick={() => currentTrack.current.pause()} />
                    )}
          </IconButton>
          <IconButton aria-label="next song">
            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} onClick={onNext}/>
          </IconButton>
        </Box>
        <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
          <VolumeDownRounded htmlColor={lightIconColor} />
          <Slider
            aria-label="Volume"
            defaultValue={30}
            sx={{
                color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                '& .MuiSlider-track': {
                    border: 'none',
                },
                '& .MuiSlider-thumb': {
                    width: 24,
                    height: 24,
                    backgroundColor: '#fff',
                    '&:before': {
                        boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                    },
                    '&:hover, &.Mui-focusVisible, &.Mui-active': {
                        boxShadow: 'none',
                    },
                },
            }}
            />
          <VolumeUpRounded htmlColor={lightIconColor} />
        </Stack>
      </Widget>
    </Box>
    <audio src={track.preview} ref={(e) => currentTrack.current = e} />
    <Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Incererr ici les paroles
					</Typography>
				</Box>
			</Modal>
    </>
    )
}

