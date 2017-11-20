import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import _ from 'lodash';
import { Col } from 'react-flexbox-grid';

export default class CollapsiblePanel extends Component {

    renderCheckboxes = (item) => {
        return (
            <Col xs={12}>
                <Checkbox
                    key={item}
                    label={item}
                    checked={_.includes(this.props.selected, item)}
                    onCheck={this.updateCheck(item)}
                />
            </Col>
        );
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader
                        title={this.props.Category}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        { this.props.data.map(item => this.renderCheckboxes(item)) }
                    </CardText>
                </Card>
                <br/>
            </div>
        );
    }

    updateCheck = (item) => (event, isChecked) => {
        let eventType = 'remove';
        if(isChecked) {
            eventType = 'add';
        } 
        this.props.handleCheckbox(eventType, item);
    }
}
