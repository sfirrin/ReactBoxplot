import React from 'react'
import styled from 'styled-components'
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

const Line = styled.div`
    position: absolute;
    left: ${({ leftMargin }) => leftMargin}px;
    border-left: 1px dotted #cccccc;
    height: ${({ height }) => height}px;
`

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
            let lineValue = this.props.min;
            lineValue < this.props.max;
            lineValue += lineIncrements
        ) {
            const incrementProportion =
                (lineValue - this.props.min) / (this.props.max - this.props.min)
            const labelWidths =
                this.state.containerWidth * this.props.labelProportion
            const leftMargin =
                labelWidths +
                incrementProportion * (this.state.containerWidth - labelWidths)
            lineElements.push(
                <Line
                    leftMargin={leftMargin}
                    height={this.state.containerHeight}
                >
                    {lineValue}
                </Line>
                // <div
                //     className="value-line"
                //     style={{
                //         position: 'absolute',
                //         left: leftMargin,
                //         borderLeft: '1px dotted #cccccc',
                //         height: this.state.containerHeight
                //     }}
                // >
                //     {lineValue}
                // </div>
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
                    {this.makeLines()}
                </div>
                <div
                    className="boxplots"
                    ref={element => (this.containerNode = element)}
                    style={{ paddingTop: 30 }}
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
