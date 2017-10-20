import React, { Component } from 'react';
import logo from '../img/logo.svg';
import '../css/App.css';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Card, CardHeader, CardText} from 'material-ui/Card';

export class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {allIngredients: []};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps === this.props) return;

        // hardcoding values now - to be fetched from container
        nextProps = {allIngredients: 
                        {ingredients: [
                            {Name: "Milk", Category: "Dairy"},
                            {Name: "Eggs", Category: "Meat"},
                            {Name: "Potato", Category: "Vegetable"},
                            {Name: "Banana", Category: "Fruit"},
                            {Name: "Cheese", Category: "Dairy"},
                            {Name: "Onion", Category: "Vegetable"},
                        ]}
                    };

        if(nextProps.allIngredients.ingredients) {
            const allIngredients = nextProps.allIngredients.ingredients;

            this.setState({
                allIngredients
            })
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Let's get cooking</h2>
                </div>
                <InputIngredients allIngredients={this.state.allIngredients} 
                                  handleClick={this.handleButtonClick}/>
            </div>
        );
    }

    handleButtonClick = (event) => {
        console.log(event.target);
    }
}

class InputIngredients extends Component {

    constructor(props) {
        super(props);
        this.state = {showTextInput: false, showSelect: false};
    }

    render() {
        const allIngredients = this.props.allIngredients;
        const text = "Let's see what ingredients you have";

        const buttonStyle = {
            margin: 60,
        };

        return (
            <Grid fluid>
                <Row>
                    <Col xs={12}>
                        {text}
                    </Col>
                </Row>
                <Row center="xs">
                    <RaisedButton id={"type"} label="Type Ingredients" primary={this.state.showTextInput} style={buttonStyle} onClick={this.typeIngredients} />
                    <RaisedButton id={"select"} label="Select from list" primary={this.state.showSelect} style={buttonStyle} onClick={this.selectIngredients} />
                </Row>
                <Row center="xs">
                    <Col xs={12} lg={6}>
                    {this.state.showTextInput ? <TextField name={"textInput"} /> : <div/>}
                    {this.state.showSelect ? 
                    <div>
                        <Card initiallyExpanded={false}>
                            <CardHeader title="Dairy" actAsExpander showExpandableButton />
                            <CardText expandable>
                                {"Milk"}
                            </CardText>
                        </Card>
                        <br />
                        <Card initiallyExpanded={false}>
                            <CardHeader title="Dairy" actAsExpander showExpandableButton />
                            <CardText expandable>
                                {"Milk"}
                            </CardText>
                        </Card> 
                        <br /> 
                        <Card initiallyExpanded={false}>
                            <CardHeader title="Dairy" actAsExpander showExpandableButton />
                            <CardText expandable>
                                {"Milk"}
                            </CardText>
                        </Card>  
                        <br />
                        <Card initiallyExpanded={false}>
                            <CardHeader title="Dairy" actAsExpander showExpandableButton />
                            <CardText expandable>
                                {"Milk"}
                            </CardText>
                        </Card>  
                        </div>                       
                    : <div/>}
                    </Col>
                </Row>
            </Grid>
        );
    }

    typeIngredients = () => {
        this.setState({
            showTextInput: true,
            showSelect: false
        });
    }

    selectIngredients = () => {
        this.setState({
            showTextInput: false,
            showSelect: true
        });
    }
}
