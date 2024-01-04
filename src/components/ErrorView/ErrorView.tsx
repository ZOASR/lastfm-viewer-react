import styles from "@repo/ui/ErrorView.module.css";
import { unexpectedErrors } from "@repo/utils/utils";

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
