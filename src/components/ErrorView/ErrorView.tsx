const ErrorView = ({ error, mode }: { error: Error; mode: "prod" | "dev" }) => {
	return (
		<div>
			{mode === "dev" && (
				<h1>
					Hello developer👋, please consider handling the following
					error before deployment:
				</h1>
			)}

			<div className={`errorView`}>
				<span>{error.name}</span>
				{error.message}
			</div>
		</div>
	);
};

export default ErrorView;
