import { useQuery } from "react-query";
import { NFT_GALLERY_KEY } from "../../constants/Project.constant";
import { getNftGalleryData } from "../Nft.api";

export const useGetNftGalleryData = (walletAddress?: string) => {
  return useQuery({
    queryKey: [NFT_GALLERY_KEY, walletAddress],
    queryFn: () => getNftGalleryData(walletAddress),
  });
};
