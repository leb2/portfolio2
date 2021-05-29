import {useCallback, useEffect, useMemo, useState} from "react";
import { Popover, Whisper, Button } from 'rsuite';
import ESTIMATES_UNTYPED from './estimates.json'
import {formatPercent, secondsToString} from "../../shared/util";
import {FormattedEstimate, SORT_OPTIONS, SortOption} from "./types";
import classNames from "classnames";
import { interpolateHcl } from 'd3';
import moment from 'moment';
import { SelectPicker } from 'rsuite';
import {extractValue} from "./util";


const ESTIMATES = ESTIMATES_UNTYPED as FormattedEstimate[]
const LANGUAGE_OPTIONS = [{ label: 'Japanese', value: 'japanese' }, { label: 'English', value: 'english'}]


const interpolate = interpolateHcl("rgb(235, 30, 30)", "rgb(30, 235, 30)")

const interpolateColor = (val: number, min: number, max: number) => {
  const percent = (val - min) / (max - min);
  const green = "rgb(50,255,50)"
  const red = "rgb(255,50,50)"
  const [r1, g1, b1] = green.substring(4, green.length - 1).split(',').map(val => parseInt(val))
  const [r2, g2, b2] = red.substring(4, red.length - 1).split(',').map(val => parseInt(val))
  const r3 = r1 * percent + (1 - percent) * r2
  const g3 = g1 * percent + (1 - percent) * g2
  const b3 = b1 * percent + (1 - percent) * b2
  const darkText = Math.sqrt(.241 * r3 * r3 + .691 * g3 * g3 + .068 * b3 * b3 ) > 110
  const color = interpolate(percent)
  return { color, darkText }
}


const ReviewHistoryDots = (props: { reviews: boolean[] }) => {
  const { reviews } = props;
  const numPassed = reviews.filter(review => review).length
  const passRate = numPassed / reviews.length
  return  (
    <div className="review-history-dots mt-2">
      <div>
        <strong>Review history</strong> (Passed { formatPercent(passRate) }% of {reviews.length} reviews)
      </div>
      <div className="dots">
        {
          props.reviews.map((review, i) => (
            <div key={i} className={classNames("dot", review ? "passed" : "failed")} />
          ))
        }
      </div>
    </div>
  )

}

const EstimatePopover = ({ estimate, ...props }: { estimate: FormattedEstimate }) => {
  return (
    <Popover title={`${estimate.word} - ${estimate.definition}`} {...props}>
      <div>
        I currently have a <strong>{formatPercent(estimate.probability)}%</strong> chance of remembering this word.
      </div>
      <div>
        This card has a <strong>{formatPercent(estimate.base_fail_rate * (1 - estimate.base_success_rate))}%</strong> base fail rate.
      </div>
      <div>
        The odds of remembering this word will decay by <strong>10%</strong> every <strong>{moment.duration(estimate.predicted_interval_seconds * 1000).humanize()}</strong>
      </div>
      <div>
        I have spent a total of <strong>{ moment.duration(estimate.total_review_time_ms).humanize() }</strong> learning this word
      </div>
      <div>
        I spend an average of
        <strong> { moment.duration(estimate.total_review_time_ms / estimate.review_history.length).seconds() } seconds</strong> per review of this word
      </div>
      <ReviewHistoryDots reviews={estimate.review_history} />
    </Popover>
  );
};


const AnkiViz = () => {
  const [selectedSortBy, setSelectedSortBy] = useState<SortOption>(SortOption.STABILITY);
  const [selectedColorBy, setSelectedColorBy] = useState<SortOption>(SortOption.PROBABILITY);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('japanese');
  const [useAllWords, setUseAllWords] = useState<boolean>(false);
  const toggleUseAllWords = useCallback(() => setUseAllWords(!useAllWords), [useAllWords, setUseAllWords])
  const estimates: FormattedEstimate[] = useMemo(() => {
    if (useAllWords) {
      return ESTIMATES
    }
    return ESTIMATES.filter((val, i) => i % 10 === 0)
  }, [useAllWords])

  const sortedEstimates = useMemo(() => {
    const t = estimates.sort((a, b) => extractValue(b, selectedSortBy) - extractValue(a, selectedSortBy))
    const totalTime = estimates.reduce((a, b) => a + b.total_review_time_ms, 0)

    let timeSofar = 0
    for (let i = 0 ; i < t.length; i++) {
      const percent = i / t.length;
      timeSofar += estimates[i].total_review_time_ms
      const timePercentJ = timeSofar / totalTime
      if (timePercentJ + percent > 1) {
        console.log("percent " + percent)
        console.log("time percent, " + timePercentJ )
        break
      }
    }
    return t
  }, [selectedSortBy, estimates]);


  const maxPercent = Math.max(...estimates.map(estimate => -extractValue(estimate, selectedColorBy)))
  const minPercent = Math.min(...estimates.map(estimate => -extractValue(estimate, selectedColorBy)))

  return (
    <div className="anki-viz">
      <div className="d-flex align-items-end flex-wrap">
        <div className="sort-select-container">
          <div>Sort By:</div>
          <SelectPicker
            data={SORT_OPTIONS}
            onChange={setSelectedSortBy}
            value={selectedSortBy}
            cleanable={false}
          />
        </div>
        <div className="sort-select-container">
          <div>Color By:</div>
          <SelectPicker
            data={SORT_OPTIONS}
            onChange={setSelectedColorBy}
            value={selectedColorBy}
            cleanable={false}
          />
        </div>
        <div className="sort-select-container">
          <div>Language</div>
          <SelectPicker
            data={LANGUAGE_OPTIONS}
            onChange={setSelectedLanguage}
            value={selectedLanguage}
            cleanable={false}
          />
        </div>
        <div className="sort-select-container">
          <Button
            appearance="ghost"
            onClick={toggleUseAllWords}
          >
            { useAllWords ? 'Show Fewer Words' : 'Show All Words'}
          </Button>
        </div>
      </div>

      <div className="words">
        {
          sortedEstimates.map(estimate => {
            const { color, darkText } = interpolateColor(-extractValue(estimate, selectedColorBy), minPercent, maxPercent)
            return (
              <Whisper
                trigger="click"
                placement="auto"
                speaker={<EstimatePopover estimate={estimate} />}
              >
                <div
                  className={classNames("word", darkText ? 'dark-text' : 'light-text')}
                  style={{
                    background: color,
                  }}
                >
                  { selectedLanguage === 'english' ? estimate.definition : estimate.word }
                </div>
              </Whisper>
            );
          })
        }
      </div>
      <div className="d-flex align-items-center num-showing">
        Showing { sortedEstimates.length } of { ESTIMATES.length } words.
      </div>
    </div>
  )
}


export default AnkiViz
