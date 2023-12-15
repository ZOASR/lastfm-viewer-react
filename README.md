# react-lastfm-viewer

<p align="center">
    <a href="https://www.npmjs.com/package/react-lastfm-viewer" alt="react-lastfm-viewer(npm)">
        <img src="https://img.shields.io/npm/dt/react-lastfm-viewer?style=for-the-badge&logo=npm&logoColor=red&label=react-lastfm-viewer" /></a>
</p>

A React component to view recent [scrobbles](https://www.dictionary.com/browse/scrobble) for a provided [last.fm](last.fm) user, built with:

-   `tailwind`, `daisyui`
-   `vite`
-   `lastfm-ts-api`
-   `color.js`

<p align="center">
  <img src="https://github.com/ZOASR/react-lastfm-viewer/blob/main/images/Preview_1.png" style="border-radius: 10px"/>
  <img src="https://github.com/ZOASR/react-lastfm-viewer/blob/main/images/Preview_2.png" style="border-radius: 10px"/>
</p>

## Features:

-   color theme adapts to the album cover image

# Install

```bash
npm i react-lastfm-viewer
```

## Usage

to start using the component you first need to get a last.fm API key from [here](https://www.last.fm/api), once you've done that just import the component and specify the username of the user you want to get scrobbling information from:

> Please note that some users set their profile stats to private, so not every user is applicable, if you're using this component on your personal account just set your "Recent listening" stats to public [here](https://www.last.fm/settings/privacy)

```tsx
import ReactLastFMViewer from "react-lastfm-viewer";

function App() {
	return (
		<>
			<ReactLastFMViewer user="[username]" api_key="[API_KEY]" />
		</>
	);
}
```

if you want to frequently fetch the user's listening info just specify the `updateInterval` prop. (milliseconds) (it takes a number that determines the update interval):

```tsx
import ReactLastFMViewer from "react-lastfm-viewer";

function App() {
	return (
		<>
			<ReactLastFMViewer
				user="[username]"
				api_key="[API_KEY]"
				updateInterval={20000} //20 seconds
			/>
		</>
	);
}
```

> setting the `updateInterval` prop to a low number might subject your api key for termination, to avoid this just use a higher more reasonable number.
