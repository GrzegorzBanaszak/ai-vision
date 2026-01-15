interface AzureAnalysisResponse {
  captionResult: {
    text: string;
    confidence: number;
  };
  metadata: {
    width: number;
    height: number;
  };
}

export default AzureAnalysisResponse;
