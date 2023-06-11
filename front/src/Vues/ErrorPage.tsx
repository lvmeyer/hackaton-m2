import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
	const error: any = useRouteError();
	console.error(error);

	return (
		<div id="error-page">
			<h1 className="h1-carbon">Oops!</h1>
			<p className="h1-carbon">Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
}
