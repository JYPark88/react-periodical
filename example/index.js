import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Periodical from '../lib/index.js';

class App extends Component {

    doSomething() {
        console.log('do Something is Called!')
    }

    render() {
        return (
            <div>
                <Periodical
                    f={() => this.doSomething()}
                >
                    <ChildComponent />
                </Periodical>
            </div>
        );
    };
}

class ChildComponent extends Component {
    render() {
        return (
            <div>
                This is Child! React-Periodical is working.
                <br/>
                <br/>
                Check console log.
            </div>
        );
    };
}

ReactDOM.render(<App/>, document.getElementById('root'));
