import { useContext, Fragment } from 'react'
import { NFTDataContext } from '@zoralabs/nft-components'
import { useManageAuction } from '@zoralabs/manage-auction-hooks'

export const BidButton = () => {
  const { openBidAuction } = useManageAuction()
  const {
    nft: { data },
  } = useContext(NFTDataContext)

  if (
    !data ||
    !data.pricing.reserve ||
    data.pricing.reserve.current.likelyHasEnded
  ) {
    return <Fragment />
  }
  return (
    <Fragment>
      <button
        className='button'
        onClick={() => {
          /* @ts-ignore */
          openBidAuction(parseInt(`${data.pricing.reserve.id}`) as number)
        }}
      >
        Place Bid
      </button>
    </Fragment>
  )
}
