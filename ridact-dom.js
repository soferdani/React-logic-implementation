export function renderElement (element) {
    const {type, props, children} = element;

    if(typeof type === 'string') {
        const element = document.createElement(type);

        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child))
            } else {
                element.appendChild(renderElement(child))
            }
        })

        return element
    }

}