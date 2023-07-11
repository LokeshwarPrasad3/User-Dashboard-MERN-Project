import React from 'react'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import './componentCss/Loader.css';

const Loader = (props) => {
    const { display, message } = props;

    return (
        <>

            {/* loading section */}
            <div id="centerLoader" style={{ display: display }}>
                <h3 style={{ textAlign: 'center' }} >{message}</h3>
                <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                    <CircularProgress color="secondary" />
                    <CircularProgress color="success" />
                    <CircularProgress color="inherit" />
                </Stack>
            </div>
        </>
    )
}

export default Loader
