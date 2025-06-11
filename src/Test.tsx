// @ts-expect-error no declaration file for built lib
import ReactLastFMViewer from "../dist/index.es";

function Test() {
	return (
		<>
			<ReactLastFMViewer
				user="ZOASR"
				updateInterval={10000}
				mode="prod"
			/>
		</>
	);
}

export default Test;
