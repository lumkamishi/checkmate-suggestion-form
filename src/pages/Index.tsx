import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useGoogleSheets } from "@/hooks/useGoogleSheets";
import SuggestionList from "@/components/SuggestionList";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();
  const { checkMatch, isLoading } = useGoogleSheets();

  const handleCheck = async () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Error",
        description: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await checkMatch(searchTerm);
      if (result.exact) {
        toast({
          title: "Match Found!",
          description: `Exact match: ${result.exact}`,
        });
        setSuggestions([]);
      } else if (result.suggestions.length > 0) {
        setSuggestions(result.suggestions);
      } else {
        toast({
          title: "No Match",
          description: "No matches found in the sheet",
          variant: "destructive",
        });
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error checking match:", error);
      toast({
        title: "Error",
        description: "Failed to check for matches",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0f1] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-[#2271b1]">Check Suggestions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Enter your search term..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-[#2271b1] focus:ring-[#2271b1]"
            />
          </div>
          <Button
            onClick={handleCheck}
            className="w-full bg-[#2271b1] hover:bg-[#135e96]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              "Check"
            )}
          </Button>
          {suggestions.length > 0 && (
            <SuggestionList
              suggestions={suggestions}
              onSelect={(suggestion) => {
                setSearchTerm(suggestion);
                setSuggestions([]);
                toast({
                  title: "Suggestion Selected",
                  description: `Selected: ${suggestion}`,
                });
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;