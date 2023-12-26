import { createContext } from "react";
import { TrackInfo } from "./lastfm";

import TrackProgressBar from "./TrackProgressBar/TrackProgressBar";
import PastTracks from "./PastTracks/PastTracks";

import { FaLastfmSquare, FaRegUser, FaCompactDisc } from "react-icons/fa";
import { SiMusicbrainz } from "react-icons/si";

import disc from "./disc.svg";
import "../index.css";
import { useLastfmViewer } from "./useLastfmViewer";

export interface Colors {
	primary: string | undefined;
	secondary: string | undefined;
	accent: string | undefined;
}
export interface Props {
	api_key: string;
	user: string;
	updateInterval?: number;
}

export const lfmContext = createContext<{
	colors: Colors | undefined;
	track: TrackInfo | Error | undefined;
}>({
	colors: { primary: "white", secondary: "black", accent: "#aaa" },
	track: {
		trackName: "",
		artistName: "",
		albumTitle: "",
		MBImages: [],
		lastfmImages: [],
		nowplaying: false,
		pastTracks: [],
		duration: 0,
	},
});

const unexpectedErrors = [
	"NetworkError when attempting to fetch resource.",
	"Login: User required to be logged in",
	"Failed to fetch",
];

const ReactLastFMViewer = ({ api_key, user, updateInterval }: Props) => {
	const { track, colors, loading, message } = useLastfmViewer({
		api_key,
		user,
		updateInterval,
	});

	return (
		<lfmContext.Provider value={{ colors: colors, track: track }}>
			<div
				className="glass  relative mx-auto flex h-full w-full flex-col rounded-lg p-4 shadow-xl ring-2 ring-slate-950/5"
				style={{ background: colors?.primary }}
			>
				{track instanceof Error ? (
					<div>
						{unexpectedErrors.includes(message) ? (
							""
						) : (
							<h1>
								Hello developer👋, please consider handling the
								following error before deployment:
							</h1>
						)}

						<div className="mx-auto my-4 w-11/12 rounded-lg bg-red-900 p-5 text-xl text-red-200 shadow-inner">
							<span className="mr-2 rounded-lg bg-black/10 p-2 text-white">
								Error
							</span>
							{message}
						</div>
					</div>
				) : (
					<>
						<figure
							className="mx-auto mb-2 h-auto overflow-hidden rounded-lg border-inherit"
							style={{
								boxShadow: `0 0 20px ${colors?.secondary}99`,
							}}
						>
							{track?.lastfmImages &&
							track?.lastfmImages[3]["#text"] ? (
								<img
									className="w-min overflow-hidden object-cover"
									src={track.lastfmImages[3]["#text"]}
									alt="Album Cover"
								/>
							) : track?.MBImages ? (
								<img
									className="w-min overflow-hidden object-cover"
									src={track.MBImages[0].image}
									alt="Album Cover"
								/>
							) : (
								<img
									src={disc}
									className=""
									alt="Default album cover thumbnail"
								/>
							)}
						</figure>

						<div className="flex h-min flex-col gap-1 drop-shadow-lg filter">
							{track?.nowplaying ? <TrackProgressBar /> : ""}
							<h1
								className="shadow:lg mx-auto mt-1 text-center text-xs font-bold sm:text-base"
								style={{ color: colors?.secondary }}
							>
								{loading ? (
									<div className="skeleton h-8 w-fit"></div>
								) : track?.trackName ? (
									track?.trackName
								) : (
									"Track title not available"
								)}
							</h1>
							<div
								style={{ color: colors?.secondary }}
								className="flex flex-col gap-2 text-xs"
							>
								{loading ? (
									<div className="flex justify-center">
										<div className="skeleton mr-2 h-4 w-4 rounded-full"></div>
										<div className="skeleton h-4 w-1/2"></div>
									</div>
								) : track?.artistName ? (
									<span className="flex items-center justify-center gap-1">
										<FaRegUser />
										{track?.artistName}
									</span>
								) : (
									"Artist name not available"
								)}
								{loading ? (
									<div className="flex justify-center">
										<div className="skeleton mr-2 h-4 w-4 rounded-full"></div>
										<div className="skeleton h-4 w-1/2"></div>
									</div>
								) : track?.albumTitle ? (
									<span className="flex items-center justify-center gap-1">
										<FaCompactDisc />
										{track?.albumTitle}
									</span>
								) : (
									"Album name is not Available"
								)}
							</div>
							<PastTracks />
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
									<a
										href="https://musicbrainz.org/"
										target="_blank"
									>
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
						</div>
					</>
				)}
			</div>
		</lfmContext.Provider>
	);
};

export default ReactLastFMViewer;
