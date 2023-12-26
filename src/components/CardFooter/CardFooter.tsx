import { FaLastfmSquare, FaRegUser } from "react-icons/fa";
import { SiMusicbrainz } from "react-icons/si";
import { Colors } from "../ReactLastFMViewer";

const CardFooter = ({
	colors,
	user
}: {
	colors: Colors | undefined;
	user: string;
}) => {
	return (
		<div
			style={{ color: colors?.secondary }}
			className="mt-2 flex  w-full justify-between drop-shadow-lg filter"
		>
			<span className="flex gap-2">
				<a
					href="https://www.last.fm/"
					target="_blank"
					className="h-min self-center "
				>
					<FaLastfmSquare />
				</a>
				<a href="https://musicbrainz.org/" target="_blank">
					<SiMusicbrainz />
				</a>
			</span>
			<a
				className=" flex items-center gap-2 text-xs"
				href={`https://www.last.fm/user/${user}`}
			>
				<FaRegUser />
				{user}
			</a>
		</div>
	);
};

export default CardFooter;
