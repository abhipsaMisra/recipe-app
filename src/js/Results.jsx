import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ChipsArray from './util/ChipsArray';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {MapsLocalDining} from 'material-ui/svg-icons';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import _ from 'lodash';

export class Results extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            filterCriteria: ['Milk', 'Eggs', 'Butter', 'Banana', 'Tomato'],
            filterCount: 0,
            recipes: [
                {
                    id: 1,
                    Name: 'Tomato Soup',
                    Tags: 'Comfort-Food',
                    Cusine: 'Italian',
                    Type: 'Hot',
                    TimeToCook: '30 minutes',
                    IngredientsName: ['Vegetable Oil', 'Onion', 'Garilc', 'Tomato', 'Vegetable Stock', 'Tomato Paste', 'Pepper'],
                    Substitutions: { 'Vegetable Stock': 'Chicken Stock' , 'Tomato': 'Tomato Puree'},
                    IngredientsDetails: ['2 tablespoons vegetable oil', '2 onions, chopped', '4 cloves garlic, minced', '1 can stewed tomatoes', '3 cups vegetable stock', '1/4 cup tomato paste', '1/2 teaspoon pepper'],
                    Steps: ['Heat oil over med heat in a saucepan.', 'Cook onions and garlic stirring for 5 minutes.', 'Add tomatoes, stock, tomato paste and pepper.', 'Bring to a boil then reduce heat and simmer 15 minutes or until slightly thickened Puree with an immersion blender or ordinary blender.'],
                    Image: 'http://cdn-image.foodandwine.com/sites/default/files/styles/medium_2x/public/201308-xl-tomato-soup-with-chickpeas-and-pasta.jpg?itok=UY8q3aEd',
                }, 
                {
                    id: 2,
                    Name: 'Easy Cheesy Omlette',
                    Tags: 'Quick-Eats',
                    Cusine: 'American',
                    Type: 'Hot',
                    TimeToCook: '4 minutes',
                    IngredientsName: ['Eggs', 'Milk', 'Bell Pepper', 'Onion', 'Mozarella Cheese', 'Ketchup'],
                    IngredientsDetails: ['2 nature\'s promise extra large brown eggs', '2 tablespoons 2% low-fat milk', '1/2 cup bell pepper', '1/2 cup onion', '1/2 cup mozzarella cheese', '1 tablespoon ketchup'],
                    Steps: ['Crack eggs in a bowl, add the milk, and whisk until yolks break.', 'Add milk, peppers, and onions and whisk again.', 'Put bowl in microwave and cook for 1 minute, checking occasionally.', 'Take out bowl, put omelet on a plate, sprinkle cheese and cook for 30 seconds to melt cheese', 'Take out and enjoy!'],
                    Image: 'http://img1.cookinglight.timeinc.net/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2017/01/main/half-moon-browned-omelet.jpg?itok=GQs78MTg',
                }, 
                
            ],
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps === this.props) return;
        alert(nextProps);
        nextProps = { filterCriteria: [
            'Milk', 'Eggs', 'Butter', 'Banana'
        ]};
        this.setState({ filterCriteria: nextProps.ingredientsSelected });
    }

    changeFilter = () => {
        const currentCount = this.state.filterCount;
        const newCount = (currentCount === 6) ? 0 : currentCount+1;
        this.setState({
            filterCount: newCount
        });
    }

    addFilterTags = (option) => () => {
        const newFilters = this.state.filterCriteria.concat(option);
        const buttonHighlightId = `${this.state.filterCount}|${option}`;
        this.setState({ filterCriteria: newFilters, [buttonHighlightId]: true });
    }

    handleChips = (arrayValue, chipDeleted) => {
        const buttonHighlightId = `${this.state.filterCount}|${chipDeleted}`;
        this.setState({ filterCriteria: arrayValue, [buttonHighlightId]: false });
    }

    modifyIngredients = () => {
        alert('route back to homepage, but with state');
        // TODO: router - pass the state
        this.props.history.push({pathname: '/', state: {...this.state}});
    }

    openRecipe = (recipeId) => () => {
        this.props.history.push(`/recipe/${recipeId}`);
    }

    render() {
        const currentState = {...this.state};
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Let's get cooking</h2>
                </div>
                <Grid fluid>
                    <Row>
                        <Col xs={4}>
                            <FilterOptions filterProps={currentState} changeFilter={this.changeFilter} 
                                           addFilterTags={this.addFilterTags} modifyIngredients={this.modifyIngredients} />
                        </Col>
                        <Col xs={8}>
                            <ShowResults filterCriteria={this.state.filterCriteria} handleChips={this.handleChips}
                                         recipes={this.state.recipes} openRecipe={this.openRecipe}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

class FilterOptions extends Component {

    renderCard = (data) => {
        const style = {
            margin: 12,
        };
        const filterProps = this.props.filterProps;
        if (data.Type === 'Landing') {
            return (
                <Card>
                    <CardHeader />
                    <CardMedia>
                        <img src={data.Image} alt="" /> 
                    </CardMedia> 
                    <CardActions>
                        <FlatButton label="I don't see anything I like" onClick={this.props.changeFilter} />
                    </CardActions>
                </Card>
            );
        } else if (data.Type === 'Restart') {
            return (
                <Card>
                    <CardHeader />
                    <CardMedia>
                        <img src={data.Image} alt="" /> 
                    </CardMedia> 
                    <CardActions>
                        <FlatButton label="Let's start again" onClick={this.props.changeFilter} />
                    </CardActions>
                </Card>
            );
        } else if (data.MultiSelect) {
            return (
                <Card>
                    <CardHeader />
                    <CardMedia>
                        <Row> {data.Text} </Row>
                        <Row> {data.Options.map(option => <RaisedButton key={option} label={option} primary={filterProps[`${filterProps.filterCount}|${option}`]} style={style} onClick={this.props.addFilterTags(option)} />)} </Row>
                    </CardMedia> 
                    <CardActions>
                        <FlatButton label="I don't see anything I like" onClick={this.props.changeFilter} />
                    </CardActions>
                </Card>
            );
        } else {
            return (
                <Card>
                    <CardHeader />
                    <CardMedia>
                        <Row> {data.Text} </Row>
                        <Row> {data.Options.map(option => <RaisedButton key={option} label={option} primary={filterProps[`${filterProps.filterCount}|${option}`]} style={style} onClick={this.props.addFilterTags(option)} />)} </Row>
                    </CardMedia> 
                    <CardActions>
                        <FlatButton label="I don't see anything I like" onClick={this.props.changeFilter} />
                    </CardActions>
                </Card>
            );
        }
        
    }

    selectCardToDisplay = (count) => {
        switch(count) {
            case 0: return ({
                Type: 'Landing',
                Image: 'https://allidoiscook.files.wordpress.com/2015/07/609341_orig.jpg',
            });
            case 1: return ({
                Type: 'MultiSelect',
                Text: 'Any particular type of dish in mind (Select all that apply)',
                Options: ['Breakfast', 'Appetizers', 'Main Course', 'Finger Food', 'Snacks', 'Desserts'],
                MultiSelect: true
            });
            case 2: return ({
                Type: 'MultiSelect',
                Text: 'Which cusine are you in the mood for (Select all that apply)',
                Options: ['Italian', 'Indian', 'American', 'Thai', 'Southern', 'Middle Eastern'],
                MultiSelect: true
            });
            case 3: return ({
                Type: 'SingleSelect',
                Text: 'In the mood for something hot or cold',
                Options: ['Hot', 'Cold'],
                MultiSelect: false
            });
            case 4: return ({
                Type: 'SingleSelect',
                Text: 'How much time do you have (Select closest match - including prep time)',
                Options: ['< 15 mins', '15 mins - 30 mins', '30 mins - 1 hour', '1 hour - 2 hours', '> 2 hours'],
                MultiSelect: false
            });
            case 5: return ({
                Type: 'MultiSelect',
                Text: 'Do any of these categories sound good (Select all that apply)',
                Options: ['Game Day', 'Weeknight Dinners', 'Office Lunch', 'Quick Eats', 'Slow Cook', 'Meal Prep'],
                MultiSelect: true
            });
            case 6: return ({
                Type: 'Restart',
                Image: 'http://cdn.makeuseof.com/wp-content/uploads/2013/12/reboot-computer-errors.jpg',
            });
        }
    }

    render() {
        const data = this.selectCardToDisplay(this.props.filterProps.filterCount);
        return (
            <Row middle="xs">{this.renderCard(data)}</Row>
        );
    }
}

class ShowResults extends Component {
    renderRecipe = (recipe) => {
        const usedIngredients = _.intersection(this.props.filterCriteria, recipe.IngredientsName);
        const missingItems = recipe.Substitutions ? Object.keys(recipe.Substitutions) : '';
        const overlayCardTitle = !!recipe.Substitutions ? `Substitutions available for: ${missingItems}` : 'You have all ingredients';
        return (
            <Col xs={4} key={recipe.Name}>
                <Card>
                    <CardHeader title={recipe.Name} />
                    <CardMedia
                        overlay={<CardTitle subtitle={overlayCardTitle} /> }
                    >
                    <img src={recipe.Image} alt="" />
                    </CardMedia>
                    <CardText>
                        {`This recipe uses your: ${usedIngredients}`}
                    </CardText>
                    <CardActions>
                        <FlatButton label="View Full Recipe" onClick={this.props.openRecipe(recipe.id)}/>
                    </CardActions>
                </Card>
            </Col>
        );
    }

    render() {
        return (
            <div>
                <Row center="xs">
                    <Col xs={10}>
                        <ChipsArray chipData={this.props.filterCriteria} handleChips={this.props.handleChips} />
                    </Col>
                    <Col xs={2}>
                        <RaisedButton label="Modify" secondary={true} 
                                      icon={<MapsLocalDining />} onClick={this.props.modifyIngredients} 
                                      />
                    </Col>
                </Row>
                <Row>
                    {this.props.recipes.map(recipe => this.renderRecipe(recipe))}
                </Row>
            </div>
        );
    }
}