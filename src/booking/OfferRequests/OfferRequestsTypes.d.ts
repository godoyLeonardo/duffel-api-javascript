import * as DuffelAPITypes from 'types';

export interface PaymentRequirements {
  /**
   *  The ISO 8601 datetime by which you must pay for this order.
   * At this time, if still unpaid, the reserved space on the flight(s)
   * will be released and you will have to create a new order.
   * This will be null only for orders where `awaiting_payment` is `false`.
   */
  payment_required_by?: string | null
  /**
   *  The ISO 8601 datetime at which the price associated
   * with the order will no longer be guaranteed by the airline
   * and the order will need to be repriced before payment.
   * This can be null when there is no price guarantee.
   */
  price_guarantee_expires_at?: string | null
  /**
   * Whether immediate payment is required or not
   */
  requires_instant_payment: boolean
}

export namespace Offers {
  export interface DestinationOrOriginProp {
    /**
     * The airports associated to a city.
     * This will only be provided where the `type` is `city`.
     */
    airports?: DuffelAPITypes.Airport[]
    city?: DuffelAPITypes.City
    city_name?: string
    iata_city_code?: string
    iata_code: string
    iata_country_code: string
    icao_code?: string
    id: string
    latitude?: number
    longitude?: number
    name: string
    time_zone?: string
    type: DuffelAPITypes.PlaceType
  }

  export interface OfferRequestSlice {
    /**
     * The ISO 8601 date on which the passengers want to depart
     */
    departure_date: string
    /**
     * The city or airport the passengers want to travel to
     */
    destination: DestinationOrOriginProp | string
    /**
     * The city or airport the passengers want to depart from
     */
    origin: DestinationOrOriginProp | string
    origin_type: DuffelAPITypes.PlaceType
    destination_type: DuffelAPITypes.PlaceType
  }

  /**
   * The passengers who want to travel. A passenger will have only a type or an age.
   */
  export interface OfferRequestPassenger {
    /**
     * The age of the passenger on the `departure_date` of the final slice.
     */
    age?: number

    /**
     * The type of the passenger.
     */
    type?: 'adult'

    /**
     * The identifier for the passenger, unique within this Offer Request and across all Offer Requests.
     * This ID will be generated by Duffel unless you had optionally provided one.
     * Optionally providing one has been deprecated.
     */
    id: string
  }

  export interface OfferRequest {
    /**
     * The slices that make up this offer request.
     * One-way journeys can be expressed using one slice, whereas return trips will need two.
     * @link https://duffel.com/docs/api/overview/key-principles
     */
    slices: OfferRequestSlice[]
    cabin_class?: DuffelAPITypes.CabinClass
    created_at: string
    id: string
    live_mode: boolean
    offers?: Omit<Offer, 'available_services'>[]
    passengers: OfferRequestPassenger[]
  }

  export interface CreateOfferRequest {
    cabin_class: DuffelAPITypes.CabinClass
    passengers: Omit<OfferRequestPassenger, 'id'>[]
    slices: Omit<OfferRequestSlice, 'origin_type' | 'destination_type'>[]
  }

  export interface CreateOfferQueryParameters {
    /**
     * When set to `true`, the offer request resource returned will include all the offers returned by the airlines.
     * If set to `false`, the offer request resource won't include any offers.
     * To retrieve the associated `offers` later, use the [List Offers](https://duffel.com/docs/api/offers/get-offers) endpoint, specifying the `offer_request_id`.
     * You should use this option if you want to take advantage of the pagination, sorting and filtering that the [List Offers](https://duffel.com/docs/api/offers/get-offers) endpoint provides.
     */
    return_offers: boolean
  }
}
