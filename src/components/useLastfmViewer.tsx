import { prominent } from "color.js";
import { useState, useEffect } from "react";
import { TrackInfo, getLatestTrack } from "@repo/utils/lastftm";
import { Colors, Props } from "./ReactLastFMViewer";

type lfmvHook = {
	track: TrackInfo | Error | undefined;
	colors: Colors | undefined;
	loading: boolean;
	message: string;
};

export const useLastfmViewer: ({}: Props) => lfmvHook = ({
	user,
	api_key,
	updateInterval
}: Props) => {
	const [track, setTrack] = useState<TrackInfo | Error>();
	const [colors, setColors] = useState<Colors | undefined>();
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const get = async () => {
			const data: TrackInfo | Error = await getLatestTrack(user, api_key);
			if (data instanceof Error) {
				setTrack(data);
				setMessage(data.message);
				setLoading(false);
			} else {
				setTrack(data);
				setLoading(false);
			}
		};
		get();
		let intervalRef: number;
		if (updateInterval) {
			intervalRef = setInterval(() => {
				get();
			}, updateInterval);
		}
		return () => {
			if (updateInterval) clearInterval(intervalRef);
		};
	}, []);

	useEffect(() => {
		let imageUrl: string = "";
		if (!(track instanceof Error)) {
			if (track && track.lastfmImages) {
				imageUrl = track?.lastfmImages[3]["#text"];
			} else if (track && track.MBImages) {
				imageUrl = track.MBImages[0].image;
			}
			prominent(imageUrl, {
				amount: 100,
				format: "hex",
				sample: 10
			}).then((color) => {
				const color1: string = color[0] as string;
				const color2: string = color[98] as string;
				const color3: string = color[51] as string;
				setColors({
					primary: color1,
					secondary: color2,
					accent: color3
				});
			});
		}
	}, [track]);

	return {
		track,
		colors,
		loading,
		message
	};
};
