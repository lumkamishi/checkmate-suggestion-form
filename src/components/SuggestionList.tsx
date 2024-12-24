import { Card } from "@/components/ui/card";

interface SuggestionListProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

const SuggestionList = ({ suggestions, onSelect }: SuggestionListProps) => {
  return (
    <Card className="mt-4 p-2">
      <h3 className="text-sm font-medium mb-2 text-[#2271b1]">Suggestions:</h3>
      <ul className="space-y-1">
        {suggestions.slice(0, 5).map((suggestion, index) => (
          <li
            key={index}
            onClick={() => onSelect(suggestion)}
            className="p-2 hover:bg-gray-100 rounded cursor-pointer text-sm transition-colors"
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default SuggestionList;