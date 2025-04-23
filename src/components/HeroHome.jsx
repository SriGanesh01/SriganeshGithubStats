import React, { useState, useEffect } from 'react';

const HeroHome = () => {
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const myHeaders = new Headers();
		myHeaders.append("Accept", "application/vnd.github+json");
		myHeaders.append("X-GitHub-Api-Version", "2022-11-28");

		const requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};

		fetch("https://api.github.com/users/SriGanesh01/repos", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				setRepos(result);
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
			});
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error fetching data: {error.message}</div>;

	return (
		<div className="w-[500px] h-6" id="hero-home">
			<h1>GitHub Repositories</h1>
			<ul>
				{repos.map((repo) => (
					<li key={repo.id}>
						<a href={repo.html_url} target="_blank" rel="noopener noreferrer">
							{repo.name}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default HeroHome;
