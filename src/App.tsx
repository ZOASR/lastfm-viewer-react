import "./App.css";
import Test from "./Test";
import ReactLastFMViewer from "./components/ReactLastFMViewer";

function App() {
	return (
		<>
			<ReactLastFMViewer
				user="ZOASR"
				api_key={import.meta.env.VITE_API_KEY}
				updateInterval={20000}
			/>
			<Test api_key="very_wrong_api_key" />
		</>
	);
}

export default App;
