import { ResponsiveRadialBar } from '@nivo/radial-bar'

const data = [
  {
    "id": "Proje Sahibi",
    "data": [
      {
        "x": "Oran",
        "y": 60
      }
    ]
  },
  {
    "id": "Yatırımcı",
    "data": [
      {
        "x": "Oran",
        "y": 25
      }
    ]
  },
  {
    "id": "Admin",
    "data": [
      {
        "x": "Oran",
        "y": 15
      }
    ]
  }
]

export default function UserTypeRadialChart() {
  return (
    <div style={{ height: 350 }}>
      <ResponsiveRadialBar
        data={data}
        keys={['y']}
        indexBy="id"
        maxValue={100}
        margin={{ top: 40, right: 120, bottom: 40, left: 120 }}
        innerRadius={0.6}
        padAngle={0.4}
        cornerRadius={10}
        colors={{ scheme: 'set2' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.3 ] ] }}
        radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendPosition: 'middle', legendOffset: 32 }}
        circularAxisOuter={{ tickSize: 10, tickPadding: 5, tickRotation: 0, legend: '', legendPosition: 'middle', legendOffset: 32 }}
        legends={[
          {
            anchor: 'right',
            direction: 'column',
            translateX: 140,
            itemWidth: 100,
            itemHeight: 20,
            itemsSpacing: 10,
            symbolSize: 20,
            symbolShape: 'circle',
          }
        ]}
      />
    </div>
  )
}
