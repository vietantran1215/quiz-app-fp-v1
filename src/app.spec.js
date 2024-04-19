import { jest } from "@jest/globals";
import { renderSelectedQuestion, start, startingKey } from "./app";
import { data } from "./mock-data";

describe("Testing quiz app", () => {
  beforeAll(() => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        json: async () => data,
      });
    });
    document.body.innerHTML = `
      <div class="app">
        <h1>JavaScript Online Quiz</h1>
      
        <div id="current-question" class="question-container"></div>
      
        <div id="control" class="control"></div>
        <div id="result" class="result"></div>
      </div>
    `;
    start();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should render the first question when the page loads", () => {
    expect(fetch).toHaveBeenCalled();
    const question = document.getElementById('current-question');
    const questionTitle = question.querySelector('h3').textContent;
    expect(questionTitle).toMatch(`Question 1: ${data[0].question}`);
  });
});
