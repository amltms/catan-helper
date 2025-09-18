import { useState } from 'react';
import { HiTrash, HiBuildingOffice2, HiHome } from 'react-icons/hi2';
import type { Settlement } from '../types';
import { HiChevronDown } from 'react-icons/hi2';

type SettlementsListProps = {
	settlements: Settlement[];
	removeSettlement: (id: string) => void;
	toggleUpgrade: (id: string) => void;
};

export default function SettlementsList({ settlements, removeSettlement, toggleUpgrade }: SettlementsListProps) {
	const [collapsed, setCollapsed] = useState(false);

	if (settlements.length === 0) return null;

	return (
		<div className="mb-6 bg-gray-100 p-4 rounded-xl">
			{/* Header with collapse toggle */}
			<div className="flex justify-between items-center w-full">
				<h2 onClick={() => setCollapsed(!collapsed)} className="flex justify-between w-full items-center font-semibold text-gray-800 text-lg cursor-pointer select-none">
					View Settlements
					<HiChevronDown className={`w-5 h-5 transition-transform duration-200 ${collapsed ? '' : 'rotate-180'}`} />
				</h2>
			</div>

			{/* Collapsible list */}
			{!collapsed && (
				<ul className="space-y-3 mt-2 text-base text-gray-700 overflow-y-auto max-h-60">
					{[...settlements].reverse().map((s) => (
						<li key={s.id} className="bg-white px-4 py-3 rounded-xl border border-gray-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
							{/* Settlement info */}
							<div className="flex items-center gap-2 text-gray-800">
								<div className="flex flex-col">
									<span className="font-medium">{s.hexes.map((h) => `${h.number} → ${h.resource}`).join(', ')}</span>
									<span className="text-sm text-gray-500">{s.multiplier === 1 ? 'Settlement' : 'City'}</span>
								</div>
							</div>

							{/* Action buttons */}
							<div className="flex gap-2 w-full sm:w-auto">
								<button
									onClick={() => removeSettlement(s.id)}
									className="flex-1 sm:flex-none flex items-center justify-center gap-1 text-xs px-3 py-2 rounded-lg bg-red-200 text-red-900 font-medium transition"
								>
									<HiTrash className="text-sm" /> Remove
								</button>
								<button
									onClick={() => toggleUpgrade(s.id)}
									className={`flex-1 sm:flex-none flex items-center justify-center gap-1 text-xs px-3 py-2 rounded-lg font-medium transition ${
										s.multiplier === 1 ? 'bg-green-200 text-green-900' : 'bg-blue-200 text-blue-900'
									}`}
								>
									{s.multiplier === 1 ? (
										<>
											<HiBuildingOffice2 className="text-sm" /> Upgrade
										</>
									) : (
										<>
											<HiHome className="text-sm" /> Downgrade
										</>
									)}
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
