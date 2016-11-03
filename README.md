# react-periodical


React wrapper component for calling function periodically.

## Install

#### NPM:

    npm install --save react-periodical

## Demo

    open `index.html` file

## Example:

```javascript
import React, { Component } from 'react';
import Periodical from 'react-periodical';

class App extends Component {

    doSomething() {
        console.log('function called');
    }

    render () {
        return (
            <div>
                <Periodical
                  f={() => this.doSomething()}
                  period={10000}
                >
                  <ChildComponent {...childProps}/>
                </Periodical>

                //You can set component with props like below.
                <Periodical
                  f={() => this.doSomething()}
                  period={5000}
                  components={[OtherChildComponent, AnotherChildComponent]}
                />
            </div>
        )
    }
}
```

## Props

#### `f` : PropTypes.func.isRequired

function that called periodically

#### `period` : PropTypes.number

time interval next function call (default : 1000 ms)

#### `limit` : PropTypes.number

max limit count

#### `paused` : PropTypes.bool

if it is true, function call will be paused, with having current call count. (default : false)

#### `components` : PropTypes.oneOfType(
  [

    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    ),

    PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  ]
)

just explicit child component.

You can understatnd directly this child or these children are effected by this function.

## License

MIT
