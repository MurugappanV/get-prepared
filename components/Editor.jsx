import Dante from "Dante2";
import { makeStyles } from "@material-ui/core";
import { useCallback, useEffect, useRef } from "react";
import { ImageBlockConfig } from "Dante2/package/lib/components/blocks/image";
import { EmbedBlockConfig } from "Dante2/package/lib/components/blocks/embed";
import { PlaceholderBlockConfig } from "Dante2/package/lib/components/blocks/placeholder";
import { VideoBlockConfig } from "Dante2/package/lib/components/blocks/video";

const blocks = [
	"header-one",
	"unstyled",
	"blockquote",
	"ordered-list",
	"unordered-list",
	"unordered-list-item",
	"ordered-list-item",
	"code-block",
];

const defaultContent = {
	blocks: [
		{
			key: "fsj00",
			text: "",
			type: "unstyled",
			depth: 0,
			inlineStyleRanges: [],
			entityRanges: [],
			data: {},
		},
	],
	entityMap: {},
};

const useStyles = makeStyles({
	root: {
		margin: "0px",
		fontSize: "14px",
	},
	image: {
		maxWidth: "500px",
		maxHeight: "500px",
	},
});

export default function Editor({
	content = defaultContent,
	onContentChange,
	readOnly = false,
	placeholder = "Enter the content here...",
}) {
	const classes = useStyles();

	const defaultWrappers = [{ className: classes.root, block: "unstyled" }];

	const onChange = useCallback(
		(editorContext, content) => {
			onContentChange(content);
		},
		[onContentChange]
	);

	const editorContent = useRef(content);

	return (
		<Dante
			body_placeholder={placeholder}
			content={readOnly ? content : editorContent.current}
			continuousBlocks={blocks}
			read_only={readOnly}
			default_wrappers={defaultWrappers}
			data_storage={{
				save_handler: onChange,
			}}
			widgets={[
				ImageBlockConfig({ wrapper_class: classes.image }),
				EmbedBlockConfig({
					options: {
						placeholder: "put an external link",
						endpoint: "//noembed.com/embed?url=",
					},
				}),
				VideoBlockConfig({
					options: {
						placeholder: "put an external video link",
						endpoint: "//noembed.com/embed?url=",
						caption: "optional caption",
					},
				}),
				PlaceholderBlockConfig(),
			]}
		/>
	);
}
