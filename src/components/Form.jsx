import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AlarmIcon from '@mui/icons-material/AccessTimeFilled';
import DoneIcon from '@mui/icons-material/Done';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ButtonGroup from '@mui/material/ButtonGroup';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// import { CheckBox } from '@mui/icons-material';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloseIcon from '@mui/icons-material/Close';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { bottom } from '@popperjs/core';

function Form() {
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const isScreen1000OrLess = useMediaQuery('(max-width:1000px)');
  const transitionKey = `${showForm}-${currentQuestion}`;
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)');
  const [isFocused, setIsFocused] = useState(false);
  const [ratingClicked, setRatingClicked] = useState(null);
  const [isBlinking, setIsBlinking] = useState(false);

  const questions = [
    ["Enter your name*", "input", ""],
    ["Enter your brand name*", "input", ""],
    ["How satisfied are you with the overall experience of working with upcred.ai*", "rating", ""],
    ["Did upcred.ai team effectively understand and address your brand's goals and objectives?*", "tick", ""],
    ["How well did our team communicate and collaborate with your brand throughout the campaign?*", "rating", ""],
    ["Were the deliverables and content produced by upcred.ai in line with your expectations and brand guidelines?*", "tick", ""],
    ["Did the campaign generate the desired results and meet your marketing objectives?*", "tick", ""],
    ["How likely are you to recommend upcred.ai to other brands based on your experience?*", "rating", ""],
    ["Would you consider partnering with upcred.ai again for future campaigns?*", "tick", "last"],
  ];


  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  //for taking output from the rating of the user
  const handleRatingClick = (rating) => {
    setRatingClicked(rating);
    setIsBlinking(true);

    setTimeout(() => {
      setIsBlinking(false);
    }, 600); // Set the duration of blinking animation
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      // Reset form data for the next question
      setFormData({});
    } else {
      if (showForm) {
        // If form is visible, hide it
        setShowForm(false);
        setCurrentQuestion(0);
      } else {
        // If form is already hidden, submit the data or perform any other action
        console.log(formData);
        setShowForm(true);
      }
    }
  };


  //for light and dark mode
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!showForm && (
          <CSSTransition
            in={!showForm}
            timeout={600}
            classNames="form-fade-out"
            unmountOnExit
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              justifyContent="center"
              minHeight="100vh"
              fontSize={20}
              padding="0"
              margin="0"
              // border={1}
              sx={{
                fontFamily: ['arial'],
                overflow: "hidden",
                '@media (max-width: 700px)': {
                  fontSize: 18,
                },
                '@media (max-width: 450px)': {
                  fontSize: 16,
                },
              }}
            >
              <Box
                marginBottom={3}
                fontSize={22}
                sx={{
                  fontFamily: ['arial'],
                  '@media (max-width: 700px)': {
                    fontSize: 18,
                  },
                  '@media (max-width: 450px)': {
                    fontSize: 16,
                  },
                  marginBottom: 2,
                }}>
                Brand Feedback Form
              </Box>
              <Box
                marginBottom={3}
                // fontStyle={blur}
                fontWeight={1}
                sx={{ opacity: [0.7], marginBottom: 2.5, }}
              // border={1}
              >
                We are committed to delivering the best experiences
              </Box>
              <Box
                mt={1}
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                paddingLeft={12}
                // border={1}
                sx={{
                  fontFamily: ['arial'],
                  '@media (max-width: 700px)': {
                    fontSize: 16,
                    paddingLeft: 0,
                    bottom: 0,
                    marginTop: 0,
                  },
                }}>
                <Button sx={{
                  '@media (max-width: 700px)': { fontSize: 15, bottom: 0, },
                  '@media (max-width: 450px)': { fontSize: 13, },
                  padding: [1.25],
                  paddingLeft: [2],
                  paddingRight: [2],
                  fontSize: [16],
                  fontWeight: ['800'],
                  fontFamily: ['arial'],
                  backgroundColor: "rgb(4, 69, 175)",
                  color: "white",
                }}
                  variant="contained"
                  onClick={() => setShowForm(true)}>
                  Tell us what you think
                </Button>
                <Box
                  sx={{
                    padding: [1],
                    fontSize: [13],
                    '@media (max-width: 700px)': { display: "none", },
                  }}
                // border={1}
                >
                  press <strong>Enter ↵</strong>
                </Box>
              </Box>
              <Box
                mt={1}
                // fontSize="15"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                // border={1}
                sx={{
                  fontSize: [15],
                  '@media (max-width: 450px)': {
                    fontSize: 13,
                  },
                }}>
                <AlarmIcon sx={{ fontSize: [17], marginRight: [0.5], '@media (max-width: 700px)': { fontSize: 15, }, }} />
                Takes 1 minute
              </Box>
            </Box>
          </CSSTransition>
        )}

        <TransitionGroup>
          {showForm && (
            <CSSTransition
              key={transitionKey}
              in={true}
              timeout={600}
              classNames="question-transition"
              unmountOnExit
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="left"
                justifyContent="center"
                paddingLeft={30}
                paddingRight={30}
                paddingBottom={6}
                height="100vh"
                fontFamily="arial"
                margin={0}
                // border={1}
                sx={{
                  fontSize: [22],
                  overflow: "hidden",
                  '@media (max-width: 1300px)': {
                    paddingLeft: 15,
                    paddingRight: 15,
                    fontSize: [21]
                  },
                  '@media (max-width: 900px)': {
                    paddingLeft: 10,
                    paddingRight: 10,
                    fontSize: [20]
                  },
                  '@media (max-width: 800px)': {
                  
                    paddingLeft: 6,
                    paddingRight: 5,
                    fontSize: [19]
                  },
                  '@media (max-width: 700px)': {
                    paddingLeft: 5,
                    paddingRight: 2,
                  },
                  '@media (max-width: 500px)': {
                    
                    paddingLeft: 6,
                    paddingRight: 4,
                  },
                  '@media (max-width: 300px)': {
                    paddingLeft: 5,
                    paddingRight: 3,
                  },
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  mb={2.5}
                  paddingLeft={20}
                  paddingRight={20}
                  sx={{
                    '@media (max-width: 1300px)': {
                      paddingLeft: 5,
                      paddingRight: 5,
                    },
                    '@media (max-width: 700px)': {
                      padding: 0,
                      paddingLeft: 3,
                      paddingRight: 3,
                    },
                    '@media (max-width: 500px)': {
                      paddingLeft: 1.1,
                      paddingRight: 1.1,
                    },
                  }}
                >
                  <span style={{ color: "rgb(4,95,167)",marginLeft: '-40px', marginRight: '4px', fontSize: '15px' }}>{currentQuestion + 1}</span>
                  <ArrowForwardIcon style={{ color: "rgb(4,95,167)", fontWeight: '1000', fontSize: '16px', verticalAlign: 'middle' }} />
                  <span style={{ marginLeft: '10px' }}>{questions[currentQuestion][0]}</span>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="left"
                  justifyContent="center"
                  paddingLeft={20}
                  paddingRight={20}
                  // border={1}
                  sx={{
                    '@media (max-width: 1300px)': {
                      fontSize: 18,
                      paddingLeft: 5,
                      paddingRight: 8,
                    },
                    '@media (max-width: 700px)': {
                      fontSize: 16,
                      paddingLeft: 3,
                      paddingRight: 5,
                    },
                    '@media (max-width: 500px)': {
                      fontSize: 14,
                      paddingLeft: 1,
                      paddingRight: 1.5,
                    },
                    
                  }}
                >
                  {questions[currentQuestion][1] === "input" &&
                    (<TextField
                      variant="standard"
                      value={formData[`questionInput${currentQuestion}`] || ''}
                      onChange={handleInputChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      size="small"
                      label={formData[`questionInput${currentQuestion}`] ? '' : "Type your answer here..."}
                      InputProps={{
                        disableUnderline: true,
                        style: {
                          borderBottom: isFocused ? '2px solid rgb(4, 95, 167)' : '1px solid rgba(4, 95, 167, 0.6)',
                        },
                        endAdornment: isFocused ? null : (
                          <></>
                        ), // Removes the inbuilt hover text
                      }}
                    />)}
                  {questions[currentQuestion][1] === "rating" &&
                    (<ButtonGroup fullWidth={true} variant="outlined" aria-label="outlined button group" sx={{ marginTop: '10px' }}>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Button
                        key={rating}
                        onClick={() => {
                          handleRatingClick(rating);
                          setTimeout(() => {
                            handleNextQuestion(); // Call the function to move to the next question
                          }, 600); // Wait for the blinking animation duration before moving to the next question
                        }}
                        style={{
                          backgroundColor: ratingClicked === rating ? "rgb(4, 69, 175)" : "rgb(4, 69, 175, 0.1)",
                          transition: "background-color 0.3s",
                          border: `1px solid ${ratingClicked === rating ? "rgb(4, 69, 175)" : "rgb(4, 69, 175)"}`,
                          color: ratingClicked === rating ? "white" : "",
                          animation: isBlinking && ratingClicked === rating ? "blinkTwice 0.3s 2" : "none",
                          margin: '0 2px', // Added margin to left and right
                          height: '55px', // Increased height
                          width: '140px', // Decreased width
                          fontSize: '18px', // Decreased font size
                        }}
                      >
                        {rating}
                      </Button>
                    ))}
                  </ButtonGroup>                  
                    )}
                  {questions[currentQuestion][1] === "tick" &&
                    (<Box
                      display="flex"
                      flexDirection="column"
                      alignItems="left"
                      justifyContent="center"
                      textAlign="center"
                      sx={{
                        '@media (max-width: 1300px)': {
                          fontSize: 16,
                        },
                        '@media (max-width: 700px)': {
                          fontSize: 16,
                        },
                      }}
                    >
                      <Button
                        startIcon={<DoneIcon />}
                        sx={{
                          backgroundColor: "rgb(4, 69, 175, 0.15)",
                          marginBottom: [1],
                          color: "rgb(4,95,167)",
                          border: ratingClicked === "Yes" ? "2px solid rgb(4, 69, 175)" : "1px solid rgba(4, 95, 167, 0.6)",
                          width: [140],
                          height: 40,
                          fontSize: [18],
                          fontFamily: ['arial'],
                          '@media (max-width: 700px)': {
                            width: 120,
                            height: 35,
                            fontSize: 15,
                          },
                          '&:hover': {
                            backgroundColor: "rgb(4, 69, 175, 0.25)",
                            border: "2px solid rgb(4, 69, 175)",
                          },
                          animation: isBlinking && ratingClicked === "Yes" ? "blinkTwice 0.3s 2" : "none",
                        }}
                        variant="contained"
                        key="Yes"
                        onClick={() => {
                          handleRatingClick("Yes");
                          setTimeout(() => {
                            handleNextQuestion(); // Call the function to move to the next question
                          }, 600); // Wait for the blinking animation duration before moving to the next question
                        }}
                      >
                        Yes
                      </Button>

                      <Button
                        startIcon={<CloseIcon />}
                        sx={{
                          backgroundColor: "rgb(4, 69, 175, 0.15)",
                          color: "rgb(4,95,167)",
                          border: ratingClicked === "No" ? "2px solid rgb(4, 69, 175)" : "1px solid rgba(4, 95, 167, 0.6)",
                          width: [140],
                          height: 40,
                          fontSize: [18],
                          fontFamily: ['arial'],
                          '@media (max-width: 700px)': {
                            width: 120,
                            height: 35,
                            fontSize: 15,
                          },
                          '&:hover': {
                            backgroundColor: "rgb(4, 69, 175, 0.25)",
                            border: "2px solid rgb(4, 69, 175)",
                          },
                          animation: isBlinking && ratingClicked === "No" ? "blinkTwice 0.3s 2" : "none",
                        }}
                        variant="contained"
                        key="No"
                        onClick={() => {
                          handleRatingClick("No");
                          setTimeout(() => {
                            handleNextQuestion(); // Call the function to move to the next question
                          }, 600); // Wait for the blinking animation duration before moving to the next question
                        }}
                      >
                        No
                      </Button>
                    </Box>
                    )}
                  <Box mt={2.5}
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    textAlign="center"
                    justifyContent={
                      questions[currentQuestion][2] === "last" && isScreen1000OrLess ? "center" : "left"
                    }
                    sx={{
                      '@media (max-width: 1100px)': {
                        fontSize: questions[currentQuestion][2] === "last" ? 20 : 18,
                      },
                    }}
                  // border={1}
                  >
                    <Button
                      endIcon={questions[currentQuestion][2] !== "last" && <DoneIcon fontSize='large' />}
                      sx={{
                        paddingLeft: [2],
                        paddingRight: [2],
                        fontSize: [18],
                        fontWeight: ['bold'],
                        fontFamily: ['arial'],
                        color: "white",
                        backgroundColor: "rgb(4, 69, 175)",
                        '@media (max-width: 1100px)': {
                          fontWeight: questions[currentQuestion][2] === "last" ? "800" : "bold",
                        },
                        '@media (max-width: 700px)': {
                          fontSize: 15,
                          paddingLeft: 2,
                          paddingRight: 2,
                        },
                        '@media (max-width: 500px)': {
                          width: questions[currentQuestion][2] === "last" && "100%",
                          paddingLeft: 1.5,
                          paddingRight: 1.5,
                        },
                      }}
                      variant="contained"
                      onClick={handleNextQuestion} >
                      {questions[currentQuestion][2] === "last" ? "Submit" : "OK"}
                    </Button>
                    {questions[currentQuestion][2] !== "last" && (
                      <Box
                        sx={{
                          padding: [1],
                          fontSize: [13],
                          '@media (max-width: 700px)': {
                            fontSize: 12,
                          },
                        }}
                      >
                        press <strong>Enter ↵</strong>
                      </Box>
                    )}

                  </Box>
                </Box>
              </Box>
            </CSSTransition>
          )}
        </TransitionGroup>
      </ThemeProvider>
    </>
  );
}


export default Form;
