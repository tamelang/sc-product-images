import { DeliveryApiSearchResultData } from "../models/delivery-api-search-result-data";

const HOST_ID = "p129105-e1334955";

export type FetchAssetParams = {
    assetId: string;
    seoFileName: string;
    crop?: string;
    width?: string;
    quality?: string;
}


function validateResponse(response: Response) {
    if (!response.ok) {
        throw Error(response.status + " " + response.statusText);
    }

    return response;
}
export function fetchAssets(formValues: FetchAssetParams) {
    const { assetId, seoFileName } = formValues; // Destructure form values
    const url = `https://delivery-${HOST_ID}.adobeaemcloud.com/adobe/dynamicmedia/deliver/urn:aaid:aem:${assetId}/${seoFileName}?t&height=250&quality=100`;

    return fetch(url, {
        method: 'GET'
    })
        .then(validateResponse)
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .catch(error => {
            console.log(error);
        });
}

export async function searchAssets(setDeliveryAPISearchResult: (searchResult: DeliveryApiSearchResultData) => void, formValues: any, imsToken: string) {
    const { brand } = formValues;
    const url = `https://delivery-${HOST_ID}.adobeaemcloud.com/adobe/assets/search`;
    const payload = {
        query: [
            {
                term: {
                    "metadata.assetMetadata.brand": [
                        {brand}
                    ]
                }
            }
        ],
        orderBy: "metadata.repositoryMetadata.repo:size desc,metadata.repositoryMetadata.repo:createDate asc",
        limit: 20
    };

    if (imsToken.length > 0) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-adobe-accept-experimental': '1',
                'X-Api-Key': 'asset_search_service',
                "Authorization": `Bearer ${imsToken}`,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(payload)
        })
            .then(validateResponse)
            .then(response => response.json())
            .then(json => setDeliveryAPISearchResult(json as DeliveryApiSearchResultData))
            .catch(error => {
                alert(`HTTP error! Status: ${error.message}`);
                setDeliveryAPISearchResult({} as DeliveryApiSearchResultData);
            });
    } else {
        alert("You didn't submit IMS Token!")
    }
}
