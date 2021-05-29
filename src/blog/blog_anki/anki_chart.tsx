import {useCallback, useEffect, useMemo, useState} from "react";
import ESTIMATES_UNTYPED from './estimates.json'
import {FormattedEstimate, SORT_OPTIONS, SortOption, sortOptionToText} from "./types";
import {Bubble, Scatter} from "react-chartjs-2";
import {extractValue, extractValueRaw} from "./util";
import {Button, SelectPicker} from "rsuite";


const ESTIMATES = ESTIMATES_UNTYPED as FormattedEstimate[]


const AnkiChart = () => {
  const [selectedYAxis, setSelectedYAxis] = useState<SortOption>(SortOption.PROBABILITY);
  const [selectedXAxis, setSelectedXAxis] = useState<SortOption>(SortOption.STABILITY);
  const [selectedSizeAxis, setSelectedSizeAxis] = useState<SortOption>(SortOption.NUMBER_OF_REVIEWS);

  const data = useMemo(() => {
    const maxSize = Math.max(...ESTIMATES.map(estimate => extractValueRaw(estimate, selectedSizeAxis)))
    const minSize = Math.min(...ESTIMATES.map(estimate => extractValueRaw(estimate, selectedSizeAxis)))
    const filteredEstimates = ESTIMATES.filter((estimate, i) => i % 2 === 0);
    const posOptions = Array.from(new Set(filteredEstimates.map(estimate => estimate.pos)))
      .filter(pos => !['None', 'Interjection', 'Pronoun'].includes(pos))
    const colors = [
      'rgba(206,0,24,0.37)',
      'rgba(206,0,172,0.37)',
      'rgba(7,0,206,0.37)',
      'rgba(0,158,206,0.37)',
      'rgba(0,206,141,0.37)',
      'rgba(127,206,0,0.37)',
      'rgba(206,196,0,0.37)',
      'rgba(206,31,0,0.37)',
    ]

    const datasets = posOptions.map((pos, i) => ({
      data: filteredEstimates.filter(estimate => estimate.pos === pos).map(estimate => ({
        x: extractValueRaw(estimate, selectedXAxis),
        y: extractValueRaw(estimate, selectedYAxis),
        r: !selectedSizeAxis ? 4 : ((extractValueRaw(estimate, selectedSizeAxis) - minSize) / (maxSize - minSize)) * 10 + 1,
        label: estimate.word,
      })),
      backgroundColor: colors[i % colors.length],
      borderWidth: 0,
      label: pos,
    }))
    return  {
      datasets,
    }
  }, [selectedXAxis, selectedYAxis, selectedSizeAxis])


  const options = useMemo(() => ({
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        title: {
          text: sortOptionToText(selectedXAxis),
          display: true,
        }
      },
      y: {
        title: {
          text: sortOptionToText(selectedYAxis),
          display: true,
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return context.raw.label
          }
        },
      },
    }
  }), [selectedXAxis, selectedYAxis])

  return (
    <div className="anki-chart">
      <div className="d-flex align-items-end flex-wrap">
        <div className="sort-select-container">
          <div>Y Axis</div>
          <SelectPicker
            data={SORT_OPTIONS}
            onChange={setSelectedYAxis}
            value={selectedYAxis}
            cleanable={false}
          />
        </div>
        <div className="sort-select-container">
          <div>X Axis</div>
          <SelectPicker
            data={SORT_OPTIONS}
            onChange={setSelectedXAxis}
            value={selectedXAxis}
            cleanable={false}
          />
        </div>
        <div className="sort-select-container">
          <div>Size</div>
          <SelectPicker
            data={SORT_OPTIONS}
            onChange={setSelectedSizeAxis}
            value={selectedSizeAxis}
            cleanable
          />
        </div>
      </div>
      <div className="bubble-container">
        <Bubble
          data={data}
          options={options}
          width={100}
          type={"bubble"}
        />
      </div>
    </div>
  )
}


export default AnkiChart
