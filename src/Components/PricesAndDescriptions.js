import React from 'react';

export default class PricesAndDescriptions extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        const itemsInformation = this.props.itemsInfo;
        let markup = [];
        itemsInformation.map((item, index )=>{
            markup.push(
                <div key={'index-'+index}>
                    <div>items.description</div>
                    <div>items.price</div>
                </div>
            );
        });
        return(
            <div>
                {markup}
            </div>
            );
    }
}