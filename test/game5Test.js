const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck
    let signer = await ethers.getSigners();
    
    signer = signer.filter(i=>(
      parseInt(i.address) < (parseInt('0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf'))
    ));

    await game.connect(signer[0]).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
