import React from 'react'
import Boxplot from './Boxplot'
import styled from 'styled-components'

const BoxplotDiv = styled.div`
    display: flex;
    padding: 5px;
    cursor: pointer;
    &:hover {
        background: rgba(240, 240, 240, 1);
        z-index: -1;
    }
`

class LabelledBoxplot extends React.Component {
    render() {
        const labelStyle = {
            width: this.props.labelWidth + 'px'
        }
        // console.log(labelStyle)
        const plotWidth = this.props.width - this.props.labelWidth
        let labelText = this.props.label
        if (this.props.index) {
            labelText = `${this.props.index}. ${labelText}`
        }
        console.log(this)
        return (
            <BoxplotDiv>
                <div className="boxplot-label" style={labelStyle}>
                    {labelText}
                </div>
                <Boxplot {...this.props} width={plotWidth} />
            </BoxplotDiv>
        )
    }
}

export default LabelledBoxplot
