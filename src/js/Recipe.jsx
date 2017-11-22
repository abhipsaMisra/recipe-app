import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {MapsLocalDining} from 'material-ui/svg-icons';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import _ from 'lodash';

export class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }
    render() {
        return (<div> {'recipe in here'} </div>);
    }
}