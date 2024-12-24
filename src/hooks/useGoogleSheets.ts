import { useState } from "react";
import { google } from "googleapis";
import { authenticate } from "@google-cloud/local-auth";

interface MatchResult {
  exact: string | null;
  suggestions: string[];
}

export const useGoogleSheets = () => {
  const [isLoading, setIsLoading] = useState(false);

  const checkMatch = async (searchTerm: string): Promise<MatchResult> => {
    setIsLoading(true);
    console.log("Checking match for:", searchTerm);

    try {
      // For development, using mock data
      // In production, replace with actual Google Sheets API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

      const mockData = [
        "WordPress",
        "WordPress Plugin",
        "WordPress Theme",
        "WordPress Development",
        "WordPress Security",
        "WordPress Hosting",
      ];

      const exact = mockData.find(
        (item) => item.toLowerCase() === searchTerm.toLowerCase()
      );

      if (exact) {
        return { exact, suggestions: [] };
      }

      const suggestions = mockData.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return { exact: null, suggestions };
    } catch (error) {
      console.error("Error in checkMatch:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { checkMatch, isLoading };
};