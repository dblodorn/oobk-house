import { NFTFullPage, MediaConfiguration, FullComponents } from "@zoralabs/nft-components";
import { useRouter } from "next/router";
import { AuctionManager } from '@zoralabs/manage-auction-hooks'

import { TokenPreview } from "../../../components/auction/TokenPreview";
import { BidButton } from "../../../components/auction/BidButton"
import {
  MediaFetchAgent,
  NetworkIDs,
  FetchStaticData,
} from "@zoralabs/nft-hooks";
import { GetServerSideProps } from "next";
import { NETWORK_ID, APP_TITLE } from './../../../utils/env-vars'
import { PageWrapper } from "../../../styles/components";
import Head from "../../../components/head";

const styles = {
  theme: {
    lineSpacing: 24,
    linkColor: "var(--black)",
  },
};

type PieceProps = {
  name: string;
  description: string;
  image: string;
  initialData: any;
};

export default function Piece({
  name,
  description,
  image,
  initialData,
}: PieceProps) {
  const { query } = useRouter();

  return (
    <>
      <Head
        title={`${name} | ${APP_TITLE}`}
        description={description}
        ogImage={image}
      />
      <MediaConfiguration
        networkId={NETWORK_ID as NetworkIDs}
        style={styles}
      >
        <PageWrapper>
          {/* 
          <NFTFullPage
            useBetaIndexer={true}
            contract={query.contract as string}
            id={query.id as string}
            initialData={initialData}
          />
          */}
          <NFTFullPage
            useBetaIndexer={true}
            contract={query.contract as string}
            id={query.id as string}
            initialData={initialData}
          >
            <AuctionManager renderMedia={TokenPreview}>
              <FullComponents.MediaFull />
              <FullComponents.MediaInfo />
              <FullComponents.AuctionInfo />
              <BidButton />
              <FullComponents.ProofAuthenticity />
              <FullComponents.NFTProperties />
              <FullComponents.BidHistory />
            </AuctionManager>
          </NFTFullPage>
        </PageWrapper>
      </MediaConfiguration>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.id || Array.isArray(params.id)) {
    return { notFound: true };
  }
  if (!params?.contract || Array.isArray(params.contract)) {
    return { notFound: true };
  }

  const id = params.id as string;
  const contract = params.contract as string;

  const fetchAgent = new MediaFetchAgent(
    NETWORK_ID as NetworkIDs
  );
  const data = await FetchStaticData.fetchZoraIndexerItem(fetchAgent, {
    tokenId: id,
    collectionAddress: contract,
  });

  const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(data);

  return {
    props: {
      id,
      name: tokenInfo.metadata?.name || null,
      description: tokenInfo.metadata?.description || null,
      image: tokenInfo.image || null,
      initialData: data,
    },
  };
};
