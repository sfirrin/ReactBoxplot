import React from 'react'
import Boxplot from './Boxplot'

class LabelledBoxplot extends React.Component {
    render() {
        const labelStyle = {
            width: this.props.labelWidth + 'px'
        }
        // console.log(labelStyle)
        const plotWidth = this.props.width - this.props.labelWidth
        return (
            <div style={{ display: 'flex', margin: 5 }}>
                <div style={labelStyle}>{this.props.label}</div>
                <Boxplot {...this.props} width={plotWidth} />
            </div>
        )
    }
}

export default LabelledBoxplot
