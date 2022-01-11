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
import { addComment, fetchDishes } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';



const mapStateToProps = state => {
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
});

 
class Main extends Component{

  
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
  }


  render(){

    const HomePage = () => {
      return(
        <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
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
                        comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                        addComment={this.props.addComment}/>
          </div>
        </div>
      )
    }


    return (
      <div className="App">
        <Router>
          <>
          <Header />
          <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
            <Route path="/menu/:dishId" component={DishWithId}/>
            <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
            <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
            <Redirect to='/home' />
          </Switch>
          <Footer />
          </>
        </Router>
        
          
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));