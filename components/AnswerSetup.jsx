import {
	Card,
	CardContent,
	Checkbox,
	makeStyles,
	InputBase,
	IconButton,
	Button,
	TextField,
} from "@material-ui/core";
import { useCallback } from "react";
import Add from "@material-ui/icons/Add";
import Clear from "@material-ui/icons/Clear";

const useStyles = makeStyles({
	answerOption: {
		marginBottom: "10px",
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
	inputAnswerOption: {
		marginTop: "5px",
		marginBottom: "5px",
		flex: 1,
	},
	checkBoxCont: {
		paddingTop: "4px",
		paddingBottom: "4px !important",
		display: "flex",
	},
	text: {
		flex: 1,
		alignSelf: "center",
	},
	button: {
		color: "#A6A6A6",
		marginTop: "5px",
		marginBottom: "5px",
	},
	closeButton: {
		color: "#A6A6A6",
	},
	underlineText: {
		marginRight: "10px",
		marginLeft: "10px",
	},
	inputDisplayContainer: {
		display: "flex",
		alignItems: "baseline",
	},
});

function CheckBoxes({
	answerOptions,
	correctAnswer,
	onOptionUpdate,
	onCorrectAnswerChange,
}) {
	const classes = useStyles();
	const onSelected = useCallback(
		(option) => {
			onCorrectAnswerChange([option]);
		},
		[onCorrectAnswerChange]
	);
	const onTextUpdate = useCallback(
		(option, value) => {
			onOptionUpdate({
				...answerOptions,
				[option]: value,
			});
		},
		[onOptionUpdate, answerOptions]
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
						checked={correctAnswer[0] == option}
						onChange={() => onSelected(option)}
						component="span"
						color="primary"
					/>
					<InputBase
						id={`answer-${option}`}
						placeholder={`Answer ${option}`}
						size="small"
						required
						multiline
						onChange={(event) => onTextUpdate(option, event.target.value)}
						value={value}
						classes={{ root: classes.text }}
					/>
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
	onOptionUpdate,
	correctAnswer,
	onCorrectAnswerChange,
}) {
	const classes = useStyles();

	const onAnswerOptionChange = useCallback(
		(index, value) => {
			const newCorrectAnswer = [].concat(correctAnswer);
			newCorrectAnswer[index] = value;
			onCorrectAnswerChange(newCorrectAnswer);
		},
		[onCorrectAnswerChange, correctAnswer]
	);

	const onTextUpdate = useCallback(
		(option, value) => {
			onOptionUpdate({
				...answerOptions,
				[option]: value,
			});
		},
		[onOptionUpdate, answerOptions]
	);

	const onClear = useCallback(
		(removeIndex) => {
			const newCorrectAnswer = correctAnswer.filter(
				(value, index) => removeIndex != index
			);
			onCorrectAnswerChange(newCorrectAnswer);
		},
		[onCorrectAnswerChange, correctAnswer]
	);

	const renderInputOption = (index, value) => {
		return (
			<div style={{ display: "flex" }}>
				<Card
					key={index}
					variant="outlined"
					classes={{ root: classes.inputAnswerOption }}
				>
					<CardContent classes={{ root: classes.checkBoxCont }}>
						<InputBase
							id={`answer-${index}`}
							placeholder={`Answer ${index + 1}`}
							size="small"
							required
							multiline
							onChange={(event) =>
								onAnswerOptionChange(index, event.target.value)
							}
							value={value}
							classes={{ root: classes.text }}
						/>
					</CardContent>
				</Card>
				<IconButton
					classes={{ root: classes.closeButton }}
					onClick={() => onClear(index)}
					component="span"
				>
					<Clear fontSize="small" />
				</IconButton>
			</div>
		);
	};

	const renderInput = () => {
		return (
			<div className={classes.inputDisplayContainer}>
				<TextField
					id={`answer-prefix`}
					placeholder={`Answer Prefix`}
					size="small"
					onChange={(event) => onTextUpdate("prefix", event.target.value)}
					value={answerOptions.prefix}
					classes={{ root: classes.underlineText }}
				/>
				<TextField
					id="answer-input"
					label="Answer Input"
					placeholder="Answer Input"
					size="small"
					variant="outlined"
					disabled
				/>
				<TextField
					id={`answer-suffix`}
					placeholder={`Answer Sufix`}
					size="small"
					onChange={(event) => onTextUpdate("suffix", event.target.value)}
					value={answerOptions.suffix}
					classes={{ root: classes.underlineText }}
				/>
			</div>
		);
	};

	return (
		<div>
			{renderInput()}
			<div className={classes.title}>Correct Options</div>
			{correctAnswer.map((value, index) => {
				return renderInputOption(index, value);
			})}
			<Button
				classes={{ root: classes.button }}
				variant="outlined"
				startIcon={<Add />}
				onClick={() => {
					onAnswerOptionChange(correctAnswer.length, "");
				}}
			>
				ADD ANOTHER ANSWER
			</Button>
		</div>
	);
}

export default function AnswerSetup({
	answerType,
	answerOptions,
	correctAnswer,
	onOptionUpdate,
	onCorrectAnswerChange,
}) {
	return answerType == 3 ? (
		<InputOption
			answerOptions={answerOptions}
			correctAnswer={correctAnswer}
			onOptionUpdate={onOptionUpdate}
			onCorrectAnswerChange={onCorrectAnswerChange}
		/>
	) : (
		<CheckBoxes
			answerOptions={answerOptions}
			correctAnswer={correctAnswer}
			onOptionUpdate={onOptionUpdate}
			onCorrectAnswerChange={onCorrectAnswerChange}
		/>
	);
}
