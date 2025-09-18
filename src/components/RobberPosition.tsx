import type { Hex, Settlement } from '../types';
import { HiChevronDown } from 'react-icons/hi2';

type Props = {
	settlements: Settlement[];
	showRobber: boolean;
	setShowRobber: React.Dispatch<React.SetStateAction<boolean>>;
	robberHex: Hex | null;
	setRobberHex: React.Dispatch<React.SetStateAction<Hex | null>>;
};

export default function RobberPosition({ showRobber, setShowRobber, robberHex, setRobberHex, settlements }: Props) {
	return (
		<div className="mb-6 bg-gray-100 rounded-xl p-4">
			{/* Section title */}
			<h2 onClick={() => setShowRobber((prev) => !prev)} className="flex justify-between items-center font-semibold text-gray-800 text-lg cursor-pointer select-none">
				Robber Position
				<HiChevronDown className={`w-5 h-5 transition-transform duration-200 ${showRobber ? 'rotate-180' : ''}`} />
			</h2>

			{/* Collapsible content */}
			{showRobber && (
				<div className="mt-3 space-y-3">
					{/* Hex buttons */}
					<div className="flex flex-wrap gap-2">
						{settlements
							.flatMap((s) => s.hexes)
							.map((h, i) => {
								const isActive = robberHex?.number === h.number && robberHex?.resource === h.resource;
								return (
									<button
										key={i}
										onClick={() => (isActive ? setRobberHex(null) : setRobberHex(h))}
										className={`px-3 py-2 rounded-lg border text-sm transition-colors ${isActive ? 'bg-red-200 text-red-900 border-red-900' : 'bg-gray-50 hover:bg-gray-200'}`}
									>
										{h.number} → {h.resource}
									</button>
								);
							})}
					</div>
				</div>
			)}
		</div>
	);
}
