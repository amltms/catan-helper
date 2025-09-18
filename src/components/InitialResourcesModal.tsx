type Props = {
	initialResources: Record<string, number>;
	setShowInitialModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function InitialResourcesModal({ initialResources, setShowInitialModal }: Props) {
	return (
		<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-xl p-6 w-full max-w-md">
				<h2 className="text-xl font-semibold mb-1">Second Settlement Placed!</h2>
				<p className="mb-4 text-gray-600">Collect the following resources:</p>
				<ul className="mb-4 space-y-2">
					{(Object.entries(initialResources) as [string, number][])
						.filter(([, c]) => c > 0)
						.map(([res, c]) => (
							<li key={res}>
								<span className="font-medium">{c} x</span> {res}
							</li>
						))}
				</ul>
				<div className="mt-6 text-center">
					<button onClick={() => setShowInitialModal(false)} className="px-6 py-2 bg-red-100 text-red-900 font-semibold rounded-lg transition">
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
