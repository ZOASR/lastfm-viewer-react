import { ReactNode } from "react";
import { useLastfmViewer } from "../useLastfmViewer";

interface Props {
	children: ReactNode;
	api_key: string;
	user: string;
	updateInterval: number | undefined;
	fallbackMsg: string;
}

const LoadingSkeleton = ({
	children,
	api_key,
	user,
	updateInterval,
	fallbackMsg
}: Props) => {
	const { loading } = useLastfmViewer({
		api_key,
		user,
		updateInterval
	});
	return (
		<>
			{loading ? (
				<div className="flex justify-center">
					<div className="skeleton mr-2 h-4 w-4 rounded-full"></div>
					<div className="skeleton h-4 w-1/2"></div>
				</div>
			) : children ? (
				children
			) : (
				<div>{fallbackMsg}</div>
			)}
		</>
	);
};

export default LoadingSkeleton;
