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

  onDishselected(dish){
    this.setState({selectedDish: dish});
    this.setState({comments: dish.comments});
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
        <Dishdetail dish={match.params.id} comments={this.state.comments}/>
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
            <Route path="/menu/:dish" component={DishWithId}/>
            <Route exact path='/contactus' component={Contact} />
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