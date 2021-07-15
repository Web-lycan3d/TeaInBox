import React from 'react'
import {withRouter} from 'react-router-dom'
import './collection-item.styles.scss'

function CollectionItems({ imageUrl, linkUrl, history , match }) {
    return (
            <div className="collection-item" onClick={() => history.push(`${match.url}${linkUrl}`)}>
                <div className="image" style={{ backgroundImage : `url(${imageUrl})` }} />
            </div>
    )
}

export default withRouter(CollectionItems)
