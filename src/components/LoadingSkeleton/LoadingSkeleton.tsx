import { ReactNode, useContext } from "react";
import { lfmContext } from "../ReactLastFMViewer";

interface Props {
	children: ReactNode;
	fallback: ReactNode | undefined;
	className?: string;
}

const LoadingSkeleton = ({ children, fallback, className }: Props) => {
	const context = useContext(lfmContext);
	return (
		<>
			{context.loading ? (
				<div className={"skeleton " + className}></div>
			) : children ? (
				children
			) : (
				<div>{fallback}</div>
			)}
		</>
	);
};

export default LoadingSkeleton;
