import { Component } from 'react';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from './shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';



const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            isModalOpen: false,
            rating: null,
            name: '',
            comment: ''

        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
          });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);

    }
    

    render(){

        return(
            <>
            <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className='form-group'>
                            <Label htmlFor="firstname" md={3}>Rating</Label>
                            <Col md={12}>
                                <Control type="number" model=".rating" id="rating" name="rating"
                                        placeholder="Rating"
                                        className="form-control"
                                        />
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Label htmlFor="name" md={3}>Your Name</Label>
                            <Col md={12}>
                                <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={
                                            {maxLength: maxLength(15), minLength: minLength(3)}
                                        }
                                        />
                                        <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} />
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Label htmlFor="comment" md={3}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                        placeholder="Comment"
                                        className="form-control"
                                        rows="6"
                                        />
                            </Col>
                        </Row>
                        <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </>
        );
    }
}

const RenderDish = ({dish}) =>{
    if (dish != null){
        return(
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            
            <Card>
                <CardImg width= '100%' src={baseUrl + dish.image} alt={dish.name}  />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        
        );
    }else{
        return(
            <div></div>
        )
    }
}


const RenderComments = ({commentsTab, postComment, dishId}) =>{
    if(commentsTab != null){
        const comments = commentsTab.map((comment) => {
            return  <Fade in>
                    <div key={comment.id} className='list-unstyled'>
                        <p>{comment.comment}</p>
                        <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </div>
                    </Fade>
        })
        return(
            <div>
                <h4>Comments</h4>
                <div>
                    <Stagger in>
                        {comments}
                    </Stagger>
                </div>
                <CommentForm dishId={dishId} postComment={postComment}/>
            </div>                
        )  
    }else{
        return(
            <div></div>
        )
    }
}

const Dishdetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null)
        return(
            <>
                <div className='col-12 col-md-5 m-1'>
                    <RenderDish dish={props.dish} />
                </div>
                <div className='col-12 col-md-5 m-1'>
                    <RenderComments commentsTab={props.comments} postComment={props.postComment} dishId={props.dish.id}/>
                    
                </div>
            </>
        );
    

}

export default Dishdetail;
