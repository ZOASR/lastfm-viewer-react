import "./App.css";
import ReactLastFMViewer from "./components/ReactLastFMViewer";

function App() {
	return (
		<>
			<ReactLastFMViewer
				user="ZOASR"
				api_key={import.meta.env.VITE_API_KEY}
				updateInterval={20000}
			/>
		</>
	);
}

export default App;
