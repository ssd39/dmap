import { Fluence, FluencePeer } from "@fluencelabs/fluence";
import { krasnodar } from "@fluencelabs/fluence-network-environment";
import { Multiaddr, protocols } from "multiaddr";
import { get_external_api_multiaddr, deploy_service, set_timeout, image_resize } from './fluence-media-service'
import { create, urlSource } from 'ipfs-http-client'

let ipfs_rpcAddr;
let service_host_peerid;
let media_service_id;

function decapsulateP2P(rpcAddr){
  return new Multiaddr(rpcAddr)
    .decapsulateCode(protocols.names.p2p.code)
    .toString();
};

async function uploadToIPFS(provider, source){
  const relayPeerId = provider.getStatus().relayPeerId;
  let rpcAddr;
  let result = await get_external_api_multiaddr(provider, relayPeerId);
  if (result.success) {
      rpcAddr = result.multiaddr;
  } else {
      console.error('Failed to retrieve external api multiaddr from %s: ', relayPeerId);
      throw result.error;
  }

  let rpcMaddr = new Multiaddr(rpcAddr).decapsulateCode(protocols.names.p2p.code);
  // HACK: `as any` is needed because ipfs-http-client forgot to add `| Multiaddr` to the `create` types
  const ipfs = create(rpcMaddr);
  console.log('📗 created ipfs client to %s', rpcMaddr);

  await ipfs.id();
  console.log('📗 connected to ipfs');

  const file = await ipfs.add(source);
  console.log('📗 uploaded file:', file);

  // To download the file, uncomment the following code:
  //    let files = await ipfs.get(file.cid);
  //    for await (const file of files) {
  //        const content = uint8ArrayConcat(await all(file.content));
  //        console.log("📗 downloaded file of length ", content.length);
  //    }

  return { file, rpcAddr };
}


async function getProvider(provider){
  let relayPeerId = provider.getStatus().relayPeerId;
  let result = await get_external_api_multiaddr(provider, relayPeerId);
  return result.multiaddr
}


async function getRpcAddr(){
  let result = await get_external_api_multiaddr(
    Fluence.getStatus().relayPeerId
  );
  let rpcAddr = result.multiaddr;
  return decapsulateP2P(rpcAddr);
};

async function init(){
    console.log("Initing fluence...")
    let providerHost = krasnodar[4];
    let relay = krasnodar[3];
    let serviceHost = krasnodar[2];

    let providerClient = new FluencePeer();
    await providerClient.start({ connectTo: providerHost });
    let { file , rpcAddrx} = await uploadToIPFS(providerClient, urlSource(window.location.origin+'/media_service.wasm'))
    ipfs_rpcAddr = rpcAddrx;
    console.log(file.cid.toString())
    await Fluence.start({ connectTo: relay.multiaddr });
    console.log(
      '📗 created a fluence client %s with relay %s',
      Fluence.getStatus().peerId,
      Fluence.getStatus().relayPeerId,
    );
    service_host_peerid= serviceHost.peerId
    await set_timeout(serviceHost.peerId, 10);
    media_service_id = await deploy_service(serviceHost.peerId, file.cid.toString(), rpcAddrx, (a1,a2)=>{
      console.log(a1+" "+a2)
    },{ ttl: 1000000 })
}

async function imageResize(cid, height, width ){
  return await image_resize(cid, height, width, ipfs_rpcAddr, service_host_peerid, media_service_id, (a1, a2)=>{
    console.log(a1+" "+a2)
  },{ ttl: 100000 })
}

export { getRpcAddr, init, imageResize }