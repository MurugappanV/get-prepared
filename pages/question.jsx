import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import dynamic from "next/dynamic";
import React from "react";

const theme = createMuiTheme({
	palette: {
		primary: {
			light: "#fe88a2",
			main: "#FE6B8B",
			dark: "#b14a61",
			contrastText: "#fff",
		},
		secondary: {
			light: "#ff7961",
			main: "#f44336",
			dark: "#ba000d",
			contrastText: "#000",
		},
	},
	overrides: {
		MuiCssBaseline: {
			"@global": {
				html: {
					WebkitFontSmoothing: "auto",
					height: "100%",
				},
				body: {
					background:
						"linear-gradient(90deg, rgba(245,246,247,1) 0%, rgba(255,255,255,1) 48%, rgba(245,246,247,1) 100%)",
					height: "100%",
				},
				"::-webkit-scrollbar": {
					width: "10px",
					margin: "2px",
				},
				"::-webkit-scrollbar-track": {
					background: "#f1f1f1",
					borderRadius: "5px",
				},
				"::-webkit-scrollbar-thumb": {
					background: "#888",
					borderRadius: "5px",
				},
				"::-webkit-scrollbar-thumb:hover": {
					background: "#555",
				},
			},
		},
	},
});

const DynamicComponentWithNoSSR = dynamic(
	() => import("../components/Question"),
	{ ssr: false }
);

function Question() {
	return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<DynamicComponentWithNoSSR />
			</ThemeProvider>
		</React.Fragment>
	);
}

export default Question;
