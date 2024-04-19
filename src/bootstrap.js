import { launch } from "./app.js";

export const bootstrap = (root) => {
  root.innerHTML = `
    <h1>JavaScript Online Quiz</h1>
  
    <div id="current-question" class="question-container"></div>
  
    <div id="control" class="control"></div>
    <div id="result" class="result"></div>
  `;
  launch();
};

const App = document.getElementById("app");
bootstrap(App);
