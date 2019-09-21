import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {Error, Loader} from '../pattern-library';
import Header from './header/Header';
import Body from './Body';
import HomePage from './home/HomePage';
import Board from './board/Board';

class App extends Component {
    render() {
        var {isLoading, isError, loadMsg, errorMsg} = this.props;
        if (isError) 
            return <Error errorMsg={errorMsg}/>;
        if (isLoading) 
            return <Loader loadMsg={loadMsg}/>;
        return (
            <BrowserRouter>
                <div className='max-ht'>
                    <Header/>
                    <Switch>
                        <Body>
                            <Route exact path='/' component={HomePage}/>
                            <Route path='/:boardName' component={Board}/>
                        </Body>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) => {
    const {isLoading, isError, loadMsg, errorMsg} = state.board;
    return {isLoading, isError, loadMsg, errorMsg};
}

export default connect(mapStateToProps, null)(App);