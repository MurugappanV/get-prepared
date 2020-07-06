import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState, useCallback } from "react";
import {
	Button,
	Box,
	ButtonBase,
	TextField,
	Checkbox,
	IconButton,
	Card,
	CardContent,
} from "@material-ui/core";
import { question1, question2, question3, question4 } from "./data";
import Editor from "./Editor";
import GolfCourseIcon from "@material-ui/icons/GolfCourse";

const useStyles = makeStyles({
	root: {
		height: "100vh",
		maxWidth: "100vw",
	},
	innerContainer: {
		backgroundColor: "#ffffff",
		minHeight: "100%",
	},
	headerContainer: {
		backgroundColor: "#ffffff",
		paddingLeft: "40px",
		paddingRight: "40px",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
	questionContainer: {
		backgroundColor: "#ffffff",
		marginLeft: "40px",
		marginRight: "40px",
		display: "flex",
		padding: "20px",
		flexDirection: "column",
	},
	title: {
		paddingBottom: "20px",
		fontWeight: "bold",
		fontSize: "20px",
		color: "grey",
		display: "flex",
		alignItems: "center",
	},
	switch: {},
	floatRightText: {
		color: "#A6A6A6",
		fontWeight: "normal",
		fontSize: "12px",
		alignSelf: "center",
	},
	saveButton: {
		marginTop: "20px",
		background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
		borderRadius: 3,
		border: 0,
		color: "white",
		height: 48,
		padding: "0 30px",
		boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
	},
	headerTitle: {
		background: "linear-gradient(to right, #FE6B8B 30%, #FF8E53 90%)",
		"-webkit-background-clip": "text",
		"-webkit-text-fill-color": "transparent",
		fontSize: "20px",
		paddingTop: "20px",
		paddingBottom: "20px",
	},
	button: {
		color: "#A6A6A6",
		marginTop: "5px",
		marginBottom: "5px",
	},
	selectorCont: {
		padding: "40px",
		paddingTop: "20px",
		paddingBottom: "20px",
	},
	selectorContBottom: {
		padding: "40px",
		paddingTop: "10px",
		justifyContent: "space-between",
	},
	selectCont: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginRight: "20px",
	},
	selector: {
		width: "40px",
		height: "40px",
		padding: "8px",
		borderRadius: "50%",
		textAlign: "center",
		verticalAlign: "middle",
		backgroundColor: "white",
		border: "2px solid grey",
	},
	selectorCurrent: {
		width: "40px",
		height: "40px",
		padding: "8px",
		borderRadius: "50%",
		textAlign: "center",
		verticalAlign: "middle",
		backgroundColor: "lightgoldenrodyellow",
		color: "goldenrod",
		border: "2px solid gold",
	},
	selectorDone: {
		width: "40px",
		height: "40px",
		padding: "8px",
		borderRadius: "50%",
		textAlign: "center",
		verticalAlign: "middle",
		backgroundColor: "aquamarine",
		color: "green",
		border: "2px solid green",
	},
	selectorMarked: {
		width: "40px",
		height: "40px",
		padding: "8px",
		borderRadius: "50%",
		textAlign: "center",
		verticalAlign: "middle",
		backgroundColor: "pink",
		color: "purple",
		border: "2px solid purple",
	},
	checkBoxCont: {
		paddingTop: "4px",
		paddingBottom: "4px !important",
		display: "flex",
		alignItems: "center",
	},
	text: {
		flex: 1,
		alignSelf: "center",
	},
	stepsText: {
		flex: 1,
		alignSelf: "center",
		marginTop: "20px",
	},
	inputDisplayContainer: {
		display: "flex",
		alignItems: "baseline",
	},
	underlineText: {
		marginRight: "10px",
		marginLeft: "10px",
	},
	arrow: {
		width: 0,
		height: 0,
		borderLeft: "5px solid transparent",
		borderRight: "5px solid transparent",
		borderBottom: "5px solid gold",
	},
	questionNameCont: {
		display: "flex",
	},
	flagButton: {
		color: "grey",
		paddingTop: 0,
		height: "40px",
	},
	flagButtonSelected: {
		color: "purple",
		paddingTop: 0,
		height: "40px",
	},
	answerOption: {
		marginBottom: "10px",
	},
});

function Timer({ limit, onEnd }) {
	const classes = useStyles();

	const [time, setTime] = useState({
		minute: limit % 60,
		hour: Math.floor(limit / 60),
		seconds: 0,
	});
	const [text, setText] = useState("");

	useEffect(() => {
		window.setInterval(() => {
			setTime((time) => {
				const newTIme = {
					...time,
				};
				if (time.seconds > 0) {
					newTIme.seconds -= 1;
				} else if (time.minute > 0) {
					newTIme.minute -= 1;
					newTIme.seconds = 59;
				} else if (time.hour > 0) {
					newTIme.hour -= 1;
					newTIme.minute = 59;
					newTIme.seconds = 59;
				} else {
					onEnd();
				}
				return newTIme;
			});
		}, 1000);
	}, []);

	useEffect(() => {
		const sec = (time.seconds < 10 ? "0" : "") + time.seconds;
		const min = (time.minute < 10 ? "0" : "") + time.minute;
		const h = (time.hour < 10 ? "0" : "") + time.hour;
		setText(`${h}:${min}:${sec}`);
	}, [time]);

	return <div className={classes.headerTitle}>{text}</div>;
}

function QuestionSelector({
	count,
	questionMap = {},
	selectQuestion,
	selectedQues,
}) {
	const classes = useStyles();

	var rows = [];
	for (var i = 0; i < count; i++) {
		const key = i + 1;
		const clas = classes.selector;
		if (questionMap[key] && questionMap[key].marked) {
			clas = classes.selectorMarked;
		} else if (questionMap[key] && questionMap[key].answer) {
			clas = classes.selectorDone;
		} else if (key == selectedQues) {
			clas = classes.selectorCurrent;
		}

		rows.push(
			<div className={classes.selectCont}>
				<ButtonBase
					classes={{ root: clas }}
					key={key}
					onClick={() => selectQuestion(0, key)}
				>
					{key}
				</ButtonBase>
				{key == selectedQues && <div className={classes.arrow}></div>}
			</div>
		);
	}
	return (
		<Box
			classes={{ root: classes.selectorCont }}
			display="flex"
			flexWrap="wrap"
			p={1}
			m={1}
			bgcolor="background.paper"
		>
			{rows}
		</Box>
	);
}

function QuestionSelectorPrevNext({ selectQuestion }) {
	const classes = useStyles();

	return (
		<Box
			classes={{ root: classes.selectorContBottom }}
			display="flex"
			flexWrap="wrap"
			p={1}
			m={1}
			bgcolor="background.paper"
		>
			<Button
				classes={{ root: classes.button }}
				variant="outlined"
				onClick={() => selectQuestion(-1)}
			>
				Previous
			</Button>
			<Button
				classes={{ root: classes.button }}
				variant="outlined"
				onClick={() => selectQuestion(1)}
			>
				Next
			</Button>
		</Box>
	);
}

function QuestionDisplay({
	question,
	name,
	questionMap,
	selectedQues,
	toggleMarked,
}) {
	const classes = useStyles();
	// flagButtonSelected
	let clas = classes.flagButton;
	if (questionMap[selectedQues]?.marked) {
		clas = classes.flagButtonSelected;
	}
	return (
		<div style={{ marginBottom: "30px" }}>
			<div className={classes.questionNameCont}>
				<div className={classes.title}>{name}</div>
				<IconButton
					classes={{ root: clas }}
					onClick={() => toggleMarked(selectedQues)}
					component="span"
				>
					<GolfCourseIcon fontSize="small" />
				</IconButton>
			</div>
			<Editor
				content={question?.questionContent}
				onContentChange={() => {}}
				readOnly={true}
			/>
		</div>
	);
}

function CheckBoxes({
	answerOptions,
	questionMap = {},
	name,
	selectedQues,
	updateAnswer,
}) {
	const classes = useStyles();
	const onSelected = useCallback(
		(option) => {
			updateAnswer(selectedQues, option);
		},
		[selectedQues, updateAnswer]
	);

	const renderCheckBoxOption = (option, value) => {
		return (
			<Card
				key={option}
				variant="outlined"
				classes={{ root: classes.answerOption }}
			>
				<CardContent classes={{ root: classes.checkBoxCont }}>
					<Checkbox
						checked={questionMap[selectedQues]?.answer == option}
						onChange={() => onSelected(option)}
						component="span"
						color="primary"
					/>
					<div classes={classes.text}>{value}</div>
				</CardContent>
			</Card>
		);
	};

	return Object.entries(answerOptions).map(([option, value]) => {
		return renderCheckBoxOption(option, value);
	});
}

function InputOption({
	answerOptions,
	questionMap = {},
	name,
	selectedQues,
	updateAnswer,
}) {
	const classes = useStyles();

	return (
		<div className={classes.inputDisplayContainer}>
			{answerOptions.prefix && (
				<div className={classes.underlineText}>{answerOptions.prefix}</div>
			)}
			<TextField
				id="answer-input"
				placeholder="Enter Answer Here"
				size="small"
				onChange={(event) => updateAnswer(selectedQues, event.target.value)}
				value={questionMap[selectedQues]?.answer || ""}
			/>
			<div className={classes.underlineText}>{answerOptions.suffix}</div>
		</div>
	);
}

function AnswerDisplay({
	question,
	name,
	questionMap,
	selectedQues,
	updateAnswer,
}) {
	const classes = useStyles();

	return (
		<>
			{question.answerType == 3 ? (
				<InputOption
					answerOptions={question.answerOptions}
					questionMap={questionMap}
					name={name}
					selectedQues={selectedQues}
					updateAnswer={updateAnswer}
				/>
			) : (
				<CheckBoxes
					answerOptions={question.answerOptions}
					questionMap={questionMap}
					name={name}
					selectedQues={selectedQues}
					updateAnswer={updateAnswer}
				/>
			)}
			{question.allowSteps && (
				<TextField
					id={`answer-steps`}
					placeholder={`Add your steps here`}
					label={"Answer Steps (optional)"}
					size="medium"
					variant="outlined"
					multiline
					fullWidth
					onChange={(event) => {}}
					classes={{ root: classes.stepsText }}
				/>
			)}
		</>
	);
}

function Quiz() {
	const classes = useStyles();

	const [questionPaper, setQustionPaper] = useState({
		questions: {
			"Question 1": question1,
			"Question 2": question2,
			"Question 3": question3,
			"Question 4": question4,
		},
		count: 4,
	});

	const [selectedQues, setSelectedQues] = useState(1);

	const selectQuestion = useCallback(
		(type, number) => {
			if (type == 0) {
				setSelectedQues(number);
			} else {
				setSelectedQues((num) => {
					let newNum = num + type;
					if (newNum < 1) {
						newNum = questionPaper.count;
					} else if (newNum > questionPaper.count) {
						newNum = 1;
					}
					return newNum;
				});
			}
		},
		[questionPaper]
	);

	const [questionMap, setQuestionMap] = useState({});

	const updateAnswer = useCallback((number, answer) => {
		setQuestionMap((questionMap) => {
			return {
				...questionMap,
				[number]: {
					...questionMap[number],
					answer: answer,
				},
			};
		});
	}, []);

	const toggleMarked = useCallback((number) => {
		setQuestionMap((questionMap) => {
			return {
				...questionMap,
				[number]: {
					...questionMap[number],
					marked: !questionMap[number]?.marked,
				},
			};
		});
	}, []);

	return (
		<Container disableGutters={true} classes={{ root: classes.root }}>
			<Paper elevation={3} classes={{ root: classes.innerContainer }}>
				<Paper elevation={3} classes={{ root: classes.headerContainer }}>
					<div className={classes.headerTitle}>Sample Test</div>
					<Timer limit={5} onEnd={() => {}} />
					<Button
						classes={{ root: classes.button }}
						variant="outlined"
						onClick={() => {}}
					>
						SUBMIT
					</Button>
				</Paper>
				<QuestionSelector
					count={questionPaper.count}
					questionMap={questionMap}
					selectQuestion={selectQuestion}
					selectedQues={selectedQues}
				/>
				<Paper elevation={3} classes={{ root: classes.questionContainer }}>
					{selectedQues && questionPaper && (
						<>
							<QuestionDisplay
								question={questionPaper.questions[`Question ${selectedQues}`]}
								name={`Question ${selectedQues}`}
								questionMap={questionMap}
								selectedQues={selectedQues}
								toggleMarked={toggleMarked}
							/>
							<AnswerDisplay
								question={questionPaper.questions[`Question ${selectedQues}`]}
								name={`Question ${selectedQues}`}
								questionMap={questionMap}
								selectedQues={selectedQues}
								updateAnswer={updateAnswer}
							/>
						</>
					)}
				</Paper>
				<QuestionSelectorPrevNext
					count={questionPaper.count}
					questionMap={questionMap}
					selectQuestion={selectQuestion}
				/>
			</Paper>
		</Container>
	);
}

export default Quiz;
