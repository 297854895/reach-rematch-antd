import React from 'react'
import AsyncRoute from '../../asyncRoute'

export default props => <AsyncRoute load={() => import('./Home')}>
  {Container => <Container {...props} />}
</AsyncRoute>
