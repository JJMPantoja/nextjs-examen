import React from 'react'

import CircularProgress from '@mui/material/CircularProgress';
import { Header  } from "semantic-ui-react";


export default function LoaderScreen(props) {
    return (
        <div className="loaderScreen">
            <Header as='h1' className="titleElement display-5">
                <CircularProgress />
                <br />
                <Header.Content className="title-color lab-lg">
                    Cargando...
                </Header.Content>
            </Header>
        </div>
    )
}