import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent'
import Dishdetail from './DishdetailComponent';
import Footer from './FooterComponent';
import { BrowserRouter as Router, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { fetchDishes, fetchPromos, fetchComments, postComment, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';



const mapStateToProps = state => {
  console.log(state);
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchPromos: () => dispatch(fetchPromos()),
  fetchComments: () => dispatch(fetchComments()),
  fetchLeaders: () => { dispatch(fetchLeaders())},
  postFeedback: (firstName, lastName, telNum, email, contactType, agree, feedBack) => { dispatch(postFeedback(firstName, lastName, telNum, email, contactType, agree, feedBack))}

  
});

 
class Main extends Component{

  
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchPromos();
    this.props.fetchComments();
    this.props.fetchLeaders();

  }


  render(){

    const HomePage = () => {

      console.log(this.props);
      return(
        <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leaderLoading={this.props.leaders.isLoading}
              leaderErrMess={this.props.leaders.errMess}

          />
      )
    }

    const DishWithId = ({match}) => {
      return(
        <div className='container'>
          <div className='row'>
            <Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                        isLoading={this.props.dishes.isLoading}
                        errMess={this.props.dishes.errMess}
                        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                        commentsErrMess={this.props.comments.errMess}
                        postComment={this.props.postComment}/>
          </div>
        </div>
      )
    }


    return (
      <div className="App">
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Router>
              <>
              <Header />
              <Switch>
              
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                    <Route path="/menu/:dishId" component={DishWithId}/>
                    <Route exact path='/contactus' component={() => <Contact postFeedback={this.props.postFeedback} />} />
                    <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders.leaders} />} />
                    <Redirect to='/home' />
                    
              </Switch>
              <Footer />
              </>
            </Router>
          </CSSTransition>
        </TransitionGroup>
         
        
          
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));