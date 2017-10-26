import React from 'react'
import LabelledBoxplot from './LabelledBoxplot'

class ChartLines extends React.Component {
    render() {
        return (
            <div>
                <svg>
                    <line
                        x1={0}
                        x2={0}
                        y1={0}
                        y2={1000}
                        strokeWidth={1}
                        stroke={'#000000'}
                    />
                </svg>
            </div>
        )
    }
}

class BoxplotChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            containerWidth: 400,
            containerHeight: 400
        }
    }

    componentDidMount() {
        this.setState({
            containerWidth: this.containerNode.clientWidth,
            containerHeight: this.containerNode.clientHeight
        })
        console.log(
            this.containerNode.clientHeight,
            this.containerNode.scrollHeight
        )
    }

    makeLines() {
        let lineIncrements = 10
        let lineElements = []
        for (
            let lineValue = 0;
            lineValue < this.props.max;
            lineValue += lineIncrements
        ) {
            const incrementProportion = lineValue / this.props.max
            const labelWidths =
                this.state.containerWidth * this.props.labelProportion
            const leftMargin =
                labelWidths +
                incrementProportion * (this.state.containerWidth - labelWidths)
            lineElements.push(
                <line
                    y1={0}
                    y2={this.state.containerHeight}
                    x1={leftMargin}
                    x2={leftMargin}
                    stroke={'#cccccc'}
                    strokeWidth={1}
                    key={lineValue}
                />
            )
        }
        return lineElements
    }

    render() {
        console.log(this)
        const labelWidths =
            this.state.containerWidth * this.props.labelProportion
        return (
            <div style={{ width: '100%' }}>
                <div
                    className="lines"
                    style={{
                        zIndex: -1,
                        position: 'absolute',
                        height:
                            this.props.statsToPlot.length * this.props.boxHeight
                    }}
                >
                    <svg
                        style={{
                            width: this.state.containerWidth,
                            height:
                                this.props.statsToPlot.length *
                                this.props.boxHeight
                        }}
                    >
                        {this.makeLines()}
                    </svg>
                </div>
                <div
                    className="boxplots"
                    ref={element => (this.containerNode = element)}
                >
                    {this.props.statsToPlot.map(itemProps => {
                        return (
                            <LabelledBoxplot
                                {...itemProps}
                                labelWidth={labelWidths}
                                width={this.state.containerWidth}
                                height={this.props.boxHeight}
                                min={this.props.min}
                                max={this.props.max}
                                orientation={'horizontal'}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
}

BoxplotChart.defaultProps = {
    labelProportion: 0.2
}

export default BoxplotChart
