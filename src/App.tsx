import { useState } from "react";
import "./App.css";
import Test from "./Test";
import ReactLastFMViewer from "./components/ReactLastFMViewer";

function App() {
	const [isTest, setIsTest] = useState(false);
	return (
		<>
			<button onClick={() => setIsTest(!isTest)}>
				View {isTest ? "Live" : "Test"}
			</button>
			{!isTest ? (
				<ReactLastFMViewer
					user="ZOASR"
					api_key={import.meta.env.VITE_API_KEY}
					updateInterval={20000}
				/>
			) : (
				<Test api_key={import.meta.env.VITE_API_KEY} />
			)}
		</>
	);
}

export default App;
