const ErrorView = ({
	message,
	mode
}: {
	message: string;
	mode: "prod" | "dev";
}) => {
	return (
		<div>
			{mode === "dev" && (
				<h1>
					Hello developer👋, please consider handling the following
					error before deployment:
				</h1>
			)}

			<div className={`errorView`}>
				<span>Error</span>
				{message}
			</div>
		</div>
	);
};

export default ErrorView;
