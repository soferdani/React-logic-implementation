import {createElement as E} from "./readct.js";
import {renderElement} from "./ridact-dom.js";

const App = E('div', null,
    E('h1',null,"let see if its working"),
    E('h2',null,"this is working!!! yayy"),)

console.log("this is my react VERY basic Implementation")

document.body.appendChild(renderElement(App))
