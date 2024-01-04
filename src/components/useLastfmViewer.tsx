import { useState, useEffect } from "react";
import { getLatestTrack } from "@lastfm-viewer/utils/lastfm";
import { Props } from "./ReactLastFMViewer";
import { Colors, TrackInfo } from "@lastfm-viewer/utils/types";

type lfmvHook = {
	track: TrackInfo | Error | undefined;
	colors: Colors | undefined;
	loading: boolean;
	message: string;
};

export const useLastfmViewer: (obj: Props) => lfmvHook = ({
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
				setColors(data.colors);
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
	}, [user, api_key, updateInterval]);

	return {
		track,
		colors,
		loading,
		message
	};
};
