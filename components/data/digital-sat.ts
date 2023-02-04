export const digitalSatData: any = {
  reading: {
    "0": 100,
    "1": 100,
    "2": 120,
    "3": 130,
    "4": 140,
    "5": 150,
    "6": 160,
    "7": 170,
    "8": 180,
    "9": 190,
    "10": 200,
    "11": 210,
    "12": 220,
    "13": 230,
    "14": 240,
    "15": 250,
    "16": 260,
    "17": 270,
    "18": 280,
    "19": 300,
    "20": 310,
    "21": 330,
    "22": 340,
    "23": 340,
    "24": 350,
    "25": 360,
    "26": 380,
    "27": 400,
  },
  writing: {
    "0": 100,
    "1": 100,
    "2": 120,
    "3": 130,
    "4": 140,
    "5": 150,
    "6": 160,
    "7": 170,
    "8": 180,
    "9": 190,
    "10": 200,
    "11": 210,
    "12": 220,
    "13": 230,
    "14": 240,
    "15": 250,
    "16": 260,
    "17": 270,
    "18": 280,
    "19": 300,
    "20": 300,
    "21": 310,
    "22": 330,
    "23": 340,
    "24": 350,
    "25": 360,
    "26": 380,
    "27": 400,
  },
  math: {
    "0": 200,
    "1": 200,
    "2": 210,
    "3": 210,
    "4": 220,
    "5": 220,
    "6": 230,
    "7": 240,
    "8": 250,
    "9": 260,
    "10": 270,
    "11": 280,
    "12": 290,
    "13": 300,
    "14": 310,
    "15": 320,
    "16": 330,
    "17": 320,
    "18": 340,
    "19": 360,
    "20": 380,
    "21": 400,
    "22": 420,
    "23": 440,
    "24": 460,
    "25": 480,
    "26": 500,
    "27": 520,
    "28": 540,
    "29": 560,
    "30": 580,
    "31": 600,
    "32": 620,
    "33": 640,
    "34": 650,
    "35": 660,
    "36": 670,
    "37": 680,
    "38": 690,
    "39": 700,
    "40": 710,
    "41": 730,
    "42": 750,
    "43": 770,
    "44": 800,
  },
};

export const assessmentResultRenderGenerator = (assessment: any = null) => {
  let currentAssessment = assessment != null ? assessment : null;
  let assessmentResult: any = [];

  if (
    currentAssessment &&
    currentAssessment.assessment_sessions &&
    currentAssessment.assessment_sessions.length > 0
  ) {
    currentAssessment.assessment_sessions.map((_assessment: any) => {
      let assessmentPayload: any = {
        total_questions: _assessment?.total_questions,
        total_answered: _assessment?.total_answered,
        total_unanswered: _assessment?.total_unanswered,
        total_correct: _assessment?.total_correct,
        total_incorrect: _assessment?.total_incorrect,
        total_score: 0,
        total_scaled_score: 0,
        total_time: _assessment?.total_time,
        submitted_at: _assessment?.submitted_at,
        allotment: _assessment?.allotment,
        sectional_score: {
          reading: {
            total_questions: 0,
            total_answered: 0,
            total_unanswered: 0,
            total_correct: 0,
            total_incorrect: 0,
            total_score: 0,
            total_scaled_score: 0,
          },
          writing: {
            total_questions: 0,
            total_answered: 0,
            total_unanswered: 0,
            total_correct: 0,
            total_incorrect: 0,
            total_score: 0,
            total_scaled_score: 0,
          },
          math: {
            total_questions: 0,
            total_answered: 0,
            total_unanswered: 0,
            total_correct: 0,
            total_incorrect: 0,
            total_score: 0,
            total_scaled_score: 0,
          },
        },
      };

      if (_assessment?.section_summary_data) {
        Object.keys(_assessment?.section_summary_data).map(
          (_sectionId: any, _sectionIndex: any) => {
            let currentSectionKey: any = null;
            let currentSectionDetails: any = null;
            let currentSectionScoreDetails: any = _assessment?.section_summary_data[_sectionId];

            if (
              _assessment?.section_info_data?.info &&
              _assessment?.section_info_data?.info.length > 0
            ) {
              currentSectionDetails = _assessment?.section_info_data?.info.find(
                (_sections: any) => _sections?.section == _sectionId
              );
              if (currentSectionDetails) {
                currentSectionDetails = currentSectionDetails?.info;

                let currentSectionName = currentSectionDetails?.name?.toLowerCase();
                if (
                  currentSectionName &&
                  (currentSectionName.includes("reading") || currentSectionName == "reading")
                ) {
                  if (_sectionIndex == 0) currentSectionKey = "reading";
                  if (_sectionIndex == 1) currentSectionKey = "writing";
                }

                if (
                  currentSectionName &&
                  (currentSectionName.includes("math") || currentSectionName == "math")
                ) {
                  currentSectionKey = "math";
                }
              }
            }

            let scaledScore = digitalSatData[currentSectionKey];

            assessmentPayload.sectional_score = {
              ...assessmentPayload.sectional_score,
              [currentSectionKey]: {
                ...assessmentPayload.sectional_score[currentSectionKey],
                total_questions:
                  assessmentPayload.sectional_score[currentSectionKey].total_questions +
                  currentSectionScoreDetails?.no_of_questions,
                total_answered:
                  assessmentPayload.sectional_score[currentSectionKey].total_answered +
                  currentSectionScoreDetails?.no_of_questions_answered,
                total_unanswered:
                  assessmentPayload.sectional_score[currentSectionKey].total_unanswered +
                  currentSectionScoreDetails?.no_of_questions_unanswered,
                total_correct:
                  assessmentPayload.sectional_score[currentSectionKey].total_correct +
                  currentSectionScoreDetails?.no_of_questions_correct,
                total_incorrect:
                  assessmentPayload.sectional_score[currentSectionKey].total_incorrect +
                  currentSectionScoreDetails?.no_of_questions_incorrect,
                total_score:
                  assessmentPayload.sectional_score[currentSectionKey].total_score +
                  currentSectionScoreDetails?.no_of_questions_correct,
                total_scaled_score:
                  assessmentPayload.sectional_score[currentSectionKey].total_scaled_score +
                  scaledScore
                    ? scaledScore[`${currentSectionScoreDetails?.no_of_questions_correct}`]
                    : 0,
              },
            };
          }
        );
      }

      assessmentPayload.total_score =
        assessmentPayload?.sectional_score?.reading.total_score +
        assessmentPayload?.sectional_score?.writing.total_score +
        assessmentPayload?.sectional_score?.math.total_score;

      assessmentPayload.total_scaled_score =
        assessmentPayload?.sectional_score?.reading.total_scaled_score +
        assessmentPayload?.sectional_score?.writing.total_scaled_score +
        assessmentPayload?.sectional_score?.math.total_scaled_score;

      assessmentResult.push(assessmentPayload);
    });
  }

  return assessmentResult;
};
