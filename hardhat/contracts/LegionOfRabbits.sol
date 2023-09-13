//SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract LegionOfRabbits is ERC721A, Ownable, Pausable {

    //Criando varáveis globais abaixo
    uint256 public constant maxSupply = 20; //Setando um total máximo de NFT's
    uint256 public constant maxPerWallet = 1; //Setando a quantidade que pode ser mintada por pessoa
    mapping(address => uint256) public walletMinted; //Mapeando o address para ver quantos nfts ele já mintou

    constructor() ERC721A("Legion of Rabbits", "LORB") {} //No constructor espera receber qual o padrão do token, e dois argumentos de string, nome e simbolo
    
    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/QmdYMRQCd1jjvTnnXzbgK8Dhh6rdVpbcrL9cF9j7S9Uue1/";
    } 

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    //Criando função de mint pausável ( whenNotPaused extendendo de Pausable.sol )
    function safeMint (uint256 _quantity) public whenNotPaused {
        require(totalSupply() + _quantity < maxSupply, "We sold out!");
        //O totalSupply + _quantity tem que ser menor que maxSuply, se não traz o erro "We sold out!"

        require(walletMinted[msg.sender] + _quantity <=  maxPerWallet, "Max per Wallet Exceeded");
        /*Fazendo o mapping na carteira de quem está mintando, + _quantity tem que ser menor que maxPerWallet, 
        se não traz o erro "Max per Wallet Exceeded" */

        _safeMint(msg.sender, _quantity);

        for (uint256 i = 0; i < _quantity; i++) {
            walletMinted[msg.sender] += 1; //Incrementando nfts para a carteira dentro desse contrato
        }
    }

    function withdraw(address _addr) external onlyOwner {
        uint256 balance = address(this).balance;
        payable (_addr).transfer(balance);
    }

    

}