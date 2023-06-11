const hre = require("hardhat");
const sushiSwapDpxLpTokenAddress = "0x0C1Cf6883efA1B496B01f654E247B9b419873054";
const sushiMiniChefV2Address = "0xF4d73326C13a4Fc5FD7A064217e12780e9Bd62c3";
const dpxTokenAddress = "0x6C2C06790b3E3E3c38e12Ee22F8183b37a13EE55";
const sushiTokenAddress = "0xd4d42F0b6DEF4CE0383636770eF773390d85c61A";
const sushiPid = 17;

async function main() {
    dpxSLP = await hre.ethers.getContractAt('IERC20Uniswap', sushiSwapDpxLpTokenAddress);
    miniChefV2 = await hre.ethers.getContractAt('IMiniChefV2', sushiMiniChefV2Address);
    dpxToken = await hre.ethers.getContractAt('MockDAI', dpxTokenAddress);
    sushiToken = await hre.ethers.getContractAt('MockDAI', sushiTokenAddress);

    const DpxArbitrumVault = await hre.ethers.getContractFactory("DpxArbitrumVault");
    dpxVault = await DpxArbitrumVault.deploy("dpxVault", "DVT", dpxSLP.address, sushiMiniChefV2Address, sushiPid);
    await dpxVault.deployed();


//   const oracle = await hre.ethers.getContractFactory("AuthorizedMapping");
//   const oracleContract = await oracle.deploy();
//   await oracleContract.deployed();
//   console.log('Deployed oracleContract Address:', oracleContract.address);
//   const lending = await hre.ethers.getContractFactory("Lending");
//   const lendingContract = await lending.deploy("0x2c74b18e2f84b78ac67428d0c7a9898515f0c46f", "0xE3Dd183ffa70BcFC442A0B9991E682cA8A442Ade", oracleContract.address);
//   await lendingContract.deployed();
  console.log('Deployed DpxArbitrumVault Address:', dpxVault.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })