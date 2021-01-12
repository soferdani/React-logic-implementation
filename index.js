import {createElement as E} from "./readct.js";
import {renderElement, useState} from "./ridact-dom.js";

// const Title = (props) => E('h1',null, props.text)  //this is right


const app1 = function () {

    const [val, setVal] = useState('testUseState')

    setVal('neweawsd')

    const changeTitle = function () {
        setVal('this is second')
        console.log(val)
    }

    return (
        E('div', {id: '1'},
                E('h1',{id: 'title'}, 'this is working !'),
                E('button',{onClick: changeTitle}, 'clickMe')
        ))
}

document.body.appendChild(renderElement(app1()))
