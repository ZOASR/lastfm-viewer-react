import { Image, Images, MBObject, Release, ReleaseInfo } from "./MBtypes";
import {
	LastFmImage,
	Track,
	TrackInfoRes,
	UserRecentTracksRes,
} from "./LFMtypes";

const lastfm_api_root = "http://ws.audioscrobbler.com/2.0/";

export interface TrackInfo {
	trackName: string | undefined;
	artistName: string | undefined;
	albumTitle?: string | undefined;
	MBImages: Image[] | undefined;
	lastfmImages?: LastFmImage[];
	nowplaying: boolean | undefined;
	pastTracks: unknown[] | Track[];
	duration: number;
}

const wait = async (secs: number) =>
	new Promise((resolve) => setTimeout(resolve, secs));

const getMBTrackReleases = async (
	trackName: string,
	trackArtirst: string,
	albumName: string | undefined
): Promise<Release[] | null> => {
	let brainzUrl: string;
	if (albumName) {
		brainzUrl = `https://musicbrainz.org/ws/2/recording/?query=recording:"${trackName}"+AND+album:${albumName}+AND++artist:"${trackArtirst}"+AND+status:official+AND+primarytype:album&inc=releases&fmt=json&limit=1`;
	} else {
		brainzUrl = `https://musicbrainz.org/ws/2/recording/?query=recording:"${trackName}"+AND+artist:"${trackArtirst}"+AND+status:official+AND+primarytype:album&inc=releases&fmt=json&limit=1`;
	}
	const musicbrainzApi = await fetch(brainzUrl, {
		headers: {
			"User-Agent": `ReactLastFmViewer/${APP_VERSION} `,
		},
	});
	const brainzData: MBObject = await musicbrainzApi.json();
	if (brainzData.recordings) return brainzData.recordings[0]?.releases;
	else return null;
};

const getMBReleaseInfo = async (mbid: string): Promise<ReleaseInfo> => {
	const brainzUrl = `https://musicbrainz.org/ws/2/release/${mbid}?fmt=json`;
	const musicbrainzApi = await fetch(brainzUrl, {
		headers: {
			"User-Agent": `ReactLastFmViewer/${APP_VERSION} `,
		},
	});
	const releaseInfo: ReleaseInfo = await musicbrainzApi.json();
	return releaseInfo;
};

const getCAACoverArt = async (releaseMBid: string): Promise<Image[]> => {
	const coverArtUrl = `https://coverartarchive.org/release/${releaseMBid}`;
	const cover = await fetch(coverArtUrl);
	const covers: Images = await cover.json();
	return covers.images;
};

const getUserTracks = async (
	username: string,
	api_key: string,
	limit: number = 5
): Promise<UserRecentTracksRes> => {
	const lastfm_api_url = `${lastfm_api_root}?method=user.getrecenttracks&user=${username}&api_key=${api_key}&format=json&limit=${limit}`;

	const res = await fetch(lastfm_api_url, {
		method: "GET",
		headers: {
			"User-Agent": `ReactLastFmViewer/${APP_VERSION} `,
		},
	});
	if (res.ok) {
		const data: UserRecentTracksRes = await res.json();
		return data;
	} else {
		const error: { message: string; error: number } = await res.json();
		throw new Error(error.message);
	}
};

const getTrackInfo = async (
	track_name: string,
	track_artist: string,
	api_key: string
): Promise<TrackInfoRes> => {
	const lastfm_api_url = `${lastfm_api_root}?method=track.getInfo&track=${track_name}&artist=${track_artist}&api_key=${api_key}&format=json`;

	const res = await fetch(lastfm_api_url, {
		method: "GET",
		headers: {
			"User-Agent": `ReactLastFmViewer/${APP_VERSION} `,
		},
	});
	if (res.ok) {
		const data: TrackInfoRes = await res.json();
		return data;
	} else {
		const error: { message: string; error: number } = await res.json();
		throw new Error(error.message);
	}
};

export const getLatestTrack = async (
	username: string,
	api_key: string
): Promise<TrackInfo | Error> => {
	let trackName: string = "";
	let artistName: string = "";
	let albumTitle: string | undefined = undefined;
	let lastfmImages: LastFmImage[] | undefined = undefined;
	let isNowplaying: boolean = false;
	let duration: number = 0;
	let pasttracks;

	let userData: UserRecentTracksRes;
	let trackInfo: TrackInfoRes;

	try {
		userData = await getUserTracks(username, api_key, 5);

		trackName = userData.recenttracks.track[0].name;
		artistName = userData.recenttracks.track[0].artist["#text"];
		pasttracks = userData.recenttracks.track;

		if ("@attr" in userData.recenttracks.track[0])
			isNowplaying =
				userData.recenttracks.track[0]["@attr"]?.nowplaying == "true";
		else isNowplaying = false;
	} catch (error) {
		if (error instanceof Error) {
			return error;
		}
	}

	try {
		trackInfo = await getTrackInfo(trackName, artistName, api_key);
		albumTitle = trackInfo.track.album?.title;
		lastfmImages = trackInfo.track.album?.image;
		duration = parseInt(trackInfo.track.duration);
	} catch (error) {
		if (error instanceof Error) {
			return error;
		}
	}

	const releases: Release[] | null = await getMBTrackReleases(
		trackName,
		artistName,
		albumTitle
	);

	let LatestTrack: TrackInfo = {
		trackName: trackName,
		artistName: artistName,
		albumTitle: albumTitle,
		lastfmImages: lastfmImages,
		MBImages: undefined,
		nowplaying: isNowplaying,
		pastTracks: pasttracks as unknown[],
		duration: duration,
	};

	if (releases) {
		for (let release of releases) {
			const rleaseInfo: ReleaseInfo = await getMBReleaseInfo(release.id);
			if (
				rleaseInfo["cover-art-archive"].front ||
				rleaseInfo["cover-art-archive"].artwork ||
				rleaseInfo["cover-art-archive"].back
			) {
				const images: Image[] = await getCAACoverArt(release.id);
				LatestTrack = {
					trackName: trackName,
					artistName: artistName,
					albumTitle: albumTitle,
					lastfmImages: lastfmImages,
					MBImages: images,
					nowplaying: isNowplaying,
					pastTracks: pasttracks as unknown[],
					duration: duration,
				};
				return LatestTrack;
			}
			await wait(1000);
		}
	}
	return LatestTrack;
};
