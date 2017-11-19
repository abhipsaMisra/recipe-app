import React, { Component } from 'react';
import logo from '../img/logo.svg';
import '../css/App.css';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import _ from 'lodash';
import AutoComplete from 'material-ui/AutoComplete';
import {MapsLocalDining} from 'material-ui/svg-icons';
import ChipsArray from './util/ChipsArray';
import CollapsiblePanel from './util/CollapsiblePanel';

export class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {ingredientsByCategory: {}, ingredientsWithoutCategory: []};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps === this.props) return;

        // hardcoding values now - to be fetched from container
        nextProps = {allIngredients: [
            {Name: "Milk", Category: "Dairy"},
            {Name: "Eggs", Category: "Meat"},
            {Name: "Potato", Category: "Vegetable"},
            {Name: "Banana", Category: "Fruit"},
            {Name: "Cheese", Category: "Dairy"},
            {Name: "Onion", Category: "Vegetable"},
            {Name: "Butter", Category: "Dairy"},
            {Name: "Turkey", Category: "Meat"},
            {Name: "Brocoli", Category: "Vegetable"},
            {Name: "Apple", Category: "Fruit"},
            {Name: "Cream", Category: "Dairy"},
            {Name: "Green Peppers", Category: "Vegetable"},
        ]};

        if(nextProps) {
            const allIngredients = nextProps.allIngredients;
            const ingredientsByCategory = {};
            let ingredientsWithoutCategory = [];
            allIngredients.forEach(ingredient => {
                const category = ingredient.Category;
                if(ingredientsByCategory.hasOwnProperty(category)) {
                    const values = ingredientsByCategory[category];
                    const newValues = _.concat(values, ingredient.Name);
                    ingredientsByCategory[category] = newValues;
                } else {
                    ingredientsByCategory[category] = ingredient.Name;
                }
                ingredientsWithoutCategory.push(ingredient.Name);
            })

            this.setState({
                ingredientsByCategory,
                ingredientsWithoutCategory
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
                <InputIngredients allIngredients={this.state.ingredientsByCategory} 
                                  ingredientsName={this.state.ingredientsWithoutCategory} />
            </div>
        );
    }
}

class InputIngredients extends Component {

    constructor(props) {
        super(props);
        this.state = {showTextInput: false, initial: true, ingredientsSelected: []};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps == this.props)return;

        if(nextProps.ingredientsSelected) {
            this.setState({ ingredientsSelected: nextProps.ingredientsSelected });
        }
    }

    render() {
        const text = "Let's see what ingredients you have";

        const buttonStyle = {
            margin: 60,
        };

        const renderContent = () => {
            return (
                <div>
                    {this.state.ingredientsSelected.length > 0
                        ? <RaisedButton label="Let's Start" secondary={true} icon={<MapsLocalDining />} 
                            onClick={this.showRecipes} />
                        : <div />
                    }
                    {this.state.showTextInput
                        ? <TypeIngredients ingredientsSelected={this.state.ingredientsSelected} allIngredients={this.props.ingredientsName} handleTextInput={this.handleTextInput}/>
                        : <SelectIngredients ingredientsSelected={this.state.ingredientsSelected} allIngredients={this.props.allIngredients} handleCheckbox={this.handleCheckbox} />
                    }
                </div>
            );
        }

        return (
            <Grid fluid>
                <Row>
                    <Col xs={12}>
                        {text}
                    </Col>
                </Row>
                <Row center="xs">
                    <Col xs={12}>
                        <RaisedButton id={"type"} label="Type Ingredients" primary={this.state.showTextInput} style={buttonStyle} onClick={this.selectInputMethod("type")} />
                        <RaisedButton id={"select"} label="Select from list" primary={this.state.initial ? false : !this.state.showTextInput} style={buttonStyle} onClick={this.selectInputMethod("select")} />
                    </Col>
                </Row>
                <Row center="xs">
                    <Col xs={12} lg={6}>
                        { this.state.initial ? <div /> :  renderContent()  }
                    </Col>
                </Row>
            </Grid>
        );
    }

    handleCheckbox = (eventType, item) => {
        let ingredientsSelected = this.state.ingredientsSelected;
        if(eventType == 'add') {
            ingredientsSelected = [...ingredientsSelected, item];
        } else {
            const remove = _.remove(ingredientsSelected, toBeRemoved =>  item == toBeRemoved);
        }
        this.setState({ ingredientsSelected });
    }

    handleTextInput = (text) => {
        this.setState({
            ingredientsSelected: [...this.state.ingredientsSelected, text]
        });
    }

    selectInputMethod = (id) => () => {
        const showTextInput = (id === "type");
        this.setState({ showTextInput, initial: false });
    }

    showRecipes = () => {
        alert(this.state.ingredientsSelected);
    }
}

class TypeIngredients extends Component {

    constructor(props) {
        super(props);
        this.state = {searchText: ''};
    }

    render () {
        const ingredientsAvailable = this.props.ingredientsSelected;
        const allIngredients = this.props.allIngredients;
        const ingredientsList = _.difference(allIngredients, ingredientsAvailable);

        return (
            <div>
                <Row center="xs">
                    <Col xs={12}>
                        <AutoComplete
                            floatingLabelText="Type Ingredients"
                            searchText={this.state.searchText}
                            filter={AutoComplete.caseInsensitiveFilter}
                            dataSource={ingredientsList}
                            onNewRequest={this.handleAutoComplete}
                            onUpdateInput={this.handleUpdateInput}
                        />
                    </Col>
                </Row>
                <Row center="xs">
                    <Col xs={12}>
                        <ChipsArray chipData={this.props.ingredientsSelected} handleChips={this.handleChips} />
                    </Col>
                </Row>
            </div>
        );
    }

    handleChips = (arrayValue) => {
        this.setState({ ingredientsSelected: arrayValue });
    }

    handleUpdateInput = (searchText) => {
        this.setState({ searchText });
    }

    handleAutoComplete = (chosenRequest, index) => {
        this.setState({ searchText: '' });
        let item = chosenRequest;
        if(index == -1) {
            item = _.startCase(chosenRequest); 
        }
        this.props.handleTextInput(item);
    }
}

class SelectIngredients extends Component {
    renderContent = (key) => {
        return (
            <Col xs={6}>
                <CollapsiblePanel key={key} Category={key} 
                                  data={this.props.allIngredients[key]} 
                                  selected={this.props.ingredientsSelected} 
                                  handleCheckbox={this.props.handleCheckbox}/>
            </Col>
        )
    }

    render () {
        return (
            <Row>
                { Object.keys(this.props.allIngredients).map(key => this.renderContent(key)) }
            </Row>
        );
    }
}

