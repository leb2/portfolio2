import {FormattedEstimate, SortOption} from "./types";

export const extractValue = (estimate: FormattedEstimate, sortOption: SortOption): number => {
  if (sortOption === SortOption.STABILITY) {
    return -Math.log(estimate.stability_estimate);
  }
  if (sortOption === SortOption.BASE_FAIL_RATE) {
    return estimate.base_fail_rate * (1 - estimate.base_success_rate);
  }
  if (sortOption === SortOption.PROBABILITY) {
    return -estimate.probability;
  }
  if (sortOption === SortOption.TOTAL_REVIEW_TIME) {
    return estimate.total_review_time_ms;
  }
  if (sortOption === SortOption.NUMBER_OF_REVIEWS) {
    return estimate.review_history.length;
  }
  if (sortOption === SortOption.AVERAGE_REVIEW_TIME) {
    return estimate.total_review_time_ms / estimate.review_history.length;
  }
  return 0
}
