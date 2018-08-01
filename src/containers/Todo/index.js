import React from 'react'
import AsyncRoute from '../../asyncRoute'

export default props => <AsyncRoute load={() => import('./Todo')}>
  {Container => <Container {...props} />}
</AsyncRoute>
