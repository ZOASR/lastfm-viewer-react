// @ts-expect-error no declaration file for built lib
import ReactLastFMViewer from "../dist/index.es";

function Test({ api_key }: { api_key: string }) {
	return (
		<>
			<ReactLastFMViewer
				user="ZOASR"
				api_key={api_key}
				updateInterval={10000}
				mode="prod"
			/>
		</>
	);
}

export default Test;
