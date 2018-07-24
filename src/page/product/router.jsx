/**
 * Created by ZD on 2018/6/28.
 */
import React from 'react';
import { BrowserRouter as Router, Redirect,Switch, Route, Link } from 'react-router-dom';

import ProductList from 'page/product/index/index.jsx';
import ProductSave from 'page/product/index/save.jsx';

class ProductRouter extends React.Component{

    render(){
        return (
            <Switch>
                <Route  path="/product/index" component={ProductList} />
                <Route  path="/product/save/:pid" component={ProductSave} />
                <Redirect exact  from="/product" to="/product/index" />
            </Switch>
        )
    }
}


export default  ProductRouter;
