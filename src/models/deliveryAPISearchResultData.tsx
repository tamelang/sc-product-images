export type DeliveryAPISearchResultData = {
    hits: SearchResults
}

type SearchResults = {
    results: AssetData[];
    search_metadata: SearchMetadata;
}

type SearchMetadata = {
    count: number;
}

export type AssetData = {
    assetId: string;
    assetMetadata: any;
}
