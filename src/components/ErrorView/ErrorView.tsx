const unexpectedErrors = [
	"NetworkError when attempting to fetch resource.",
	"Login: User required to be logged in",
	"Failed to fetch"
];

const ErrorView = ({ message }: { message: string }) => {
	return (
		<div>
			{unexpectedErrors.includes(message) ? (
				""
			) : (
				<h1>
					Hello developer👋, please consider handling the following
					error before deployment:
				</h1>
			)}

			<div className="mx-auto my-4 w-11/12 rounded-lg bg-red-900 p-5 text-xl text-red-200 shadow-inner">
				<span className="mr-2 rounded-lg bg-black/10 p-2 text-white">
					Error
				</span>
				{message}
			</div>
		</div>
	);
};

export default ErrorView;
