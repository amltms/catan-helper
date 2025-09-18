import type { Settlement } from '../types';

interface StatsModalProps {
	setShowStats: (v: boolean) => void;
	settlements: Settlement[];
	diceHistory: number[];
}

export default function StatsModal({ setShowStats, diceHistory }: StatsModalProps) {
	// Compute dice frequency
	const diceFrequency = diceHistory.reduce<Record<number, number>>((acc, roll) => {
		acc[roll] = (acc[roll] || 0) + 1;
		return acc;
	}, {});

	// Sort dice by most common
	const sortedDice = Object.entries(diceFrequency).sort((a, b) => b[1] - a[1]);
	const maxFreq = sortedDice.length > 0 ? Math.max(...sortedDice.map(([, c]) => c)) : 1;
	const mostCommon = sortedDice.length > 0 ? sortedDice[0][0] : '–';

	return (
		<div className="fixed top-0 left-0 w-full h-dvh bg-black/60 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-gray-200 overflow-y-auto max-h-[90vh]">
				<h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Game Stats</h2>

				<div className="grid grid-cols-2 gap-4 mb-6">
					<div className="bg-gray-100 p-3 rounded-lg text-center">
						<p className="text-gray-700 font-medium">Total Dice Rolls</p>
						<p className="text-xl font-bold">{diceHistory.length}</p>
					</div>
					<div className="bg-gray-100 p-3 rounded-lg text-center">
						<p className="text-gray-700 font-medium">Most Common</p>
						<p className="text-xl font-bold">{mostCommon}</p>
					</div>
				</div>

				<h3 className="font-semibold text-gray-800 mb-2">Dice Rolls Frequency:</h3>
				{sortedDice.length === 0 ? (
					<p className="text-gray-500">No rolls yet</p>
				) : (
					<div className="space-y-1">
						{sortedDice.map(([num, count]) => (
							<div key={num} className="flex items-center gap-2">
								<span className="w-6 font-medium text-gray-700">{num}</span>
								<div className="bg-gray-200 h-4 rounded-full flex-1">
									<div className="bg-indigo-300 h-4 rounded-full" style={{ width: `${(count / maxFreq) * 100}%` }}></div>
								</div>
								<span className="w-8 text-right text-gray-700 font-medium">{count}</span>
							</div>
						))}
					</div>
				)}

				<div className="mt-6 text-center">
					<button onClick={() => setShowStats(false)} className="px-6 py-2 bg-red-100 text-red-900 font-semibold rounded-lg hover:bg-red-200 transition">
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
