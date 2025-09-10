import "./App.css";
import { useState } from "react";

type Resource = "Wood" | "Brick" | "Sheep" | "Wheat" | "Ore";

type Settlement = {
  id: string;
  numbers: number[];
  resources: Resource[];
};

export default function App() {
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [selectedResources, setSelectedResources] = useState<Resource[]>([]);
  const [dice, setDice] = useState<number | null>(null);
  const [showBuilder, setShowBuilder] = useState(true);

  const toggleNumber = (n: number) => {
    setSelectedNumbers((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );
  };

  const toggleResource = (r: Resource) => {
    setSelectedResources((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );
  };

  const addSettlement = () => {
    if (selectedNumbers.length && selectedResources.length) {
      setSettlements([
        ...settlements,
        {
          id: crypto.randomUUID(),
          numbers: selectedNumbers,
          resources: selectedResources,
        },
      ]);
      setSelectedNumbers([]);
      setSelectedResources([]);
    }
  };

  const getResults = () => {
    if (!dice) return {};
    const collected: Record<Resource, number> = {
      Wood: 0,
      Brick: 0,
      Sheep: 0,
      Wheat: 0,
      Ore: 0,
    };

    settlements.forEach((s) => {
      if (s.numbers.includes(dice)) {
        s.resources.forEach((r) => {
          collected[r] += 1;
        });
      }
    });

    return collected;
  };

  const results = getResults();

  return (
    <div className="p-6 max-w-md mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-6 text-center">Catan Helper</h1>

      {/* Toggle Builder */}
      <button
        onClick={() => setShowBuilder((prev) => !prev)}
        className="mb-4 text-sm text-gray-600 hover:text-gray-900 underline"
      >
        {showBuilder ? "Hide Settlement Builder" : "Show Settlement Builder"}
      </button>

      {/* Settlement builder */}
      {showBuilder && (
        <div className="mb-6 bg-gray-100 rounded-xl p-4">
          <h2 className="font-semibold mb-3 text-gray-800">Add Settlement</h2>

          {/* Numbers */}
          <p className="text-sm mb-1 text-gray-600">Numbers:</p>
          <div className="grid grid-cols-6 gap-2 mb-3">
            {Array.from({ length: 11 }, (_, i) => i + 2).map((n) => (
              <button
                key={n}
                onClick={() => toggleNumber(n)}
                className={`px-2 py-1 rounded-lg text-sm border transition ${
                  selectedNumbers.includes(n)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          {/* Resources */}
          <p className="text-sm mb-1 text-gray-600">Resources:</p>
          <div className="flex gap-2 mb-4 flex-wrap">
            {["Wood", "Brick", "Sheep", "Wheat", "Ore"].map((r) => (
              <button
                key={r}
                onClick={() => toggleResource(r as Resource)}
                className={`px-3 py-1 rounded-lg text-sm border transition ${
                  selectedResources.includes(r as Resource)
                    ? "bg-green-500 text-white"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            onClick={addSettlement}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full text-sm font-medium hover:bg-blue-700 transition"
          >
            Save Settlement
          </button>
        </div>
      )}

      {/* Your settlements */}
      {settlements.length > 0 && (
        <div className="mb-6">
          <h2 className="font-semibold mb-2 text-gray-800">Your Settlements</h2>
          <ul className="space-y-1 text-sm text-gray-700 max-h-32 overflow-y-auto">
            {settlements.map((s) => (
              <li
                key={s.id}
                className="bg-gray-50 px-3 py-1 rounded-md border text-gray-800"
              >
                <span className="font-medium">{s.numbers.join(", ")}</span> →{" "}
                {s.resources.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Dice buttons */}
      <div className="mb-6">
        <h2 className="font-semibold text-gray-800">Dice Roll</h2>
        <div className="grid grid-cols-6 gap-2 mt-3">
          {Array.from({ length: 11 }, (_, i) => i + 2).map((n) => (
            <button
              key={n}
              onClick={() => setDice(n)}
              className={`px-3 py-2 rounded-lg border transition text-sm ${
                dice === n
                  ? "bg-red-500 text-white"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {dice && (
        <div className="bg-gray-50 border p-4 rounded-xl">
          <h2 className="font-semibold mb-2 text-gray-800">You Collect:</h2>
          {Object.entries(results).filter(([, count]) => (count as number) > 0)
            .length === 0 ? (
            <p className="text-sm text-gray-600">No resources.</p>
          ) : (
            <ul className="space-y-1 text-sm text-gray-700">
              {Object.entries(results)
                .filter(([, count]) => (count as number) > 0)
                .map(([res, count]) => (
                  <li key={res}>
                    <span className="font-medium">{count as number} x</span>{" "}
                    {res}
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
