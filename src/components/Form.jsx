import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { accordionDetailsClasses, colors } from '@mui/material';
import AlarmIcon from '@mui/icons-material/AccessTimeFilled';
import DoneIcon from '@mui/icons-material/Done';
import ButtonGroup from '@mui/material/ButtonGroup';
import { CheckBox } from '@mui/icons-material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloseIcon from '@mui/icons-material/Close';
import { CSSTransition } from 'react-transition-group';

function Form() {
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    ["Enter your name*", "input"],
    ["Enter your brand name*", "input"],
    ["How satisfied are you with the overall experience of working with upcred.ai*", "rating"],
    ["Did upcred.ai team effectively understand and address your brand's goals and objectives?*", "tick"],
    ["How well did our team communicate and collaborate with your brand throughout the campaign?*", "rating"],
    ["Were the deliverables and content produced by upcred.ai in line with your expectations and brand guidelines?*", "tick"],
    ["Did the campaign generate the desired results and meet your marketing objectives?*", "tick"],
    ["How likely are you to recommend upcred.ai to other brands based on your experience?*", "rating"],
    ["Would you consider partnering with upcred.ai again for future campaigns?*", "tick"],
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      if (showForm) {
        // If form is visible, hide it
        setFormData({});
        setCurrentQuestion(0);
        setShowForm(false);
      } else {
        // If form is already hidden, submit the data or perform any other action
        console.log(formData);
        setShowForm(true);
      }
    }
  };

  return (
    <>
      <CSSTransition
        in={!showForm}
        timeout={600}
        classNames="form-fade-out"
        unmountOnExit
      >
        <div className="title">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            fontSize={22}
            padding="0"
            margin="0"
            sx={{ fontFamily: ['arial'] }}>
            <Box
              marginBottom={3}>
              Brand Feedback Form
            </Box>
            <Box
              marginBottom={3}
              fontStyle={blur}
              fontWeight={1}
              sx={{ opacity: [0.5] }}>
              We are committed to delivering the best experiences
            </Box>
            <Box
              mt={1}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="right"
              paddingLeft={12}
            >
              <Button sx={{ padding: [1.1], fontSize: [18], fontWeight: ['bold'], fontFamily: ['arial'] }} variant="contained" onClick={() => setShowForm(true)}>
                Tell us what you think
              </Button>
              <Box
                sx={{ padding: [1], fontSize: [15] }}>
                click here ↵
              </Box>
            </Box>
            <Box
              mt={1}
              sx={{ fontSize: [15] }}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center">
              <AlarmIcon sx={{ fontSize: [17], marginRight: [0.5] }} />
              Takes 1 minute
            </Box>
          </Box>
        </div >
      </CSSTransition>
      <CSSTransition
        in={showForm}
        timeout={600}
        classNames="form-fade-in"
        unmountOnExit
      >
        <div className="title">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="left"
            justifyContent="center"
            paddingLeft={6}
            paddingRight={6}
            minHeight="100vh"
            fontSize={23}
            fontFamily="arial"
          >
            <Box mb={2.5}
              fontSize={23}
              paddingLeft={20}
              paddingRight={20}>
              {questions[currentQuestion][0]}
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="left"
              justifyContent="center"
              paddingLeft={20}
              paddingRight={20}
            >
              {questions[currentQuestion][1] === "input" &&
                (<TextField
                  variant="outlined"
                  // name={`questionInput${currentQuestion}`}
                  value={formData[`questionInput${currentQuestion}`] || ''}
                  onChange={handleInputChange}
                  size="small"
                  label={"Type your answer here..."}
                />)}
              {questions[currentQuestion][1] === "rating" &&
                (<ButtonGroup fullWidth="10" variant="outlined" aria-label="outlined button group">
                  <Button>1</Button>
                  <Button>2</Button>
                  <Button>3</Button>
                  <Button>4</Button>
                  <Button>5</Button>
                </ButtonGroup>
                )}
              {questions[currentQuestion][1] === "tick" &&
                (<Box mt={2}
                  display="flex"
                  flexDirection="column"
                  alignItems="left"
                  justifyContent="center"
                  textAlign="center">
                  <Button startIcon={< DoneIcon />} sx={{ backgroundColor: ["rgb(4,95,167, 0.1)"], textAlign: ["center"], alignItems: ["center"], marginBottom: [1], color: ["rgb(4,95,167)"], border: [1], width: ["16%"], paddingLeft: [4], paddingRight: [4], fontSize: [18], fontFamily: ['arial'] }} variant="contained" onClick={handleNextQuestion}>
                    Yes
                  </Button>
                  <Button startIcon={<CloseIcon />} sx={{ backgroundColor: ["rgb(4,95,167, 0.1)"], color: ["rgb(4,95,167)"], border: [1], width: ["16%"], fontSize: [18], fontFamily: ['arial'] }} variant="contained" onClick={handleNextQuestion}>
                    No
                  </Button>
                </Box>
                )}
              <Box mt={2.5}
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="left"
              >
                <Button endIcon={< DoneIcon fontSize='large' />} sx={{ paddingLeft: [2], paddingRight: [2], fontSize: [18], fontWeight: ['bold'], fontFamily: ['arial'] }} variant="contained" onClick={handleNextQuestion}>
                  OK
                </Button>
                <Box
                  sx={{ padding: [1], fontSize: [15] }}>
                  click here ↵
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
      </CSSTransition>
    </>
  );
}

export default Form;
