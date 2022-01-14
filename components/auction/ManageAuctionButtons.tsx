import { useContext, Fragment } from 'react'
import { NFTDataContext } from '@zoralabs/nft-components'
import { Button } from '@zoralabs/nft-components/dist/components/Button'
import { useManageAuction } from '@zoralabs/manage-auction-hooks'

export const BidButton = () => {
  const {
    nft: { data },
  } = useContext(NFTDataContext)

  if (
    !data ||
    !data.pricing.reserve ||
    (data.pricing.reserve.current.likelyHasEnded && !HOSTED_BID_FLOW)
  ) {
    return <Fragment />
  }
  return (
    <Button
      primary={true}
      href={[
        'https://zora.co/auction',
        data.nft.contract.address,
        data.nft.tokenId,
        'bid',
      ].join('/')}
    >
      Place Bid
    </Button>
  )
}

export const ListButton = () => {
  const {
    nft: { data },
  } = useContext(NFTDataContext)

  const { openManageAuction, openListAuction } = useManageAuction()

  if (!data || !data.nft) {
    return <Fragment />
  }

  if (
    data.pricing.reserve?.status === 'Active' ||
    data.pricing.reserve?.status === 'Pending'
  ) {
    return (
      <button
        className='button'
        onClick={() => {
          const reserveId = data.pricing.reserve?.id
          if (reserveId) {
            openManageAuction(parseInt(reserveId, 10))
          }
        }}
      >
        Manage
      </button>
    )
  }

  return (
    <button
      className='button'
      onClick={() => {
        openListAuction(data.nft.contract.address, data.nft.tokenId)
      }}
    >
      List
    </button>
  )
}
