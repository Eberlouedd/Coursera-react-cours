import {Component} from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';

class Dishdetail extends Component{
    constructor(props){
        super(props);
    }

    renderDish(dish){
        if (dish != null){
            return(
                
                <Card>
                    <CardImg width= '100%' object src={this.props.dish.image} alt={this.props.dish.name} />
                    <CardBody>
                        <CardTitle>{this.props.dish.name}</CardTitle>
                        <CardText>{this.props.dish.description}</CardText>
                    </CardBody>
                </Card>
            
            );
        }else{
            return(
                <div></div>
            )
        }
    }

    renderComments(dishComments){
        if(dishComments != null){
            console.log(this.props.comments);
            const comments = dishComments.map((comment) => {
                return  <div key={comment.id} className='list-unstyled'>
                            <p>{comment.comment}</p>
                            <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </div>
            })
            
            return(
                <div>
                    <h4>Comments</h4>
                    <div>{comments}</div>
                </div>
                
                
            )
            
        }else{
            return(
                <div></div>
            )
        }
    }
    
    render(){
        return(
            <>
                <div className='col-12 col-md-5 m-1'>
                    <div>{this.renderDish(this.props.dish)}</div>
                </div>
                <div className='col-12 col-md-5 m-1'>
                    <div>{this.renderComments(this.props.comments)}</div>
                    
                </div>
            </>
        );
    }

}

export default Dishdetail;
