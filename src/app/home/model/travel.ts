export interface Travel {
  "id": number,
  "creationDate": string,
  "lastStatusTravel": number,
  "statusEquipment"?: string,
  "travelEquipmentDTOs": [
    {
      "id": number,
      "operationDate": string,
      "observation": string,
      "cadete": {
        "id": number,
        "email"?: string,
        "fullName": string,
        "address"?: string,
        "cellPhone"?: number
      },
      "operator": {
        "id": number,
        "email": string,
        "fullName": string,
        "address": string,
        "cellPhone": string
      },
      "equipment": {
        "id": number,
        "mark": string,
        "model": string,
        "failure": string,
        "clientId": number,
        "cliente": {
          "id": number,
          "email": string,
          "fullName": string,
          "address": string,
          "cellPhone": string
        }
      },
      "statusTravel": number
    }
  ]
}