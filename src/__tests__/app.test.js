import { jest } from "@jest/globals";
import { renderSelectedQuestion, launch, startingKey } from "../app";
import { data } from "../mock-data";

describe("Testing quiz app", () => {
  beforeAll(() => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        json: async () => data,
      });
    });
    document.body.innerHTML = `
      <div id="app">
        <h1>JavaScript Online Quiz</h1>
      
        <div id="current-question" class="question-container"></div>
      
        <div id="control" class="control"></div>
        <div id="result" class="result"></div>
      </div>
    `;
    launch();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should show the first question when the page loads", () => {
    expect(fetch).toHaveBeenCalled();
    const questionKey = "question-1";
    const questionContainer = document.getElementById("current-question");
    const questionTitle = questionContainer.querySelector("h3").textContent;
    expect(questionTitle).toMatch(`Question 1: ${data[0].question}`);

    const option1aId = `${questionKey}-a`;
    const label1a = document.getElementById(`label-${option1aId}`);
    expect(label1a.textContent).toContain("A. Programming");

    const option1bId = `${questionKey}-b`;
    const label1b = document.getElementById(`label-${option1bId}`);
    expect(label1b.textContent).toContain("B. Application");

    const option1cId = `${questionKey}-c`;
    const label1c = document.getElementById(`label-${option1cId}`);
    expect(label1c.textContent).toContain("C. None of These");

    const option1dId = `${questionKey}-d`;
    const label1d = document.getElementById(`label-${option1dId}`);
    expect(label1d.textContent).toContain("D. Scripting");
  });

  it("should check the option properly when using radio input for single-choice questions", () => {
    const questionKey = "question-1";
    const option1aId = `${questionKey}-a`;
    const label1a = document.getElementById(`label-${option1aId}`);

    const option1bId = `${questionKey}-b`;
    const label1b = document.getElementById(`label-${option1bId}`);

    const option1cId = `${questionKey}-c`;
    const label1c = document.getElementById(`label-${option1cId}`);

    const option1dId = `${questionKey}-d`;
    const label1d = document.getElementById(`label-${option1dId}`);

    label1d.click();
    expect(document.querySelector(`#${option1aId}`).checked).toEqual(false);
    expect(document.querySelector(`#${option1bId}`).checked).toEqual(false);
    expect(document.querySelector(`#${option1cId}`).checked).toEqual(false);
    expect(document.querySelector(`#${option1dId}`).checked).toEqual(true);

    label1c.click();
    expect(document.querySelector(`#${option1aId}`).checked).toEqual(false);
    expect(document.querySelector(`#${option1bId}`).checked).toEqual(false);
    expect(document.querySelector(`#${option1cId}`).checked).toEqual(true);
    expect(document.querySelector(`#${option1dId}`).checked).toEqual(false);

    label1b.click();
    expect(document.querySelector(`#${option1aId}`).checked).toEqual(false);
    expect(document.querySelector(`#${option1bId}`).checked).toEqual(true);
    expect(document.querySelector(`#${option1cId}`).checked).toEqual(false);
    expect(document.querySelector(`#${option1dId}`).checked).toEqual(false);

    label1a.click();
    expect(document.querySelector(`#${option1aId}`).checked).toEqual(true);
    expect(document.querySelector(`#${option1bId}`).checked).toEqual(false);
    expect(document.querySelector(`#${option1cId}`).checked).toEqual(false);
    expect(document.querySelector(`#${option1dId}`).checked).toEqual(false);
  });

  it("should check the option properly when using radio input for multiple-choice questions", () => {
    const nextBtn = document.querySelector('#btn-next');

    const firstMultiIndex = data.findIndex((q) => q.multi);

    const whenToStop = i => i < firstMultiIndex

    for (let i = 0; whenToStop(i); i++) {
      nextBtn.click();
    }
    
    const questionKey = "question-7";
    const option1aId = `${questionKey}-a`;
    const label1a = document.getElementById(`label-${option1aId}`);

    const option1bId = `${questionKey}-b`;
    const label1b = document.getElementById(`label-${option1bId}`);

    const option1cId = `${questionKey}-c`;
    const label1c = document.getElementById(`label-${option1cId}`);

    const option1dId = `${questionKey}-d`;
    const label1d = document.getElementById(`label-${option1dId}`);

    label1d.click();
    expect(document.querySelector(`#${option1aId}`).checked).toEqual(false);
    expect(document.querySelector(`#${option1bId}`).checked).toEqual(false);
    expect(document.querySelector(`#${option1cId}`).checked).toEqual(false);
    expect(document.querySelector(`#${option1dId}`).checked).toEqual(true);

    label1c.click();
    expect(document.querySelector(`#${option1aId}`).checked).toEqual(false);
    expect(document.querySelector(`#${option1bId}`).checked).toEqual(false);
    expect(document.querySelector(`#${option1cId}`).checked).toEqual(true);
    expect(document.querySelector(`#${option1dId}`).checked).toEqual(true);

    label1b.click();
    expect(document.querySelector(`#${option1aId}`).checked).toEqual(false);
    expect(document.querySelector(`#${option1bId}`).checked).toEqual(true);
    expect(document.querySelector(`#${option1cId}`).checked).toEqual(true);
    expect(document.querySelector(`#${option1dId}`).checked).toEqual(true);

    label1a.click();
    expect(document.querySelector(`#${option1aId}`).checked).toEqual(true);
    expect(document.querySelector(`#${option1bId}`).checked).toEqual(true);
    expect(document.querySelector(`#${option1cId}`).checked).toEqual(true);
    expect(document.querySelector(`#${option1dId}`).checked).toEqual(true);

    label1c.click();
    expect(document.querySelector(`#${option1aId}`).checked).toEqual(true);
    expect(document.querySelector(`#${option1bId}`).checked).toEqual(true);
    expect(document.querySelector(`#${option1cId}`).checked).toEqual(false);
    expect(document.querySelector(`#${option1dId}`).checked).toEqual(true);

    // back to the first question
    for (let i = 0; whenToStop(i); i++) {
      document.querySelector('#btn-back').click();
    }
  });

  it("should show next button as long as the current question is not the last question", () => {
    const nextBtn = document.querySelector("#btn-next");
    expect(nextBtn).not.toEqual(null);
    expect(nextBtn.click).toBeDefined();

    const whenToStop = (i) => i < data.length - 1;

    // Click until reach the last question
    for (let i = 0; whenToStop(i); i++) {
      nextBtn.click();
    }

    const nextBtnInLastQuestion = document.querySelector("#btn-next");
    expect(nextBtnInLastQuestion).toEqual(null);

    const backBtn = document.querySelector("#btn-back");

    // Back to the first question
    for (let i = 0; whenToStop(i); i++) {
      backBtn.click();
    }
  });

  it("should show back button as long as the current question is not the first question", () => {
    const nextBtn = document.querySelector("#btn-next");
    expect(document.querySelector("#btn-back")).toEqual(null);

    nextBtn.click();
    expect(document.querySelector("#btn-back")).not.toEqual(null);

    const whenToStop = (i) => i < data.length - 2;

    // Click until reach the last question
    for (let i = 0; whenToStop(i); i++) {
      nextBtn.click();
    }
    expect(document.querySelector("#btn-back")).not.toEqual(null);

    // Back to the first question
    for (let i = 0; whenToStop(i - 1); i++) {
      document.querySelector("#btn-back").click();
    }
  });

  it("should show the single-choice question if question's multi is false", () => {
    const questionContainer = document.getElementById("current-question");
    const inputs = questionContainer.querySelectorAll("input");
    const hasContainOnlyRadio = Array.from(inputs).every(
      (input) => (input.type = "radio")
    );
    expect(hasContainOnlyRadio).toEqual(true);
  });

  it("should show the multiple-choice question if question's multi is true", () => {
    const nextBtn = document.querySelector("#btn-next");
    
    const firstMultiIndex = data.findIndex((q) => q.multi);
    
    const whenToStop = (i) => i < firstMultiIndex;
    
    for (let i = 0; whenToStop(i); i++) {
      nextBtn.click();
    }

    const questionContainer = document.getElementById("current-question");
    const inputs = questionContainer.querySelectorAll("input");
    const hasContainOnlyCheckBox = Array.from(inputs).every(
      (input) => input.type === "checkbox"
    );
    expect(hasContainOnlyCheckBox).toEqual(true);

    // Back to the first question
    for (let i = 0; i < whenToStop(i); i++) {
      document.querySelector('#btn-back').click();
    }
  });
});
