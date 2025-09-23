type Props = {
	results: Record<string, number>;
};

const DiceRolls = ({ results }: Props) => {
	return (
		<div className="bg-gray-100 mb-4 p-4 rounded-xl">
			<h2 className="font-semibold mb-2 text-gray-800 text-lg">You Collect:</h2>
			{(Object.entries(results) as [string, number][]).filter(([, c]) => c > 0).length === 0 ? (
				<p className="text-base text-gray-600">No resources.</p>
			) : (
				<ul className="space-y-2 text-base text-gray-700">
					{(Object.entries(results) as [string, number][])
						.filter(([, c]) => c > 0)
						.map(([res, c]) => (
							<li key={res}>
								<span className="font-medium">{c} x</span> {res}
							</li>
						))}
				</ul>
			)}
		</div>
	);
};

export default DiceRolls;
