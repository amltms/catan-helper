import { HiChevronDown } from 'react-icons/hi2';
import { useState } from 'react';
import type { Hex, Resource, Settlement } from '../types';
import { resourceStyles } from '../constants';

type Props = {
	settlements: Settlement[];
	setSettlements: React.Dispatch<React.SetStateAction<Settlement[]>>;
};

export default function SettlementBuilder({ settlements, setSettlements }: Props) {
	const [currentHexes, setCurrentHexes] = useState<Hex[]>([]);
	const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
	const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
	const [showBuilder, setShowBuilder] = useState(true);

	const addHex = () => {
		if (selectedNumber && selectedResource && currentHexes.length < 3) {
			setCurrentHexes([...currentHexes, { number: selectedNumber, resource: selectedResource }]);
			setSelectedNumber(null);
			setSelectedResource(null);
		}
	};

	const saveSettlement = () => {
		if (currentHexes.length > 0) {
			setSettlements([...settlements, { id: crypto.randomUUID(), hexes: currentHexes, multiplier: 1 }]);
			setCurrentHexes([]);
		}
	};

	return (
		<div className="mb-6 bg-gray-100 rounded-xl p-4">
			{/* Collapsible title */}
			<h2 onClick={() => setShowBuilder((prev) => !prev)} className="flex justify-between items-center font-semibold text-gray-800 text-lg cursor-pointer select-none">
				Add Settlement
				<HiChevronDown className={`w-5 h-5 transition-transform duration-200 ${showBuilder ? 'rotate-180' : ''}`} />
			</h2>

			{/* Content only if open */}
			{showBuilder && (
				<>
					{/* Numbers */}
					<p className="text-sm mt-3 mb-1 text-gray-600">Pick a Number:</p>
					<div className="grid grid-cols-5 sm:grid-cols-6 gap-2 mb-3">
						{Array.from({ length: 11 }, (_, i) => i + 2)
							.filter((n) => n !== 7)
							.map((n) => (
								<button
									key={n}
									onClick={() => setSelectedNumber(n)}
									className={`px-3 py-2 rounded-lg text-base border ${selectedNumber === n ? 'bg-blue-200 text-blue-900' : 'bg-gray-50'}`}
								>
									{n}
								</button>
							))}
					</div>

					{/* Resources */}
					<p className="text-sm mb-1 text-gray-600">Pick a Resource:</p>
					<div className="flex flex-wrap gap-2 mb-4">
						{(['Wood', 'Brick', 'Sheep', 'Wheat', 'Rock'] as Resource[]).map((r) => {
							const inactiveStyles = 'bg-gray-50 hover:bg-gray-100 text-gray-700';

							return (
								<button
									key={r}
									onClick={() => setSelectedResource(r)}
									className={`flex-1 min-w-[30%] px-3 py-2 rounded-lg text-base font-medium border transition ${selectedResource === r ? resourceStyles[r] : inactiveStyles}`}
								>
									{r}
								</button>
							);
						})}
					</div>

					{/* Show current hexes */}
					<p className="text-sm mb-1 text-gray-600">Selected Resources</p>
					<div className="flex justify-between items-center gap-2 mb-3">
						{Array.from({ length: 3 }).map((_, i) => {
							const hex = currentHexes[i];
							const style = hex ? resourceStyles[hex.resource] : '';
							return (
								<div
									key={i}
									className={`flex-1 h-12 flex items-center justify-center rounded-lg text-base font-medium transition ${
										hex ? `${style} border border-gray-300` : 'bg-gray-200 text-gray-400 border border-dashed border-gray-300'
									}`}
								>
									{hex ? (
										<span>
											{hex.number} → {hex.resource}
										</span>
									) : (
										<span>Empty</span>
									)}
								</div>
							);
						})}
					</div>

					<button
						onClick={addHex}
						disabled={!selectedNumber || !selectedResource || currentHexes.length >= 3}
						className="bg-green-200 text-green-900 px-4 py-3 rounded-lg w-full text-base font-medium mb-3 disabled:bg-gray-200 disabled:text-gray-500"
					>
						Add Hex {currentHexes.length < 3 ? `(${currentHexes.length}/3)` : '(Max)'}
					</button>
					<button
						onClick={saveSettlement}
						disabled={currentHexes.length === 0}
						className="bg-blue-200 text-blue-950 px-4 py-3 rounded-lg w-full text-base font-medium disabled:bg-gray-200 disabled:text-gray-500"
					>
						Save Settlement
					</button>
				</>
			)}
		</div>
	);
}
