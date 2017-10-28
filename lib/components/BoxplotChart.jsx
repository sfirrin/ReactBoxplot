import React from 'react'
import styled from 'styled-components'
import LabelledBoxplot from './LabelledBoxplot'

const Line = styled.div`
    position: absolute;
    left: ${({ leftMargin }) => leftMargin}px;
    border-left: 1px dotted #888888;
    height: ${({ height }) => height}px;
    color: #888888;
    font-size: 14px;
`

const LineLabel = styled.div`
    padding-left: 5px;
`

class BoxplotChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            containerWidth: 400,
            containerHeight: 0
        }
    }

    componentDidMount() {
        this.setState({
            containerWidth: this.containerNode.clientWidth,
            containerHeight: this.containerNode.clientHeight
        })
        // console.log(
        //     this.containerNode.clientHeight,
        //     this.containerNode.scrollHeight
        // )
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
                    height={
                        30 +
                        this.props.statsToPlot.length *
                            (this.props.boxHeight + 10)
                    }
                >
                    <LineLabel>{lineValue}</LineLabel>
                </Line>
            )
        }
        return lineElements
    }

    render() {
        console.log(this)
        const labelWidths =
            this.state.containerWidth * this.props.labelProportion
        return (
            <div
                style={{ width: '100%', clear: 'both' }}
                className="boxplot-chart"
            >
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
                    {this.props.statsToPlot.map((itemProps, index) => {
                        return (
                            <LabelledBoxplot
                                {...itemProps}
                                labelWidth={labelWidths}
                                width={this.state.containerWidth}
                                height={this.props.boxHeight}
                                min={this.props.min}
                                max={this.props.max}
                                orientation={'horizontal'}
                                index={
                                    this.props.showIndices ? index + 1 : null
                                }
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
}

BoxplotChart.defaultProps = {
    labelProportion: 0.2,
    showIndices: true
}

export default BoxplotChart
