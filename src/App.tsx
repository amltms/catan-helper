import './App.css';
import { useState, useEffect } from 'react';
import SettlementsList from './components/SettlementsList';
import type { Resource, Settlement } from './types';
import SettlementBuilder from './components/SettlementBuilder';
import RobberPosition from './components/RobberPosition';
import InitialResourcesModal from './components/InitialResourcesModal';
import StatsModal from './components/StatsModal';

export default function App() {
	const [settlements, setSettlements] = useState<Settlement[]>([]);
	const [robberHex, setRobberHex] = useState<{ number: number; resource: Resource } | null>(null);
	const [showRobber, setShowRobber] = useState(false);
	const [dice, setDice] = useState<number | null>(null);
	const [initialPopupShown, setInitialPopupShown] = useState(false);
	const [showInitialModal, setShowInitialModal] = useState(false);
	const [showStats, setShowStats] = useState(false);
	const [diceHistory, setDiceHistory] = useState<number[]>([]);
	const [initialResources, setInitialResources] = useState<Record<Resource, number>>({
		Wood: 0,
		Brick: 0,
		Sheep: 0,
		Wheat: 0,
		Rock: 0,
	});

	const removeSettlement = (id: string) => {
		setSettlements(settlements.filter((s) => s.id !== id));
	};

	const toggleUpgrade = (id: string) => {
		setSettlements(settlements.map((s) => (s.id === id ? { ...s, multiplier: s.multiplier === 1 ? 2 : 1 } : s)));
	};

	const getResults = () => {
		if (!dice) return {};
		const collected: Record<Resource, number> = {
			Wood: 0,
			Brick: 0,
			Sheep: 0,
			Wheat: 0,
			Rock: 0,
		};

		settlements.forEach((s) => {
			s.hexes.forEach((h) => {
				if (robberHex && robberHex.number === h.number && robberHex.resource === h.resource) return;
				if (h.number === dice) collected[h.resource] += s.multiplier;
			});
		});

		return collected;
	};

	const computeInitialResources = () => {
		const collected: Record<Resource, number> = {
			Wood: 0,
			Brick: 0,
			Sheep: 0,
			Wheat: 0,
			Rock: 0,
		};
		settlements.forEach((s) => {
			s.hexes.forEach((h) => {
				collected[h.resource] += s.multiplier;
			});
		});
		return collected;
	};

	const handleDiceRoll = (n: number) => {
		setDice(n);
		setDiceHistory((prev) => [...prev, n]);
	};

	useEffect(() => {
		if (settlements.length === 2 && !initialPopupShown) {
			const resources = computeInitialResources();
			setInitialResources(resources);
			setShowInitialModal(true);
			setInitialPopupShown(true);
		}
	}, [settlements, initialPopupShown]);

	const results = getResults();

	return (
		<div className="p-4 max-w-lg mx-auto font-sans relative">
			<h1 className="text-2xl font-bold mb-4 text-center">Catan Helper</h1>
			<div className="mb-6 text-center">
				<button onClick={() => setShowStats(true)} className="px-4 py-2 bg-green-200 text-green-900 rounded-lg font-medium">
					Stats
				</button>
			</div>
			<SettlementBuilder settlements={settlements} setSettlements={setSettlements} />
			<SettlementsList settlements={settlements} removeSettlement={removeSettlement} toggleUpgrade={toggleUpgrade} />
			<RobberPosition settlements={settlements} showRobber={showRobber} setShowRobber={setShowRobber} robberHex={robberHex} setRobberHex={setRobberHex} />

			{/* Dice buttons */}
			<div className="mb-6">
				<h2 className="font-semibold text-gray-800 text-lg">Dice Roll</h2>
				<div className="grid grid-cols-5 sm:grid-cols-6 gap-2 mt-3">
					{Array.from({ length: 11 }, (_, i) => i + 2)
						.filter((n) => n !== 7)
						.map((n) => (
							<button key={n} onClick={() => handleDiceRoll(n)} className={`px-4 py-3 rounded-lg border text-base ${dice === n ? 'bg-blue-200 text-blue-900' : 'bg-gray-50'}`}>
								{n}
							</button>
						))}
				</div>
			</div>

			{/* Results */}
			{dice && (
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
			)}

			{showStats && <StatsModal setShowStats={setShowStats} settlements={settlements} diceHistory={diceHistory} />}
			{showInitialModal && <InitialResourcesModal initialResources={initialResources} setShowInitialModal={setShowInitialModal} />}
		</div>
	);
}
