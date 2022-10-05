const generateOmrReviewPayload = (score: any = 0, answer_key: any, user_answer_key: any) => {
  let payload = {};
  let num_correct = 0;
  let attempted = 0;

  Object.keys(user_answer_key).forEach((question) => {
    let answers: any = [];
    let user_answers: any = [];
    let is_user_answered = false;
    let is_correct = true;

    Object.keys(user_answer_key[question]).forEach((option) => {
      if (user_answer_key[question][option]) {
        user_answers.push(option);
        is_user_answered = true;
        attempted += 1;
      }

      if (answer_key[question][option]) answers.push(option);

      if (is_correct && user_answer_key[question][option] != answer_key[question][option])
        is_correct = false;
    });

    if (is_correct) num_correct += 1;

    payload = {
      ...payload,
      [question]: {
        answers: answers,
        user_answers: user_answers,
        is_user_answered: is_user_answered,
        is_correct: is_correct,
        is_bookmark: false,
        score: is_correct ? score : 0,
        need_validation: false,
        admin_validation: {
          score: "",
        },
      },
    };
  });

  let length = Object.keys(user_answer_key).length;

  let omitted = length - attempted;

  payload = {
    data: payload,
    max_score: length * score,
    user_score: num_correct * score,
    percentage: ((num_correct * score) / (length * score)) * 100,
    correctAns: num_correct,
    wrongAns: length - num_correct - omitted,
    omitted: omitted,
    totalQuestions: length,
  };

  return payload;
};

export const assessmentSemiOnlineValidate = (omr_data: any) => {
  let payload = {};
  payload = generateOmrReviewPayload(0, omr_data?.omr_data, omr_data?.answer_data);
  return payload;
};
