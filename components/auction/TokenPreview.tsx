import { NFTPreview, PreviewComponents } from '@zoralabs/nft-components'

export const TokenPreview = ({
  tokenContract,
  tokenId,
  children,
}: {
  tokenContract: string
  tokenId: string
  children?: React.ReactNode
}) => {
  return (
    <NFTPreview id={tokenId} contract={tokenContract} useBetaIndexer={true}>
      <PreviewComponents.MediaThumbnail />
      {children}
    </NFTPreview>
  )
}
