export type Review = {
  passed: number
  label: number
  prev_log_interval: number
  next_interval: number
  review_time: number

  stability_estimate: number | null
  base_fail_rate_estimate: number | null
}

export type FormattedEstimate = {
  word: string
  definition: string,
  stability_estimate: number
  base_fail_rate: number
  base_success_rate: number
  probability: number
  final_review: Review
  total_review_time_ms: number
  predicted_interval_seconds: number
  review_history: boolean[]
}

export enum SortOption {
  STABILITY = 'STABILITY',
  BASE_FAIL_RATE = 'BASE_FAIL_RATE',
  TOTAL_REVIEW_TIME = 'TOTAL_REVIEW_TIME',
  NUMBER_OF_REVIEWS = 'NUMBER_OF_REVIEW',
  AVERAGE_REVIEW_TIME = 'AVERAGE_REVIEW_TIME',
  PROBABILITY = 'PROBABILITY'
}


export const SORT_OPTIONS = [
  {
    value: SortOption.STABILITY,
    label: 'Stability (Time to Decay)',
  },
  {
    value: SortOption.TOTAL_REVIEW_TIME,
    label: 'Total Review Time',
  },
  {
    value: SortOption.NUMBER_OF_REVIEWS,
    label: 'Number of Reviews',
  },
  {
    value: SortOption.AVERAGE_REVIEW_TIME,
    label: 'Average Review Time',
  },
  {
    value: SortOption.PROBABILITY,
    label: 'Probability of Recall',
  },
  {
    value: SortOption.BASE_FAIL_RATE,
    label: 'Base Fail Rate',
  },
]
