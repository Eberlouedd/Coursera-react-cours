import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent'
import Dishdetail from './DishdetailComponent';
import { DISHES } from './shared/dishes';
import {COMMENTS} from './shared/comments';
import {PROMOTIONS} from './shared/promotion';
import {LEADERS} from './shared/leaders';
import Footer from './FooterComponent';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Contact from './ContactComponent';
import About from './AboutComponent';


class Main extends Component{

  constructor(props){
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    }
  }


  render(){

    const HomePage = () => {
      return(
        <Home 
              dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          />
      )
    }

    const DishWithId = ({match}) => {
      return(
        <div className='container'>
          <div className='row'>
            <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                        comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}/>
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
            <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
            <Route path="/menu/:dishId" component={DishWithId}/>
            <Route exact path='/contactus' component={Contact} />
            <Route exact path='/aboutus' component={() => <About leaders={this.state.leaders} />} />
            <Redirect to='/home' />
          </Switch>
          <Footer />
          </>
        </Router>
        
          
      </div>
    );
  }
}

export default Main;