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
            specialTags: [], 
            ingredientsSelected: ['Milk', 'Eggs', 'Butter', 'Banana', 'Tomato'],
            recipes: [
                {
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
        nextProps = { ingredientsSelected: [
            'Milk', 'Eggs', 'Butter', 'Banana'
        ]};
        this.setState({ ingredientsSelected: nextProps.ingredientsSelected });
    }

    conponentDidMount() {
        alert(this.props.location.state);
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Let's get cooking</h2>
                </div>
                <Grid fluid>
                    <Row>
                        <Col xs={4}>
                            <FilterOptions />
                        </Col>
                        <Col xs={8}>
                            <ShowResults ingredientsSelected={this.state.ingredientsSelected} 
                                         recipes={this.state.recipes} history={this.props.history}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

class FilterOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {count: 0};
    }

    changeFilter = () => {
        this.setState({
            count: this.state.count+1
        });
    }

    renderCard = (data) => {
        return (
            <Card>
                <CardHeader />
                <CardMedia>
                    {this.state.count === 0 ? 
                        <img src={data.Image} alt="" /> 
                        : <div>{data.Text}</div>}
                </CardMedia> 
                <CardActions>
                    <FlatButton label="I don't see anything I like" onClick={this.changeFilter} />
                </CardActions>
            </Card>
        );
    }

    selectCardToDisplay = (count) => {
        switch(count) {
            case 0: return ({
                Image: 'https://allidoiscook.files.wordpress.com/2015/07/609341_orig.jpg',
            });
            case 1: return ({
                Text: 'Any particular type of dish in mind (Select all that apply)',
                Options: ['Breakfast', 'Appetizers', 'Main Course', 'Finger Food', 'Snacks', 'Desserts'],
                MultiSelect: true
            })
        }
    }

    render() {
        const data = this.selectCardToDisplay(this.state.count);
        return (
            <Row middle="xs">{this.renderCard(data)}</Row>
        );
    }
}

class ShowResults extends Component {
    constructor(props) {
        super(props);
        this.state = { ingredientsSelected: this.props.ingredientsSelected };
    }

    renderRecipe = (recipe) => {
        const usedIngredients = _.intersection(this.state.ingredientsSelected, recipe.IngredientsName);
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
                        <FlatButton label="View Full Recipe" />
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
                        <ChipsArray chipData={this.state.ingredientsSelected} handleChips={this.handleChips} />
                    </Col>
                    <Col xs={2}>
                        <RaisedButton label="Modify" secondary={true} 
                                      icon={<MapsLocalDining />} onClick={this.modifyIngredients} 
                                      />
                    </Col>
                </Row>
                <Row>
                    {this.props.recipes.map(recipe => this.renderRecipe(recipe))}
                </Row>
            </div>
        );
    }

    handleChips = (arrayValue) => {
        this.setState({ ingredientsSelected: arrayValue });
    }

    modifyIngredients = () => {
        alert('route back to homepage, but with state');
        // TODO: router - pass the state
        this.props.history.push({pathname: '/', state: {...this.state}});
    }
}