# react-block-visualizer

React component for visualizing blocks of a blockchain.

## Installation

```
npm install react-block-visualizer
```

## Usage

```tsx
import { ReactBlockVisualizer } from 'react-block-visualizer'

export const blocks_submitted = [
  ['hash7', 'hash6'],
  ['hash6a', 'hash5a'],
  ['hash5a', 'hash4'],
  ['hash6', 'hash5'],
  ['hash5', 'hash4'],
  ['hash4', 'hash3'],
  ['hash3', 'hash2'],
  ['hash2', 'hash1'],
]

export const blocks_confirmed = ['hash1', 'hash2', 'hash3', 'hash4']

function App() {
  return (
    <div className="App">
      <ReactBlockVisualizer
        submittedBlocks={blocks_submitted} /* Required */
        confirmedBlocks={blocks_confirmed} /* Optional */
      />
    </div>
  )
}

export default App
```

## Props

| Props           | Type       | Description                                                |
| --------------- | ---------- | ---------------------------------------------------------- |
| submittedBlocks | string[][] | List of blocks submitted                                   |
| confirmedBlocks | string[]   | List of blocks confirmed (will be visible as green blocks) |
