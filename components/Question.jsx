import { IconButton, Switch, Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import DoneAll from "@material-ui/icons/DoneAll";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import React, { useCallback, useState } from "react";
import Editor from "./Editor";
import AnswerSetup from "./AnswerSetup";
import SaveIcon from "@material-ui/icons/Save";
import { question1, question2 } from "./data";

const useStyles = makeStyles({
	root: {
		height: "100vh",
		maxWidth: "100vw",
	},
	innerContainer: {
		backgroundColor: "#ffffff",
		minHeight: "100%",
		paddingTop: "40px",
		paddingBottom: "40px",
		paddingLeft: "60px",
		paddingRight: "60px",
	},
	title: {
		paddingTop: "20px",
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
		fontWeight: "900",
		fontSize: "40px",
		width: "max-content",
		paddingBottom: "20px",
	},
});

const mcq = {
	A: "",
	B: "",
	C: "",
	D: "",
};

const boo = {
	A: "True",
	B: "False",
};

const text = {
	prefix: "",
	suffix: "",
};

const q = {
	questionName: "",
	questionContent: undefined,
	answerContent: undefined,
	answerType: 2,
	answerOptions: mcq,
	correctAnswer: ["A"],
	allowSteps: true,
};

function Question() {
	const classes = useStyles();
	const [question, setQuestion] = useState(q);

	const onQuestionNameChange = useCallback((event) => {
		const value = event?.target?.value;
		setQuestion((question) => {
			return {
				...question,
				questionName: value,
			};
		});
	}, []);

	const onAnswerTypeChange = useCallback((answerType) => {
		let answerOptions = text;
		let correctAnswer = [""];
		if (answerType == 1) {
			answerOptions = boo;
			correctAnswer = ["A"];
		} else if (answerType == 2) {
			answerOptions = mcq;
			correctAnswer = ["A"];
		}
		setQuestion((question) => {
			return {
				...question,
				answerType: answerType,
				answerOptions: answerOptions,
				correctAnswer: correctAnswer,
			};
		});
	}, []);

	const onCorrectAnswerChange = useCallback((correctAnswer) => {
		setQuestion((question) => {
			return {
				...question,
				correctAnswer: correctAnswer,
			};
		});
	}, []);
	const onOptionUpdate = useCallback((answerOptions) => {
		setQuestion((question) => {
			return {
				...question,
				answerOptions: answerOptions,
			};
		});
	}, []);

	const onAllowStepsChange = useCallback(() => {
		setQuestion((question) => {
			return {
				...question,
				allowSteps: !question.allowSteps,
			};
		});
	}, []);

	const onQuestionChange = useCallback((questionContent) => {
		setQuestion((question) => {
			return {
				...question,
				questionContent: questionContent,
			};
		});
	}, []);

	const onAnswerChange = useCallback((answerContent) => {
		setQuestion((question) => {
			return {
				...question,
				answerContent: answerContent,
			};
		});
	}, []);

	return (
		<>
			{/*  */}
			<Container disableGutters={true} classes={{ root: classes.root }}>
				<Paper elevation={3} classes={{ root: classes.innerContainer }}>
					<div className={classes.headerTitle}>Create New Question</div>
					<TextField
						id="question-name"
						label="Question Name"
						placeholder="Question Name"
						size="small"
						variant="outlined"
						fullWidth
						required
						value={question.questionName}
						onChange={onQuestionNameChange}
					/>
					<div className={classes.title}>Question</div>
					<Editor
						content={question.questionContent}
						onContentChange={onQuestionChange}
						placeholder={"Enter question here..."}
					/>
					<div className={classes.title}>
						<span>Answer Type</span>
						<IconButton
							onClick={() => {
								onAnswerTypeChange(1);
							}}
							color={question.answerType == 1 ? "primary" : "default"}
							component="span"
						>
							<DoneAll fontSize="small" />
						</IconButton>
						<IconButton
							onClick={() => {
								onAnswerTypeChange(2);
							}}
							color={question.answerType == 2 ? "primary" : "default"}
							component="span"
						>
							<LibraryAddCheckIcon fontSize="small" />
						</IconButton>
						<IconButton
							onClick={() => {
								onAnswerTypeChange(3);
							}}
							color={question.answerType == 3 ? "primary" : "default"}
							component="span"
						>
							<SpellcheckIcon fontSize="small" />
						</IconButton>
						<div style={{ flex: 1 }}></div>
						<Switch
							classes={{ root: classes.switch }}
							checked={question.allowSteps}
							onChange={onAllowStepsChange}
							color="primary"
							name="checkedB"
							size={"small"}
						/>
						<div className={classes.floatRightText}>Allow Steps Input</div>
					</div>
					<AnswerSetup
						answerType={question.answerType}
						answerOptions={question.answerOptions}
						correctAnswer={question.correctAnswer}
						onOptionUpdate={onOptionUpdate}
						onCorrectAnswerChange={onCorrectAnswerChange}
					/>
					<div className={classes.title}>Explanation</div>
					<Editor
						content={question.answerContent}
						onContentChange={onAnswerChange}
						placeholder={"Enter answer explanation here..."}
					/>
					<Button
						classes={{ root: classes.saveButton }}
						onClick={() => {}}
						startIcon={<SaveIcon />}
					>
						Save question
					</Button>
				</Paper>
			</Container>
		</>
	);
}

export default Question;

//"Please entry the question name"

{
	/* <div>"Hello world"</div>
                        <div style={{fontFamily: "Roboto"}}>"Hello world"</div> */
}
