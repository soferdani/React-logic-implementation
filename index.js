import {createElement as E} from "./readct.js";
import {renderElement} from "./ridact-dom.js";

const Title = (props) => E('h1',null, props.text)  //this is right

// console.log(E(Title,{text:"let me see if this is working"},null))

const App = E(
    'div',
    null,
        E(
            'h2',
            {id: "dani", title: "lalala"},
            "this is working!!! yayy" 
        ),
        E(
            Title,
            { text: "let see if its working" },
            null
        ),
        E(
            'h3',
            null,
            3213
        )
    )

// console.log(App)
document.body.appendChild(renderElement(App))

//
// let appendTo = document.getElementById('num')
// let newElement = document.createElement('h1')
// newElement.textContent = 123123
// appendTo.appendChild(newElement)
