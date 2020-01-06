import { TEXT_ELEMENT, CHILDREN_KEY } from "./shared";
function createTextElement(nodeValue) {
  return {
    type: TEXT_ELEMENT,
    props: {
      nodeValue,
      [CHILDREN_KEY]: []
    }
  };
}
function createElement(type, props, ...children) {
  const temp = {
    type,
    props: {
      ...props,
      [CHILDREN_KEY]: children.map(item =>
        typeof item !== "object" ? createTextElement(item) : item
      )
    }
  };
  console.log(temp);
  return temp;
}
function render(element, container) {
  const { type, props } = element;
  const dom =
    type === TEXT_ELEMENT
      ? document.createTextNode("")
      : document.createElement(type);
  Object.keys(props).forEach(key => {
    if (key === CHILDREN_KEY) {
      props[key].forEach(item => render(item, dom));
    } else {
      dom[key] = props[key];
    }
  });
  container.appendChild(dom);
}
export default {
  createElement,
  render
};
