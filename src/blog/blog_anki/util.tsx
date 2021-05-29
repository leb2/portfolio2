import {FormattedEstimate, SortOption} from "./types";

export const extractValue = (estimate: FormattedEstimate, sortOption: SortOption): number => {
  switch (sortOption) {
    case SortOption.STABILITY: {
      return -Math.log(estimate.stability_estimate)
    }
    case SortOption.BASE_FAIL_RATE: {
      return estimate.base_fail_rate * (1 - estimate.base_success_rate)
    }
    case SortOption.PROBABILITY: {
      return -estimate.probability;
    }
    case SortOption.TOTAL_REVIEW_TIME: {
      return estimate.total_review_time_ms;
    }
    case SortOption.NUMBER_OF_REVIEWS: {
      return estimate.review_history.length;
    }
    case SortOption.AVERAGE_REVIEW_TIME: {
      return estimate.total_review_time_ms / estimate.review_history.length;
    }
  }
  return 0
}


export const extractValueRaw = (estimate: FormattedEstimate, sortOption: SortOption): number => {
  switch (sortOption) {
    case SortOption.STABILITY: {
      return Math.log(estimate.stability_estimate)
    }
    case SortOption.BASE_FAIL_RATE: {
      return estimate.base_fail_rate * (1 - estimate.base_success_rate)
    }
    case SortOption.PROBABILITY: {
      return estimate.probability;
    }
    case SortOption.TOTAL_REVIEW_TIME: {
      return estimate.total_review_time_ms / 1000 / 60;
    }
    case SortOption.NUMBER_OF_REVIEWS: {
      return estimate.review_history.length;
    }
    case SortOption.AVERAGE_REVIEW_TIME: {
      return estimate.total_review_time_ms / estimate.review_history.length;
    }
  }
  return 0
}
