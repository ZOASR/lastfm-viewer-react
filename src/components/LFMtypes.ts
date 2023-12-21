export type UserRecentTracksReq = {
	user: string;
	limit?: number;
	page?: number;
	from?: Date;
};
export type TrackInfoReq = {
	user?: string;
	mbid?: string;
	track: string;
	artist: string;
	autocorrect?: boolean;
};
export type TrackInfoReqWithMBID = Omit<
	Omit<TrackInfoReq, "track">,
	"artist"
> & { mbid: string };

/* TrackInfoTypes*/
export type TrackInfoRes = {
	track: TrackDetail;
};

export type TrackDetail = {
	name: string;
	url: string;
	duration: string;
	streamable: Streamable;
	listeners: string;
	playcount: string;
	artist: Artist;
	album: TrackAlbum;
	toptags: Toptags;
};

export type TrackAlbum = {
	artist: string;
	title: string;
	url: string;
	image: LastFmImage[];
};

export type Artist = {
	name: string;
	mbid: string;
	url: string;
};

export type Streamable = {
	"#text": string;
	fulltrack: string;
};

export type Toptags = {
	tag: Tag[];
};

export type Tag = {
	name: string;
	url: string;
};

/* UserRecentTracksTypes*/

export type UserRecentTracksRes = {
	recenttracks: Recenttracks;
};

export type Recenttracks = {
	track: Track[];
	"@attr": Attr;
};

export type Attr = {
	user: string;
	totalPages: string;
	page: string;
	perPage: string;
	total: string;
};

export type Track = {
	artist: {
		mbid: string;
		"#text": string;
	};
	streamable: "0" | "1";
	image: Array<{
		"#text": string;
		size: string;
	}>;
	mbid: string;
	album: {
		mbid: string;
		"#text": string;
	};
	name: string;
	url: string;
	date: {
		uts: string;
		"#text": string;
	};
	"@attr"?: {
		nowplaying: "true";
	};
};

export type Album = {
	mbid: string;
	"#text": string;
};

export type DateClass = {
	uts: string;
	"#text": string;
};

export type LastFmImage = {
	size: string;
	"#text": string;
};
