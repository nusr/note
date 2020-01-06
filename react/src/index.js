import MiniReact from "./MiniReact";
/** @jsx MiniReact.createElement */
const element = (
  <div style="background: #f00">
    <h1 style="text-align:center">MiniReact</h1>
    <h2>subtitle</h2>
  </div>
);
const container = document.getElementById("app");
MiniReact.render(element, container);
