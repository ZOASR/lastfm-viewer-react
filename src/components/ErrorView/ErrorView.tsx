import styles from "@repo/ui/ErrorView.module.css";

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

			<div className={styles.errorView}>
				<span>Error</span>
				{message}
			</div>
		</div>
	);
};

export default ErrorView;
