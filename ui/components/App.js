import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Error from './error/Error';
import Header from './header/Header';
import Body from './Body';
import HomePage from './home/HomePage';
import Board from './board/Board';

class App extends Component {
    render(){
        var {error, isWaiting} = this.props;
        if(error) return <Error error={error}/>;
        // if(isWaiting) return <Loader loaderMsg='Loading data, please wait a minute...'/>;
        return (
            <BrowserRouter>
                <div className='ht-inherit'>
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

export default App;