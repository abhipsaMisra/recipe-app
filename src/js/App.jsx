import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Route } from 'react-router-dom';

// import the different components here
import HomePageContainer from './HomePageContainer';
import ResultsContainer from './ResultsContainer';

export default class App extends Component {
    
    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12}>
                        <Route exact path='/' component={HomePageContainer} />
                        <Route path='/recipes' component={ResultsContainer} />
                    </Col>
                </Row>
            </Grid>
        );
    }

}