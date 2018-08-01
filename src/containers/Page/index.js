import React from 'react'
import AsyncRoute from '../../asyncRoute'

export default props => <AsyncRoute load={() => import('./Page')}>
  {Container => <Container {...props} />}
</AsyncRoute>
