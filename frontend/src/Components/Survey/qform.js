import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  Grid,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  LinearProgress,
  Alert,
} from "@mui/material";

const questions = [
  "How overwhelmed do you feel by your current workload or responsibilities?",
  "How much have your sleep patterns been disrupted recently?",
  "How would you rate your ability to find joy or pleasure in activities you used to enjoy?",
  "How persistent are feelings of sadness or emptiness in your daily life?",
  "How often do you experience racing thoughts or excessive worry?",
  "How would you rate your energy levels throughout the day?",
  "How much have your appetite or eating habits changed recently?",
  "How easily can you concentrate or make decisions lately?",
  "How much do feelings of hopelessness or despair affect you?",
  "How isolated or withdrawn do you feel from friends and family?",
];

const questionsPerSection = [3, 3, 4];

const QForm = ({ onClose }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [section, setSection] = useState(1);
  const [showWarning, setShowWarning] = useState(false);

  const handleRadioChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    const start = questionsPerSection
      .slice(0, section - 1)
      .reduce((acc, num) => acc + num, 0);
    const end = questionsPerSection
      .slice(0, section)
      .reduce((acc, num) => acc + num, 0);
    const answered = answers
      .slice(start, end)
      .every((answer) => answer !== null);

    if (answered) {
      setSection((prevSection) => prevSection + 1);
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };

  const handleBack = () => {
    setSection((prevSection) => prevSection - 1);
  };

  //--------------------------------
  // const [inputArray, setInputArray] = useState([]);
  // const [arrrayString, setArrrayString] = useState("jjjjjjjjj");
  const apiUrl = "https://6ea6-35-229-34-198.ngrok-free.app//receive-array"; // Update with your ngrok URL

  const handleSendArray = async (answerr) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ array: answerr }),
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error("Failed to send array");
      }

      const data = await response.json();

      console.log("Diagnosis:", data.arrayString);

      // Send email and diagnosis to the backend
      try {
        const email = localStorage.getItem("email"); // Assuming email is stored in localStorage
        const diagnosis = data.arrayString;

        const response = await axios.post(
          "http://localhost:5000/getCounselor",
          {
            email: email,
            diagnosis: diagnosis,
          }
        );
        console.log("Response from getCounselor:", response.data);
      } catch (error) {
        console.error("Error sending diagnosis to getCounselor:", error);
      }

      alert("You are suffering through: " + data.arrayString);
    } catch (error) {
      console.error("Error sending array:", error.message);
    }
  };

  //---------------------------

  const handleSubmit = () => {
    const allQuestionsAnswered = answers.every((answer) => answer !== null);

    if (allQuestionsAnswered) {
      console.log("User answers:", answers);
      handleSendArray(answers);
      onClose();
    } else {
      setShowWarning(true);
    }
  };

  const totalQuestions = questionsPerSection.reduce((acc, num) => acc + num, 0);
  const answeredQuestions = answers.filter((answer) => answer !== null).length;

  const progress = (answeredQuestions / totalQuestions) * 100;

  const sectionQuestions = questions.slice(
    questionsPerSection
      .slice(0, section - 1)
      .reduce((acc, num) => acc + num, 0),
    questionsPerSection.slice(0, section).reduce((acc, num) => acc + num, 0)
  );

  return (
    <>
      <div style={{ position: "relative", paddingBottom: 10 }}>
        <Button style={{ position: "absolute" }} onClick={onClose}>
          X
        </Button>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          style={{
            color: "#2196F3",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          Let's Get Started
        </Typography>
      </div>

      {showWarning && (
        <Alert severity="error" style={{ marginBottom: "20px" }}>
          Please answer all questions before proceeding.
        </Alert>
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <Grid container spacing={2}>
          {sectionQuestions.map((question, index) => (
            <Grid item xs={12} key={index}>
              <Typography variant="body1" gutterBottom>
                <span style={{ marginRight: "10px" }}>{`Q${
                  index +
                  1 +
                  questionsPerSection
                    .slice(0, section - 1)
                    .reduce((acc, num) => acc + num, 0)
                }:`}</span>{" "}
                {question}
              </Typography>
              <FormControl component="fieldset" style={{ width: "100%" }}>
                <Typography variant="subtitle2" gutterBottom>
                  Not at all (0) &nbsp;&nbsp; Seldom (1) &nbsp;&nbsp; Sometimes
                  (2) &nbsp;&nbsp; Often (3) &nbsp;&nbsp; All the time (4)
                </Typography>
                <RadioGroup
                  row
                  value={
                    answers[
                      index +
                        questionsPerSection
                          .slice(0, section - 1)
                          .reduce((acc, num) => acc + num, 0)
                    ]
                  }
                  onChange={(e) =>
                    handleRadioChange(
                      index +
                        questionsPerSection
                          .slice(0, section - 1)
                          .reduce((acc, num) => acc + num, 0),
                      e.target.value
                    )
                  }
                >
                  {[0, 1, 2, 3, 4].map((value) => (
                    <FormControlLabel
                      key={value}
                      value={value.toString()}
                      control={<Radio />}
                      label={value.toString()}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          ))}
        </Grid>

        <LinearProgress
          variant="determinate"
          value={progress}
          style={{ marginTop: "20px" }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={handleBack}
            disabled={section === 1}
          >
            Back
          </Button>

          {section < questionsPerSection.length ? (
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export default QForm;
