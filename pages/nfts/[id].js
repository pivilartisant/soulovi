import { useAccount, useNft } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
// import { Message, Modal } from "@components/ui/common";

import { BaseLayout } from "@components/ui/layout";
// import { getAllCourses } from "@content/courses/fetcher";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Nft(tokenId) {
  const { isLoading } = useWeb3();
  const { account } = useAccount();
  const { nft } = useNft(tokenId, account.data);

  console.log("!!!!nft:", nft);

  const router = useRouter();

  if (router.isFallback) {
    return <div>loading...</div>;
  }
  return (
    <div className="container px-6 mx-auto flex flex-col justify-center">
      <div className="flex flex-col my-6">
        <div className="flex flex-wrap">
          <div className="mt-12 grow-0 shrink-0 basis-auto w-full md:w-3/12 lg:w-4/12">
            <div className="flex justify-center">
              <img className="rounded-t-lg" src={nft.data?.image} alt="" />
            </div>
          </div>

          <div className="grow-0 shrink-0 basis-auto w-full md:w-9/12 lg:w-8/12 md:pl-12 text-center md:text-left">
            <div className="mt-12 grow-0 shrink-0 basis-auto w-full md:w-9/12 lg:w-8/12 flex justify-between">
              <div className="text-gray-900 text-xl font-medium mb-2 ">
                {nft.data?.name}
              </div>
              <div className="text-gray-900 text-xl font-medium mb-2">
                <img className="rounded-t-lg" src="/images/share.png" alt="" />
              </div>
            </div>
            <div className="flex">
              <div className="text-gray-900 font-mono text-sm tracking-wider underline">
                {nft.data?.artist}
              </div>
              <div className="text-gray-900 text-xl font-medium mb-2">
                <img className="mt-2 pl-1" src="/images/arrow1.png" alt="" />
              </div>
            </div>

            <div className="mt-8 text-gray-400 font-mono text-sm tracking-wider">
              Details:
            </div>
            <div className="mt-1 grow-0 shrink-0 basis-auto w-full md:w-9/12 lg:w-8/12">
              <p className="text-xs">{nft.data?.description}</p>
            </div>

            <div className="mt-8">
              <table className="w-full  md:w-9/12 lg:w-8/12 border-t-2 border-b-2 border-dashed  font-mono text-xs tracking-wider text-left">
                <tbody>
                  <tr>
                    <td className="text-gray-400">Artist Royalties</td>
                    <td className="text-right">99%</td>
                  </tr>
                  <tr>
                    <td className="text-gray-400">Platform tech expences</td>
                    <td className="text-right">1%</td>
                  </tr>
                  <tr>
                    <td className="text-gray-400">Listing/Cancel</td>
                    <td className="text-right">Free</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-2 w-full  md:w-9/12 lg:w-8/12 flex justify-between">
              <div className="mb-6 flex space-x-4 justify-center md:justify-start">
                <div className="flex flex-col">
                  <div className="text-mono text-xs text-gray-500">Price</div>
                  <div className="text-xs flex">
                    <span className="inline-block pt-1">
                      <img
                        className="h-3 inline-block"
                        src="/images/eth-symbol.svg"
                      ></img>
                    </span>

                    <div className="pt-1">{nft.data?.price}</div>
                  </div>
                </div>
              </div>

              <div className="mb-6 flex space-x-4 justify-center md:justify-start">
                <Link href="/all-nfts">
                  <a
                    href="#"
                    className="text-center w-28 border border-gray-400 rounded-full  text-white bg-black px-4 py-2  text-sm font-medium"
                    aria-current="page"
                  >
                    Buy NFT
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          id: "1",
        },
      },
    ],
    fallback: true,
  };
}

// export const getStaticPaths = async () => {
//   allNfts = await contract.methods.fetchMarketItems().call();
//   // generate the paths
//   const paths = allNfts.map((nft) => ({
//     params: { id: nft.tokenId }, // keep in mind if post.id is a number you need to stringify post.id
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// };

export function getStaticProps({ params }) {
  return {
    props: {
      tokenId: params.id,
    },
  };
}

Nft.Layout = BaseLayout;
