import {createElement as E} from "./readct.js";
import * as ReactDOM from "./ridact-dom.js";


const app1 = function () {
    return (
        E('div', null,
            counterComponent(),
            counterComponent()
        ))
}

const counterComponent = () => {
    const [counter, setCounter] = ReactDOM.useState(0)

    const incrementCount = function () {
        setCounter(counter + 1)
    }

    return (
        E('div', null,
            E('h1', null, counter),
            E('button', {onClick: incrementCount}, 'clickMe')
        ))
}


ReactDOM.render(app1, document.getElementById('root'))


// ReactDOM.renderElement(app1(), document.body)

// document.body.appendChild(renderElement(app1()))
