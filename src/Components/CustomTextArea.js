import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

export default class CustomTextArea extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text>{this.props.label}</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control 
                as="textarea" 
                aria-label="With textarea"
                value={this.props.val}
                onChange={this.props.changeHandler} />
            </InputGroup>
            );
    }
}