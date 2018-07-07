/**
 * Created by ZD on 2018/6/28.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect,Switch, Route, Link } from 'react-router-dom';

import Layout from 'component/layout/index.jsx';
import Home from 'page/home/index.jsx';

class A extends React.Component{

    render(){
        return (
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route  path="/product" component={Home} />
                        <Route  path="/product-category" component={Home} />
                    </Switch>
                </Layout>
            </Router>
            )
    }
}


ReactDOM.render((
    <A/>
), document.getElementById('app'));
