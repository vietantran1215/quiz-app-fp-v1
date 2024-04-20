// CONSTANTS
export const keyPrefix = "question-";
export const startingNum = 1;
export const startingKey = `${keyPrefix}${startingNum}`;
export const controlButtons = [];

// STATE
const state = {
  answerForm: {},
};

/**
 * @description rendering the current question
 */
export function renderSelectedQuestion(key) {
  document.querySelector("#current-question").innerHTML = "";

  // Get the question number
  const questionNum = key.replace(keyPrefix, "");

  // Extracting info from the selected question
  const { question: title, answers, multi } = state.answerForm[key].question;

  // Create title
  const h3El = document.createElement("h3");
  h3El.textContent = `Question ${questionNum}: ${title}`;

  // Show answer options
  const answerEl = Object.keys(answers).map((value) => {
    const text = answers[value];
    const name = key;
    const id = `${key}-${value}`;

    // Create input
    const input = document.createElement("input");
    input.type = multi ? "checkbox" : "radio";
    input.name = name;
    input.id = id;
    input.value = value;
    input.checked = state.answerForm[key].chosenAnswer.includes(value);
    input.addEventListener("input", (e) => {
      const options = document.querySelectorAll(`[name="${e.target.name}"]`);
      state.answerForm[key].chosenAnswer = Array.from(options)
        .filter((el) => el.checked)
        .map((el) => el.value);
    });

    // Create label
    const labelEl = document.createElement("label");
    labelEl.for = id;
    labelEl.id = `label-${id}`;
    labelEl.classList.add("d-block");
    labelEl.append(input, `${value.toUpperCase()}. ${text}`);
    return labelEl;
  });

  state.answerForm[key].isCurrent = true;

  document.querySelector("#current-question").append(h3El, ...answerEl);
}

export function initControlFunctions() {
  const controlDiv = document.getElementById("control");
  controlDiv.innerHTML = "";
  controlButtons.forEach((btn) => {
    if (
      btn.questionKeyToHide &&
      btn.questionKeyToHide.includes(state.currentKey)
    ) {
      return;
    }

    if (
      btn.questionKeyToShow &&
      !btn.questionKeyToShow.includes(state.currentKey)
    ) {
      return;
    }

    showButton(btn, controlDiv);
  });
}

export function showButton(btn, container) {
  const btnEl = document.createElement("button");
  btnEl.id = btn.id;
  btnEl.textContent = btn.textContent;
  btnEl.addEventListener("click", () => {
    if (btn.id === "btn-submit") {
      btn.action();
      showResult(state.answerForm);
    } else {
      btn.action(state.answerForm[state.currentKey]);
      render();
    }
  });
  container.append(btnEl);
}

/**
 * @description initializing the quiz app
 */
export async function launch() {
  const res = await fetch("./data/questions.json");
  const data = await res.json();

  controlButtons.push(
    {
      id: "btn-back",
      textContent: "Back",
      questionKeyToHide: [`${keyPrefix}1`],
      action: (currentQuestion) => {
        if (currentQuestion.prev) {
          state.currentKey = currentQuestion.prev;
        }
      },
    },
    {
      id: "btn-next",
      textContent: "Next",
      questionKeyToHide: [`${keyPrefix}${data.length}`],
      action: (currentQuestion) => {
        if (currentQuestion.next) {
          state.currentKey = currentQuestion.next;
        }
      },
    },
    {
      id: "btn-submit",
      textContent: "Submit",
      questionKeyToShow: [`${keyPrefix}${data.length}`],
      action: showResult,
    }
  );

  data.forEach((question, index) => {
    const key = `${keyPrefix}${index + 1}`;

    // Adding data, make sure the question is READONLY
    state.answerForm[key] = {};
    state.answerForm[key].question = Object.freeze(question); // READONLY
    state.answerForm[key].isCurrent = false;
    state.answerForm[key].chosenAnswer = [];

    if (index > 0) {
      state.answerForm[key].prev = `${keyPrefix}${index}`;
    }

    if (index < data.length - 1) {
      state.answerForm[key].next = `${keyPrefix}${index + 2}`;
    }
  });

  state.currentKey = startingKey;
  state.answerForm[startingKey].isCurrent = true;

  renderSelectedQuestion(startingKey);
  initControlFunctions();
}

export function render() {
  renderSelectedQuestion(state.currentKey);
  initControlFunctions();
}

export function showResult(answerForm) {
  let result = 0;

  for (let key in answerForm) {
    const question = answerForm[key];
    const correctAnswer = question.question.correctAnwser;
    const correctAnwserString = Array.isArray(correctAnswer)
      ? correctAnswer.sort().join("")
      : correctAnswer;
    const chosenAnswerString = question.chosenAnswer.sort().join("");
    const isCorrect = correctAnwserString === chosenAnswerString;
    if (isCorrect) result++;
  }

  document.querySelector("#result").innerHTML = `Result: ${result}`;
}
