import { mbjs } from '../config/config';
import { DEPOSIT_FOR_TRANSFER, GAS, GAS_FOR_TRANSFER } from '../constants';
import { ERROR_MESSAGES } from '../errorMessages';
import { NearContractCall, NFT_METHOD_NAMES, UpdateMetadataArgs, UpdateMetadataArgsResponse } from '../types';


/**
 * Update metadata attributes for pet 
 * @param updateMetadataArguments {@link UpdateMetadataArgs}
 * @returns contract call to be passed to @joychi-js/sdk execute method
 */
export const updateMetadata = ({
  tokenId,
  petAttributes,
  contractAddress = mbjs.keys.contractAddress,
}: UpdateMetadataArgs): NearContractCall<UpdateMetadataArgsResponse> => {


  if (contractAddress == null) {
    throw new Error(ERROR_MESSAGES.CONTRACT_ADDRESS);
  }

  return {
    contractAddress: contractAddress || mbjs.keys.contractAddress,
    args: {
      token_id: tokenId,
      pet_attribute: petAttributes
    },
    methodName: NFT_METHOD_NAMES.NFT_UPDATE_METADATA,
    deposit: 0,
    gas: GAS,
  };

};
