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

const mapStateToProps = state => {
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component{

  
  constructor(props){
    super(props);
  }


  render(){

    const HomePage = () => {
      return(
        <Home 
              dish={this.props.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      )
    }

    const DishWithId = ({match}) => {
      return(
        <div className='container'>
          <div className='row'>
            <Dishdetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                        comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}/>
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
            <Route exact path='/contactus' component={Contact} />
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

export default (connect(mapStateToProps)(Main));